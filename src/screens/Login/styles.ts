import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  homeContainer: {
    backgroundColor: colors.primary[1],
  },
  logo: {
    width: 158,
    height: 83,
    marginTop: 60
  },
  inputsView: {
    alignSelf: 'center',
    flex: 4
  },
  textInput: {
    width: Dimensions.get('window').width -40,
    height: 65,
    backgroundColor: colors.primary[0],
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10
  },
  loginButton: {
    width: Dimensions.get('window').width -40,
    height: 65,
    backgroundColor: colors.secondary[0],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default styles;