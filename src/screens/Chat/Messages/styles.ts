import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../../globalStyles";

const styles = StyleSheet.create({
  ...general,
  contactInfo: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary[1],
    width: Dimensions.get('window').width,
    paddingBottom: 9,
  },
  messagesView: {
    //height: Dimensions.get('window').height /1.33
    flex: 4
  },
  messagesScrollView: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 5
  },
  messageInputView: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  messageTextInputView: {
    height: 56,
    width: Dimensions.get('window').width - 81,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: colors.primary[0],
    justifyContent: 'center',
  },
  sendMessageButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.primary[0],
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
});

export default styles;