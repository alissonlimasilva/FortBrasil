import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import metrics from '../../res/metrics';

const storepin = require('../../assets/imgs/storepin.png');

const FixedMap = ({ style = {}, latitude, longitude }) => {
  return (
    <MapView
      onTouchMove={false}
      scrollEnabled={false}
      minZoomLevel={15}
      style={[styles.map, style]}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      }}
    >
      <Marker coordinate={{ latitude, longitude }}>
        <Image
          source={storepin}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
          }}
        />
      </Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: metrics.mapHeight,
  },
});

export default FixedMap;
