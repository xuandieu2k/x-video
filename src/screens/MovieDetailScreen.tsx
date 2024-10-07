import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator, FlatList, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import HeaderApp from "../components/base/HeaderApp";
import { Episode, MediaType, Movie, Season } from "../types/Movie";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WebView } from 'react-native-webview';
import { getMovie, getCasts, getReviews } from '../api/MovieApi';
import { RouteProp } from '@react-navigation/native';
import { log } from "../utils/LogConfig";
import { formatCurrency, getMediaType, getNameMovie, getReleaseMovie, getURLImage } from "../utils/MovieUtils";
import { EmbedConfig } from "../config/EmbedConfig";
import { ImageCustom } from "../components/base/ImageCustom";
import { CastItem } from "../components/CastItem";
import { Review } from "../types/Review";
import { ReviewItem } from "../components/ReviewItem";
import { SectionTitle } from "../components/SectionTitle";
import { GenreItem } from "../components/GenreItem";
import { SeasonItem } from "../components/SeasonItem";
import { EpisodeItem } from "../components/EpisodeItem";

interface MovieDetailScreenParams {
    id: number;
    type: MediaType;
}

interface MovieDetailScreenProps {
    route: RouteProp<{ params: MovieDetailScreenParams }, 'params'>;
    navigation: any
}

