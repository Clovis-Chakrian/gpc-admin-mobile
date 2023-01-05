import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../globalStyles';
import styles from './styles';

function CreateNotice () {
  return (
    <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Título do aviso</Text>
          <TextInput
            placeholder='Digite o nome do aviso aqui'
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Descrição do aviso</Text>
          <TextInput
            placeholder='Escreva uma descrição do aviso aqui'
            multiline
            style={styles.multilineTextInput}
            textAlignVertical='top'
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity style={styles.createNoticeButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar aviso</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateNotice;