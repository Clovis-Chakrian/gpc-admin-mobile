import { View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../globalStyles';

function Schedules() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Alert.alert('Salvo com sucesso')} style={styles.saveSchedulesButton}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Salvar alterações</Text>
        <Ionicons name='save-outline' color={colors.secondary[0]} size={32} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.label}>Horário da turma 1A-DS</Text>
          <TextInput placeholder='Teste' style={styles.scheduleInput}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default Schedules;