import { TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { LoginProps } from '../../@types/routes';
import styles from './styles';

const logo = require('../../assets/logoGp.png');

function Login({ navigation, route }: LoginProps) {
  function handleLogin() {
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, styles.homeContainer]}>
      <View style={{ flex: 2 }}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: '#FFF', width: 239, textAlign: 'center' }]}>Olá, bem vindo de volta, gestor(a)!</Text>
      </View>

      <View style={styles.inputsView}>
        <Text style={[styles.label, { color: '#FFF' }]}>Email</Text>
        <TextInput style={styles.textInput} placeholder='email@provedor.com' />

        <Text style={[styles.label, { color: '#FFF', marginTop: 10 }]}>Senha</Text>
        <TextInput style={styles.textInput} placeholder='********' caretHidden />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={[styles.subtitle, { color: '#FFF' }]}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;