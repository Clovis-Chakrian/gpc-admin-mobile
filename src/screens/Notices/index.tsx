import { View, Text, Alert, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NoticeCard, Picker } from '../../components';
import styles from './styles';
import { colors } from '../../globalStyles';
import React, { useEffect, useState } from 'react';
import { HomeProps } from '../../@types/routes'
import * as api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INotice } from '../../@types/interfaces';
import { useFocusEffect } from '@react-navigation/native';

function Notices({ route, navigation }: HomeProps) {
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT']
  const [selectedValue, setSelectedValue] = useState('');
  const [notices, setNotices] = useState<INotice[] | []>([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  async function getToken() {
    const token = await AsyncStorage.getItem('token');
    token ? setToken(token) : Alert.alert('Atenção!', 'Não foi possível recuperar suas credenciais de login. Tente novamente mais tarde.')
  }

  async function handleNavigateToCreateNotice() {
    navigation.navigate('CreateNotice', {
      token,
      selectedSchoolClass: selectedValue
    });
  };

  async function getNotices() {
    await api.http.get('/notices', {
      params: {
        schoolClass: selectedValue
      },
    }).then(res => {
      setNotices(res.data);
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro ao buscar os avisos salvos');
      setIsLoading(false);
    });
  };

  async function handleDeleteNotice(id: string) {
    setIsLoading(true);
    await api.http.delete(`/delete-notice/${id}`, {
      headers: {
        'x-access-token': token
      }
    }).then(() => {
      Alert.alert('Sucesso!', 'Aviso deletado com sucesso!');
      getNotices();
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false)
    });
  };

  useEffect(() => {
    setSelectedValue(pickerOptions[0]);
    getNotices();
    getToken()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getNotices();
    }, [selectedValue])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToCreateNotice} style={styles.createNoticeButton}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Novo aviso</Text>
        <Ionicons name='add-outline' color={colors.secondary[0]} size={37} />
      </TouchableOpacity>

      <View>
        <Picker
          selectedValue={selectedValue}
          pickerOptions={pickerOptions}
          onSelectedValue={(option) => handleOnSelectedValue(option)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {
          notices.length === 0 ?
            <View style={{ paddingHorizontal: 10, marginTop: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>Parece que ainda não há nenhum aviso para essa turma... Crie um usando o botão Novo aviso acima</Text>
            </View>
            :
            notices.map((notice: INotice) => {
              return (
                <NoticeCard
                  key={notice.id}
                  title={notice.title}
                  description={notice.description}
                  editFunction={() => navigation.navigate('EditNotice', { token, id: notice.id })}
                  deleteFunction={() => handleDeleteNotice(`${notice.id}`)}
                />
              );
            })
        }
      </ScrollView>
    </View>
  );
}

export default Notices;