import { TouchableOpacity } from "react-native"
import { Text, View } from "react-native"

interface SectionTitleProps {
    title: string,
    textRight?: String,
    hiddenTextRight?: boolean
    classParentName?: string,
    onPressSeemore?: () => void
}
export const SectionTitle: React.FC<SectionTitleProps> = ({ classParentName, title, textRight = "Xem thêm", hiddenTextRight = true, onPressSeemore }) => {
    return (
        <View className={`flex-row items-center my-2 ${classParentName ?? ''} `}>
            <View className="h-full w-2 bg-sky-500" />
            <Text className="ml-2 text-black text-[24px] font-bold">{title}</Text>
            {!hiddenTextRight &&
                <TouchableOpacity className="ml-auto" onPress={onPressSeemore}>
                    <Text className="text-black font-bold mr-2">{textRight}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}