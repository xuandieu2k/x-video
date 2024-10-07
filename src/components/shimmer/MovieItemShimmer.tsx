import { StyleSheet, View } from 'react-native';
import Shimmer from 'react-native-shimmer-kit';
export const MovieItemShimmer = () => {
    return (
        <View className="flex flex-row w-full my-2">
            <Shimmer width={220} height={160} marginTop={2} marginBottom={2} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />

            <View className="flex justify-center ml-2">
                <Shimmer width={140} height={20} marginTop={8} marginBottom={8} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
                <Shimmer width={80} height={20} marginTop={8} marginBottom={8} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
                <Shimmer width={150} height={20} marginTop={8} marginBottom={8} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
                <Shimmer width={160} height={30} marginTop={8} marginBottom={8} borderRadius={4} duration={3000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            </View>
        </View>
    )
}