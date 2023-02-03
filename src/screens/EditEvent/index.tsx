import { useEffect, useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DateTimePickerEvent, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { EditEventProps } from '../../@types/routes';
import * as api from '../../services/api';
import { colors } from '../../globalStyles';
import styles from './styles';
import { IEvents } from '../../@types/interfaces';


function EditEvent({ navigation, route }: EditEventProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState<IEvents | null>()

  async function handleGetSelectedEvent() {
    await api.http.get(`/event/${route.params.id}`).then((resp) => {
      const data: IEvents = resp.data;
      setEvent(data);
      setTitle(data.title);
      setDescription(data.description);
      setDate(new Date(data.date));
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro ao buscar o evento para editar, tente novamente mais tarde.');
      navigation.goBack();
    });
  };

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

  async function handleEditEvent() {
    if (title == '' || description == '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para poder criar um aviso.');
      return
    };

    const data = {
      title,
      description,
      date: date.toISOString()
    };

    await api.http.patch(`/event/${route.params.id}`, {
      ...data,
    }, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(() => {
      Alert.alert('Sucesso!', 'Evento editado com sucesso!');
      navigation.goBack();
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
    });
  }

  useEffect(() => {
    handleGetSelectedEvent();
  }, []);

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

  if (!event) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Título do evento</Text>
          <TextInput
            placeholder='Digite o nome do evento aqui'
            style={styles.textInput}
            value={title}
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
            value={description}
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
        <TouchableOpacity onPress={handleEditEvent} style={styles.createEventButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Editar evento</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditEvent;