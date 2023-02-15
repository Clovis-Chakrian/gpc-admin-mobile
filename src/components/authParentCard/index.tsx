import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../globalStyles';
import styles from './styles';
import { IAuthParentCard } from '../../@types/interfaces';

const AuthParentCard: React.FC<IAuthParentCard> = ({
  parentName,
  relatives,
  authFunction
}) => {
  return (
    <View style={styles.authParentCard}>
      <Text style={[styles.label, { fontFamily: 'Raleway-Bold' }]}>{parentName}</Text>
      {
        relatives.map(relative => {
          return <Text key={relative.fullName} style={[styles.text, { marginTop: 10 }]}>{relative.fullName} - {relative.schoolClass} - {relative.kinship}</Text>
        })
      }
      <TouchableOpacity style={styles.authButton} onPress={authFunction}>
        <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Autorizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthParentCard;