import { TouchableOpacity, View, Text } from 'react-native';
import { LoginProps } from '../../@types/routes';

function Login({ navigation }: LoginProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>IR PARA A TELA PRINCIPAL</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;