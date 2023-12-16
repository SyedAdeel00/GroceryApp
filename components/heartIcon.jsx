import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getProductDetails from '../api/productDetail';

const HeartIcon = ({ productId, initialIsFavorite, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsData = await getProductDetails(productId);
        console.log(`Product ID: ${productId}`);
        // Handle detailsData as needed (setProductDetails, etc.)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePress = async () => {
    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);

    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      let newItem = null;

      if (updatedIsFavorite) {

        const productDetails = await getProductDetails(productId);

        newItem = {
          id: productId.id,
          title: productDetails.title,
          price: productDetails.price,
          thumbnail: productDetails.thumbnail,
        };

        favoritesArray.push(newItem);
      } else {

        favoritesArray = favoritesArray.filter((item) => item.id !== productId.id);
      }


      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      console.log(favoritesArray)


      if (newItem) {
        console.log(updatedIsFavorite ? 'Added to favorites:' : 'Removed from favorites:', JSON.stringify(newItem));
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }


    onFavoriteChange && onFavoriteChange(productId, updatedIsFavorite);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name={isFavorite ? 'heart' : 'heart-o'}
        size={15}
        color={isFavorite ? 'red' : '#fff'}
        style={{
          backgroundColor: 'black',
          borderColor: 'black',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;


