import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import global from '../../res/styles/global';

const Input = ({
  inputStyle = {},
  icon = '',
  iconStyle = {},
  style = {},
  darkMode = false,
  ...props
}) => {
  const color = darkMode ? colors.lightColorInput : 'white';
  return (
    <View style={[styles.content, global.shadow, style]}>
      <Icon name={icon} style={[styles.icon, iconStyle]} />
      <View style={{ flex: 1 }}>
        <TextInput
          style={[styles.input, { color }, inputStyle]}
          placeholderTextColor={color}
          {...props}
        />
        <View style={[styles.undeline, { borderBottomColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.buttonLogin,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: metrics.heightButton,
  },
  input: {
    flex: 1,
    textAlignVertical: 'bottom',
  },
  icon: {
    flex: 0,
    width: 30,
    height: 30,
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    paddingTop: 0,
    marginRight: 10,
    color: colors.secondary,
  },
  undeline: {
    borderBottomWidth: 1,
  },
});

export default Input;
