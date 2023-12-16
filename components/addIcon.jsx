import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import getProductDetails from '../api/productDetail';

const AddIcon = ({ productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const navigation = useNavigation();

  const showAlert = (message) => {
    Alert.alert('Alert', message);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsData = await getProductDetails(productId);
        setProductDetails(detailsData);
        console.log(`Product ID: ${productId}`);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePress = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cartItems = existingCart ? JSON.parse(existingCart) : [];

      if (productDetails && productDetails.id) {
        const productIndex = cartItems.findIndex(item => item.id === productDetails.id);

        if (productIndex === -1) {
          const newCartItem = {
            id: productDetails.id,
            title: productDetails.title,
            price: productDetails.price,
            thumbnail: productDetails.thumbnail,
          };

          cartItems.push(newCartItem);

          await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
          showAlert('Product added to the cart');
          navigation.navigate('CartScreen');
        } else {
          showAlert('Product is already in the cart');
          console.log('Product is already in the cart');
        }
      } else {
        console.log('Product details are not available');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Icon name="plus" size={13} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    backgroundColor: '#2A4BA0',
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default AddIcon;
