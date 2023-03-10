import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../globalStyles';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as api from '../../services/api';
import {CreateEventProps} from '../../@types/routes';

import styles from './styles';
import { useEffect, useState } from 'react';

function CreateEvent({ navigation, route }: CreateEventProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    currentDate ? setDate(currentDate) : setDate(date);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  async function handleCreateEvent() {
    if (title == '' || description == '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para poder criar um aviso.');
      return
    };

    const data = {
      title,
      description,
      date: date.toISOString()
    };

    await api.http.post('/event', {
      ...data,
    }, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(() => {
      Alert.alert('Sucesso!', 'Evento criado com sucesso!');
      navigation.goBack();
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.')
    });
  }

  // For some reason, .toLocaleDateString() function doesn't work here, so i writed a function to format to pt-BR format.
  function showFormatedDate(unformatedDate: Date) {
    const date = {
      day: unformatedDate.getDate(),
      month: unformatedDate.getMonth() + 1,
      year: unformatedDate.getFullYear()
    };

    const formatedDate = `${String(date.day).length == 1 ? `0${date.day}` : date.day}/${String(date.month).length == 1 ? `0${date.month}` : date.month}/${date.year}`;
    return formatedDate;
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Título do evento</Text>
          <TextInput
            placeholder='Digite o nome do evento aqui'
            style={styles.textInput}
            onChangeText={text => setTitle(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Descrição do evento</Text>
          <TextInput
            placeholder='Escreva uma descrição do evento aqui'
            multiline
            style={styles.multilineTextInput}
            textAlignVertical='top'
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Data do evento</Text>
          <TouchableOpacity style={styles.showDatePickerButton} onPress={() => showDatePicker()}>
            <Text style={styles.text}>{showFormatedDate(date)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleCreateEvent} style={styles.createEventButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar evento</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEvent;