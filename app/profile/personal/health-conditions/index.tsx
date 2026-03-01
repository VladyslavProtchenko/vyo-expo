import PainModal from '@/app/profile/personal/health-conditions/components/PainModal';
import { useUpdateIsPain } from '@/hooks/useUpdateIsPain';
import { useUpdateMedicalArray } from '@/hooks/useUpdateMedicalArray';
import useUserStore from '@/store/useUserStore';
import { DIAGNOSIS_LABELS, DiagnosisType } from '@/types/diagnosis';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

type HealthConditionItem = DiagnosisType | 'Painful period';

const HEALTH_CONDITIONS: HealthConditionItem[] = [
  'Painful period',
  'Fibroids',
  'Endometriosis',
  'Adenomyosis',
  'Infertillity',
  'Cysts',
  'Polycystic ovary syndrome',
  'Hyperplasia',
];

export default function HealthConditions() {
  const router = useRouter();
  const { diagnoses, isPain } = useUserStore();
  const { mutate: updateMedicalArray } = useUpdateMedicalArray();
  const { mutate: updateIsPain } = useUpdateIsPain();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showPainModal, setShowPainModal] = useState(false);

  useEffect(() => {
    const initialSelected: string[] = [];
    if (isPain) {
      initialSelected.push('Painful period');
    }
    if (diagnoses && diagnoses.length > 0) {
      initialSelected.push(...(diagnoses as string[]));
    }
    setSelectedConditions(initialSelected);
  }, [diagnoses, isPain]);

  const toggleDiagnosis = (condition: string, currentArray: string[]) => {
    const isSelected = currentArray.includes(condition);
    
    if (isSelected) {
      return currentArray.filter((item) => item !== condition);
    } else {
      return [...currentArray, condition];
    }
  };

  const handleToggle = (condition: string) => {
    if (condition === 'Painful period') {
      const isSelected = selectedConditions.includes(condition);
      if (!isSelected) {
        setShowPainModal(true);
      } else {
        setSelectedConditions((prev) => prev.filter((c) => c !== condition));
        updateIsPain(false);
      }
      return;
    }

    setSelectedConditions((prev) => {
      const isSelected = prev.includes(condition);
      const newConditions = isSelected
        ? prev.filter((c) => c !== condition)
        : [...prev, condition];
      
      const currentDiagnoses = (diagnoses || []) as string[];
      const updatedDiagnoses = toggleDiagnosis(condition, currentDiagnoses);
      const diagnosesToSave = updatedDiagnoses.filter(
        (c) => DIAGNOSIS_LABELS.includes(c as DiagnosisType)
      ) as DiagnosisType[];
      updateMedicalArray({
        field: 'diagnosed_conditions',
        value: diagnosesToSave,
      });
      
      return newConditions;
    });
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.header} onPress={() => router.back()}
            activeOpacity={0.7}>
            <FontAwesome6 name="arrow-left-long" size={24} color="black" />
          <Text style={styles.title}>Health conditions</Text>
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          {HEALTH_CONDITIONS.map((condition) => {
            const isSelected = selectedConditions.includes(condition);
            
            return (
              <View key={condition} style={styles.menuCard}>
                <Text style={styles.menuItemText}>{condition}</Text>
                <View style={styles.switchContainer}>
                  <Switch
                    value={isSelected}
                    onValueChange={() => handleToggle(condition)}
                    trackColor={{ false: '#E5E5E5', true: '#34C759' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <PainModal visible={showPainModal} onClose={() => setShowPainModal(false)} />
    </>
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
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
