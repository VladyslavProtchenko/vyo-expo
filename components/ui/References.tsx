import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutChangeEvent, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type Reference = { text: string; url?: string };

type TitleVariant = 'large' | 'small';

type Props = { references?: Reference[]; titleVariant?: TitleVariant };

function ReferencesList({ references, onLayout }: { references: Reference[]; onLayout?: (e: LayoutChangeEvent) => void }) {
  return (
    <View style={styles.referencesList} onLayout={onLayout}>
      {references.map((ref, index) => (
        <Text key={index} style={styles.referenceItem}>
          {index + 1}. {ref.text}
          {ref.url && (
            <Text style={styles.referenceLink} onPress={() => Linking.openURL(ref.url!)}> Link.</Text>
          )}
        </Text>
      ))}
    </View>
  );
}

export default function References({ references = [], titleVariant = 'small' }: Props) {
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

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  return (
    <View style={styles.referencesSection}>
      <TouchableOpacity style={styles.referencesHeader} onPress={toggleExpanded} activeOpacity={0.7}>
        <Text style={titleVariant === 'large' ? styles.referencesTitleLarge : styles.referencesTitleSmall}>References</Text>
        <Animated.View style={chevronAnimatedStyle}>
          <ChevronDown size={24} color="#404040" />
        </Animated.View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', opacity: 0, zIndex: -1 }}>
        <ReferencesList references={references} onLayout={onContentLayout} />
      </View>
      <Animated.View style={contentAnimatedStyle}>
        <ReferencesList references={references} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  referencesSection: {
    paddingBottom: 60,
  },
  referencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  referencesTitleLarge: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 24,
    fontWeight: '600',
  },
  referencesTitleSmall: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16 * 1.4,
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
