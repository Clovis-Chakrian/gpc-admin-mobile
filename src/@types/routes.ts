import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type StackParamList = {
  Login: undefined,
  Home: undefined,
  Config: {
    token: string,
    id: string,
  },
  PickContact: {
    managerId: string,
    token: string
  },
  Messages: {
    room: string,
    managerId: string,
    parentName: string,
    relativeName: string,
    schoolClass: string
  },
  CreateEvent: {
    token: string
  },
  EditEvent: {
    token: string,
    id: string
  },
  CreateNotice: {
    token: string,
    selectedSchoolClass: string
  }
  EditNotice: {
    token: string,
    id: string,
  },
  CreateNews: {
    token: string
  },
  EditAccount: {
    token: string,
    id: string
  },
  CreateParentsAccount: {
    token: string
  },
  AuthenticateParents: {
    token: string
  },
};

export type LoginProps = StackScreenProps<StackParamList, 'Login'>;
export type HomeProps = StackScreenProps<StackParamList, 'Home'>;
export type ConfigProps = StackScreenProps<StackParamList, 'Config'>;
export type PickContactProps = StackScreenProps<StackParamList, 'PickContact'>;
export type MessagesProps = StackScreenProps<StackParamList, 'Messages'>;
export type CreateEventProps = StackScreenProps<StackParamList, 'CreateEvent'>;
export type EditEventProps = StackScreenProps<StackParamList, 'EditEvent'>;
export type CreateNoticeProps = StackScreenProps<StackParamList, 'CreateNotice'>;
export type EditNoticeProps = StackScreenProps<StackParamList, 'EditNotice'>;
export type CreateNewsProps = StackScreenProps<StackParamList, 'CreateNews'>;
export type CreateParentsAccountProps = StackScreenProps<StackParamList, 'CreateParentsAccount'>;
export type EditAccountProps = StackScreenProps<StackParamList, 'EditAccount'>;
export type AuthenticateParentsProps = StackScreenProps<StackParamList, 'AuthenticateParents'>;

export type BottomTabsParamList = {
  Notices: undefined
};

export type NoticesProps = CompositeScreenProps<BottomTabScreenProps<BottomTabsParamList, 'Notices'>, StackScreenProps<StackParamList>>