import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'

import styles from './styles';
import { colors } from '../../globalStyles';

const Logo = require('../../assets/logoGp.png')

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <SimpleLineIcons name='settings' color={colors.primary[0]} size={31} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />

      <TouchableOpacity>
        <SimpleLineIcons name='bubbles' color={colors.primary[0]} size={31} />
      </TouchableOpacity>
    </View>
  );
};

const AlternativeHeader = () => {
  return (
    <View style={styles.alternativeHeaderContainer}>
      <TouchableOpacity>
        <Ionicons name='arrow-back' color={colors.primary[0]} size={31} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />

      <View style={{ width: 31 }}></View>
    </View>
  );
};

export { Header, AlternativeHeader };