import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { StackHeaderProps } from '@react-navigation/stack';

import styles from './styles';
import { colors } from '../../globalStyles';

const Logo = require('../../assets/logoGp.png')

const Header = ({ navigation, route }: StackHeaderProps) => {
  function handleGoToConfig() {
    navigation.navigate('Config');
  }

  function handleGoToChat() {
    navigation.navigate('PickContact')
  }
  
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