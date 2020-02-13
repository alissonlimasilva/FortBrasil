import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import colors from '../../res/colors';
import { AddButton } from '../../components/addbutton';
import Dashboard from '../dashboard';
import NearStores from '../near-stores';
import metrics from '../../res/metrics';
import CreateStore from '../create-store';

const BottomNavigation = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon style={styles.icon} name="home" color={tintColor} size={24} />
        ),
      }),
    },
    CreateStore: {
      screen: CreateStore,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: () => <AddButton navigation={navigation} />,
      }),
    },
    Perfil: {
      screen: NearStores,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="map-marker" color={tintColor} size={24} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: colors.icon_selected, // active icon color
      inactiveTintColor: colors.icon_unselected, // inactive icon color
      style: {
        backgroundColor: colors.bar_bottom_color, // TabBar background
        borderTopLeftRadius: metrics.borderRadius,
        borderTopRightRadius: metrics.borderRadius,
        height: metrics.navbar,
      },
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
  },
});

export default createAppContainer(BottomNavigation);
