import { View, StyleProp, ViewStyle } from "react-native";


export default function  CardShadow({children, style, ...props}: {children: React.ReactNode, style?: StyleProp<ViewStyle>}) {
    return (
      <View
        {...props}
        style={[{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }, style as StyleProp<ViewStyle> ]}
      >
      {children}
    </View>
    )
} 