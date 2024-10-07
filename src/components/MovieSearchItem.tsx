import { Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../types/Movie";
import { getNameMovie, getURLImage } from "../utils/MovieUtils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { memo, useCallback } from "react";
import { ImageCustom } from "./base/ImageCustom";

export interface MovieSearchItemProps {
    item: Movie;
    onClickItem?: (item: Movie) => void;
}

export const MovieSearchItem = memo(({ item, onClickItem }: MovieSearchItemProps) => {
    const handlePress = useCallback(() => {
        onClickItem?.(item);
    }, [item, onClickItem]);

    return (
        <TouchableOpacity onPress={handlePress} >
            <View className="rounded bg-[#284b63] m-2 w-min-48 w-48 pb-2 shadow-md shadow-2xl">
                <ImageCustom
                    className="h-40 h-min-48 w-full rounded-tl rounded-tr"
                    source={{ uri: getURLImage(item.poster_path) }}
                />
                <View className="flex flex-grow items-center justify-center">
                    <Text className="text-white my-2 ml-2 h-10 line-clamp-2">
                        {getNameMovie(item)}
                    </Text>
                    <View className="flex-row items-center ml-2">
                        {[...Array(5)].map((_, index) => (
                            <MaterialCommunityIcons
                                key={index}
                                name="heart"
                                size={16}
                                color={"#ffd166"}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);