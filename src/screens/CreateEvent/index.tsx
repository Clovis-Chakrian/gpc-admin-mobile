import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { colors } from '../../globalStyles';

import styles from './styles';

function CreateEvent() {
  return (
    <KeyboardAvoidingView style={[styles.container, { justifyContent: 'center' }]}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Título do evento</Text>
          <TextInput
            placeholder='Digite o nome do evento aqui'
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={[styles.label, { marginBottom: 5 }]}>Descrição do evento</Text>
          <TextInput
            placeholder='Escreva uma descrição do evento aqui'
            multiline
            style={styles.multilineTextInput}
            textAlignVertical='top'
          />
        </View>

        <View>
          <Text style={styles.label}>Data do evento</Text>
          <TouchableOpacity>
            <Text>26/04/2023</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity style={styles.createEventButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar evento</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEvent;