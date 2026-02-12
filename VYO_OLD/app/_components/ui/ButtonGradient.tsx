import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  icon?: any;
  onPress?: () => void;
  className?: string;
};

export default function ButtonGradient({ title, icon, onPress, className }: Props) {
  return (
    <Pressable onPress={onPress} className={`h-12 w-full rounded-full overflow-hidden  ${className}`}>
      <LinearGradient
        colors={['#FDFFA2', '#B4ECD0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-full w-full"
      >
        <View className="flex-row items-center justify-center gap-4 h-full w-full">
          <Text className="font-geo text-base font-medium">{title}</Text>
          {icon}
        </View>
      </LinearGradient>
    </Pressable>
  );
}
