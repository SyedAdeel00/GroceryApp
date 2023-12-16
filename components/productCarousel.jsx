import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeartIcon from './heartIcon';

const ProductCarousel = ({ images, productDetails, id}) => {
  const { width: screenWidth } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [favorites, setFavorites] = React.useState(images.map(() => false)); 

  const renderImage = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <View style={styles.heartIconContainer}>
        <HeartIcon productId={productDetails.id}/>
      </View>
    </View>
  );

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  return (
    <View>
      <Carousel
        data={images}
        renderItem={renderImage}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 1
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10, 
    right: 10, 
    zIndex: 1, 
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 1,
    alignSelf: 'flex-start',
  },
  paginationDot: {
    width: 16,
    height: 4,
    borderRadius: 5,
    marginHorizontal: -4,
    backgroundColor: '#FFC83A',
  },
  paginationInactiveDot: {
    backgroundColor: '#E4E4E4',
  },
});


export default ProductCarousel;
