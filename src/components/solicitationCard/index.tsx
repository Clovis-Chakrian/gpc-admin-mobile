import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../globalStyles';
import styles from './styles';
import { IFinishedSolicitation, ISolicitation } from '../../@types/interfaces';

function showFormatedDate(unformatedDate: Date) {
  const date = {
    day: unformatedDate.getDate(),
    month: unformatedDate.getMonth() + 1,
    year: unformatedDate.getFullYear()
  };

  const formatedDate = `${String(date.day).length == 1 ? `0${date.day}` : date.day}/${String(date.month).length == 1 ? `0${date.month}` : date.month}/${date.year}`;
  return formatedDate;
}

const SolicitationCard: React.FC<ISolicitation> = ({
  id,
  phone,
  status,
  student,
  type,
  father,
  mother,
  schoolClass,
  solicitatedAt,
  changeStatusFunction
}) => {

  // function showFormatedDate(unformatedDate: Date) {
  //   const date = {
  //     day: unformatedDate.getDate(),
  //     month: unformatedDate.getMonth() + 1,
  //     year: unformatedDate.getFullYear()
  //   };

  //   const formatedDate = `${String(date.day).length == 1 ? `0${date.day}` : date.day}/${String(date.month).length == 1 ? `0${date.month}` : date.month}/${date.year}`;
  //   return formatedDate;
  // }


  return (
    <View style={styles.solicitationCard}>
      <Text style={styles.subtitle}>{type}</Text>
      <View style={styles.solicitationInformationView}>
        <Text style={styles.text}>Aluno: {student}</Text>
        {
          mother &&
          <Text style={styles.text}>Mãe: {mother}</Text>
        }

        {
          father &&
          <Text style={styles.text}>Pai: {father}</Text>
        }
        <Text style={styles.text}>Turma/série: {schoolClass}</Text>
        <Text style={styles.text}>Telefone: {phone}</Text>
        <Text style={styles.text}>Data da solicitaçã0: {showFormatedDate(new Date(solicitatedAt))}</Text>
      </View>
      <TouchableOpacity style={styles.markAsReadyButton} onPress={changeStatusFunction} >
        <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Marcar como finalizado</Text>
      </TouchableOpacity>
    </View>
  );
};

const AlternativeSolicitationCard: React.FC<IFinishedSolicitation> = ({
  id,
  finishedAt,
  phone,
  schoolClass,
  solicitatedAt,
  status,
  student,
  type,
  father,
  mother,
  handleDeleteNotice
}) => {
  return (
    <View style={styles.solicitationCard}>
      <View style={styles.alternativeSolicitationCardTitleView}>
        <Text style={[styles.subtitle, { left: 10 }]}>{type}</Text>
        <TouchableOpacity style={styles.deleteSolicitationButton} onPress={handleDeleteNotice}>
          <Ionicons name='trash-outline' size={24} color={colors.secondary[2]} />
        </TouchableOpacity>
      </View>

      <View style={styles.solicitationInformationView}>
        <Text style={styles.text}>Aluno: {student}</Text>
        {
          mother &&
          <Text style={styles.text}>Mãe: {mother}</Text>
        }

        {
          father &&
          <Text style={styles.text}>Pai: {father}</Text>
        }
        <Text style={styles.text}>Turma/série: {schoolClass}</Text>
        <Text style={styles.text}>Telefone: {phone}</Text>
        <Text style={styles.text}>Data da solicitaçã0: {showFormatedDate(new Date(solicitatedAt))}</Text>
        <Text style={styles.text}>Finalizada em: {showFormatedDate(new Date(finishedAt))}</Text>
      </View>
      <TouchableOpacity disabled style={[styles.markAsReadyButton, { backgroundColor: '#616161' }]}>
        <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Finalizado</Text>
      </TouchableOpacity>
    </View>
  );
};

export { SolicitationCard, AlternativeSolicitationCard };