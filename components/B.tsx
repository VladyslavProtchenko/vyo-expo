import { Text } from 'react-native';

export default function B({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
}
