import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../../res/colors';

const ItemStore = ({ item }) => {
  const { _id, name, description, address } = item;
  return (
    <View key={_id} style={[styles.container]}>
      <View style={styles.viewInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#394894',
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
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default ItemStore;
