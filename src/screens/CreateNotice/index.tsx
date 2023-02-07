import { useRef, useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { colors } from '../../globalStyles';
import * as api from '../../services/api';
import styles from './styles';
import { CreateNoticeProps } from '../../@types/routes';
import { Picker } from '../../components';

function CreateNotice({ route, navigation }: CreateNoticeProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState(route.params.selectedSchoolClass);
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT']
  const [isLoading, setIsloading] = useState(false);
  const viewRef = useRef<any>();

  Keyboard.addListener('keyboardDidHide', () => {
    viewRef.current?.focus()
  })

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  async function handleCreateNotice() {
    setIsloading(true);
    if (title == '' || description == '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para poder criar um aviso.');
      setIsloading(false);
      return
    };

    const data = {
      title,
      description,
      schoolClass: selectedValue
    };

    await api.http.post('/create-notice', {
      ...data,
    }, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(() => {
      Alert.alert('Sucesso!', 'Aviso criado com sucesso!');
      navigation.goBack();
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.')
    });
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View ref={viewRef} style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
        <Picker
          selectedValue={selectedValue}
          pickerOptions={pickerOptions}
          onSelectedValue={(option) => handleOnSelectedValue(option)}
        />

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Título do aviso</Text>
          <TextInput
            placeholder='Digite o nome do aviso aqui'
            style={styles.textInput}
            onChangeText={text => setTitle(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Descrição do aviso</Text>
          <TextInput
            placeholder='Escreva uma descrição do aviso aqui'
            multiline
            style={styles.multilineTextInput}
            textAlignVertical='top'
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleCreateNotice} style={styles.createNoticeButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar aviso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNotice;