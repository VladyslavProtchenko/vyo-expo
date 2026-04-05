import CustomSwitch from '@/components/ui/CustomSwitch';
import { useProductSettings } from '@/hooks/useProductSettings';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export default function IsVeganCard() {
  const { t } = useTranslation();
  const { isVegetarian, isVegan, updateSettings } = useProductSettings();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('products.settings.title')}</Text>
      <Text style={styles.description}>{t('products.settings.description')}</Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{t('products.settings.vegetarian')}</Text>
        <CustomSwitch
          value={isVegetarian}
          onValueChange={(value) => updateSettings({ is_vegetarian: value, is_vegan: false })}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{t('products.settings.vegan')}</Text>
        <CustomSwitch
          value={isVegan}
          onValueChange={(value) => updateSettings({ is_vegan: value, is_vegetarian: false })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 18,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  switchLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
});
