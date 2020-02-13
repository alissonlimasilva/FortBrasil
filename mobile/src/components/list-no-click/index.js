import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemStore from './item';

const ListNoClick = ({ style = {}, list = [] }) => {
  const renderItem = ({ item }) => <ItemStore key={item._id} item={item} />;

  return (
    <View style={[styles.container, style]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '95%',
    flex: 1,
    alignSelf: 'center',
  },
  section: {
    fontSize: 20,
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default ListNoClick;
