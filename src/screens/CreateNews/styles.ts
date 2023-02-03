import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  input: {
    width: Dimensions.get('window').width - 40,
    height: 65,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    paddingHorizontal: 5
  },
  imageInput: {
    width: 327,
    height: 202,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[0],
    marginBottom: 10
  },
  image: {
    width: 327,
    height: 202,
    borderRadius: 10,
  },
  addNewsButton: {
    width: Dimensions.get('window').width - 40,
    height: 65,
    backgroundColor: colors.secondary[1],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  showDatePickerButton: {
    width: Dimensions.get('window').width - 40,
    height: 46,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60
  }
});

export default styles;