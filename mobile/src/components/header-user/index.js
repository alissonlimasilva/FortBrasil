import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from '../../redux/duck/user';
import colors from '../../res/colors';
import Button from '../button';

const HeaderUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const logout = payload => dispatch(Actions.logout(payload));
  const { user } = useSelector(state => state.user);
  const { data } = useSelector(state => state.store);

  useEffect(() => {}, [user]);

  const size = data.length;
  const message =
    size === 0
      ? 'Você não possui estabelecimentos cadastrados'
      : `Você possui ${size} ${
          size > 1
            ? 'estabelecimentos cadastrados'
            : 'estabelecimento cadastrado'
        }`;
  return (
    <View style={[styles.container, global.shadow]}>
      <View style={styles.viewAvatarUser}>
        <Icon style={styles.avatar} name="user" />
        <View style={styles.viewTexts}>
          <Text style={styles.textMessage}>
            Olá,{' '}
            <Text style={styles.textUserName}>{user.name || 'usuário'}!</Text>
          </Text>
          <Text style={styles.textMessage}>{message}</Text>
        </View>
      </View>
      <Button
        onPress={() => logout({ navigation })}
        style={styles.button}
        text="Deslogar"
        icon="sign-out"
      />
      <View>
        <Text style={styles.titleEmpresas}>MINHAS EMPRESAS</Text>
        <View style={styles.lineBottom} />
      </View>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  viewTexts: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  viewAvatarUser: {
    flexDirection: 'row',
  },
  avatar: {
    fontSize: 50,
    marginRight: 10,
    color: colors.secondary,
  },
  textUserName: {
    fontWeight: 'bold',
    color: 'white',
  },
  textMessage: {
    color: 'white',
  },
  button: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
  },
  titleEmpresas: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
  },
  lineBottom: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 2,
    width: '50%',
  },
});
