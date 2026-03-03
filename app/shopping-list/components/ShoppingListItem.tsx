import CustomCheckbox from '@/components/ui/CustomCheckbox';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface ShoppingListItemProps {
  name: string;
  quantity?: string;
  checked: boolean;
  onPress: () => void;
  onDelete?: () => void;
  isSuperfood?: boolean;
  isCustomQuantity?: boolean;
}

export default function ShoppingListItem({
  name,
  quantity = '100g',
  checked,
  onPress,
  onDelete,
  isSuperfood = false,
  isCustomQuantity = false,
}: ShoppingListItemProps) {
  const row = (
    <View style={styles.row}>
      <CustomCheckbox style={styles.checkbox} checked={checked} onPress={onPress} />
      <TouchableOpacity style={styles.block} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.content}>
          {isSuperfood && (
            <View style={styles.superfoodBadge}>
              <Text style={styles.superfoodText}>SUPERFOOD</Text>
            </View>
          )}
          <Text style={[styles.name, isSuperfood && styles.nameWithBadge]} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <Text style={[styles.quantity, isCustomQuantity && styles.quantityNormal]}>{quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  if (onDelete) {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteAction}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteActionText}>Delete</Text>
          </TouchableOpacity>
        )}
        friction={2}
        rightThreshold={40}
      >
        {row}
      </Swipeable>
    );
  }

  return row;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 4,
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#F7F7F7',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#404040',
  },
  nameWithBadge: {
    marginLeft: 8,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#404040',
  },
  quantityNormal: {
    fontWeight: '400',
  },
  superfoodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#22C55E',
  },
  superfoodText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: 'white',
  },
  deleteAction: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 24,
  },
  deleteActionText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
  },
});
