import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../res/colors';
import metrics from '../../res/metrics';

const Header = ({ onBack = () => {}, title = 'Detalhes' }) => {
  return (
    <View style={styles.container}>
      <Icon onPress={onBack} style={styles.back} name="arrow-circle-o-left" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: metrics.headerHeight,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 50, // diferença do icone para centralizar texto
    color: 'white',
  },
  back: { color: colors.iconBack, fontSize: 40, marginRight: 10 },
});

export default Header;
