import { Dimensions, StyleSheet } from 'react-native';
import { general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  createNewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 20
  },
  content: {
    width: Dimensions.get('window').width,
    paddingBottom: 10,
    alignItems: 'center'
  }
});

export default styles;