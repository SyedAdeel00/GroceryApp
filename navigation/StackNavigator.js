import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashMain from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashMain" headerMode="none">
      <Stack.Screen name="SplashMain" component={SplashMain} />
      <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
