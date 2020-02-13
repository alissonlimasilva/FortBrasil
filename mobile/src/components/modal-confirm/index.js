import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import colors from '../../res/colors';
import metrics from '../../res/metrics';
import HeaderModal from '../header-modal';

const ModalConfirm = ({
  show = false,
  onConfirm = () => {},
  onCancel = () => {},
  title = 'Gostaria de excluir o estabelecimento selecionado?',
}) => {
  const confirm = () => (
    <TouchableOpacity
      onPress={onConfirm}
      style={[styles.button, styles.confirm]}
    >
      <Icon style={styles.icon} name="check" />
    </TouchableOpacity>
  );
  const cancel = () => (
    <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancel]}>
      <Icon style={styles.icon} name="close" />
    </TouchableOpacity>
  );
  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <HeaderModal
          title="Tem certeza?"
          icon="times-circle"
          onPress={onCancel}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.viewButtons}>
            {confirm()}
            {cancel()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBackground,
  },
  content: {
    padding: metrics.paddingView + 20,
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: metrics.buttonModalConfirm,
    height: metrics.buttonModalConfirm,
    borderRadius: metrics.buttonModalConfirm / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: 'green',
  },
  cancel: {
    backgroundColor: 'red',
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 35,
  },
});

export default ModalConfirm;
