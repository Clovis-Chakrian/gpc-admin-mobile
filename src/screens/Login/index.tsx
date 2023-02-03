import { useState } from 'react';
import { TouchableOpacity, View, Text, Image, TextInput, Alert, } from 'react-native';
import { LoginProps } from '../../@types/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as api from '../../services/api';

import styles from './styles';

const logo = require('../../assets/logoGp.png');

//const EMAIL_VALIDATION = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

function Login({ navigation, route }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email == '' || password == '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para fazer login.');
      return
    }

    const data = {
      email,
      password
    }

    await api.http.post(('/login-manager'), {
      ...data
    }).then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token).then(async () => {
        await AsyncStorage.setItem('id', res.data.id).catch((err) => {
          console.log(err);
          Alert.alert('Atenção', 'houve um erro ao salvar suas credenciais de login, tente novamente mais tarde.');
          return
        });
        navigation.navigate('Home');
      }).catch((err) => {
        console.log(err);
        Alert.alert('Atenção', 'houve um erro ao salvar suas credenciais de login, tente novamente mais tarde.');
        return
      })
      console.log(res.data.token)
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <View style={[styles.container, styles.homeContainer]}>
      <View style={{ flex: 2 }}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: '#FFF', width: 239, textAlign: 'center' }]}>Olá, bem vindo de volta, gestor(a)!</Text>
      </View>

      <View style={styles.inputsView}>
        <Text style={[styles.label, { color: '#FFF' }]}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder='email@provedor.com'
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={text => setEmail(text)}
        />

        <Text style={[styles.label, { color: '#FFF', marginTop: 10 }]}>Senha</Text>
        <TextInput
          style={styles.textInput}
          placeholder='********'
          secureTextEntry
          caretHidden
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={[styles.subtitle, { color: '#FFF' }]}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;