export const MovieDetailScreen = ({ route, navigation }: MovieDetailScreenProps) => {
    const { id, type } = route.params;
    const [movie, setMovie] = useState<Movie>(new Movie());
    const [casts, setCasts] = useState<Cast[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [seasonSelect, setSeasonSelect] = useState<number>(0);
    const [episodeSelect, setEpisodeSelect] = useState<number>(0);
    // const navigation = useNavigation();
    useEffect(() => {
        fecthMovie()
    }, [])

    const fecthMovie = async () => {
        setIsLoading(true)
        if (id) {
            try {
                const response = await getMovie(id, type);
                response.media_type = type
                setMovie(response);
                fetchCasts(response.id, type)
                fetchReviews(response.id, type)
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        }
    }


    const fetchCasts = async (idIMDB: number, type: MediaType) => {
        try {
            const response = await getCasts(idIMDB, type)
            setCasts(response.cast)
        } catch (error) {
            log.error(error);
        }
    }

    const fetchReviews = async (idIMDB: number, type: MediaType) => {
        try {
            const response = await getReviews(idIMDB, type)
            setReviews(response.results)
        } catch (error) {
            log.error(error);
        }
    }

    const getUrlVideo = () => {
        if (movie.videos?.results != undefined && movie.videos?.results != null && movie.videos?.results.length > 0) {
            return `${EmbedConfig.SERVER_YOUTUBE_EMBED + (movie.videos.results[0].key != "undefined" || null ? movie.videos.results[0].key : '')}`
        }
        return ""
    }


    const renderEpisodes = () => {
        return Array.from({ length: movie.seasons[seasonSelect].episode_count }, (_, index) => (
            <EpisodeItem
                key={index}
                episode={new Episode({ id: index, name: `${index + 1}` })}
                index={index}
                indexSelected={episodeSelect}
                onPressItem={handleEspisodeChange}
            />
        ));
    };

    const handleSeasonChange = (season: Season, index: number) => {
        setSeasonSelect(index)
        setEpisodeSelect(0)
    }

    const handleEspisodeChange = (index: number) => {
        setEpisodeSelect(index)
    }

    const handleWatchMovie = () => {
        navigation.navigate("WatchMovieScreen", { id: movie.id, isTvShow: (movie.media_type == "tv" ? true : false), season: seasonSelect, episode: episodeSelect, idIMDB: movie.imdb_id });
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior="padding"
            >
                <HeaderApp title={getNameMovie(movie)} />
                <ScrollView>
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#219ebc" />
                        </View>
                    ) :
                        <View className="p-[10px]">
                            <ImageCustom
                                resizeMode="cover"
                                className="w-full h-56 rounded-lg mt-12"
                                source={{ uri: getURLImage(movie.backdrop_path) }}
                            />
                            <View className="flex flex-row">
                                <ImageCustom
                                    resizeMode="cover"
                                    className="my-2 h-56 w-48 rounded"
                                    source={{ uri: getURLImage(movie.poster_path) }}
                                />

                                <View className="flex flex-1 flex-grow p-2">
                                    <Text className="text-black text-[600] text-xl">{getNameMovie(movie)}</Text>
                                    <Text className="text-black mt-2 text-sm">{getReleaseMovie(movie)}</Text>
                                    <View className="flex-row mt-2 items-center">
                                        <MaterialCommunityIcons key={0} name="eye" size={24} color={"#ffdab9"} />
                                        <Text className="text-black ml-1 text-sm">{formatCurrency(movie.vote_count)} Đánh giá</Text>
                                    </View>
                                    <View className="flex-row mt-2 items-center">
                                        <MaterialCommunityIcons key={0} name="heart" size={24} color={"#ffd166"} />
                                        <MaterialCommunityIcons key={1} name="heart" size={24} color={"#ffd166"} />
                                        <MaterialCommunityIcons key={2} name="heart" size={24} color={"#ffd166"} />
                                        <MaterialCommunityIcons key={3} name="heart" size={24} color={"#ffd166"} />
                                        <MaterialCommunityIcons key={4} name="heart" size={24} color={"#ffd166"} />
                                        <Text className="text-black ml-2">{movie.vote_average}/10</Text>
                                    </View>
                                    <Text className="text-black mt-2 text-sm">Doanh thu: {formatCurrency(movie.revenue)}</Text>
                                    <Text className="text-black mt-2 text-sm">Thể loại: {getMediaType(movie.media_type)}</Text>
                                </View>
                            </View>
                            <View className="flex flex-row flex-wrap">
                                {movie.genres?.map((item, index) => (
                                    <GenreItem key={index} genre={item} />
                                ))}
                            </View>
                            {
                                (movie.seasons && movie.seasons.length > 0) &&
                                <>
                                    <View>
                                        <SectionTitle title="Các phần" />
                                        <View className="flex flex-row flex-wrap">
                                            {movie.seasons?.map((item, index) => (
                                                <SeasonItem key={index} season={item} onPressItem={handleSeasonChange} indexSelected={seasonSelect} index={index} />
                                            ))}
                                        </View>
                                    </View>
                                    <View>
                                        <SectionTitle title="Các Tập" />
                                        <View className="flex flex-row flex-wrap">
                                            {renderEpisodes()}
                                        </View>
                                    </View>
                                </>
                            }
                            <View>
                                <SectionTitle title="Giới thiệu" />
                                <Text className="text-sm text-black">
                                    {movie.overview}
                                </Text>
                            </View>

                            <View>
                                <SectionTitle title="Trailer" />
                                <WebView
                                    on
                                    className="h-56"
                                    source={{ html: `<iframe width="100%" height="100%" src="${getUrlVideo()}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` }}
                                />
                            </View>

                            <TouchableOpacity onPress={handleWatchMovie}>
                                <View className="flex flex-row my-2 items-center justify-center p-4 bg-[#30638e] rounded">
                                    <Text className="text-white text-center text-lg">
                                        Xem phim
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <View>
                                <SectionTitle title="Diễn viên" />
                                <FlatList
                                    data={casts}
                                    renderItem={({ item }) => <CastItem cast={item} />}
                                    keyExtractor={(item, index) => item + index.toString()}
                                    onEndReachedThreshold={0.5}
                                    horizontal={true}
                                    style={{ marginTop: 10 }}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View>
                                <SectionTitle title="Đánh giá" />
                                {reviews.length > 0 ?
                                    <FlatList
                                        data={reviews}
                                        renderItem={({ item }) => <ReviewItem review={item} />}
                                        keyExtractor={(item, index) => item + index.toString()}
                                        onEndReachedThreshold={0.5}
                                        style={{ marginTop: 10 }}
                                        showsVerticalScrollIndicator={false}
                                    /> :
                                    <Text className="text-black text-center">Không có đánh giá</Text>
                                }
                            </View>

                        </View>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}