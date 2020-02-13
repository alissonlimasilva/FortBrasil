import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/button';
import ButtonNewUser from '../../components/button-new-user';
import metrics from '../../res/metrics';
import Input from '../../components/input';
import { Actions } from '../../redux/duck/user';
import SignUpModal from '../signup';
import contants from '../../res/contants';
import colors from '../../res/colors';
import { getLoggedUser } from '../../utils/user';
import ErrorMessage from '../../components/error-message';

const background = require('../../assets/imgs/loginback.png');
const logo = require('../../assets/imgs/logo.png');

const Login = props => {
  const dispatch = useDispatch();
  const login = payload => dispatch(Actions.login(payload));
  const keepSection = payload => dispatch(Actions.keepSection(payload));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { user, loading, failure, failureError, isLogged } = useSelector(
    state => state.user
  );

  const callMainScreen = () => {
    props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigate', routeName: contants.ROUTE_MAIN }],
    });
  };

  useEffect(() => {
    const checkIsLogged = async () => {
      const loggedUser = await getLoggedUser();
      /** Checando se usuário está logado */
      setEmail(loggedUser.email);
      console.log(loggedUser);
      if (loggedUser.token) {
        keepSection(loggedUser);
        callMainScreen();
      }
    };
    checkIsLogged();
  }, []);

  // Se usuário for logado com sucesso chamara esse effect que realizará o login
  useEffect(() => {
    // usuário logado
    if (user && isLogged) {
      callMainScreen();
    }
  }, [user, isLogged]);

  return (
    <ImageBackground source={background} style={styles.container}>
      <StatusBar backgroundColor={colors.darkStatusbar} />
      <Image source={logo} style={styles.logo} />
      <ErrorMessage isError={failure} message={failureError} />
      <Input
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="user"
        placeholder="Usuário"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        icon="lock"
        returnKeyType="go"
        onSubmitEditing={() => login({ email, password })}
        autoCorrect={false}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Senha"
      />
      <Button
        isLoading={loading}
        onPress={() => login({ email, password })}
        style={styles.button}
        text="Entrar"
      />
      <ButtonNewUser onPress={() => setShowModal(true)} />
      <SignUpModal show={showModal} onClose={() => setShowModal(false)} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: metrics.paddingView,
    paddingBottom: 50,
  },
  logo: {
    width: metrics.width,
    alignSelf: 'center',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
  },
});

export default Login;
