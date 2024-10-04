import { Text } from 'react-native-paper';
import { Genre } from '../types/Movie';
import { View } from 'react-native';
export const GenreItem: React.FC<{ genre: Genre }> = ({ genre }) => {
    return (
        <View className='bg-[#284b63] m-1 px-4 py-2 w-fit rounded-lg'>
            <Text className="text-white text-sm">{genre.name}</Text>
        </View>
    )
}