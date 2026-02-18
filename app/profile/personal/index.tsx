import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PersonalSettings() {
  const router = useRouter();

  const personalFields = [
    { label: 'Name', value: 'Lily Adams', hasArrow: true, isHighlighted: false },
    { label: 'Date of birth', value: '06 June 1986', hasArrow: false, isHighlighted: true },
    { label: 'Email', value: 'lily@gmail.com', hasArrow: true, isHighlighted: false },
    { label: 'Health conditions', value: '2', hasArrow: true, isHighlighted: false },
    { label: 'Weight', value: '65', hasArrow: true, isHighlighted: false },
    { label: 'Height', value: '165', hasArrow: true, isHighlighted: false },
    { label: 'Waist', value: '70', hasArrow: true, isHighlighted: false },
    { label: 'Hips', value: '100', hasArrow: true, isHighlighted: false },
    { label: 'Cycle length', value: '28', hasArrow: true, isHighlighted: false },
    { label: 'Period length', value: '5', hasArrow: true, isHighlighted: false },
  ];

  const handleDeleteAccount = () => {
    // Handle delete account
    console.log('Delete account');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.header} onPress={() => router.back()}
          activeOpacity={0.7}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        <Text style={styles.title}>Personal</Text>
      </TouchableOpacity>

      <View style={styles.menuContainer}>
        {personalFields.map((field) => (
          <TouchableOpacity
            key={field.label}
            style={styles.menuCard}
            activeOpacity={0.7}
            disabled={!field.hasArrow}
          >
            <Text style={styles.menuItemText}>{field.label}</Text>
            <View style={styles.valueContainer}>
              <Text style={[
                styles.valueText,
                field.isHighlighted && styles.valueTextHighlighted,
              ]}>
                {field.value}
              </Text>
              {field.hasArrow && (
                <Ionicons name="chevron-forward" size={20} color="#000" style={styles.arrow} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Delete account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    gap: 16,
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 28.8, // 120% of 24px
    color: '#000',
  },
  menuContainer: {
    marginBottom: 16,
    gap: 8,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  valueTextHighlighted: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  arrow: {
    marginLeft: 4,
  },
  deleteButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginTop: 32,
    marginBottom: 100,
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FF3B30',
  },
});
