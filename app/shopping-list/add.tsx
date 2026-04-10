import AddProductModal from '@/app/shopping-list/components/AddProductModal';
import DeleteListModal from '@/app/shopping-list/components/DeleteListModal';
import ShoppingListItem from '@/app/shopping-list/components/ShoppingListItem';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { useDeleteShoppingList } from '@/hooks/useDeleteShoppingList';
import { useSaveShoppingList } from '@/hooks/useSaveShoppingList';
import { useShoppingListById, useShoppingListForToday } from '@/hooks/useShoppingLists';
import { getProductQuantity, Products } from '@/store/products';
import { useShoppingListStore } from '@/store/shoppingList';
import dayjs from 'dayjs';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MoveLeft, Plus, Trash2 } from 'lucide-react-native';
import { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingListAdd() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const listId = params.id;
  const isViewingList = !!listId;
  const { data: listById, isLoading: isLoadingList } = useShoppingListById(listId);
  const { data: listByToday } = useShoppingListForToday();
  const { products, customProducts, setProducts } = useShoppingListStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedCustom, setSelectedCustom] = useState<string[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const saveMutation = useSaveShoppingList();
  const deleteMutation = useDeleteShoppingList();

  useEffect(() => {
    if (listId && listById != null) {
      const prods = listById.products ?? [];
      const custom = listById.custom_products ?? [];
      setProducts('products', prods);
      setProducts('customProducts', custom);
      setSelected(prods);
      setSelectedCustom(custom);
    }
  }, [listId, listById]);

  useEffect(() => {
    if (!listId && listByToday != null) {
      const listProds = listByToday.products ?? [];
      const listCustom = listByToday.custom_products ?? [];
      setProducts('products', [...listProds, ...products.filter((p) => !listProds.includes(p))]);
      setProducts('customProducts', [...listCustom, ...customProducts.filter((c) => !listCustom.includes(c))]);
      setSelected(listProds);
      setSelectedCustom(listCustom);
    }
  }, [listId, listByToday]);

  useEffect(() => {
    if (listId || listByToday === undefined || products.length > 0) return;
    setProducts('products', Products.slice(0, 9).map((p) => p.name));
  }, [listId, listByToday, products.length]);

  const allItems = [
    ...products.map((name) => ({ name, isCustom: false })),
    ...customProducts.map((name) => ({ name, isCustom: true })),
  ];

  const toggleChecked = (index: number) => {
    const item = allItems[index];
    if (item.isCustom) {
      setSelectedCustom((prev) =>
        prev.includes(item.name) ? prev.filter((n) => n !== item.name) : [...prev, item.name]
      );
    } else {
      setSelected((prev) =>
        prev.includes(item.name) ? prev.filter((n) => n !== item.name) : [...prev, item.name]
      );
    }
  };
  const handleDelete = (index: number) => {
    const removedName = allItems[index].name;
    const isCustom = allItems[index].isCustom;
    if (isCustom) {
      setProducts('customProducts', customProducts.filter((n) => n !== removedName));
      setSelectedCustom((prev) => prev.filter((n) => n !== removedName));
    } else {
      setProducts('products', products.filter((n) => n !== removedName));
      setSelected((prev) => prev.filter((n) => n !== removedName));
    }
  };
  const handleAddProduct = () => {
    const name = newProductName.trim();
    if (name) {
      setProducts('customProducts', [...customProducts, name]);
      setNewProductName('');
      setAddModalVisible(false);
    }
  };
  const handleBack = () =>
    router.push(isViewingList ? '/shopping-list' : '/products');

  const idToDelete = listId ?? listByToday?.id;
  const hasListFromBackend = (listId && listById != null) || (!listId && listByToday != null);
  const handleTrash = () => {
    if (idToDelete) setDeleteModalVisible(true);
  };
  const handleConfirmDelete = async () => {
    if (!idToDelete) return;
    try {
      await deleteMutation.mutateAsync(idToDelete);
      setProducts('products', []);
      setProducts('customProducts', []);
      setSelected([]);
      setSelectedCustom([]);
      setDeleteModalVisible(false);
    } catch {
      // handled by useDeleteShoppingList onError
    }
  };
  const handleSave = async () => {
    try {
      const dateToSave = listById?.date ?? dayjs().format('YYYY-MM-DD');
      const idToSave = listId ?? listByToday?.id;
      await saveMutation.mutateAsync({
        products: selected,
        customProducts: selectedCustom,
        date: dateToSave,
        listId: idToSave,
      });
      router.push('/shopping-list');
    } catch {
      // handled by useSaveShoppingList onError
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MoveLeft size={30} color="black" />
          <Text style={styles.title}>
            Shopping list {listById?.date ? dayjs(listById.date).format('DD MMM') : dayjs().format('DD MMM')}
          </Text>
        </TouchableOpacity>
          {hasListFromBackend && (
          <TouchableOpacity onPress={handleTrash} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Trash2 size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {isViewingList && isLoadingList ? (
          <ActivityIndicator size="large" color="#404040" style={styles.loader} />
        ) : (
        <Fragment>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          >
            <View style={styles.listContainer}>
              {allItems.map((item, index) => (
                <ShoppingListItem
                  key={item.isCustom ? `custom-${item.name}-${index}` : `${item.name}-${index}`}
                  name={item.name}
                  quantity={item.isCustom ? 'Custom' : getProductQuantity(item.name)}
                  checked={item.isCustom ? selectedCustom.includes(item.name) : selected.includes(item.name)}
                  onPress={() => toggleChecked(index)}
                  onDelete={() => handleDelete(index)}
                  isCustomQuantity={item.isCustom}
                />
              ))}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddModalVisible(true)}
                activeOpacity={0.7}
              >
                <Plus size={24} color="#404040" />
                <Text style={styles.addButtonText}>Add custom product!</Text>
              </TouchableOpacity>
            </View>
            <ButtonGradient
              title={saveMutation.isPending ? 'Saving...' : 'Save'}
              onPress={handleSave}
              disabled={saveMutation.isPending}
              className={styles.saveButton}
            />
          </ScrollView>
          <AddProductModal
            visible={addModalVisible}
            onClose={() => setAddModalVisible(false)}
            productName={newProductName}
            onProductNameChange={setNewProductName}
            onAdd={handleAddProduct}
          />
          <DeleteListModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={handleConfirmDelete}
            isDeleting={deleteMutation.isPending}
          />
          </Fragment>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  loader: {
    marginTop: 40,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  listContent: {
    paddingBottom: 100,
    gap: 16,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    gap: 12,
  },
  saveButton: {
    width: '100%',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#404040',
  },
});
