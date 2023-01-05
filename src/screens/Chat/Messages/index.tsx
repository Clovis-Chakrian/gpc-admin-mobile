import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { colors, fonts } from '../../../globalStyles';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

function Messages() {
  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <Text style={[styles.label, { fontFamily: fonts.fontFamily.bold }]}>Nome do pai</Text>
        <Text style={[styles.other, { color: '#616161' }]}>Aluno</Text>
        <Text style={[styles.other, { color: '#616161' }]}>1A-DS</Text>
      </View>
      <View>
        <View style={styles.messagesView}>
          <ScrollView contentContainerStyle={styles.messagesScrollView}>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 3</Text>
            <Text>Message 1</Text>
            <Text>Message 2</Text>
            <Text>Message 32</Text>
          </ScrollView>
        </View>

        <KeyboardAvoidingView style={styles.messageInputView} enabled behavior='padding' keyboardVerticalOffset={-200}>
          <View style={styles.messageTextInputView}>
            <TextInput placeholder='Digite uma mensagem...' style={{ paddingHorizontal: 10 }} placeholderTextColor={'#616161'} />
          </View>
          <TouchableOpacity style={styles.sendMessageButton}>
            <Ionicons name='send-outline' color={colors.secondary[0]} size={24} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Messages;