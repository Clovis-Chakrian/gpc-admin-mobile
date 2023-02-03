import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  cardContainer: {
    width: Dimensions.get('window').width -40,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 10,
    marginTop: 20
  },
  contentContainer: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20
  },
  newsButton: {
    width: 40,
    height: 36,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#F5F5F5'
  }
});

export default styles;