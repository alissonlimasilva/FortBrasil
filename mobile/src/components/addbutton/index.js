import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import contants from '../../res/contants';
// import AddCrise from '../modal/crise';

const SIZE = metrics.addButton;

export const AddButton = ({ navigation }) => {
  const callCreate = () => {
    navigation.navigate(contants.ROUTE_CREATESTORE);
  };
  return (
    <View>
      <TouchableHighlight
        onPress={callCreate}
        underlayColor={colors.addButtonPressed}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: colors.addButton,
        }}
      >
        <Icon name="plus-circle" size={30} color={colors.primary} />
      </TouchableHighlight>
    </View>
  );
};
