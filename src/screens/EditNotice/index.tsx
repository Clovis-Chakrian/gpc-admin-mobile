import { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../../globalStyles';
import * as api from '../../services/api';
import styles from './styles';
import { EditNoticeProps } from '../../@types/routes';
import { Picker } from '../../components';
import { INotice } from '../../@types/interfaces';

function EditNotice({ route, navigation }: EditNoticeProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('1A-DS');
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT'];
  const [notice, setNotice] = useState<INotice | null>();
  // const [isLoading, setIsloading] = useState(false);

  async function handleGetNotice() {
    await api.http.get(`/notice/${route.params.id}`).then(resp => {
      if (resp.status != 200) {
        Alert.alert('Atenção!', resp.data.message);
        navigation.goBack(); 
        return
      };
      const data: INotice = resp.data;

      setNotice(data);
      setDescription(data.description);
      setTitle(data.title);
      setSelectedValue(data.schoolClass);
    })
  };

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  async function handleEditNotice() {
    if (title == '' || description == '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para poder criar um aviso.');
      return
    };

    const data = {
      title,
      description,
      schoolClass: selectedValue
    };

    await api.http.patch(`/update-notice/${route.params.id}`, {
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

  useEffect(() => {
    handleGetNotice();
  }, []);

  if (!notice) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]}/>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center' }]}>
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
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Descrição do aviso</Text>
          <TextInput
            placeholder='Escreva uma descrição do aviso aqui'
            multiline
            value={description}
            style={styles.multilineTextInput}
            textAlignVertical='top'
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleEditNotice} style={styles.editNoticeButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Editar aviso</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditNotice;