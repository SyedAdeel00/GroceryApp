import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const BackArrow = () => {
  const navigation  = useNavigation()
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: '#E6ECEC',
          borderRadius: 30,
          width: 35,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="keyboard-arrow-left" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default BackArrow;
