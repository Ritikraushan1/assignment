import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

const CartModal = ({onClose, cartItems, totalPrice}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={false}
      presentationStyle="overFullScreen"></Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#003f6f',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cartInfo: {
    flexDirection: 'column',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  extraCharges: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  viewCartButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewCartText: {
    color: '#003f6f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartModal;
