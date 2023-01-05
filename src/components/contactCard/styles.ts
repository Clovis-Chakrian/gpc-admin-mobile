import { Dimensions, StyleSheet } from "react-native";
import { general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  contactCardContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5
  }
});

export default styles;