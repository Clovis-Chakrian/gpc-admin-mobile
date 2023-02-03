import { View, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../globalStyles';
import { INoticeCard } from '../../@types/interfaces';

const NoticeCard: React.FC<INoticeCard> = ({
  title,
  description,
  editFunction,
  deleteFunction,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={editFunction}>
          <SimpleLineIcons name='pencil' color={colors.secondary[0]} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteFunction}>
          <Ionicons name='trash-outline' color={colors.secondary[2]} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoticeCard;