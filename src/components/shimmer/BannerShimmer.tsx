import { Dimensions } from 'react-native';
import Shimmer from 'react-native-shimmer-kit';
const widthScreen = Math.round(Dimensions.get('window').width);
export const BannerShimmer = () => {
    return (
        <Shimmer width={widthScreen} height={240} borderRadius={4} duration={2000} colors={['#BDBDBD', '#E0E0E0', '#E0E0E0', '#BDBDBD']} />
    )
}