import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Movie } from "../types/Movie"
import { formatCurrency, getNameMovie, getReleaseMovie, getURLImage } from "../utils/MovieUtils";
import { ImageCustom } from "./base/ImageCustom";
interface MovieItemProps {
    movie: Movie;
    onPress: (id: number) => void;
}
export const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {

    const handlePress = () => {
        onPress(movie.id)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className="flex flex-row">
                <ImageCustom
                    resizeMode="cover"
                    className="my-2 h-32 w-48 rounded"
                    source={{ uri: getURLImage(movie.poster_path) }}
                />

                <View className="flex flex-1 flex-grow p-2 justify-center">
                    <Text className="text-black text-[600] font-[700]">{getNameMovie(movie)}</Text>
                    <Text className="text-black mt-2 text-sm">{getReleaseMovie(movie)}</Text>
                    <View className="flex-row mt-2 items-center">
                        <MaterialCommunityIcons key={0} name="eye" size={24} color={"#ffdab9"} />
                        <Text className="text-black ml-1 text-sm">{formatCurrency(movie.vote_count)} Đánh giá </Text>
                    </View>
                    <View className="flex-row mt-2 items-center">
                        <MaterialCommunityIcons key={0} name="heart" size={24} color={"#ffd166"} />
                        <MaterialCommunityIcons key={1} name="heart" size={24} color={"#ffd166"} />
                        <MaterialCommunityIcons key={2} name="heart" size={24} color={"#ffd166"} />
                        <MaterialCommunityIcons key={3} name="heart" size={24} color={"#ffd166"} />
                        <MaterialCommunityIcons key={4} name="heart" size={24} color={"#ffd166"} />
                        <Text className="text-black ml-2">{movie.vote_average}/10</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}