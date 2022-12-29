import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { NoticeCard, Header, AlternativeHeader } from '../../components';
import styles from './styles';

function Notices() {
  return (
    <View style={styles.container}>
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