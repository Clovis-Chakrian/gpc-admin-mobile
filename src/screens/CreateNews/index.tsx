import { View, Text, TextInput, Alert, KeyboardAvoidingView, Image, ActivityIndicator, Keyboard } from 'react-native';
import { DateTimePickerEvent, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import styles from './styles';
import * as api from '../../services/api';
import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../globalStyles';
import { CreateNewsProps } from '../../@types/routes';

interface IImage {
  type: "success";
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

function CreateNews({ navigation, route }: CreateNewsProps) {
  const [tile, setTile] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState<IImage>();
  const [isLoading, setIsLoading] = useState(false);
  const viewRef = useRef<any>();

  Keyboard.addListener('keyboardDidHide', () => {
    viewRef.current?.focus()
  })

  async function CreateNews() {
    setIsLoading(true);
    const data = new FormData();
    data.append('title', tile);
    data.append('url', url);
    data.append('date', date.toISOString());
    data.append('file', {
      name: file?.name,
      uri: file?.uri,
      type: file?.mimeType
    } as any);

    api.http.post('/news', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': route.params.token
      },
    }).then(resp => {
      switch (resp.status) {
        case 500:
          Alert.alert('Erro!', 'Houve um erro interno da servidor. Tente novamente mais tarde.');
          navigation.goBack();
          break;

        case 400:
          Alert.alert('Atenção!', 'Não foi possível validar as informações recebidas. Tente novamente mais tarde.');
          navigation.goBack();
          break

        case 200:
          Alert.alert('Sucesso!', 'Notícia adicionada com sucesso.');
          navigation.goBack();
          break

        default:
          Alert.alert('Erro!', 'Houve um erro interno da servidor. Tente novamente mais tarde.');
          navigation.goBack();
          break;
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false);
    });
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    currentDate ? setDate(currentDate) : setDate(date);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  // For some reason, .toLocaleDateString() function doesn't work here, so i writed a function to format to pt-BR format.
  function showFormatedDate(unformatedDate: Date) {
    const date = {
      day: unformatedDate.getDate(),
      month: unformatedDate.getMonth() + 1,
      year: unformatedDate.getFullYear()
    };

    const formatedDate = `${String(date.day).length == 1 ? `0${date.day}` : date.day}/${String(date.month).length == 1 ? `0${date.month}` : date.month}/${date.year}`;
    return formatedDate;
  }

  async function handleGetImage() {
    await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    }).then(async (image) => {
      if (image.type == 'success') {
        setFile(image);
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro ao selecionar a imagem. Tente novamente mais tarde.')
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.primary[1]} />
      </View>
    );
  };

  return (
    <View ref={viewRef} style={styles.container}>
      <View style={{ marginBottom: 10, marginTop: 40 }}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Selecione uma imagem abaixo</Text>
        <TouchableOpacity style={styles.imageInput} onPress={handleGetImage}>
          {
            file?.uri ?
              <Image style={styles.image} source={{ uri: file.uri }} />
              :
              <Ionicons name='add-circle-outline' size={32} color={colors.secondary[0]} />
          }
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Título da matéria</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o título aqui...'
          onChangeText={text => setTile(text)}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Link da matéria</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o link aqui...'
          onChangeText={text => setUrl(text)}
        />
      </View>

      <View>
        <Text style={styles.label}>Data do evento</Text>
        <TouchableOpacity style={styles.showDatePickerButton} onPress={() => showDatePicker()}>
          <Text style={styles.text}>{showFormatedDate(date)}</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.addNewsButton} onPress={CreateNews}>
        <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar noticia</Text>
      </TouchableOpacity>
    </View >
  );
};

export default CreateNews;