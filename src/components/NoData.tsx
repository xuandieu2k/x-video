import { View } from "react-native"
import { Text } from "react-native-paper"
import { ImageCustom } from "./base/ImageCustom"
import NoDataImage from "../assets/img/no_data.png"
interface NoDataProps {
    text?: string
}
export const NoData: React.FC<NoDataProps> = ({ text }) => {
    return (
        <View className="w-full h-screen justify-center items-center">
            <ImageCustom className="w-56 h-56" source={NoDataImage} />
            <Text className="text-black text-[16px] font-bold mt-2">{text ?? "Không có dữ liệu"}</Text>
        </View>
    )
}