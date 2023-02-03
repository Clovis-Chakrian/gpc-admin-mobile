import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../globalStyles';
import styles from './styles';
import { IContactCard } from '../../@types/interfaces';

const ContactCard: React.FC<IContactCard> = ({
  fullName,
  relativeFullName,
  relativeSchoolClass
}) => {
  return (
    <View style={styles.contactCardContainer}>
      <View>
        <Text style={[styles.label, { fontFamily: fonts.fontFamily.bold }]}>{fullName}</Text>
        <Text style={[styles.other, { color: '#616161' }]}>{relativeFullName}</Text>
        <Text style={[styles.other, { color: '#616161' }]}>{relativeSchoolClass}</Text>
      </View>

      <View>
        <Ionicons name='ellipse' size={14} color={colors.secondary[1]} />
      </View>
    </View>
  );
};

export default ContactCard;