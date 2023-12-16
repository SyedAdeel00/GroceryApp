import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import getAllProducts from '../api/products';
import { HStack, VStack } from 'native-base';
import CartIcon from '../components/cartIcon';
import HeartIcon from '../components/heartIcon';
import AddIcon from '../components/addIcon';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchIcon from '../components/svg/searchIcon';
import ArrowIcon from '../components/svg/ArrowIcon';
import OfferCarousel from '../components/OfferCarousel';
import { useNavigation } from '@react-navigation/native';

const GroceryHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item, isLiked: item.isLiked })}>
        <View style={{ marginLeft: 5, marginTop: 30, borderRadius: 20, width: '60%', marginStart: 10 }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <View style={{ width: '100%', padding: 16, backgroundColor: '#F8F9FB', borderRadius: 10 }}>
              <View>
                <HStack justifyContent={'space-around'}>
                  <View style={{ marginRight: 15 }}>
                    <HeartIcon productId={item.id}/>
                  </View>
                  <Image source={{ uri: item.thumbnail }} style={{ width: '90%', height: 110, borderRadius: 10 }} />
                </HStack>
              </View>
              <View style={{ marginTop: 15 }}>
                <HStack justifyContent={'space-around'}>
                  <View>
                    <Text style={{ fontSize: 18 }}>{`$${item.price}`}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>{item.title}</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log("Button pressed")}>
                    <AddIcon productId={item.id}/>
                    </TouchableOpacity>

                </HStack>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#2A4BA0', padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: '500' }}>{`Hey, ${route?.params?.userName}!`}</Text>
            <Pressable>
              <CartIcon color="#fff" />
            </Pressable>
          </HStack>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#153075',
                width: '100%',
                borderRadius: 30,
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                marginTop: 25
              }}
            >
              <SearchIcon style={{ marginRight: 10, marginLeft: 10 }} />
              <TextInput
                editable
                maxLength={20}
                placeholder="Search products or Store"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={{ flex: 1, color: '#fff', padding: 10, fontSize: 15, fontWeight: '500' }}
              />
            </View>
          </View>
          <View style={{ marginTop: 25 }}>
            <HStack justifyContent={'space-between'}>
              <View>
                <VStack>
                  <Text style={{ color: "#FFFFFF80", fontSize: 12 }}>Delivery To </Text>
                  <View>
                    <HStack alignItems={'center'} >
                      <Text style={{ color: "#fff", fontSize: 15, marginRight: 10 }}>Green Way 3000, Sylhet</Text>
                      <ArrowIcon />
                    </HStack>
                  </View>
                </VStack>
              </View>
              <View>
                <VStack>
                  <Text style={{ color: "#FFFFFF80", fontSize: 12 }}>Within</Text>
                  <View>
                    <HStack alignItems={'center'} >
                      <Text style={{ color: "#fff", fontSize: 15, marginRight: 10 }}>1 Hour</Text>
                      <ArrowIcon />
                    </HStack>
                  </View>
                </VStack>
              </View>
            </HStack>
          </View>
        </View>
        <ScrollView>
          <View>
            <OfferCarousel />
          </View>
          <Text style={{ fontSize: 33, fontWeight: '300', marginLeft: 10, marginTop: 10 }}>Recommended</Text>
          <View>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProductItem}
              numColumns={2}
              contentContainerStyle={{ padding: 0, margin: 0 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GroceryHomeScreen;
