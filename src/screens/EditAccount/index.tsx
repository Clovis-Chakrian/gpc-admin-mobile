import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { EditAccountProps } from '../../@types/routes';
import { colors } from '../../globalStyles';
import styles from './styles';
import * as api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

function EditAccount({ navigation, route }: EditAccountProps) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateCredentials() {
    setIsLoading(true);
    const data = {
      password,
      newPassword
    }

    if (data.newPassword !== confirmPassword) {
      Alert.alert('Atenção', 'O Campo confirmar senha não confere com o campo nova senha.');
      setIsLoading(false);
      return;
    };

    await api.http.patch(`/update-manager/${route.params.id}`, {
      ...data
    }, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(async resp => {
      switch (resp.status) {
        case 200:
          await AsyncStorage.setItem('token', resp.data.token).then(() => {
            setIsLoading(false);
            navigation.goBack();
            Alert.alert('Sucesso!', 'Credenciais alteradas com sucesso.');
          }).catch(err => {
            setIsLoading(false);
            console.error(err);
            Alert.alert('Atenção!', 'Não foi possível salvar suas credenciais de acesso no app. Tente fazer login novamente com a sua nova senha.');
            navigation.goBack();
          });
          break;

        case 400:
          setIsLoading(false);
          navigation.goBack();
          Alert.alert('Atenção!', 'Não foi possível validar os dados recebidos.');
          break;

        case 500:
          setIsLoading(false);
          navigation.goBack();
          Alert.alert('Erro!', 'Houve um erro interno do servidor..');
          break;

        case 401:
          setIsLoading(false);
          navigation.goBack();
          Alert.alert('Atenção!', 'Não foi possível confirmar sua autorização. Tente novamente mais tarde.');
          break;

        default:
          setIsLoading(false);
          navigation.goBack();
          Alert.alert('Erro!', 'Houve um erro interno da aplicação 1.')
          break;
      }
    }).catch((err: AxiosError) => {
      if (err.response?.data) {
        setIsLoading(false);
        const data: {} = err.response?.data;
        console.error(err.message);
        navigation.goBack();
        Alert.alert('Erro!', `${data}`);
      } else {
        setIsLoading(false);
        console.error(err.message);
        navigation.goBack();
        Alert.alert('Erro!', `Erro interno da aplicação.`);
      }

    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 30, marginTop: 20 }]}>Edite sua conta</Text>

      <View style={styles.inputView}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Senha antiga</Text>
        <TextInput
          placeholder='Digite sua senha antiga aqui...'
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Nova senha</Text>
        <TextInput
          placeholder='Digite sua senha nova aqui...'
          style={styles.input}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
      </View>

      <View style={{ marginBottom: 60 }}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Confimar nova senha</Text>
        <TextInput
          placeholder='Digite sua senha novamente...'
          style={[styles.input, (newPassword !== confirmPassword && newPassword !== '' && confirmPassword !== '') && styles.inputDifferentPass]}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleUpdateCredentials} disabled={newPassword !== confirmPassword || password === '' ? true : false} style={[styles.saveCredentialButton, { backgroundColor: newPassword !== confirmPassword || password === '' ? '#616161' : colors.secondary[1] }]}>
        <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Salvar senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAccount;