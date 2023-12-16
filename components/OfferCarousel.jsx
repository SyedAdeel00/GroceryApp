import React from 'react';
import { View, Image, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { HStack, VStack } from 'native-base';

const OfferCarousel = () => {
  const data = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={{ width: '100%', backgroundColor: '#FFC83A', borderRadius: 30, marginTop:30 }}>
      <HStack p={4} space={4} alignItems="center">
        <Image source={{ uri: item.imageUrl }} style={{ width: '40%', height: 140, resizeMode: 'cover', borderRadius: 15 }} />
        <VStack  justifyContent="center" space={1}>
            <Text style={{color:'#fff', fontSize:22}}> Get </Text>
            <Text style={{color:'#fff', fontSize:34, fontWeight:'700'}}> 50% OFF </Text>
            <Text style={{color:'#fff', fontSize:18, opacity:0.7}}> On First 03 Order  </Text>
        </VStack>
      </HStack>
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderCarouselItem}
      sliderWidth={400}
      itemWidth={340}
      loop
      autoplay
      autoplayInterval={5000}
    />
  );
};

export default OfferCarousel;
