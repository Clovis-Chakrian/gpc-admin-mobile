import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../globalStyles';
import styles from './styles';

const ContactCard = () => {
  return (
    <View style={styles.contactCardContainer}>
      <View>
        <Text style={[styles.label, { fontFamily: fonts.fontFamily.bold }]}>Nome do pai</Text>
        <Text style={[styles.other, { color: '#616161' }]}>Aluno</Text>
        <Text style={[styles.other, { color: '#616161' }]}>1A-DS</Text>
      </View>

      <View>
        <Ionicons name='ellipse' size={14} color={colors.secondary[1]} />
      </View>
    </View>
  );
};

export default ContactCard;