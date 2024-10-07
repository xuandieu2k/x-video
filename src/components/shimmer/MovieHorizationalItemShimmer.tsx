import { View } from 'react-native';
import { MovieHorizationalItem } from '../MovieHorizationalItem';
import Shimmer from 'react-native-shimmer-kit';
export const MovieHorizationalItemShimmer = () => {
    return (
        <View className='w-40 h-56 rounded m-2 w-40 shadow-md shadow-2xl'>
            <Shimmer width={160} height={160} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            <Shimmer width={160} height={20} marginTop={8} marginBottom={16} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            <Shimmer width={160} height={20} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
        </View>
    )
}