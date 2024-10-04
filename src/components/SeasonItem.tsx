import { Text, TouchableOpacity, View } from "react-native"
import { Season } from "../types/Movie"

interface SeasonItemProps {
    season: Season,
    index: number,
    indexSelected: number
    onPressItem(season: Season, index: number): void
}

export const SeasonItem: React.FC<SeasonItemProps> = ({ season, index, indexSelected, onPressItem }) => {
    const handlePress = () => {
        onPressItem(season, index)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className={`${index == indexSelected ? "bg-[#ad2831]" : "bg-[#284b63]"}  m-1 px-4 py-2 w-fit rounded-lg`}>
                <Text className="text-white text-sm">{season.name}</Text>
            </View>
        </TouchableOpacity>
    )
}