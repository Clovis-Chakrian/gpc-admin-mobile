import { View, Text, Alert, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import * as api from '../../services/api';
import { Picker } from '../../components';
import { ISchedule } from '../../@types/interfaces';
import { colors } from '../../globalStyles';

function Schedules() {
  const [loadingFile, setLoadingFile] = useState<boolean>(true);
  const [schedule, setSchedule] = useState<ISchedule>();
  const [selectedValue, setSelectedValue] = useState('1A-DS');
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT'];

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  async function handleUpdateSchedule() {
    await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    }).then(async (file) => {
      if (file.type == 'success') {
        setLoadingFile(true);
        const data = new FormData()
        data.append('schedule', {
          name: file.name,
          uri: file.uri,
          type: file.mimeType
        } as any);
        await api.http.patch(`/schedule/${selectedValue}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          switch (res.status) {
            case 200:
              Alert.alert('Uhuu! Sucesso!', 'Arquivo atualizado com sucesso!');
              handleGetSelectedSchedule()
              break
            case 400:
              Alert.alert('Atenção! Erro!', `${res.data.message}`);
              setLoadingFile(false);
              break
            case 500:
              Alert.alert('Atenção! Erro!', `${res.data.message}`);
              setLoadingFile(false);
              break
            default:
              Alert.alert('Atenção! Erro!', `${res.data.message}`);
              setLoadingFile(false);
              break
          }
        }).catch(err => {
          console.error(err);
          Alert.alert('Atenção! Erro!', 'Houve um erro na sua solicitação, tente novamente mais tarde!');
          setLoadingFile(false);
        });
      }
      return
    }).catch(err => {
      console.log(err)
      return
    });
  }

  async function handleSeeSchedule() {
    await Linking.openURL(`${schedule?.url}`);
  }

  async function handleGetSelectedSchedule() {
    await api.http.get(`/schedule/${selectedValue}`).then(resp => {
      if (resp.status != 200) {
        Alert.alert('Erro!', 'Houve um erro ao buscar os horários.');
        setLoadingFile(false);
        return;
      };
      setSchedule(resp.data)
      setLoadingFile(false);
    }).catch(err => {
      console.log(err);
      Alert.alert('Erro!', 'Houve um erro ao buscar os horários.');
      setLoadingFile(false);
    });
  };

  useEffect(() => {
    setLoadingFile(true);
    handleGetSelectedSchedule()
  }, [selectedValue]);

  if (loadingFile) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
      <Picker
        selectedValue={selectedValue}
        pickerOptions={pickerOptions}
        onSelectedValue={(option) => handleOnSelectedValue(option)}
      />

      <View>
        <TouchableOpacity style={styles.filesButton} onPress={handleSeeSchedule}>
          <Fontisto name='preview' size={59} color={colors.secondary[0]} />
          <Text style={[styles.other, styles.filesButtonsText]}>Ver horário da turma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filesButton} onPress={handleUpdateSchedule}>
          <Ionicons name='document-attach-outline' size={59} color={colors.secondary[0]} />
          <Text style={[styles.other, styles.filesButtonsText]}>Editar horário da turma</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Schedules;