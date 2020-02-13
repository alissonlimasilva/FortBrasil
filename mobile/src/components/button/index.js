import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import global from '../../res/styles/global';

const Button = ({
  isLoading = false,
  style = {},
  text = '',
  textStyle = {},
  icon,
  iconStyle = {},
  onPress = () => {},
  ...props
}) => {
  const renderIcon = () => (
    <Icon style={[styles.icon, iconStyle]} name={icon} />
  );

  const viewLoading = () => <ActivityIndicator size="large" color="white" />;

  const buttonContent = () => (
    <>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {!!icon && renderIcon()}
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.button, global.shadow, style]}
      onPress={onPress}
      {...props}
    >
      {isLoading && viewLoading()}
      {!isLoading && buttonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: colors.buttonColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: metrics.heightButton,
  },
  text: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
  },
});

export default Button;
