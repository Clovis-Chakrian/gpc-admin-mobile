import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { HomeProps } from '../../@types/routes';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../globalStyles';
import { NoticeCard } from '../../components';
import { useState } from 'react';

function Agenda({ navigation, route }: HomeProps) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const [selectedMonth, setSelectedMonth] = useState(1);

  function handleSelectedMonth (back: boolean) {
    if (back == true) {
      if (selectedMonth == 0) {
        setSelectedMonth(11);
        return
      };

      setSelectedMonth(selectedMonth - 1);
      return
    } else if (selectedMonth == 11) {
      setSelectedMonth(0);
      return
    };
    setSelectedMonth(selectedMonth + 1);
  };

  function handleNavigateToCreateEventScreen() {
    navigation.navigate('CreateEvent')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createActivityButton} onPress={handleNavigateToCreateEventScreen}>
        <Text style={[styles.subtitle, { textDecorationLine: 'underline', marginRight: 5 }]}>Novo aviso</Text>
        <Ionicons name='add-outline' color={colors.secondary[0]} size={37} />
      </TouchableOpacity>

      <View style={styles.monthView}>
        <TouchableOpacity onPress={() => handleSelectedMonth(true)}>
          <Ionicons name='play-back-outline' color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.subtitle, { marginHorizontal: 10 }]}>{months[selectedMonth]}</Text>
        <TouchableOpacity onPress={() => handleSelectedMonth(false)}>
          <Ionicons name='play-forward-outline' color={colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => {
            Alert.alert('edit button');
            console.log(months.length);
          }}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />


        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />

        <NoticeCard
          title='Teste32'
          text='Testando'
          deleteFunction={() => Alert.alert('delete button')}
          editFunction={() => Alert.alert('edit button')}
        />
      </ScrollView>
    </View>
  );
};

export default Agenda;