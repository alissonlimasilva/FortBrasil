import React, { useState, useEffect } from 'react';
import { RESULTS } from 'react-native-permissions';
import { View, Text, StyleSheet } from 'react-native';
import { checkPermition } from '../../utils/permitions';
import MapNearStores from './map';
import colors from '../../res/colors';
import Button from '../../components/button';

const NearStores = ({ navigation }) => {
  const [permition, setPermition] = useState(null);

  useEffect(() => {
    checking();
  });

  const checking = async () => {
    setPermition(await checkPermition());
  };

  const viewBlocked = () => (
    <View style={styles.container}>
      <Text style={styles.text}>
        Para ter acesso a essa função é necessário permitir o acesso a
        localização.{'\n\n'}Acesse Configurações >> Apps e habilite a
        localização.
      </Text>
    </View>
  );

  const viewDenied = () => (
    <View style={styles.container}>
      <Text style={styles.text}>
        O aplicativo necessita de permissão para acessar sua localização
      </Text>
      <Button onPress={checking} style={styles.button} text="Permitir" />
    </View>
  );

  switch (permition) {
    case RESULTS.BLOCKED:
      return viewBlocked();
    case RESULTS.DENIED:
      return viewDenied();
    case RESULTS.GRANTED:
      return <MapNearStores navigation={navigation} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: '50%',
  },
});

export default NearStores;
