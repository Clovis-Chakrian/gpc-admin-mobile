import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

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
    width: 315,
    height: 46,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    paddingHorizontal: 5,
    marginTop: 5,
  }
});

export default styles;