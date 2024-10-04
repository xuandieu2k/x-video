import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { Episode } from "../types/Movie";

interface EpisodeItemProps {
    episode: Episode
    index: number,
    indexSelected: number
    onPressItem(index: number): void
}

export const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode, index, indexSelected, onPressItem }) => {
    const handlePress = () => {
        onPressItem(index)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className={`${index == indexSelected ? "bg-[#ad2831]" : "bg-[#284b63]"}  m-1 px-4 py-2 w-fit rounded-lg`}>
                <Text className="text-white text-sm">{episode.name}</Text>
            </View>
        </TouchableOpacity>
    )
}