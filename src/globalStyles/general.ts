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
    marginBottom: 5,
    fontFamily: fonts.fontFamily.bold
  },
  subtitle: {
    fontSize: fonts.fontSize.subtitle,
    color: colors.text,
    fontFamily: fonts.fontFamily.bold
  },
  label: {
    fontSize: fonts.fontSize.label,
    color: colors.text,
    fontFamily: fonts.fontFamily.regular
  },
  text: {
    fontSize: fonts.fontSize.text,
    color: colors.text,
    fontFamily: fonts.fontFamily.regular
  },
  other: {
    fontSize: fonts.fontSize.other,
    color: colors.text,
    fontFamily: fonts.fontFamily.regular
  }
});

export default general;