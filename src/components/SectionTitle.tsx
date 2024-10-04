import { Text, View } from "react-native"

interface SectionTitleProps {
    title: string
}
export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <View className="flex-row items-center my-2">
            <View className="h-full w-2 bg-sky-500" />
            <Text className="ml-2 text-black text-[24px] font-bold">{title}</Text>
        </View>
    )
}