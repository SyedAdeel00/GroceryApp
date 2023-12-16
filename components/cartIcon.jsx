import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Replace with your icon library

const CartIcon = ({ color }) => {
  const navigation = useNavigation();
  const handlePress = () => {navigation.navigate('CartScreen')};

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>
          <Icon name="shopping-bag" size={25} color={color} />
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default CartIcon;
