import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import Input from '../../components/input';
import HeaderModal from '../../components/header-modal';
import Button from '../../components/button';
import endpoints from '../../services/endpoints';
import messages from '../../res/messages';
import ErrorMessage from '../../components/error-message';
import { apiNoAuth } from '../../services/api';

const SignUpModal = ({ show = true, onClose = () => {} }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  const success = () => {
    clearFields();
    onClose();
    showMessage({
      message: messages.userCreated,
      type: 'success',
    });
  };

  const checkFields = () => {
    setError(false);
    if (name && password && email) {
      signUp();
    } else {
      setError(true);
      setMessage(messages.errorValidation);
    }
  };

  const signUp = async () => {
    try {
      setLoading(true);
      const body = { name, password, email };
      const { data } = await apiNoAuth.post(endpoints.signup, body);
      console.log('User criado', data);
      setLoading(false);
      success();
    } catch (err) {
      console.log(JSON.stringify(err));
      setLoading(false);
      setError(true);
      setMessage(
        err.response.data.message ||
          messages[err.response.status] ||
          messages.default
      );
    }
  };

  return (
    <View>
      <Modal isVisible={show}>
        <View style={styles.container}>
          <HeaderModal
            onPress={onClose}
            title="Nova conta"
            icon="times-circle-o"
          />
          <View style={styles.content}>
            <ErrorMessage
              style={{ textAlign: 'center' }}
              isError={error}
              message={message}
            />
            <Input
              darkMode
              value={name}
              onChangeText={setName}
              style={styles.input}
              icon="user"
              placeholder="Usuário"
            />
            <Input
              darkMode
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="at"
              placeholder="E-mail"
            />
            <Input
              darkMode
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              icon="lock"
              autoCorrect={false}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Senha"
            />
            <Button
              isLoading={loading}
              onPress={checkFields}
              text="Cadastrar"
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundModal,
  },
  content: {
    padding: metrics.paddingView,
  },
  input: {
    marginBottom: 10,
  },
  desc: {
    marginBottom: 10,
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
});

export default SignUpModal;
