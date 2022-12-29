import { StyleSheet, Dimensions } from "react-native";
import { colors, general } from "../../globalStyles"; 

const styles = StyleSheet.create({
  ...general,
  cardContainer: {
    width: Dimensions.get('window').width -40,
    backgroundColor: colors.primary[0],
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: "center"
  },
  button: {
    width: 40,
    height: 36,
    backgroundColor: colors.primary[0],
    elevation: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;