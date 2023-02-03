import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  solicitationCard: {
    width: Dimensions.get('window').width -40,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10
  },
  solicitationInformationView: {
    width: Dimensions.get('window').width -40,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  markAsReadyButton: {
    width: Dimensions.get('window').width -60,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.secondary[1],
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteSolicitationButton: {
    width: 40,
    height: 36,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-end',
    left: 40,
    top: 5
  },
  alternativeSolicitationCardTitleView: {
    flexDirection: 'row',
    width: Dimensions.get('window').width -40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default styles;