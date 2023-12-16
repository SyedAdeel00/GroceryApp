import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import getAllProducts from '../api/products'

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllProducts();
        const uniqueCategories = Array.from(new Set(data.products.map((item) => item.category)));
        setCategories(uniqueCategories.map((categoryName) => {
          // Find the first product with the category name
          const product = data.products.find((item) => item.category === categoryName);
          return product;
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
     <FlatList
  data={categories}
  keyExtractor={(item) => item.id.toString()} 
  renderItem={renderCategoryItem}
  numColumns={2}
  ListHeaderComponent={() => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Products</Text>
    </View>
  )}
/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
