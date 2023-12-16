import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,SafeAreaView, StatusBar, Platform, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../components/backArrow';
import { HStack, Divider, Center, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';




const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [ totalAmount, setTotalAmount] = useState();
  const [deleteButton, setDeleteButton] = useState(false);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const storedCart = await AsyncStorage.getItem('cart');
  //       const parsedCart = storedCart ? JSON.parse(storedCart) : [];
  //       setCartItems(parsedCart);
  //     } catch (error) {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        setCartItems(parsedCart);
        updateTotalAmount(parsedCart); // Calculate the initial total amount
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    updateTotalAmount(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
    updateTotalAmount(updatedCart);
  };

  const removeItem = async (itemId) => {
    try {

      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  

      setCartItems(updatedCart);
      updateTotalAmount(updatedCart);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  };
  

  const updateTotalAmount = (updatedCart) => {
   
    const cartAmount = updatedCart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    console.log('Total Amount:', cartAmount);
    setTotalAmount(cartAmount)
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
    <View style={{marginTop:20}}>
    <HStack space={5}>
      <View style={{marginLeft:20}}>
      <BackArrow/>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '400', marginBottom: 20, marginLeft: 10 }}>
      Shopping Cart ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)})
      </Text>
    </HStack>
    </View>
    
    <ScrollView style={{ marginTop: 15 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10  }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 60, height: 60, resizeMode: 'stretch', marginRight: 10, borderRadius: 10, marginLeft: 5 }}
                />
                <View>
                  <Text>{item.title}</Text>
                  <Text style={{marginLeft:10, marginTop:5}}>{`$${item.price}`}</Text>
                </View>
                <View style={{ marginLeft: 'auto', alignItems: 'center', marginRight:10  }}>
                  <VStack>
                    <Center>
                  <HStack  space={1} style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <View
                     style={{ backgroundColor: '#E6ECEC',
                     borderRadius: 30,
                     width: 30,
                     height: 30,
                     justifyContent: 'center',
                     alignItems: 'center',
                    }}>
                      <Icon name="minus" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <Text style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontSize: 15,
                      fontWeight:'500'
                    }}> {item.quantity || 1}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <View
                     style={{ backgroundColor: '#E6ECEC',
                     borderRadius: 30,
                     width: 30,
                     height: 30,
                     justifyContent: 'center',
                     alignItems: 'center',
                    }}>
                      <Icon name="plus" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                  </HStack>

                  { deleteButton == true ? (
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <View
                     style={{marginTop:15}}>
                    <Icon name="delete" size={20} color="red"/>
                    </View>
                    </TouchableOpacity>
                  ) : null }
                    </Center>
                  </VStack>
                </View>
              </View>
              <Divider my={5} width={'90%'} ml={5} opacity={0.5}/>
            </>
          )}
        />

{cartItems.length !== 0 ? (
        <TouchableOpacity onPress={() => setDeleteButton(!deleteButton)}>
        <View style={{
          alignSelf:'flex-end',
          right:20
        }}>
        <Text style={{
          fontSize:16,
          color:'#2A4BA0',
          fontWeight:'500'
        }}>Edit</Text>
        </View>
        </TouchableOpacity>
) : null}
      </ScrollView>
      

      {cartItems.length === 0 ? (
                <View style={{justifyContent:'center', alignItems:'center', bottom:300}}>
             <Text style={{fontSize:30, color:'red',fontWeight:'400'}}> Add Something to Cart</Text>
             <Icon1 name="cart" size={180} color="black" />
             </View>
      ) : (
        <View>
      <View style={styles.summaryContainer}>
      <VStack>
        <HStack justifyContent={'space-between'}>
          <Text style={styles.summaryText}>Subtotal </Text>
          <Text style={styles.summaryAmount}>${totalAmount}</Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text style={styles.summaryText}> Delivery</Text>
          <Text style={styles.summaryAmount}>${totalAmount <= 200 ? 2 : 0}</Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text style={styles.summaryText}>Total </Text>
          <Text style={styles.summaryAmount}>${totalAmount + (totalAmount <= 200 ? 2 : 0)}</Text>
        </HStack>
      </VStack>
      <TouchableOpacity>
        <Center>
          <View
            style={{
              top: 20,
              backgroundColor: '#2A4BA0',
              height: '65%',
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text style={{
              fontSize: 13,
              color: '#fff',
              fontWeight: '400',
            }}>
              Proceed to Checkout
            </Text>
          </View>
        </Center>
      </TouchableOpacity>
    </View>
    </View>

      )
}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    height: 200,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#E6ECEC',
    top:'10%',

  },
  summaryText: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 20,
    opacity: 0.6,
    marginTop: 10,
  },
  summaryAmount: {
    marginRight: 20,
    marginTop: 10,
  },
});

export default CartScreen;
