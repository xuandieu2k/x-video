import React, { useRef, useState, useCallback } from "react";
import { SafeAreaView, KeyboardAvoidingView, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Movie } from "../types/Movie";
import { ImageCustom } from "../components/base/ImageCustom";
import { searchMovie } from "../api/MovieApi";
import { MovieSearchItem } from "../components/MovieSearchItem";
import { useNavigation } from "@react-navigation/native";
import { NoData } from "../components/NoData";
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchMovieScreen = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const navigation = useNavigation();
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const searchFunction = useCallback((query: string) => {
        fetchMovies(1, query);
    }, []);

    const fetchMovies = async (page: number, keySearch: string) => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const response = await searchMovie(keySearch, page, true);
            setMovies(prevMovies => (page === 1 ? response.results : [...prevMovies, ...response.results]));
            setHasMorePages(response.total_pages > page);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleClickItem = useCallback((item: Movie) => {
        navigation.navigate("MovieDetailScreen", { id: item.id, type: item.media_type });
    }, [navigation]);

    const handleLoadMore = () => {
        if (!hasMorePages || isFetching) return;
        setCurrentPage(prevPage => prevPage + 1);
        fetchMovies(currentPage + 1, searchTerm);
    };

    const onChangeHandler = (value: string) => {
        setCurrentPage(1);
        clearTimeout(timeout.current);
        setSearchTerm(value);
        timeout.current = setTimeout(() => {
            searchFunction(value);
        }, 1500);
    };

    const renderMovieItem = useCallback(({ item }: { item: Movie }) => (
        <MovieSearchItem item={item} onClickItem={handleClickItem} />
    ), [handleClickItem]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView className="flex-1" behavior="padding">
                <View style={{ flex: 1 }}>
                    {/* Header Section */}
                    <View className="fixed top-0 flex flex-row py-1 items-center m-2">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                            <Icon name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <View className="flex flex-row flex-1 items-center bg-[#edede9] px-2 rounded-lg">
                            <ImageCustom className="h-8 w-8 mr-2" source={{ uri: 'https://img.icons8.com/color/512/search.png' }} />
                            <TextInput
                                className="flex-grow p-2 rounded text-[16px] text-black"
                                value={searchTerm}
                                placeholderTextColor="#9e9e9e"
                                onChangeText={onChangeHandler}
                                placeholder="Tìm kiếm phim..."
                            />
                        </View>
                    </View>

                    {/* Main Content */}
                    {movies.length === 0 ? (
                        <NoData text={searchTerm === '' ? 'Không có dữ liệu' : 'Không tìm thấy phim'} />
                    ) : (
                        <FlatList
                            numColumns={2}
                            data={movies}
                            renderItem={renderMovieItem}
                            keyExtractor={item => item.id.toString()}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={hasMorePages ? <ActivityIndicator size="large" color="#219ebc" /> : null}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};