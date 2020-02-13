import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import colors from '../../res/colors';

const logoEmpresa = require('../../assets/imgs/storeAvatar.png');

const ItemStore = ({ item, onPress }) => {
  const { _id, name, description, address } = item;
  return (
    <TouchableOpacity
      key={_id}
      onPress={() => onPress(item)}
      style={[styles.container]}
    >
      <Image style={styles.logo} source={logoEmpresa} />
      <View style={styles.viewInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  viewInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default ItemStore;
