import { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ISolicitationApi } from '../../@types/interfaces';
import { SolicitationCard, AlternativeSolicitationCard, Picker } from '../../components';
import { colors } from '../../globalStyles';
import * as api from '../../services/api';

import styles from './styles';

function Solicitations() {
  const [selectedValue, setSelectedValue] = useState('Declaração de matrícula');
  const [solicitations, setSolicitations] = useState([])
  const pickerOptions = ['Declaração de matrícula', 'Ficha 19', 'Declaração de frequência'];
  const [isLoading, setIsLoading] = useState(true);

  function handleOnSelectedValue(value: string) {
    setSelectedValue(value);
  };

  async function getSolicitations() {
    await api.http.get('/solicitations', {
      params: {
        type: selectedValue
      }
    }).then(resp => {
      if (resp.status == 200) {
        setSolicitations(resp.data);
        setIsLoading(false);
        return
      }

      Alert.alert('Erro!', 'Houve um erro ao buscar as solicitações.');
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro interno da aplicação.');
      setIsLoading(false);
    });
  };

  async function changeSolicitationStatus(id: string) {
    //const finishedAt = new Date()
    const data = {
      status: 'finalizado',
      finishedAt: new Date()
    }

    await api.http.patch(`/solicitation/${id}`, {
      ...data
    }).then(resp => {
      switch (resp.status) {
        case 200:
          Alert.alert('Sucesso!', 'Status alterado com sucesso.');
          getSolicitations();
          setIsLoading(false);
          break;
        case 500:
          Alert.alert('Atenção!', 'Houve um erro na requisição.');
          setIsLoading(false);
          break;
        case 400:
          Alert.alert('Atenção!', 'Houve um erro na requisição.');
          setIsLoading(false);
        default:
          Alert.alert('Atenção!', 'Houve um erro na requisição.');
          setIsLoading(false);
          break;
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Atenção!', 'Houve um erro na requisição.');
      setIsLoading(false);
    });
  };

  async function handleDeleteSolicitation(id: string, status: string) {
    setIsLoading(true);
    if (status !== 'finalizado') {
      Alert.alert('Atenção!', 'Para deletar uma notícia, o status dela deve estar marcado como finalizado.')
      setIsLoading(false);
    }

    await api.http.delete(`/solicitation/${id}`).then(resp => {
      switch (resp.status) {
        case 200:
          Alert.alert('Sucesso!', 'Solicitação deletada com sucesso!');
          getSolicitations();
          setIsLoading(false);
          break
        case 500:
          Alert.alert('Erro!', 'Houve um erro ao tentar deletar a solicitação escolhida. Tente novamente mais tarde.');
          setIsLoading(false);
          break
        case 400:
          Alert.alert('Atençao!', 'Solicitação escolhida para deletar não foi achada. Tente recarregar a aplicação.');
          setIsLoading(false);
          break

        default:
          Alert.alert('Erro!', 'Houve um erro ao tentar deletar a solicitação escolhida. Tente novamente mais tarde.');
          setIsLoading(false);
          break
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Atenção houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getSolicitations()
  }, [selectedValue]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: 20 }]}>
      <Picker
        selectedValue={selectedValue}
        pickerOptions={pickerOptions}
        onSelectedValue={(option) => handleOnSelectedValue(option)}
      />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 20 }]}>
        {
          solicitations.length === 0 ?
            <View style={{ paddingHorizontal: 10, marginTop: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.text}>Parece que não há nenhuma solicitação de {selectedValue} aberta.</Text>
            </View>
            :
            solicitations.map((solicitation: ISolicitationApi) => {
              return (
                solicitation.status === 'finalizado' ?
                  <AlternativeSolicitationCard
                    key={solicitation.id}
                    finishedAt={solicitation.finishedAt}
                    id={solicitation.id}
                    phone={solicitation.phone}
                    schoolClass={solicitation.schoolClass}
                    solicitatedAt={solicitation.solicitatedAt}
                    status={solicitation.status}
                    student={solicitation.student}
                    type={solicitation.type}
                    father={solicitation.father}
                    mother={solicitation.mother}
                    handleDeleteNotice={() => handleDeleteSolicitation(solicitation.id, solicitation.status)}
                  />
                  :
                  <SolicitationCard
                    key={solicitation.id}
                    id={solicitation.id}
                    phone={solicitation.phone}
                    status={solicitation.status}
                    student={solicitation.student}
                    type={solicitation.type}
                    father={solicitation.father}
                    mother={solicitation.mother}
                    schoolClass={solicitation.schoolClass}
                    solicitatedAt={solicitation.solicitatedAt}
                    changeStatusFunction={() => changeSolicitationStatus(solicitation.id)}
                  />
              );
            })
        }
      </ScrollView>
    </View>
  );
};

export default Solicitations;