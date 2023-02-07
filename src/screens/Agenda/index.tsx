import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { HomeProps } from '../../@types/routes';
import { Ionicons } from '@expo/vector-icons';
import * as api from '../../services/api';

import styles from './styles';
import { colors } from '../../globalStyles';
import { NoticeCard } from '../../components';
import React, { useEffect, useState } from 'react';
import { IEvents } from '../../@types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Agenda({ navigation, route }: HomeProps) {
  const currentDate = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month);
  const [events, setEvents] = useState<IEvents[]>([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleSelectedMonth(back: boolean) {
    if (back == true) {
      if (selectedMonth == 0) {
        setSelectedMonth(11);
        return
      };

      setSelectedMonth(selectedMonth - 1);
      return
    } else if (selectedMonth == 11) {
      setSelectedMonth(0);
      return
    };

    setSelectedMonth(selectedMonth + 1);
  };

  function handleNavigateToCreateEventScreen() {
    navigation.navigate('CreateEvent', { token })
  };

  async function getEvents() {
    await api.http.get(('/events'), {
      params: {
        year: currentDate.year,
        month: selectedMonth + 1
      }
    }).then(resp => {
      setEvents(resp.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação ao buscar os eventos. Tente novamente mais tarde.')
      setIsLoading(false);
    });
  };

  async function deleteEvent(id: string) {
    setIsLoading(true);
    await api.http.delete(`/event/${id}`, {
      headers: {
        'x-access-token': token
      }
    }).then(() => {
      Alert.alert('Sucesso!', 'Evento deletado com sucesso!');
      getEvents();
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      Alert.alert('Atenção!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false);
    })
  }

  async function getToken() {
    const token = await AsyncStorage.getItem('token');
    token ? setToken(token) : Alert.alert('Atenção!', 'Não foi possível recuperar suas credenciais de login. Tente novamente mais tarde.')
  }

  useEffect(() => {
    setSelectedMonth(currentDate.month);
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getEvents();
    }, [selectedMonth])
  )

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createActivityButton} onPress={handleNavigateToCreateEventScreen}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Novo evento</Text>
        <Ionicons name='add-outline' color={colors.secondary[0]} size={37} />
      </TouchableOpacity>

      <View style={styles.monthView}>
        <TouchableOpacity onPress={() => {
          handleSelectedMonth(true);
        }}>
          <Ionicons name='play-back-outline' color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.subtitle, { marginHorizontal: 10 }]}>{months[selectedMonth]}</Text>
        <TouchableOpacity onPress={() => handleSelectedMonth(false)}>
          <Ionicons name='play-forward-outline' color={colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {
          events.length === 0 ?
            <View style={{ paddingHorizontal: 10, marginTop: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>Parece que ainda não há nenhum evento para esse mês... Crie um usando o botão Novo evento acima</Text>
            </View>
            :
            events.map((event: IEvents) => {
              return (
                <NoticeCard
                  key={event.id}
                  title={`${new Date(event.date).getDate()} - ${event.title}`}
                  description={event.description}
                  deleteFunction={() => deleteEvent(event.id)}
                  editFunction={() => navigation.navigate('EditEvent', { token, id: event.id })}
                />
              );
            })
        }
      </ScrollView>
    </View>
  );
};

export default Agenda;