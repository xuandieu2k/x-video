import { TouchableOpacity, View } from "react-native";
import { Movie } from "../types/Movie";
import { ImageCustom } from "./base/ImageCustom";
import { getNameMovie, getURLImage } from "../utils/MovieUtils";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { memo, useCallback } from "react";

export interface MovieHorizationalItemProps {
    item: Movie;
    onClickItem?: (item: Movie) => void;
}

export const MovieHorizationalItem = memo(({ item, onClickItem }: MovieHorizationalItemProps) => {
    // Use useCallback to prevent function recreation on every render
    const handlePress = useCallback(() => {
        onClickItem?.(item);
    }, [item, onClickItem]);

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className="rounded bg-[#284b63] m-2 w-40 pb-2 shadow-md shadow-2xl">
                <ImageCustom
                    className="h-40 w-full rounded-tl rounded-tr"
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