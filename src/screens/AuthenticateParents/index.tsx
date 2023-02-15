import { useEffect, useState } from 'react';
import { ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import { AuthParentCard } from '../../components';
import * as api from '../../services/api';
import styles from './styles';
import { AuthenticateParentsProps } from '../../@types/routes';
import { AxiosError } from 'axios';
import { IParent } from '../../@types/interfaces';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { colors } from '../../globalStyles';

function AuthenticateParents({ navigation, route }: AuthenticateParentsProps) {
  const [nonAuthParents, setNonAuthParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getNonAuthParents() {
    await api.http.get('/unauthorized-parents', {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(resp => {
      setNonAuthParents(resp.data);
      setIsLoading(false);
    }).catch((err: AxiosError) => {
      const data = err.response?.data as { message: string }
      console.log(err);
      Alert.alert(`Erro! - Código ${err.response?.status}`, data.message);
      setIsLoading(false);
    })
  };

  async function authParent(id: string) {
    await api.http.patch(`/authorize/parent/${id}`, {}, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(resp => {
      Alert.alert('Sucesso!', resp.data.message);
      navigation.goBack();
    }).catch((err: AxiosError) => {
      const data = err.response?.data as { message: string }
      console.log(err);
      Alert.alert(`Erro! - Código ${err.response?.status}`, data.message)
      navigation.goBack();
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getNonAuthParents();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]} >
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      {
        nonAuthParents.map((parent: IParent) => {
          return (
            <AuthParentCard
              key={parent.fullName}
              parentName={parent.fullName}
              relatives={parent.relatives}
              authFunction={() => authParent(parent.id)}
            />
          );
        })
      }
    </ScrollView>
  );
};

export default AuthenticateParents;