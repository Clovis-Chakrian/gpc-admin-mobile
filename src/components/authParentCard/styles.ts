import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  authParentCard: {
    width: Dimensions.get('window').width -20,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  },
  authButton: {
    marginTop: 10,
    width: Dimensions.get('window').width - 40,
    backgroundColor: colors.secondary[1],
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;