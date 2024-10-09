import { Dimensions, View } from "react-native"
import Shimmer from "react-native-shimmer-kit"
import { MovieItemShimmer } from "./MovieItemShimmer"
import React from "react"
const widthScreen = Math.round(Dimensions.get('window').width) - 20
export const ShimmerDetailScreen = () => {
    return (
        <View style={{ display: "flex", padding: 10 }}>
            <Shimmer
                width={widthScreen}
                height={200}
                marginTop={60}
                marginBottom={10}
                borderRadius={4}
                duration={2000}
                colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']}
            />
            <MovieItemShimmer />

            <Shimmer width={widthScreen} height={40} marginBottom={20} marginTop={20} borderRadius={4}
                duration={2000}
                colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            <Shimmer width={widthScreen} height={20} marginVertical={10} marginTop={10} borderRadius={4}
                duration={2000}
                colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            <Shimmer width={widthScreen} height={20} marginVertical={10} marginTop={10} borderRadius={4}
                duration={2000}
                colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
            <Shimmer width={widthScreen} height={20} marginVertical={10} marginTop={10} borderRadius={4}
                duration={2000}
                colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />

        </View>
    )
}