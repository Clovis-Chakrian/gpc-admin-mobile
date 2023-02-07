import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { StackHeaderProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { colors } from '../../globalStyles';
import { useEffect, useState } from 'react';

const Logo = require('../../assets/logoGp.png')

const Header = ({ navigation, route }: StackHeaderProps) => {
  const [managerId, setManagerId] = useState('');
  const [token, setToken] = useState('');

  function handleGoToConfig() {
    navigation.navigate('Config', {
      token,
      id: managerId
    });
  }

  function handleGoToChat() {
    navigation.navigate('PickContact', {
      managerId,
      token
    });
  }

  async function getManagerId() {
    await AsyncStorage.getItem('id').then((id) => {
      if (id) {
        setManagerId(id);
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro ao conseguir sua identificação, tente fechar e abrir o app.');
    });
  }

  async function getToken() {
    await AsyncStorage.getItem('token').then((token) => {
      if (token) {
        setToken(token);
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro ao conseguir sua identificação, tente fechar e abrir o app.');
    });
  }

  useEffect(() => {
    getManagerId();
    getToken();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoToConfig}>
        <SimpleLineIcons name='settings' color={colors.primary[0]} size={31} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />

      <TouchableOpacity onPress={handleGoToChat}>
        <SimpleLineIcons name='bubbles' color={colors.primary[0]} size={31} />
      </TouchableOpacity>
    </View>
  );
};

const AlternativeHeader = ({ navigation, route }: StackHeaderProps) => {
  function handleGoBack() {
    navigation.goBack()
  };

  return (
    <View style={styles.alternativeHeaderContainer}>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name='arrow-back' color={colors.primary[0]} size={31} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />

      <View style={{ width: 31 }}></View>
    </View>
  );
};

export { Header, AlternativeHeader };