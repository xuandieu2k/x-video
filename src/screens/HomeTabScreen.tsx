import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import { FlatListSlider } from '@kuasha420/react-native-flatlist-slider';
interface HomeTabScreenProps {
    navigation: any;
}

export const HomeTabScreen: React.FC<HomeTabScreenProps> = ({ navigation }) => {
    const [images, setImages] = useState([
        { 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU' },
        { 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg' },
        { 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' }
    ])
    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior="padding"
            >
                <View className="p-2">
                    <ImageSlider timer={2000}
                        preview={false}
                        autoPlay={true} data={images} />
                </View>

                <FlatListSlider
                    data={images}
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}