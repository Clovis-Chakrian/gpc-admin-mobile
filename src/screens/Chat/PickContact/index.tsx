import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PickContactProps } from '../../../@types/routes';

import { ContactCard, Picker } from '../../../components/index';
import styles from './styles';

function PickContact({ navigation, route }: PickContactProps) {
  const [selectedValue, setSelectedValue] = useState('1A-DS');
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT']

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput placeholder='Digite o nome de um aluno aqui' style={styles.textInput} />
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#616161" />
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={selectedValue}
        pickerOptions={pickerOptions}
        onSelectedValue={(option) => handleOnSelectedValue(option)}
      />
      <View style={{ marginBottom: 20 }} />
      <TouchableOpacity onPress={() => {navigation.navigate('Messages')}}>
        <ContactCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ContactCard />
      </TouchableOpacity>
    </View>
  );
};

export default PickContact;