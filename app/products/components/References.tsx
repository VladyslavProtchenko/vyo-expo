import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutChangeEvent, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function References() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    rotation.value = withTiming(toValue * 180, { duration: 300 });
    if (contentHeight > 0) {
      height.value = withTiming(toValue * contentHeight, { duration: 300 });
      opacity.value = withTiming(toValue, { duration: 300 });
    }
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height: h } = event.nativeEvent.layout;
    if (h > 0 && h !== contentHeight) {
      setContentHeight(h);
      if (isExpanded) {
        height.value = h;
        opacity.value = 1;
      }
    }
  };

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });

  return (
    <View style={styles.referencesSection}>
      <TouchableOpacity
        style={styles.referencesHeader}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={styles.referencesTitle}>References</Text>
        <Animated.View style={chevronAnimatedStyle}>
          <ChevronDown size={24} color="#404040" />
        </Animated.View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', opacity: 0, zIndex: -1 }}>
        <View style={styles.referencesList} onLayout={onContentLayout}>
          <Text style={styles.referenceItem}>
            1. Owen P, Heneghan C, Musgrave H, et al. Oxford Handbook of Obstetrics and Gynaecology. 4th ed. Oxford University Press, 2023.
          </Text>
          <Text style={styles.referenceItem}>
            2. Nillni YI, Rasmusson AM, Paul EL, Pineles SL. The impact of the menstrual cycle and underlying hormones in anxiety and PTSD. Curr Psychiatry Rep. 2021;23(2):8.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://link.springer.com/article/10.1007/s11920-020-01221-9')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            3. Bernal A, Paolieri D. The influence of estradiol and progesterone on neurocognition during the menstrual cycle. Behav Brain Res. 2022;417:113593.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.sciencedirect.com/science/article/pii/S0166432821004812?via%3Dihub')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            4. Barth C, Villringer A, Sacher J. Sex hormones affect neurotransmitters and shape the adult female brain. Front Neurosci. 2015;9:37.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2015.00037/full')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            5. Rogan MM, Black KE. Dietary energy intake across the menstrual cycle: a narrative review. Nutr Rev. 2023;81(7):869-886.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://academic.oup.com/nutritionreviews/article/81/7/869/6823870')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            6. Stefaniak M, Dmoch-Gajzlerska E, Jankowska K, Rogowski A, Kajdy A, Maksym RB. Progesterone and its metabolites in affect regulation. Pharmaceuticals. 2023;16:520.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.mdpi.com/1424-8247/16/4/520')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            7. Hirschberg AL. Sex hormones, appetite and eating behaviour in women. Maturitas. 2012;71:248-256.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://linkinghub.elsevier.com/retrieve/pii/S0378512211004154')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            8. Burdge GC, Wootton SA. Conversion of alpha-linolenic acid to eicosapentaenoic, docosapentaenoic and docosahexaenoic acids in young women. Br J Nutr. 2002;88(4):411-420. doi:10.1079/BJN2002689.
          </Text>
          <Text style={styles.referenceItem}>
            9. Healthline{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.healthline.com/nutrition/foods-with-choline#vegan-sources')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            10. Dietary Supplement Fact Sheets{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://ods.od.nih.gov/factsheets/list-all/')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            11. FDC USA{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://fdc.nal.usda.gov/')}
            >
              Link.
            </Text>
          </Text>
        </View>
      </View>
      <Animated.View style={contentAnimatedStyle}>
        <View style={styles.referencesList}>
          <Text style={styles.referenceItem}>
            1. Owen P, Heneghan C, Musgrave H, et al. Oxford Handbook of Obstetrics and Gynaecology. 4th ed. Oxford University Press, 2023.
          </Text>
          <Text style={styles.referenceItem}>
            2. Nillni YI, Rasmusson AM, Paul EL, Pineles SL. The impact of the menstrual cycle and underlying hormones in anxiety and PTSD. Curr Psychiatry Rep. 2021;23(2):8.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://link.springer.com/article/10.1007/s11920-020-01221-9')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            3. Bernal A, Paolieri D. The influence of estradiol and progesterone on neurocognition during the menstrual cycle. Behav Brain Res. 2022;417:113593.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.sciencedirect.com/science/article/pii/S0166432821004812?via%3Dihub')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            4. Barth C, Villringer A, Sacher J. Sex hormones affect neurotransmitters and shape the adult female brain. Front Neurosci. 2015;9:37.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2015.00037/full')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            5. Rogan MM, Black KE. Dietary energy intake across the menstrual cycle: a narrative review. Nutr Rev. 2023;81(7):869-886.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://academic.oup.com/nutritionreviews/article/81/7/869/6823870')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            6. Stefaniak M, Dmoch-Gajzlerska E, Jankowska K, Rogowski A, Kajdy A, Maksym RB. Progesterone and its metabolites in affect regulation. Pharmaceuticals. 2023;16:520.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.mdpi.com/1424-8247/16/4/520')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            7. Hirschberg AL. Sex hormones, appetite and eating behaviour in women. Maturitas. 2012;71:248-256.{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://linkinghub.elsevier.com/retrieve/pii/S0378512211004154')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            8. Burdge GC, Wootton SA. Conversion of alpha-linolenic acid to eicosapentaenoic, docosapentaenoic and docosahexaenoic acids in young women. Br J Nutr. 2002;88(4):411-420. doi:10.1079/BJN2002689.
          </Text>
          <Text style={styles.referenceItem}>
            9. Healthline{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://www.healthline.com/nutrition/foods-with-choline#vegan-sources')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            10. Dietary Supplement Fact Sheets{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://ods.od.nih.gov/factsheets/list-all/')}
            >
              Link.
            </Text>
          </Text>
          <Text style={styles.referenceItem}>
            11. FDC USA{' '}
            <Text
              style={styles.referenceLink}
              onPress={() => Linking.openURL('https://fdc.nal.usda.gov/')}
            >
              Link.
            </Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  referencesSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  referencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  referencesTitle: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 24,
    fontWeight: '600',
  },
  referencesList: {
    gap: 12,
  },
  referenceItem: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: '#404040',
  },
  referenceLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
