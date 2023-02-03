import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  inputView: {
    marginBottom: 20
  },
  input: {
    width: Dimensions.get('window').width - 40,
    height: 65,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 5
  },
  createAccountButton: {
    width: Dimensions.get('window').width - 40,
    height: 65,
    backgroundColor: colors.primary[1],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  relativesListScrollView: {
    height: 200,
    width: Dimensions.get('window').width -40,
    flexDirection: 'row'
  },
  content: {
    width: Dimensions.get('window').width,
    paddingVertical: 10,
    alignItems: 'center',
  },
  relativeCard: {
    width: 160,
    height: 140,
    backgroundColor: colors.primary[0],
    marginRight: 10,
    padding: 5,
    justifyContent: 'space-between',
    borderRadius: 10
  },
  removeRelativeButton: {
    alignSelf: 'center'
  }
});

export default styles;