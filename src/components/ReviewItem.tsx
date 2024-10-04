import { StyleSheet, Text, View } from "react-native"
import { ImageCustom } from "./base/ImageCustom"
import { Review } from "../types/Review"
import { getURLImage } from "../utils/MovieUtils"
import React from "react"
import ReadMore from '@fawazahmed/react-native-read-more'
interface ReviewItemProps {
    review: Review
}
export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
    return (
        <View className="flex flex-1 mt-2">
            <View className="flex-row items-center p-2 my-1">
                <ImageCustom type="avatar" className="w-10 h-10 rounded-full mr-2" source={{ uri: getURLImage(review.author_details.avatar_path ?? "") }} />
                <View>
                    <Text className="text-black text-lg">{review.author}</Text>
                    <Text className="text-black text-sm">{review.created_at}</Text>
                </View>
            </View>
            {/* <Text className="text-black w-full rounded bg-[#f5ebe0] p-2">{review.content ?? "No content"}</Text> */}
            <ReadMore numberOfLines={6} style={style.readMore}>
                {(review.content ?? "No content") == '' ? 'No content' : review.content}
            </ReadMore>
        </View>
    )
}

const style = StyleSheet.create({
    readMore: {
        borderRadius: 4,
        backgroundColor: '#f5ebe0',
        color: 'black',
        padding: 10,
    },
})