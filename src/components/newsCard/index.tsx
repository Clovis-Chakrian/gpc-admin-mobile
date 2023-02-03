import { View, Text, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../globalStyles';
import styles from './styles';
import { INews } from '../../@types/interfaces';

const NewsCard: React.FC<INews> = ({
  imageUrl,
  title,
  url,
  deleteFunction
}) => {
  function handleOpenNews() {
    Linking.openURL(url)
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.subtitle} > {title} </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.newsButton} onPress={deleteFunction}>
          <Ionicons name='trash-outline' color={colors.secondary[2]} size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenNews} style={styles.newsButton}>
          <Ionicons name='eye-outline' color={colors.secondary[1]} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsCard;