
import React, { useRef, useState, useEffect } from 'react';
import VideoCustom from './VideoItem'; // Import your VideoCustom component
import { getVideoByKeywordApi } from '../api/VideoApi';
import { Video } from '../types/video';
import { log } from '../utils/LogConfig';
import { Animated, View, Dimensions, FlatList } from 'react-native';

const { height } = Dimensions.get('window');

const VideoPlayerFlatlist = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentId, setCurrentId] = useState(-1);
    const [videos, setVideos] = useState<Video[]>([]);
    const flatListRef = useRef<FlatList | null>(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        setCurrentId(videos.length > 0 ? videos[currentIndex].id : 0);
    }, [currentIndex]);

    const fetchVideos = async () => {
        try {
            const response = await getVideoByKeywordApi(5, 5, "winter");
            setVideos(response.videos);
            setCurrentId(response.videos[0].id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 100, // Ít nhất 50% video hiển thị mới được tính
    };

    const getHighestResolutionLink = (video: Video): string => {
        if (!video.video_files || video.video_files.length === 0) {
            return "";
        }

        const highestResolutionFile = video.video_files.reduce((maxFile, currentFile) => {
            if (currentFile.width > maxFile.width || (currentFile.width === maxFile.width && currentFile.height > maxFile.height)) {
                return currentFile;
            }
            return maxFile;
        }, video.video_files[0]);

        return highestResolutionFile.link;
    };

    const renderItem = ({ item, index }: { item: Video, index: number }) => {
        const inputRange = [(index - 1) * height, index * height, (index + 1) * height];
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={{ height, transform: [{ scale }], opacity }}>
                <VideoCustom
                    key={item.id}
                    id={item.id}
                    videoProps={{
                        source: { uri: getHighestResolutionLink(item) },
                        repeat: true,
                        controls: false
                    }}
                    currentId={currentId}
                    index={index}
                    onEnd={() => handleVideoEnd(index)}
                />
            </Animated.View>
        );
    };

    const handleVideoEnd = (index: number) => {
        // Xử lý logic khi video kết thúc
    };

    return (
        <Animated.FlatList
            className={"bg-black"}
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={flatListRef}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={handleViewableItemsChanged}
        />
    );
};

export default VideoPlayerFlatlist;