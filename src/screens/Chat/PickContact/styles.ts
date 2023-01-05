import { StyleSheet } from "react-native";
import { colors, general } from "../../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  searchBox: {
    width: 340,
    height: 55,
    backgroundColor: colors.primary[0],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    marginTop: 25,
    marginBottom: 30
  },
  textInput: {
    maxWidth: 315 
  }
});

export default styles;