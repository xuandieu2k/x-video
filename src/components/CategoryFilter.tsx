import { Text, View } from "react-native"
interface CategoryFilterProps {
    categoryName: string
}
export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryName}) => {
    return <View>
        <Text className="bg-[#d8e2dc] text-black rounded-lg m-2 px-4 py-2">{categoryName??"Không xác định"}</Text>
    </View>
}