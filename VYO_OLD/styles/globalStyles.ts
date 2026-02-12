import { StyleSheet, TextStyle } from 'react-native';

// Цветовая палитра из Tailwind проекта
export const colors = {
  link: '#0020C399',
  menstrual: '#FF5B5B',
  follicular: '#795BFF',
  ovulation: '#74FF5B',
  luteal: '#D15BFF',
};

// Типографика из Tailwind проекта
export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
  },
  number: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 52,
    fontWeight: '900',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  p: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
  },

  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    
  },


  
  // Poppins font styles
  poppins: {
    fontFamily: 'Poppins',
  },
  poppinsMedium: {
    fontFamily: 'Poppins-Medium',
  },
  poppinsSemibold: {
    fontFamily: 'Poppins-SemiBold',
  },
  poppinsBold: {
    fontFamily: 'Poppins-Bold',
  },
};

// Глобальные стили из Tailwind проекта
export const globalStyles = StyleSheet.create({
  textLink: {
    color: colors.link,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bgLink: {
    backgroundColor: colors.link,
  },
});
