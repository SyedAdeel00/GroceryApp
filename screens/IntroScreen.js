import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const route = useRoute();
  const [userName, setUserName] = useState('');

  const handleGoButtonPress = () => {
    if (userName.trim() === '') {
      Alert.alert('Error', 'Please enter your name.');
    } else {
      console.log("hi", userName);
      navigation.navigate('BottomTabNavigation', { userName });
    }
  };
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Text style={{ fontSize: 30, color: '#FFC83A', marginBottom: 20 }}>
        Welcome to Grocery App!
      </Text>
      <View style={{ width: '80%', alignItems: 'center' }}>
        <TextInput
          style={{
            height: 50,
            borderColor: '#153075',
            borderWidth: 1,
            marginVertical: 10,
            padding: 5,
            color: '#F9B023',
            width: '100%',
            textAlign: 'center',
          }}
          placeholder="Your Name"
          placeholderTextColor="#F9B023"
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <TouchableOpacity
          onPress={handleGoButtonPress}
          style={{
            padding: 10,
            backgroundColor: '#FFC83A',
            borderRadius: 5,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#1B262E' }}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;
