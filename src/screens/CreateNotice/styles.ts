import { Dimensions, StyleSheet } from 'react-native';
import { general, colors } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  textInput: {
    width: Dimensions.get('window').width -40,
    height: 46,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  inputView: {
    marginBottom: 15,
    marginTop: 20
  },
  multilineTextInput: {
    width: Dimensions.get('window').width -40,
    height: 208,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    paddingHorizontal: 10,
    paddingTop: 5
  },
  createNoticeButton: {
    width: Dimensions.get('window').width -40,
    height: 65,
    backgroundColor: colors.secondary[1],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;