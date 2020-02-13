import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCurrentLocation } from '../../utils/location';
import { apiAuth } from '../../services/api';
import endpoints from '../../services/endpoints';
import contants from '../../res/contants';
import colors from '../../res/colors';
import Button from '../../components/button';

const RANGE = 10000;

const storepin = require('../../assets/imgs/storepin.png');

function MapNearStores({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    setLocation();
  }, []);

  const callDetails = store => {
    navigation.navigate(contants.ROUTE_DETAILS, { store });
  };

  useEffect(() => {
    getNearStores();
  }, [currentRegion]);

  const getNearStores = async () => {
    try {
      const { latitude, longitude } = currentRegion;
      const url = `${endpoints.listNear}?latitude=${latitude}&longitude=${longitude}&range=${RANGE}`;
      const { data } = await apiAuth.get(url);
      setStores(data);
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const setLocation = async () => {
    const { location } = await getCurrentLocation();
    if (!location) {
      return;
    }
    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    };
    setCurrentRegion(region);
  };

  if (!currentRegion) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Ative localização para visualizar estabelecimentos próximos
        </Text>
        <Button onPress={setLocation} style={styles.button} text="Recarregar" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <MapView.Circle
          center={currentRegion}
          radius={RANGE}
          strokeWidth={1}
          strokeColor="#1a66ff"
          fillColor="rgba(230,238,255,0.5)"
          onRegionChangeComplete={() => {
            console.log('ONREGION');
          }}
        />
        <Marker
          coordinate={{
            longitude: currentRegion.longitude,
            latitude: currentRegion.latitude,
          }}
        />
        {stores.map(store => (
          <Marker
            key={store._id}
            coordinate={{
              longitude: store.longitude,
              latitude: store.latitude,
            }}
          >
            <Image style={styles.pinstore} source={storepin} />

            <Callout
              onPress={() => {
                callDetails(store);
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeAddress}>{store.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Icon style={styles.refresh} name="refresh" onPress={getNearStores} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  refresh: {
    fontSize: 30,
    color: colors.primary,
    position: 'absolute',
    top: 20,
    right: 20,
  },

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

  pinstore: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  button: {
    width: '50%',
  },
  callout: {
    width: 200,
  },

  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  storeAddress: {
    fontSize: 12,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
});

export default MapNearStores;
