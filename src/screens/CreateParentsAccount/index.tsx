import { JSXElementConstructor, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { colors } from '../../globalStyles';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '../../components';
import * as api from '../../services/api';
import { CreateParentsAccountProps } from '../../@types/routes';

interface IRelative {
  fullName: String
  schoolClass: String,
  kinship: string
}

function CreateParentsAccount({ route, navigation }: CreateParentsAccountProps) {
  const [fullName, setFullName] = useState('');
  const [kinship, setKinship] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [relatives, setRelatives] = useState<IRelative[]>([]);
  const [relativeFullName, setRelativeFullName] = useState('');
  const [selectedSchoolClass, setSelectedSchoolClass] = useState('1A-DS');
  const schoolClasses = ['1A-DS', '1B-DS', '1A-MULT', '1B-MULT', '2A-DS', '2B-DS', '2A-MULT', '2B-MULT', '3A-DS', '3B-DS', '3A-MULT', '3B-MULT']
  const scrollViewRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false)

  function handleAddRelativeToRelativesList() {
    const relative = {
      fullName: relativeFullName.trimEnd(),
      schoolClass: selectedSchoolClass,
      kinship: kinship.trimEnd()
    };

    if (relative.fullName === '' || relative.kinship === '') {
      Alert.alert('Atenção!', 'Não é possível adicionar um aluno sem informar seu nome ou o parentesco do responsável.')
      return
    };

    setRelatives([...relatives, relative]);
    setRelativeFullName('');
  }

  function handleRemoveRelativeOfRelativesList(relativeToRemove: IRelative) {
    setRelatives(current =>
      current.filter(relative => relative.fullName !== relativeToRemove.fullName)
    );
  }

  async function handleCreateParentsAccount() {
    setIsLoading(true);

    const data = {
      fullName: fullName.trimEnd(),
      //kinship: kinship.trimEnd(),
      relatives,
      email: email.trimEnd(),
      password: password.trimEnd(),
    }

    if (data.fullName === '' || data.email === '' || data.password === '') {
      Alert.alert('Atenção!', 'Você deve preencher todos os campos para poder criar uma conta de pai.')
      setIsLoading(false);
      return
    }

    if (data.relatives.length == 0) {
      Alert.alert('Atenção!', 'Para criar uma conta de responsável é necessário fornecer os dados de pelo menos um filho que frequenta a instituição.')
      setIsLoading(false);
      return
    }    

    await api.http.post('/signup-parent', {
      ...data
    }, {
      headers: {
        'x-access-token': route.params.token
      }
    }).then(resp => {
      switch (resp.status) {
        case 500:
          Alert.alert('Erro!', `${resp.data.message}`);
          setIsLoading(false);
          navigation.goBack();
          break;
        case 400:
          Alert.alert(`${resp.data.message}`, `${resp.data.errors}`);
          setIsLoading(false);
          navigation.goBack();
          break
        case 201:
          Alert.alert('Sucesso!', 'Conta criada com sucesso.');
          setIsLoading(false);
          navigation.goBack();
          break

        default:
          Alert.alert('Erro!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
          setIsLoading(false);
          navigation.goBack();
          break;
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro!', 'Houve um erro interno da aplicação. Tente novamente mais tarde.');
      setIsLoading(false);
      navigation.goBack();
    });
  };

  function handleOnSelectSchoolClass(schoolClass: string) {
    setSelectedSchoolClass(schoolClass)
  };

  Keyboard.addListener('keyboardDidHide', () => {
    scrollViewRef.current?.focus()
  })

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator
          size={'large'}
          color={colors.primary[1]}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
        <View style={styles.inputView}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            placeholder='Digite o nome completo do responsável aqui'
            style={styles.input}
            autoCapitalize='words'
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Parentesco</Text>
          <TextInput
            placeholder='Mãe, pai, avó, avô...'
            style={styles.input}
            value={kinship}
            onChangeText={text => setKinship(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Nome completo do estudante</Text>
          <TextInput
            placeholder='Nome do estudante'
            value={relativeFullName}
            onChangeText={text => setRelativeFullName(text)}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputView, { marginLeft: 100 }]}>
          <Text style={[styles.label, { marginBottom: 20 }]}>Turma do estudante</Text>
          <Picker
            onSelectedValue={selectedOption => handleOnSelectSchoolClass(selectedOption)}
            pickerOptions={schoolClasses}
            selectedValue={selectedSchoolClass}
          />
        </View>

        <View style={styles.relativesListScrollView}>
          <ScrollView horizontal >
            {
              relatives.map(relative => {
                return (
                  <View key={`${relative.fullName}`} style={styles.relativeCard}>
                    <View>
                      <Text style={[styles.text, { marginBottom: 5 }]}>Nome: {relative.fullName}</Text>
                      <Text style={styles.text}>Turma: {relative.schoolClass}</Text>
                      <Text style={styles.text}>Parentesco: {relative.kinship}</Text>
                    </View>

                    <TouchableOpacity style={styles.removeRelativeButton} onPress={() => handleRemoveRelativeOfRelativesList(relative)}>
                      <Ionicons name='trash-outline' color={colors.secondary[2]} size={32} />
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>


        <TouchableOpacity style={[styles.createAccountButton, { marginBottom: 10, backgroundColor: colors.secondary[1] }]} onPress={handleAddRelativeToRelativesList}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Adicionar estudante</Text>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='email@provedor.com'
            keyboardType='email-address'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder='********'
            caretHidden
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={handleCreateParentsAccount} style={styles.createAccountButton}>
          <Text style={[styles.subtitle, { color: colors.primary[0] }]}>Criar conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateParentsAccount;