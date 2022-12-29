import { StackScreenProps } from "@react-navigation/stack";

type StackParamList = {
  Login: {},
  Home: undefined
};

export type LoginProps = StackScreenProps<StackParamList, 'Login'>;
export type HomeProps = StackScreenProps<StackParamList, 'Home'>;