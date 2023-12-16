import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashMain = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('IntroScreen'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Grocery </Text>
      <Text style={styles.logoText1}>App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC83A', 
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000', 
  },
  logoText1: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000', 
    marginTop:5
  },
});

export default SplashMain;
