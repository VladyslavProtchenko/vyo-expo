import { typography } from '@/constants/typography';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CarePlanCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[typography.h1, styles.cardTitle]}>My Care Plan</Text>
        <View style={styles.tab}>
          <Text style={styles.backedText}>Backed by science</Text>
          <View style={styles.images}>
            <Image source={require('@/assets/images/exp3.png')} style={[styles.expertImage, styles.expert3]} />
            <Image source={require('@/assets/images/exp2.png')} style={[styles.expertImage, styles.expert2]} />
            <Image source={require('@/assets/images/exp1.png')} style={[styles.expertImage, styles.expert1]} />
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.progressContainer}>
          <Text style={typography.p}>Possible endometriosis</Text>
        </View>
      </View>
      <Image source={require('@/assets/images/corner.png')} style={styles.corner} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    top: -6,
    right: 0,
    width: 210,
    height: 60,
    zIndex: -10,
    resizeMode: 'contain',
  },
  cardHeader: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  tab: {
    padding: 8,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  cardTitle: {
    padding: 16,
    fontSize: 24,
    lineHeight: 24,
  },
  images: {
    flexDirection: 'row',
    width: 42,
    height: 24,
  },
  backedText: {
    fontFamily: 'Poppins',
    fontSize: 11,
    color: '#000000',
  },
  expertImage: {
    width: 20,
    height: 20,
    borderRadius: 12,
    position: 'absolute',
  },
  expert1: {
    left: 0,
    zIndex: 1,
  },
  expert2: {
    left: 12,
    zIndex: 2,
  },
  expert3: {
    left: 24,
    zIndex: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 50,
    paddingTop: 0,
    padding: 16,
  },
  progressContainer: {
    flex: 1,
  },
});
