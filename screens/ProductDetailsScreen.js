import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity } from 'react-native'; 
import getProductDetails from '../api/productDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HStack, Box, VStack, Heading, Divider } from 'native-base';
import BackArrow from '../components/backArrow';
import CartIcon from '../components/cartIcon';
import ReviewStars from '../components/reviewStars';
import ProductCarousel from '../components/productCarousel';

const ProductDetailsScreen = ({ route, navigation }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = route.params.product.id;
        const detailsData = await getProductDetails(productId);
        setProductDetails(detailsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [route.params.product.id]);

  const addToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cartItems = existingCart ? JSON.parse(existingCart) : [];

      const productIndex = cartItems.findIndex(item => item.id === productDetails.id);

      if (productIndex === -1) {
        cartItems.push({
          id: productDetails.id,
          title: productDetails.title,
          price: productDetails.price,
          thumbnail: productDetails.thumbnail,
        });

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        navigation.navigate('CartScreen');
      } else {
        console.log('Product is already in the cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!productDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <ScrollView>
        <View style={{marginTop:10}}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <View style={{ marginLeft:25}}>
            <BackArrow/>

            </View>
            <View>
            <CartIcon color="black"/>
            </View>
          </HStack>
        </View>
        <Box>
          <VStack>
            <Text style={{ fontSize: 50, fontWeight: '300', marginLeft: 10 }}>{productDetails.brand}</Text>
            <Text style={{ fontSize: 50, fontWeight: '800', marginLeft: 10 }}>{productDetails.title}</Text>
            <HStack marginTop={5} marginLeft={2}>
              <ReviewStars rating={productDetails.rating} />
              <Text style={{ fontSize: 18, fontWeight: '100' }}>{`  ${productDetails.stock} Reviews`}</Text>
            </HStack>
          </VStack>
          <View marginTop={10}>
          <ProductCarousel images={productDetails.images} productId={productDetails.id} productDetails={productDetails}/>
          </View>
          <VStack space={2} mt={4}>
            <HStack marginLeft={5} space={6}>
              <Text style={{ fontSize: 20, color: '#153075', fontWeight: '500' }}>{`$${productDetails.price}`}</Text>
              <View style={{ backgroundColor: '#153075', borderRadius: 15, height: 30, width: 95, alignItems: 'center', justifyContent: 'center', marginLeft:10}}>
                <Text style={{ color: '#fff' }}>{`  ${productDetails.discountPercentage}% off`}</Text>
              </View>
            </HStack>
            <HStack justifyContent={'space-evenly'} marginTop={5}>
              <TouchableOpacity
                onPress={addToCart}
                style={{ borderWidth: 1.3, borderColor: '#153075', alignItems: 'center', justifyContent: 'center', borderRadius: 22, height: 60, width: 170 }}
              >
                <Text style={{ color: '#153075', fontWeight: '500', fontSize:15 }}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('Buy Now pressed')}
                style={{ backgroundColor: '#153075', borderWidth: 1.3, alignItems: 'center', justifyContent: 'center', borderRadius: 22, height: 60, width: 170 }}
              >
                <Text style={{ color: '#fff', fontWeight: '500', fontSize:15 }}> Buy Now</Text>
              </TouchableOpacity>
            </HStack>
            <Divider my={2} />
            <Heading size="md" style={{marginLeft:10}}>Details</Heading>
            <Text style={{ fontSize: 15, fontWeight: '400', opacity: 0.6, marginLeft:12, marginRight:20 }}>{productDetails.description}</Text>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
