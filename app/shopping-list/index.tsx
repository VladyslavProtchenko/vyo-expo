import { useShoppingLists } from '@/hooks/useShoppingLists';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import { ChevronRight, MoveLeft } from 'lucide-react-native';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STORAGE_URL } from '@/config/supabase'

const LIST_THUMBNAIL = `${STORAGE_URL}/content/phases/flower-1.webp`;

function formatListDate(dateStr: string): string {
  const d = dayjs(dateStr);
  const today = dayjs().startOf('day');
  if (d.isSame(today)) return 'Today';
  if (d.isSame(today.subtract(1, 'day'))) return 'Yesterday';
  return d.format('DD MMM YYYY');
}

export default function ShoppingList() {
  const router = useRouter();
  const { data: lists = [], isLoading, error } = useShoppingLists();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity
        onPress={() => router.push('/products')}
        style={styles.header}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MoveLeft size={30} color="black" />
        <Text style={styles.title}>Shopping lists</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#404040" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>Failed to load lists</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {lists.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>🛒</Text>
                <Text style={styles.emptyTitle}>No lists yet</Text>
                <Text style={styles.emptyText}>Go to your daily nutrition plan and tap "Add to shopping list"</Text>
              </View>
            )}
            {lists.map((list) => {
              const totalItems =
                (list.products?.length ?? 0) + (list.custom_products?.length ?? 0);
              return (
                <TouchableOpacity
                  key={list.id}
                  style={styles.card}
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({ pathname: '/shopping-list/add', params: { id: list.id } })
                  }
                >
                  <Image
                    source={{ uri: LIST_THUMBNAIL }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>
                      Shopping list {formatListDate(list.date)}
                    </Text>
                    <Text style={styles.itemCount}>
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </Text>
                  </View>
                  <ChevronRight size={24} color="#404040" />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 24,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: '50%',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  itemCount: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 2,
  },
});
