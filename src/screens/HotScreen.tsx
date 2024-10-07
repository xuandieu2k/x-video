import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native"
import { CategoryFilter } from "../components/CategoryFilter"
import { Movie } from "../types/Movie"
import { MovieItem } from "../components/MovieItem"
import { useNavigation } from '@react-navigation/native';
import {  getTrending } from "../api/MovieApi"

export const HotScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState<string[]>([
        "Trending",
        "Popular",
        "Hot",
    ]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const fetchMovies = async (page: number) => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const response = await getTrending(page);
            setMovies((prevMovies) => [...prevMovies, ...response.results]);
            setHasMorePages(response.total_pages > page);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleLoadMore = () => {
        if (!hasMorePages || isFetching) return;
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderItemFilters = () => {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                style={{ flexGrow: 0 }}
            >
                {categories.map((item, index) => (
                    <CategoryFilter key={index} categoryName={item} />
                ))}
            </ScrollView>
        );
    };

    const handlePress = (item: Movie) => {
        navigation.navigate("MovieDetailScreen", { id: item.id, type: item.media_type });
    };    

    return (
        <View style={{ flex: 1 }}> 
            {/* {renderItemFilters()} */}
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieItem movie={item} onPress={() => handlePress(item)} />}
                keyExtractor={(item, index) => item + index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    hasMorePages ? (
                        <ActivityIndicator size="large" color="#219ebc" />
                    ) : null
                }
            />
        </View>
    );
};
