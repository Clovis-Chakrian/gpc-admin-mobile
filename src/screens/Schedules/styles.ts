import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  saveSchedulesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 20
  },
  content: {
    paddingBottom: 10,
    marginTop: 40,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  scheduleInput: {
    width: Dimensions.get('window').width - 40,
    height: 46,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  filesButton: {
    width: 152,
    height: 152,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  filesButtonsText: {
    fontFamily: fonts.fontFamily.bold,
    textAlign: 'center',
    width: 80
  }
});

export default styles;