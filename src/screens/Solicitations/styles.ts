import { Dimensions, StyleSheet } from 'react-native';
import { general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  content: {
    width: Dimensions.get('window').width,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: 20
  }
});

export default styles;