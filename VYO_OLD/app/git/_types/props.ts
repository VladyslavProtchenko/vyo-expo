import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

export type Props<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
