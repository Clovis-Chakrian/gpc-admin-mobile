import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  pickerContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    marginLeft: 40
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  pickerOptionsContainer: {
    flex: 1,
    padding: 10,
    width: 300,
    maxHeight: 450,
    backgroundColor: colors.primary[0],
    borderRadius: 10
  },
  showPickerOptionsButton: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  pickerOption: {
    height: 30,
    marginBottom: 5,
  }
});

export default styles