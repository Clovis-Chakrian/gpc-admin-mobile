import { Dimensions, StyleSheet } from 'react-native';
import { general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  createActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 20
  },
  monthView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  content: {
    paddingBottom: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  }
});

export default styles;