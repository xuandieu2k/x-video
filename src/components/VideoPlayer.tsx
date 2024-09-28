import React, { useRef, useState, useEffect } from 'react';
import PagerView from 'react-native-pager-view';
import VideoCustom from './VideoItem'; // Import your VideoCustom component
import { getVideoByKeywordApi } from '../api/VideoApi';
import { Video } from '../types/video';
import { log } from '../utils/LogConfig';

const VideoPlayer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentId, setCurrentId] = useState(-1);
    const [videos, setVideos] = useState<Video[]>([]);
    const pagerRef = useRef<PagerView | null>(null);

    useEffect(() => {
        fetchVideos();
        return () => {
            if (pagerRef.current) {
                pagerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        // Khi index thay đổi cập nhật id hiện tại để kiểm tra phát/dừng các video
        setCurrentId(videos.length > 0 ? videos[currentIndex].id : 0)
    }, [currentIndex])

    const fetchVideos = async () => {
        try{
            const response = await getVideoByKeywordApi(5, 5, "winter");
            setVideos(response.videos);
            setCurrentId(response.videos[0].id)
        }catch(error){
            log.err(error);
        }
    };

    const handlePageChange = (event: { nativeEvent: { position: number } }) => {
        setCurrentIndex(event.nativeEvent.position);
    };
 
    const handleVideoEnd = () => {
        // if (currentIndex < videos.length - 1) {
        //     pagerRef.current?.setPage(currentIndex + 1);
        // }
        // setIsPaused(true);
    };

    const handleReplay = () => {
        if (currentIndex > 0) {
            pagerRef.current?.setPage(currentIndex - 1);
        }
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

    return (
        <PagerView
            className="flex-1 bg-black"
            orientation="vertical"
            onPageSelected={handlePageChange}
            ref={pagerRef}
            initialPage={0}
            offscreenPageLimit={3}
        >
            {videos.map((video, index) => (
                <VideoCustom
                    key={video.id}
                    id={video.id}
                    videoProps={
                        {
                            source: { uri: getHighestResolutionLink(video) },
                            repeat: true,
                            controls: false
                        }
                    }
                    currentId={currentId}
                    index={index}
                    onEnd={handleVideoEnd}
                />
            ))}
        </PagerView>
    );
};

export default VideoPlayer;