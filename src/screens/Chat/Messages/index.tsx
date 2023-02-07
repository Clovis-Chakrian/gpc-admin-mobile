import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { colors, fonts } from '../../../globalStyles';
import { Ionicons } from '@expo/vector-icons';
import * as api from '../../../services/api';
import { MessagesProps } from '../../../@types/routes';

import styles from './styles';
import { MessageContainer } from '../../../components';
import { useEffect, useState } from 'react';
import { IMessage } from '../../../@types/interfaces';

function Messages({ navigation, route }: MessagesProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  async function getMessages() {
    await api.http.get('/messages', {
      params: {
        room: route.params.room
      }
    }).then(resp => {
      setMessages(resp.data);
      setIsLoadingMessages(false);
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Não foi possível buscar as mensagens anteriores.');
      navigation.goBack();
    });
  }

  api.socket.on(route.params.room, (message: IMessage) => {
    //console.log(message)
    setMessages([...messages, message]);
  })

  function handleSendMessage() {
    api.socket.emit('message', {
      author: route.params.managerId,
      message: messageInput,
      room: route.params.room
    });
    setMessageInput('');
    Keyboard.dismiss();
  }

  useEffect(() => {
    getMessages();
  }, [])

  if (isLoadingMessages) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <Text style={[styles.label, { fontFamily: fonts.fontFamily.bold }]}>{route.params.parentName}</Text>
        <Text style={[styles.other, { color: '#616161' }]}>{route.params.relativeName}</Text>
        <Text style={[styles.other, { color: '#616161' }]}>{route.params.schoolClass}</Text>
      </View>
      <View>
        <View style={styles.messagesView}>
          <ScrollView contentContainerStyle={styles.messagesScrollView}>
            {messages.map((message: IMessage) => {
              return <MessageContainer
                key={message.id}
                align={message.author == route.params.managerId ? 'flex-end' : 'flex-start'}
                color={message.author == route.params.managerId ? colors.primary[1] : colors.secondary[1]}
                message={message.message}
                hour={`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()}`}
              />
            })}
          </ScrollView>
        </View>

        <KeyboardAvoidingView style={styles.messageInputView} enabled behavior='padding' keyboardVerticalOffset={-200}>
          <View style={styles.messageTextInputView}>
            <TextInput
              placeholder='Digite uma mensagem...'
              style={{ paddingHorizontal: 10 }}
              placeholderTextColor={'#616161'}
              onChangeText={text => {setMessageInput(text)}}
              value={messageInput}
            />
          </View>
          <TouchableOpacity style={styles.sendMessageButton} disabled={messageInput === '' ? true : false} onPress={handleSendMessage}>
            <Ionicons name='send-outline' color={ messageInput === '' ? '#616161' : colors.secondary[0]} size={24} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Messages;