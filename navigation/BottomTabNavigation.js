import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import GroceryHomeScreen from '../screens/GroceryHomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MoreScreen from '../screens/MoreScreen';
import Home from '../components/svg/home';
import Category from '../components/svg/category';
import Heart from '../components/svg/heart';
import More from '../components/svg/more';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  return (
    <View>
      <BottomTabBar {...props} />
    </View>
  );
};

const TabIcon = ({ name, size, color, focused }) => {
    const fill = focused ? '#FFC83A' : 'none';
  
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: focused ? 'black' : 'transparent',
            borderRadius: focused ? 100 : 0,
            padding: focused ? 15 : 0,
            top: focused ? -25: 0
          }}
        >
          {name === 'Favourite' ? (
            <Heart fill={fill} />
          ) : name === 'Home' ? (
            <Home name="home" size={size} fill={fill} />
          ) : name === 'Categories' ? (
            <Category fill={fill} />
          ) : name === 'More' ? (
            <More name="menu" size={size} fill={fill} />
          ) : null}
        </View>
        {!focused && <Text style={{ color: '#8891A5'}}>{name}</Text>}
      </View>
    );
  };
  

const BottomTabNavigation = () => {
  const route = useRoute()

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
            height:70,
            borderRadius:20,
          paddingHorizontal: 5,
          paddingVertical: 1,
          backgroundColor: '#fff',
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={GroceryHomeScreen}
        initialParams={{ data: route.params.userName }}
        options={{
            tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon name="Home" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
            tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon name="Categories" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
            tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon name="Favourite" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
            tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <TabIcon name="More" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
