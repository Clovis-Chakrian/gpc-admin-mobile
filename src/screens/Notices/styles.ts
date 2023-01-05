import { StyleSheet } from "react-native";
import { general } from "../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  createNoticeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 20
  }
});

export default styles;