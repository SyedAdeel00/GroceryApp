import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { Center, Divider, HStack, VStack } from 'native-base';


const FavoriteScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavoriteProducts(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorite products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProducts();

    const refreshInterval = setInterval(() => {
      fetchFavoriteProducts();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  const removeFavorites = async () => {
    try {
      await AsyncStorage.removeItem('favorites');
      setFavoriteProducts([]);
    } catch (error) {
      console.error('Error removing favorite products:', error);
    }
  };

  const reloadFavorites = async () => {
    // Reload favorites from AsyncStorage
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteProducts(parsedFavorites);
    } catch (error) {
      console.error('Error reloading favorite products:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View>
        <Center>
        <Text style={{
          fontSize:30,
          fontWeight:'700',
          color:"#153075",
          marginTop:20,
          marginBottom:20
        }}>Favorite Products</Text>
        </Center>
        <HStack justifyContent={'space-around'} padding={5} alignItems={'center'}>
        <TouchableOpacity onPress={removeFavorites}>
        <HStack space={2} alignItems={'center'}>
        <View>
                      <Icon name="delete" size={25} color="red" />
                      </View>
          <Text style={{ color: 'red', fontSize:16}}>Remove All Favorites</Text>
                      </HStack>
        </TouchableOpacity>

        <TouchableOpacity onPress={reloadFavorites}>
          <HStack space={2} alignItems={'center'}>
        <View>
                      <Icon name="reload1" size={25} color="#F9B023" />
                      </View>
                      <Text style={{
                        fontSize:20,
                        fontWeight:'400',
                        color:'#F9B023'
                      }}>Reload List </Text>
                      </HStack>
        </TouchableOpacity>
        </HStack>

        <ScrollView>
          {favoriteProducts.map((item) => (
            <>
            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', margin:20}}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 60, height: 60, resizeMode: 'stretch', marginRight: 10, borderRadius: 10 }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text style={{ marginLeft: 10, marginTop: 5 }}>{`$${item.price}`}</Text>
              </View>
            </View>
            <Divider my={1} width={'90%'} ml={5} opacity={0.5}/>
            </>
          ))}
         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
