import { StyleSheet } from "react-native";
import { colors, fonts, general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  configContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  configButtons: {
    height: 152,
    width: 152,
    backgroundColor: colors.primary[0],
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 10
  },
  configButtonsText: {
    fontFamily: fonts.fontFamily.bold,
    textAlign: 'center',
    width: 80
  }
});

export default styles;