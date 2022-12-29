import { StyleSheet } from 'react-native';
import colors from './colors';
import fonts from './fonts';

const general = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.fontSize.title,
    color: colors.text,
    marginBottom: 5
  },
  subtitle: {},
  label: {},
  text: {},
  other: {}
});

export default general;