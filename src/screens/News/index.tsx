import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../globalStyles';
import { NewsCard } from '../../components';
import { HomeProps } from '../../@types/routes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../services/api';
import { INewsApi } from '../../@types/interfaces';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

function News({ route, navigation }: HomeProps) {
  const [token, setToken] = useState('')
  const [news, setNews] = useState<INewsApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getToken() {
    const token = await AsyncStorage.getItem('token');
    token ? setToken(token) : Alert.alert('Atenção!', 'Não foi possível recuperar suas credenciais de login. Tente novamente mais tarde.')
  }

  function handleNavigateToCreateNews() {
    navigation.navigate('CreateNews', {
      token
    });
  };

  async function getNews() {
    await api.http.get('/news').then(resp => {
      switch (resp.status) {
        case 500:
          Alert.alert('Houve um erro interno do servidor ao buscar as notícias. Tente novamente mais tarde.');
          setIsLoading(false);
          break;
        case 400:
          Alert.alert('Houve um erro na requisição. Tente novamente mais tarde.');
          setIsLoading(false);
          break
        case 200:
          setNews(resp.data);
          setIsLoading(false);
          break

        default:
          Alert.alert('Houve um erro na requisição. Tente novamente mais tarde.');
          setIsLoading(false);
          break;
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false);
    });
  };

  async function deleteNews(id: string, imageId: string) {
    setIsLoading(true);

    await api.http.delete(`/news/${id}`, {
      params: {
        imageId
      },
      headers: {
        'x-access-token': token
      }
    }).then(resp => {
      switch (resp.status) {
        case 500:
          Alert.alert('Erro!', 'Houve um erro interno do servidor. Tente novamente mais tarde.');
          setIsLoading(false);
          break;

        case 400:
          Alert.alert('Erro!', 'Houve um erro na requisição. Tente novamente mais tarde.');
          setIsLoading(false);
          break;

        case 401:
          Alert.alert('Erro!', 'Você não tem autorização para isso.');
          setIsLoading(false);
          break;

        case 200:
          Alert.alert('Sucesso!', 'Notícia deletada com sucesso!');
          getNews();
          break

        default:
          Alert.alert('Erro!', 'Houve um erro interno do servidor. Tente novamente mais tarde.');
          setIsLoading(false);
          break;
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getNews();
    }, [])
  );

  useEffect(() => {
    getToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createNewsButton} onPress={handleNavigateToCreateNews}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Adicionar notícia</Text>
        <Ionicons name='add-outline' color={colors.secondary[0]} size={37} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {
          news.map((article) => {
            return (
              <NewsCard
                key={article.id}
                title={article.title}
                url={article.url}
                imageUrl={article.image.imageUrl}
                deleteFunction={() => deleteNews(article.id, article.image.imageId)}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
};

export default News;