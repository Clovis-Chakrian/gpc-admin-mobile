import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  headerContainer: {
    width: Dimensions.get('window').width,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.primary[1],
  },
  logo: {
    width: 77,
    height: 40
  },
  alternativeHeaderContainer: {
    width: Dimensions.get('window').width,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: colors.primary[1],
  },
});

export default styles;