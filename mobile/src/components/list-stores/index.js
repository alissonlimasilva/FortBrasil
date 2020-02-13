import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/duck/store';
import ItemStore from './item';
import contants from '../../res/contants';

const empty = require('../../assets/imgs/empty.png');

const ListStores = ({ style = {}, navigation }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.store);
  const getStores = () => dispatch(Actions.getStores());

  useEffect(() => {
    getStores();
  }, []);

  const emptyComponent = () => <Image source={empty} style={styles.empty} />;

  const callDetails = item => {
    navigation.navigate(contants.ROUTE_DETAILS, { store: item });
  };

  const renderItem = ({ item }) => (
    <ItemStore key={item._id} item={item} onPress={callDetails} />
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        refreshing={loading}
        onRefresh={getStores}
        showsVerticalScrollIndicator={false}
        data={data}
        ListEmptyComponent={emptyComponent()}
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

export default ListStores;
