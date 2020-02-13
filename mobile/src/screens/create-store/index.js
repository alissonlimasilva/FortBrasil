import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import Header from '../../components/header';
import Button from '../../components/button';
import Input from '../../components/input';
import colors from '../../res/colors';
import messages from '../../res/messages';
import { apiAuth } from '../../services/api';
import endpoints from '../../services/endpoints';
import { Actions } from '../../redux/duck/store';
import FixedMap from '../../components/fixed-map';

const defaultLogo = require('../../assets/imgs/storeAvatar.png');

const CreateStore = ({ navigation }) => {
  const dispatch = useDispatch();
  const updateStores = () => dispatch(Actions.getStores());
  const isUpdating = navigation.getParam('isUpdating', false);
  const store = navigation.getParam('store', undefined);
  const onUpdate = navigation.getParam('onUpdate', () => {});
  const [name, setName] = useState(isUpdating ? store.name : '');
  const [logo, setLogo] = useState(isUpdating ? store.logo : '');
  const [razaoSocial, setRazaoSocial] = useState(
    isUpdating ? store.razaoSocial : ''
  );
  const [address, setAddress] = useState(isUpdating ? store.address : '');
  const [description, setDescription] = useState(
    isUpdating ? store.description : ''
  );
  const [latitude, setLatitude] = useState(isUpdating ? store.latitude : '');
  const [longitude, setLongitude] = useState(isUpdating ? store.longitude : '');
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(undefined);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const openSearchModal = async () => {
    let query = {
      country: 'BR',
      type: 'establishment',
      useOverlay: true,
      initialQuery: name,
    };
    if (currentLocation) {
      query = { ...query, locationBias: { ...currentLocation } };
    }

    try {
      const place = await RNGooglePlaces.openAutocompleteModal(query);
      if (place) {
        setLatitude(place.location.latitude);
        setLongitude(place.location.longitude);
        setAddress(place.address);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await RNGooglePlaces.getCurrentPlace();
      if (location[0]) {
        setCurrentLocation({ ...location[0].viewport });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkFields = () => {
    console.log(name, address, razaoSocial, latitude, longitude);
    if (!name || !address || !razaoSocial || !latitude || !longitude) {
      showMessage({
        message: messages.errorValidation,
        type: 'danger',
      });
      return;
    }
    setLoading(true);
    send();
  };

  const updateSuccess = () => {
    onUpdate({
      name,
      logo,
      razaoSocial,
      address,
      latitude,
      longitude,
      description,
    });
  };

  const send = async () => {
    try {
      let body = {
        name,
        logo,
        razaoSocial,
        address,
        latitude,
        longitude,
        description,
      };
      if (isUpdating) body = { ...body, storeId: store._id };
      console.log('BODY', body);
      // selecionando o tipo de método HTTP
      const method = isUpdating ? apiAuth.put : apiAuth.post;
      await method(
        isUpdating ? endpoints.updateStore : endpoints.createStore,
        body
      );
      updateStores();
      onBack();
      if (isUpdating) {
        updateSuccess();
      }
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      showMessage({
        message:
          error.response.data.message ||
          messages[error.status] ||
          messages.default,
        type: 'danger',
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isUpdating ? 'Atualizar' : 'Cadastro'} onBack={onBack} />
      <ScrollView style={styles.scroll}>
        <Image style={styles.logo} source={defaultLogo} />
        <Input
          value={name}
          onChangeText={setName}
          style={styles.input}
          darkMode
          placeholder="Nome"
          icon="home"
        />
        <Input
          value={razaoSocial}
          onChangeText={setRazaoSocial}
          style={styles.input}
          darkMode
          placeholder="Razão Social"
          icon="building"
        />
        <Input
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          darkMode
          editable={false}
          placeholder="Endereço (Selecione a localização)"
          icon="map-marker"
        />
        <Input
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          darkMode
          placeholder="Descrição"
          icon="file-text"
        />
        <Button
          style={styles.button}
          onPress={openSearchModal}
          icon="location-arrow"
          text="Procurar estabelecimento"
        />
        {!!latitude && !!longitude && (
          <FixedMap
            style={styles.map}
            latitude={latitude}
            longitude={longitude}
          />
        )}
        <Button
          onPress={checkFields}
          isLoading={loading}
          style={styles.buttonSalvar}
          text={isUpdating ? 'Atualizar' : 'Salvar'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  scroll: { paddingHorizontal: 20, marginVertical: 20 },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
  },
  buttonSalvar: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  map: {
    height: 200,
    marginTop: 10,
  },
});

export default CreateStore;
