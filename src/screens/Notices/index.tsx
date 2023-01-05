import { View, Text, Alert, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NoticeCard, Picker } from '../../components';
import styles from './styles';
import { colors } from '../../globalStyles';
import { useState } from 'react';
import { HomeProps } from '../../@types/routes'

function Notices({ route, navigation }: HomeProps) {
  const [selectedValue, setSelectedValue] = useState('1A-DS');
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT']
  
  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  function handleNavigateToCreateNotice() {
    navigation.navigate('CreateNotice');
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToCreateNotice} style={styles.createNoticeButton}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Novo aviso</Text>
        <Ionicons name='add-outline' color={colors.secondary[0]} size={37} />
      </TouchableOpacity>

      <View>
        <Picker
          selectedValue={selectedValue}
          pickerOptions={pickerOptions}
          onSelectedValue={(option) => handleOnSelectedValue(option)}
        />
      </View>
      <NoticeCard
        title='Atenção - Recesso escolar'
        text='Do dia 30/06 ao dia 15/07 de 2023 a nossa escola entrará em recesso, ou seja, não haverá aulas nem nenhuma atividade extra curricular nesse período.'
        editFunction={() => Alert.alert('Testando o botão de editar')}
        deleteFunction={() => Alert.alert('Testando o botão de deletar')}
      />
    </View>
  );
}

export default Notices;