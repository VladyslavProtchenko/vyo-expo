import { Image, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface AvatarProps {
  avatarUrl: string | null;
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const getInitial = (name: string): string => {
  return name.trim().charAt(0).toUpperCase() || '?';
};

const getColorFromName = (name: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E63946', '#457B9D'
  ];
  
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

export default function Avatar({ avatarUrl, name, size = 44, style }: AvatarProps) {
  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
          style as ImageStyle
        ]}
      />
    );
  }

  const initial = getInitial(name);
  const backgroundColor = getColorFromName(name);
  const fontSize = size * 0.55;

  return (
    <View
      style={[
        styles.initialsContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text style={[styles.initialsText, { fontSize }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});
