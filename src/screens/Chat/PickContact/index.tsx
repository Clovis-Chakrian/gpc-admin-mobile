import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PickContactProps } from '../../../@types/routes';
import * as api from '../../../services/api';

import { ContactCard, Picker } from '../../../components/index';
import styles from './styles';
import { IParent } from '../../../@types/interfaces';
import { colors } from '../../../globalStyles';

function PickContact({ navigation, route }: PickContactProps) {
  const [selectedValue, setSelectedValue] = useState('1A-DS');
  const pickerOptions = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT'];
  const [parents, setParents] = useState<IParent[]>();
  const [search, setSearch] = useState('');
  const [isLoadingParents, setIsLoadingParents] = useState(true);

  const filteredParents = search ? parents?.filter(parent => parent.fullName.includes(search)) : parents;

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value)
  };

  async function getParents() {
    await api.http.get('/parents', {
      params: {
        schoolClass: selectedValue
      }
    }).then(resp => {
      setParents(resp.data);
      setIsLoadingParents(false);
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Atenção, houve um erro ao buscar os pais cadastrados no app.');
      navigation.goBack();
    });
  };

  useEffect(() => {
    setIsLoadingParents(true);
    getParents();
  }, [selectedValue]);

  if (isLoadingParents) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder='Digite o nome de um pai aqui'
          style={styles.textInput}
          onChangeText={text => setSearch(text)}
        />
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
      <ScrollView>
        {
          filteredParents?.map(parent => {
            return (
              <TouchableOpacity
                key={parent.id}
                onPress={() => {
                  navigation.navigate('Messages', {
                    managerId: route.params.managerId,
                    room: `${parent.id}-gestao`,
                    parentName: parent.fullName,
                    relativeName: parent.relatives[0].fullName,
                    schoolClass: parent.relatives[0].schoolClass
                  })
                }}
              >
                <ContactCard
                  fullName={parent.fullName}
                  relativeFullName={parent.relatives[0].fullName}
                  relativeSchoolClass={parent.relatives[0].schoolClass}
                />
              </TouchableOpacity>
            );
          })
        }

      </ScrollView>
    </View>
  );
};

export default PickContact;