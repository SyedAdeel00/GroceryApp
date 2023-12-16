// ReviewStars.js
import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed

const MAX_STARS = 5;

const ReviewStars = ({ rating }) => {
  // Round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  // Determine the number of filled and unfilled stars
  const filledStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  // Helper function to render a star icon
  const renderStar = (key, filled) => (
    <FontAwesome
      key={key}
      name={filled ? 'star' : 'star-o'}
      size={24}
      color={filled ? '#FFC83A' : 'black'}
    />
  );
  const renderHalfStar = () => {
    if (hasHalfStar) {
      const halfStarColor = `rgba(260, 200, 58, ${roundedRating % 1})`;
      return <FontAwesome key="half" name="star-half-full" size={24} color={halfStarColor} />;
    }
    return null;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(filledStars)].map((_, index) => renderStar(index, true))}
      {renderHalfStar()}
      {[...Array(MAX_STARS - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) =>
        renderStar(filledStars + (hasHalfStar ? 1 : 0) + index, false)
      )}
    </View>
  );
};

export default ReviewStars;
