import { Dimensions, SectionList, StyleSheet } from 'react-native';
import { colors, general } from '../../globalStyles';

const styles = StyleSheet.create({
  ...general,
  messageContainer: {
    minWidth: 100,
    maxWidth: Dimensions.get('window').width -70,
    backgroundColor: colors.secondary[1],
    borderRadius: 10,
    alignSelf: 'flex-end',
    padding: 5,
    marginBottom: 5
  }
});

export default styles;