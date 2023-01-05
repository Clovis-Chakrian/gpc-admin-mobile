import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type StackParamList = {
  Login: undefined,
  Home: undefined,
  Config: undefined,
  PickContact: undefined,
  Messages: undefined,
  CreateEvent: undefined,
  CreateNotice: undefined
};

export type LoginProps = StackScreenProps<StackParamList, 'Login'>;
export type HomeProps = StackScreenProps<StackParamList, 'Home'>;
export type ConfigProps = StackScreenProps<StackParamList, 'Config'>;
export type PickContactProps = StackScreenProps<StackParamList, 'PickContact'>;
export type MessagesProps = StackScreenProps<StackParamList, 'Messages'>;
export type CreateEventProps = StackScreenProps<StackParamList, 'CreateEvent'>;
export type CreateNoticeProps = StackScreenProps<StackParamList, 'CreateNotice'>;

export type BottomTabsParamList = {
  Notices: undefined
};

export type NoticesProps = CompositeScreenProps<BottomTabScreenProps<BottomTabsParamList, 'Notices'>, StackScreenProps<StackParamList>>