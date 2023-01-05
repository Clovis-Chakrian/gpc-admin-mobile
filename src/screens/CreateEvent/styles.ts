import { StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  textInput: {
    width: 315,
    height: 46,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    paddingHorizontal: 5
  },
  inputView: {
    marginBottom: 15
  },
  multilineTextInput: {
    width: 315,
    height: 208,
    borderRadius: 10,
    backgroundColor: colors.primary[0]
  },
  createEventButton: {
    width: 315,
    height: 65,
    backgroundColor: colors.secondary[1],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;