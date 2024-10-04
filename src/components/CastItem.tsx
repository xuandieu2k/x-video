import { Image, Text, View } from "react-native"
import { ImageCustom } from "./base/ImageCustom"
import { getURLImage } from "../utils/MovieUtils"
interface CastItemProps {
    cast: Cast
}
export const CastItem: React.FC<CastItemProps> = ({ cast: { profile_path: url, name } }) => {
    return (
        <View className="flex-1 h-48 w-36 relative rounded justify-center items-center mr-2">
            <ImageCustom className="h-full w-full rounded" type="avatar" source={{ uri: getURLImage(url) }} />
            <View className="absolute bottom-0 border-tl-2 border-tr-2 w-full bg-black/50 p-2">
                <Text className="text-white text-center">{name}</Text>
            </View>
        </View>
    )
}