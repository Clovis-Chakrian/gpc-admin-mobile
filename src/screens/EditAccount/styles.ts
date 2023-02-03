import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  input: {
    width: Dimensions.get('window').width -40,
    height: 65,
    backgroundColor: colors.primary[0],
    paddingHorizontal: 5,
    borderRadius: 10
  },
  inputView: {
    marginBottom: 20
  },
  saveCredentialButton: {
    width: Dimensions.get('window').width -40,
    height: 65,
    backgroundColor: colors.secondary[1],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputDifferentPass: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary[2]
  }
});

export default styles;