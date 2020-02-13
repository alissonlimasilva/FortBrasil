import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import colors from '../../res/colors';
import Header from '../../components/header';
import contants from '../../res/contants';
import metrics from '../../res/metrics';
import Button from '../../components/button';
import { Actions } from '../../redux/duck/store';
import { apiAuth } from '../../services/api';
import endpoints from '../../services/endpoints';
import messages from '../../res/messages';
import ModalConfirm from '../../components/modal-confirm';
import FixedMap from '../../components/fixed-map';
import ListNoClick from '../../components/list-no-click';

const RANGE = 2000;

const logoEmpresa = require('../../assets/imgs/storeAvatar.png');

const Details = ({ navigation }) => {
  const dispatch = useDispatch();
  const updateStores = () => dispatch(Actions.getStores());
  const [modalConfirm, setModalConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const selected = navigation.getParam('store', undefined);
  const [store, setStore] = useState(selected);
  const [nearStore, setNearStores] = useState([]);

  useEffect(() => {
    getNearStores();
  }, [store]);

  const callUpdate = () => {
    navigation.navigate(contants.ROUTE_CREATESTORE, {
      isUpdating: true,
      store,
      onUpdate,
    });
  };

  const onUpdate = updated => {
    setStore({ ...store, ...updated });
  };

  const getNearStores = async () => {
    try {
      const url = `${endpoints.listNear}?latitude=${store.latitude}&longitude=${store.longitude}&range=${RANGE}`;
      const { data } = await apiAuth.get(url);
      const near = data.filter(item => item._id !== store._id);
      setNearStores(near);
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const deleteStore = async () => {
    try {
      console.log(_id);
      setModalConfirm(false);
      setDeleting(true);
      const url = `${endpoints.deleteStore}?storeId=${_id}`;
      const { data } = await apiAuth.delete(url);
      showMessage({
        message: JSON.stringify(data.message),
        type: 'success',
      });
      setDeleting(false);
      updateStores();
      navigation.goBack();
    } catch (error) {
      console.log(JSON.stringify(error.response));
      setDeleting(false);
      showMessage({
        message: error.response.data.message || messages.errorDelete,
        type: 'danger',
      });
    }
  };

  const {
    name,
    address,
    description,
    razaoSocial,
    _id,
    latitude,
    longitude,
  } = store;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Detalhes"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contentInfo}>
          <Image style={styles.logo} source={logoEmpresa} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.infoStore}>{razaoSocial}</Text>
          <Text style={styles.infoStore}>{address}</Text>
          <Text style={styles.infoStore}>{description}</Text>
          <Text style={styles.titleSection}>LOCALIZAÇÃO</Text>
          <View style={styles.lineBottom} />
        </View>
        {!!latitude && !!longitude && (
          <View style={{ padding: 15, backgroundColor: 'white' }}>
            <FixedMap
              style={styles.map}
              latitude={latitude}
              longitude={longitude}
            />
          </View>
        )}
        {nearStore.length !== 0 && (
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleSection}>ESTABELECIMENTOS PRÓXIMOS</Text>
            <View style={styles.lineBottom} />
          </View>
        )}
        <ListNoClick list={nearStore} />
      </ScrollView>
      <View style={styles.viewButton}>
        <Button
          style={styles.button}
          text="Editar"
          icon="edit"
          onPress={callUpdate}
        />
        <Button
          isLoading={deleting}
          icon="trash-o"
          onPress={() => setModalConfirm(true)}
          text="Excluir"
          style={styles.button}
        />
      </View>
      <ModalConfirm
        show={modalConfirm}
        onCancel={() => setModalConfirm(false)}
        onConfirm={deleteStore}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentInfo: {
    padding: metrics.paddingView,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  infoStore: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  titleSection: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  lineBottom: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 2,
    width: '30%',
  },
  map: {
    backgroundColor: 'white',
    padding: 15,
    height: 200,
  },
  viewButton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Details;
