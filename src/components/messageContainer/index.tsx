import { View, Text } from 'react-native';
import { colors } from '../../globalStyles';
import { IMessageContainer } from '../../@types/interfaces';
import styles from './styles';

const MessageContainer: React.FC<IMessageContainer> = ({
  color,
  align,
  message,
  hour
}) => {
  return (
    <View style={[styles.messageContainer, { alignSelf: align, backgroundColor: color }]}>
      <Text style={[[styles.text, { color: colors.primary[0] }]]}>{message}</Text>
      <Text style={[[styles.other, { color: colors.primary[0], alignSelf: 'flex-end', marginTop: 2 }]]}>{hour}</Text>
    </View>
  );
};

export default MessageContainer;