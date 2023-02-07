import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../globalStyles';
import styles from './styles';
import { ConfigProps } from '../../@types/routes';

function Config({ navigation, route }: ConfigProps) {
  function handleGoToCreateParentsAccount() {
    navigation.navigate('CreateParentsAccount', {
      token: route.params.token
    });
  };

  function handleGoToEditAccount() {
    navigation.navigate('EditAccount', {
      id: route.params.id,
      token: route.params.token
    });
  }

  return (
    <View style={[styles.container, styles.configContainer]}>
      <TouchableOpacity style={styles.configButtons} onPress={handleGoToCreateParentsAccount}>
        <Ionicons name='person-add-outline' size={65} color={colors.secondary[0]} />
        <Text style={[styles.other, styles.configButtonsText]}>Criar conta para um pai</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.configButtons} onPress={handleGoToEditAccount}>
        <Ionicons name='settings-outline' size={65} color={colors.secondary[0]} />
        <Text style={[styles.other, styles.configButtonsText]}>Editar sua conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Config;