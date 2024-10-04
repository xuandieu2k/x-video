import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, View, ActivityIndicator } from 'react-native';
import VideoCustom from './VideoItem'; // Import your VideoCustom component
import { getVideoByKeywordApi } from '../../api/VideoApi';
import { Video } from '../../types/video';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { log } from '../../utils/LogConfig';
import { debounce } from 'lodash';

const { height, width } = Dimensions.get('window');

const VideoPlayerWithRecycler = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentId, setCurrentId] = useState(-1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await getVideoByKeywordApi(1, 10, "vietnam");
            setVideos(response.videos);
            setCurrentId(response.videos[0].id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const layoutProvider = new LayoutProvider(
        (i) => 0,
        (type, dim) => {
            dim.width = width;
            dim.height = height;
        }
    );

    const handleVideoEnd = (index: number) => {
        // Xử lý logic khi video kết thúc
    };

    const getHighestResolutionLink = (video: Video): string | undefined => {
        if (!video.video_files || video.video_files.length === 0) {
            return undefined;
        }

        const highestResolutionFile = video.video_files.reduce((maxFile, currentFile) => {
            if (currentFile.width > maxFile.width || (currentFile.width === maxFile.width && currentFile.height > maxFile.height)) {
                return currentFile;
            }
            return maxFile;
        }, video.video_files[0]);

        return highestResolutionFile.link;
    }
    // const MemoizedVideoCustom = React.memo(VideoCustom);
    const rowRenderer = (type: string | number, data: Video, index: number, extendedState?: object) => {
        try {
            return (
                <View style={{ height, width }}>
                    <VideoCustom
                        id={data.id}
                        videoProps={{
                            source: { uri: getHighestResolutionLink(data) },
                            repeat: true,
                            controls: false,
                        }}
                        currentId={currentId}
                        index={index}
                        onEnd={() => handleVideoEnd(index)}
                    />
                </View>
            );
        } catch (error) {
            log.error('Error rendering row:', error);
            return null;
        }
    };

    const handleVisibleIndicesChanged = debounce((info) => {
        if (info && info.length > 0) {
            const newCurrentId = videos[info[0]].id;
            if (currentId !== newCurrentId) {
                setCurrentId(newCurrentId);
            }
        }
    }, 500);

    if (loading) {
        return (
            <SafeAreaView className='flex-1 items-center justify-center bg-black'>
                <ActivityIndicator className='h-4 w-4' size="large" color="#219ebc" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='flex-1'>
            <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(videos)}
                rowRenderer={rowRenderer}
                isHorizontal={false}
                pagingEnabled={true}
                className="flex-1 bg-black"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onVisibleIndicesChanged={handleVisibleIndicesChanged}
            />
        </SafeAreaView>
    );
};

export default VideoPlayerWithRecycler;