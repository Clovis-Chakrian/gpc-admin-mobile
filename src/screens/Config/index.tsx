import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../globalStyles';
import styles from './styles';

function Config() {
  return (
    <View style={[styles.container, styles.configContainer]}>
      <TouchableOpacity style={styles.configButtons}>
        <Ionicons name='person-add-outline' size={65} color={colors.secondary[0]} />
        <Text style={[styles.other, styles.configButtonsText]}>Criar conta para um pai</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.configButtons}>
        <Ionicons name='settings-outline' size={65} color={colors.secondary[0]} />
        <Text style={[styles.other, styles.configButtonsText]}>Editar sua conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Config;