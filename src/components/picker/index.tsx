import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../globalStyles';
import { IPicker } from '../../@types/interfaces';

const Picker: React.FC<IPicker> = ({
  pickerOptions,
  onSelectedValue,
  selectedValue
}) => {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(!showModal)
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={handleShowModal} style={styles.showPickerOptionsButton}>
        <Ionicons name='play-outline' color={colors.text} size={16} />
        <Text style={[styles.text, { textDecorationLine: 'underline', marginLeft: 10 }]}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal transparent visible={showModal} onRequestClose={handleShowModal} animationType='slide'>
        <TouchableOpacity activeOpacity={1} onPress={handleShowModal} style={styles.modalContainer}>
          <View style={styles.pickerOptionsContainer}>
            {pickerOptions.map(option => {
              return (
                <TouchableOpacity
                  style={styles.pickerOption}
                  onPress={() => {
                    onSelectedValue(option);
                    setShowModal(!showModal)
                  }}
                  key={option}
                  >
                  <Text>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity >
      </Modal>
    </View>
  );
};

export default Picker;