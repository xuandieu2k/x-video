import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShimmerTest } from '../components/shimmer/ShimmerTest';
import { MovieHorizationalItemShimmer } from '../components/shimmer/MovieHorizationalItemShimmer';

const DetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <ShimmerTest />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={() => <MovieHorizationalItemShimmer />} />
    </>
  );
};

export default DetailsScreen;