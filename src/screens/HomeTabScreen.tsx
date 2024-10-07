import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatListSlider } from "react-native-flatlist-slider";
import { SectionTitle } from "../components/SectionTitle";
import { MediaType, Movie } from '../types/Movie';
import { MovieHorizationalItem } from "../components/MovieHorizationalItem";
import { getMovieUpComing, getTrending } from "../api/MovieApi";
import { MovieItem } from "../components/MovieItem";
import { getURLImage } from "../utils/MovieUtils";
import { ImageCustom } from "../components/base/ImageCustom";
import { MovieHorizationalItemShimmer } from "../components/shimmer/MovieHorizationalItemShimmer";
import { BannerShimmer } from "../components/shimmer/BannerShimmer";
import { MovieItemShimmer } from "../components/shimmer/MovieItemShimmer";

interface HomeTabScreenProps {
  navigation: any;
}

export const HomeTabScreen: React.FC<HomeTabScreenProps> = ({ navigation }) => {
  const [moviesUpcoming, setMoviesUpcoming] = useState<Movie[]>([]);
  const [moviesFeatured, setMoviesFeatured] = useState<Movie[]>([]);
  const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
  const [moviesTrending, setMoviesTrending] = useState<Movie[]>([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [currentPage, setCurrentPage] = useState(3);
  const [isFetchingTrending, setIsFetchingTrending] = useState(false);
  const [isFetchingUpcoming, setIsFetchingUpcoming] = useState(false);
  const [isFetchingPopular, setIsFetchingPopular] = useState(false);
  const [isFetchingFeatured, setIsFetchingFeatured] = useState(false);

  useEffect(() => {
    fetchMoviesUpComing(1);
    fetchFeatured(2);
    fetchMoviesPopular(1);
    // fetchMoviesTrending(currentPage);
  }, []);

  useEffect(() => {
    if (hasMorePages) {
      fetchMoviesTrending(currentPage);
    }
  }, [currentPage]);

  const fetchMoviesUpComing = useCallback(async (page: number) => {
    if (isFetchingUpcoming) return;
    setIsFetchingUpcoming(true);
    try {
      const response = await getMovieUpComing(page);
      setMoviesUpcoming(response.results.map((movie) => ({
        ...movie,
        media_type: movie.media_type === MediaType.NotFound ? MediaType.Movie : movie.media_type,
      })));
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingUpcoming(false);
    }
  }, [isFetchingUpcoming]);

  const fetchMoviesPopular = useCallback(async (page: number) => {
    if (isFetchingPopular) return;
    setIsFetchingPopular(true);
    try {
      const response = await getTrending(page);
      setMoviesPopular(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingPopular(false);
    }
  }, [isFetchingPopular]);

  const fetchFeatured = useCallback(async (page: number) => {
    if (isFetchingFeatured) return;
    setIsFetchingFeatured(true);
    try {
      const response = await getTrending(page);
      setMoviesFeatured(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingFeatured(false);
    }
  }, [isFetchingFeatured]);

  const fetchMoviesTrending = useCallback(async (page: number) => {
    if (isFetchingTrending) return;
    setIsFetchingTrending(true);
    try {
      const response = await getTrending(page);
      console.log(response.total_pages, page);
      setMoviesTrending((prevMovies) => [...prevMovies, ...response.results]);
      setHasMorePages(response.total_pages > page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTrending(false);
    }
  }, [isFetchingTrending]);

  const handleLoadMore = () => {
    if (!hasMorePages || isFetchingTrending) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickItem = useCallback(
    (item: Movie) => navigation.navigate("MovieDetailScreen", { id: item.id, type: item.media_type }),
    [navigation]
  );

  const handleClickSeemore = useCallback(() => {
    navigation.navigate("HotScreen");
  }, [navigation]);

  const handleClickSearch = useCallback(() => {
    navigation.navigate("SearchMovieScreen");
  }, [navigation]);

  const renderSlider = useMemo(() => {
    return isFetchingUpcoming ? (
      <BannerShimmer key={Math.random()} />
    ) : (
      <FlatListSlider
        indicator={false}
        data={moviesUpcoming.map((movie) => ({
          image: getURLImage(movie.backdrop_path),
          desc: movie.overview,
          movie: movie,
        }))}
        onPress={(item) => handleClickItem(moviesUpcoming[item])}
      />
    );
  }, [moviesUpcoming, isFetchingUpcoming, handleClickItem]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <FlatList
          data={[{ key: "slider" }, { key: "featured" }, { key: "popular" }, { key: "trending" }]}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            switch (item.key) {
              case "slider":
                return <View style={{ marginBottom: 16 }}>{renderSlider}</View>;
              case "featured":
                return (
                  <View style={{ marginBottom: 16 }}>
                    <SectionTitle classParentName="ml-2" title="Nổi bật" hiddenTextRight={false} onPressSeemore={handleClickSeemore} />
                    {isFetchingFeatured ? (
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={new Array(5).fill(null)}
                        renderItem={() => <MovieHorizationalItemShimmer key={Math.random()} />}
                      />
                    ) : (
                      <FlatList
                        data={moviesFeatured}
                        horizontal
                        renderItem={({ item }) => <MovieHorizationalItem item={item} onClickItem={handleClickItem} />}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  </View>
                );
              case "popular":
                return (
                  <View style={{ marginBottom: 16, }}>
                    <SectionTitle classParentName="ml-2" title="Phổ biến" hiddenTextRight={false} onPressSeemore={handleClickSeemore} />
                    {isFetchingPopular ? (
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={new Array(5).fill(null)}
                        renderItem={() => <MovieHorizationalItemShimmer key={Math.random()} />}
                      />
                    ) : (
                      <FlatList
                        data={moviesPopular}
                        horizontal
                        renderItem={({ item }) => <MovieHorizationalItem item={item} onClickItem={handleClickItem} />}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  </View>
                );
              case "trending":
                return (
                  <View style={{ marginHorizontal: 8 }}>
                    <SectionTitle title="Trending today" hiddenTextRight={false} onPressSeemore={handleClickSeemore} />
                    {isFetchingTrending && currentPage === 1 ? (
                      <FlatList
                        data={new Array(3).fill(null)}
                        renderItem={() => <MovieItemShimmer key={Math.random()} />}
                        showsVerticalScrollIndicator={false}
                      />
                    ) : (
                      <FlatList
                        data={moviesTrending}
                        renderItem={({ item }) => <MovieItem movie={item} onPress={() => handleClickItem(item)} />}
                        keyExtractor={(item) => 'trending' + item.id.toString()}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                        ListFooterComponent={() => 
                          hasMorePages ? <ActivityIndicator size="large" color="#219ebc" /> : null
                        }
                      />
                    )}
                  </View>
                );
              default:
                return null;
            }
          }}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleClickSearch}>
          <View style={{ position: "absolute", bottom: 0, right: 0, margin: 16, padding: 8, backgroundColor: "#00b4d8", borderRadius: 50 }}>
            <ImageCustom source={{ uri: "https://img.icons8.com/color/512/search.png" }} style={{ height: 32, width: 32 }} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { FlatListSlider } from "react-native-flatlist-slider";
// import { SectionTitle } from "../components/SectionTitle";
// import { MediaType, Movie } from "../types/Movie";
// import { MovieHorizationalItem } from "../components/MovieHorizationalItem";
// import { getMovieUpComing, getTrending } from "../api/MovieApi";
// import { MovieItem } from "../components/MovieItem";
// import { getURLImage } from "../utils/MovieUtils";
// import { ImageCustom } from "../components/base/ImageCustom";
// import { MovieHorizationalItemShimmer } from "../components/shimmer/MovieHorizationalItemShimmer";
// import { BannerShimmer } from "../components/shimmer/BannerShimmer";
// import { MovieItemShimmer } from "../components/shimmer/MovieItemShimmer";

// interface HomeTabScreenProps {
//   navigation: any;
// }

// const HomeTabScreen: React.FC<HomeTabScreenProps> = ({ navigation }) => {
//   const [moviesUpcoming, setMoviesUpcoming] = useState<Movie[]>([]);
//   const [moviesFeatured, setMoviesFeatured] = useState<Movie[]>([]);
//   const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
//   const [moviesTrending, setMoviesTrending] = useState<Movie[]>([]);
//   const [hasMorePages, setHasMorePages] = useState(true);
//   const [currentPage, setCurrentPage] = useState(3);
//   const [loading, setLoading] = useState({
//     trending: false,
//     upcoming: false,
//     popular: false,
//     featured: false,
//   });

//   const fetchMovies = async (page: number) => {
//     try {
//       const upcomingResponse = await getMovieUpComing(page);
//       setMoviesUpcoming(upcomingResponse.results.map(movie => ({
//         ...movie,
//         media_type: movie.media_type === MediaType.NotFound ? MediaType.Movie : movie.media_type,
//       })));
      
//       const popularResponse = await getTrending(page);
//       setMoviesPopular(popularResponse.results);
//       setMoviesFeatured(popularResponse.results);
      
//       const trendingResponse = await getTrending(page);
//       setMoviesTrending(prevMovies => [...prevMovies, ...trendingResponse.results]);
//       setHasMorePages(trendingResponse.total_pages > page);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(prev => ({ ...prev, trending: false, upcoming: false, popular: false, featured: false }));
//     }
//   };

//   useEffect(() => {
//     setLoading(prev => ({ ...prev, upcoming: true, featured: true, popular: true }));
//     fetchMovies(1);
//   }, []);

//   useEffect(() => {
//     if (hasMorePages && !loading.trending) {
//       setLoading(prev => ({ ...prev, trending: true }));
//       fetchMovies(currentPage);
//     }
//   }, [currentPage, hasMorePages]);

//   const handleLoadMore = () => {
//     if (hasMorePages && !loading.trending) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handleClickItem = useCallback(
//     (item: Movie) => navigation.navigate("MovieDetailScreen", { id: item.id, type: item.media_type }),
//     [navigation]
//   );

//   const handleClickSeemore = useCallback(() => {
//     navigation.navigate("HotScreen");
//   }, [navigation]);

//   const handleClickSearch = useCallback(() => {
//     navigation.navigate("SearchMovieScreen");
//   }, [navigation]);

//   const renderSlider = useMemo(() => {
//     return loading.upcoming ? (
//       <BannerShimmer key={Math.random()} />
//     ) : (
//       <FlatListSlider
//         indicator={false}
//         data={moviesUpcoming.map((movie) => ({
//           image: getURLImage(movie.backdrop_path),
//           desc: movie.overview,
//           movie: movie,
//         }))}
//         onPress={(item) => handleClickItem(moviesUpcoming[item])}
//       />
//     );
//   }, [moviesUpcoming, loading.upcoming, handleClickItem]);

//   const renderSection = (title: string, data: Movie[], isLoading: boolean, renderItem: any) => (
//     <View style={{ marginBottom: 16 }}>
//       <SectionTitle classParentName="ml-2" title={title} hiddenTextRight={false} onPressSeemore={handleClickSeemore} />
//       {isLoading ? (
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={new Array(5).fill(null)}
//           renderItem={() => <MovieHorizationalItemShimmer key={Math.random()} />}
//         />
//       ) : (
//         <FlatList
//           data={data}
//           horizontal
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//         <FlatList
//           data={[{ key: "slider" }, { key: "featured" }, { key: "popular" }, { key: "trending" }]}
//           keyExtractor={(item) => item.key}
//           renderItem={({ item }) => {
//             switch (item.key) {
//               case "slider":
//                 return <View style={{ marginBottom: 16 }}>{renderSlider}</View>;
//               case "featured":
//                 return renderSection("Nổi bật", moviesFeatured, loading.featured, 
//                   ({ item }) => <MovieHorizationalItem item={item} onClickItem={handleClickItem} />);
//               case "popular":
//                 return renderSection("Phổ biến", moviesPopular, loading.popular, 
//                   ({ item }) => <MovieHorizationalItem item={item} onClickItem={handleClickItem} />);
//               case "trending":
//                 return (
//                   <View style={{ marginHorizontal: 8 }}>
//                     <SectionTitle title="Trending today" hiddenTextRight={false} onPressSeemore={handleClickSeemore} />
//                     {loading.trending && currentPage === 1 ? (
//                       <FlatList
//                         data={new Array(3).fill(null)}
//                         renderItem={() => <MovieItemShimmer key={Math.random()} />}
//                         showsVerticalScrollIndicator={false}
//                       />
//                     ) : (
//                       <FlatList
//                         data={moviesTrending}
//                         renderItem={({ item }) => <MovieItem movie={item} onPress={() => handleClickItem(item)} />}
//                         keyExtractor={(item) => 'trending' + item.id.toString()}
//                         onEndReached={handleLoadMore}
//                         onEndReachedThreshold={0.5}
//                         initialNumToRender={10}
//                         maxToRenderPerBatch={5}
//                         windowSize={5}
//                         ListFooterComponent={() => 
//                           hasMorePages ? <ActivityIndicator size="large" color="#219ebc" /> : null
//                         }
//                       />
//                     )}
//                   </View>
//                 );
//               default:
//                 return null;
//             }
//           }}
//           showsVerticalScrollIndicator={false}
//         />
//         <TouchableOpacity onPress={handleClickSearch}>
//           <View style={{ position: "absolute", bottom: 0, right: 0, margin: 16, padding: 8, backgroundColor: "#00b4d8", borderRadius: 50 }}>
//             <ImageCustom source={{ uri: "https://img.icons8.com/color/512/search.png" }} style={{ height: 32, width: 32 }} />
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default HomeTabScreen;
