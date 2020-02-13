import React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import HeaderUser from '../../components/header-user';
import ListStores from '../../components/list-stores';
import colors from '../../res/colors';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.darkStatusbar} />
      <ScrollView style={styles.scroll}>
        <HeaderUser navigation={navigation} />
        <ListStores navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
