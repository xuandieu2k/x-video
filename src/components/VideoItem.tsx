import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Video, { OnProgressData, ReactVideoProps, VideoRef } from 'react-native-video';
import { log } from '../utils/LogConfig';
import ReelsSlider from './ReelsSlider';

interface VideoProps {
  id: number;
  onEnd: () => void;
  videoProps: ReactVideoProps,
  currentId: number,
  index: number
}

const VideoCustom: React.FC<VideoProps> =
  React.memo(
    ({ onEnd, currentId, id, videoProps }) => {
      const [videoDuration, setVideoDuration] = useState(0);
      const [paused, setPaused] = useState<boolean>(id !== currentId); // true: paused, false: play
      const [currentTime, setCurrentTime] = useState(0);
      const [seekValue, setSeekValue] = useState(0);

      const videoRef = useRef<VideoRef | null>(null);

      const handleSeek = (value: number) => {
        if (videoRef.current) {
          videoRef.current.seek((value / 100) * videoDuration);
        }
      };

      useEffect(() => {
        return () => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current = null;
          }
        };
      }, []);

      useEffect(() => {
        setPaused(id !== currentId);
        log.warn('Id changed: ' + id + ' - ' + currentId);
      }, [currentId])


      useEffect(() => {
        setCurrentTime(0);
      }, [videoProps.source]);

      const handleVideoEnd = () => {
        onEnd();
      };

      const formatTime = (seconds: number | null | undefined): string => {
        if (seconds === null || seconds === undefined || isNaN(seconds)) {
          return '00:00';
        }

        const absSeconds = Math.max(seconds, 0);
        const minutes = Math.floor(absSeconds / 60).toString().padStart(2, '0');
        let remainingSeconds = "00";
        if (Math.floor(absSeconds % 60) != 0) {
          remainingSeconds = Math.floor(absSeconds % 60).toString().padStart(2, '0');
        }
        return `${minutes}:${remainingSeconds}`;
      };

      const onProgress = ({ currentTime: newTime }: OnProgressData) => {
        // if (videoDuration === 0 || currentId !== id) {
        //   return;
        // }

        if (currentTime !== newTime) {
          setCurrentTime(newTime);
          const seekValue = Math.floor((newTime / videoDuration) * 100);
          setSeekValue(seekValue);
        }
        log.info('Video playing on Progess ' + id + " --- " + newTime);
      };

      if(currentId != id){
        return null
      }

      return (
        <View className="flex-1 justify-center items-center">
          <Video
            poster={videoProps.poster}
            playInBackground={false}
            ref={videoRef}
            source={videoProps.source}
            className="w-full h-full"
            resizeMode="none"
            paused={paused}
            repeat={videoProps.repeat}
            controls={videoProps.controls}
            onEnd={handleVideoEnd}
            onLoad={({ duration }) => setVideoDuration(duration)}
            onProgress={onProgress}
          // bufferConfig={{
          //   minBufferMs: 15000,
          //   maxBufferMs: 30000,
          //   bufferForPlaybackMs: 2500,
          //   bufferForPlaybackAfterRebufferMs: 5000,
          // }}
          />
          <View className="absolute bottom-5 left-0 right-0 items-center">
            <View className="w-full">
              <ReelsSlider
                minimumValue={0}
                maximumValue={100}
                value={seekValue}
                onValueChange={handleSeek}
                minimumTrackTintColor="#2a9d8f"
                maximumTrackTintColor="#e9c46a"
              />
              <View className="flex flex-row mt-1 mx-4">
                <Text className="flex-1 text-white">{formatTime(currentTime)}</Text>
                <Text className="flex-1 text-white text-right">{formatTime(videoDuration)}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.id === nextProps.id && prevProps.currentId === nextProps.currentId;
    }
  );






// React.memo(({ onEnd, currentId, id, videoProps }) => {
//   const [videoDuration, setVideoDuration] = useState(0);
//   const [paused, setPaused] = useState<boolean>(id !== currentId); // true: paused, false: play
//   const [currentTime, setCurrentTime] = useState(0);
//   const [seekValue, setSeekValue] = useState(0);

//   const videoRef = useRef<VideoRef | null>(null);

//   const handleSeek = (value: number) => {
//     if (videoRef.current) {
//       videoRef.current.seek((value / 100) * videoDuration);
//     }
//   };

//   useEffect(() => {
//     return () => {
//         if (videoRef.current) {
//             videoRef.current.pause();
//             videoRef.current = null;
//         }
//     };
// }, []);

//   useEffect(() => {
//     setPaused(id !== currentId);
//     log.warn('Id changed: ' + id + ' - ' + currentId);
//   }, [currentId])


//   useEffect(() => {
//     setCurrentTime(0);
//   }, [videoProps.source]);

//   const handleVideoEnd = () => {
//     onEnd();
//   };

//   const formatTime = (seconds: number | null | undefined): string => {
//     if (seconds === null || seconds === undefined || isNaN(seconds)) {
//       return '00:00';
//     }

//     const absSeconds = Math.max(seconds, 0);
//     const minutes = Math.floor(absSeconds / 60).toString().padStart(2, '0');
//     let remainingSeconds = "00";
//     if (Math.floor(absSeconds % 60) != 0) {
//       remainingSeconds = Math.floor(absSeconds % 60).toString().padStart(2, '0');
//     }
//     return `${minutes}:${remainingSeconds}`;
//   };

//   const onProgress = ({ currentTime: newTime }: OnProgressData) => {
//     if (videoDuration === 0 || currentId !== id) {
//       return;
//   }

//   if (currentTime !== newTime) {
//       setCurrentTime(newTime);
//       const seekValue = Math.floor((newTime / videoDuration) * 100);
//       setSeekValue(seekValue);
//   }
//     log.info('Video playing ' + id + " --- " + newTime);
//   };

//   return (
//     <View className="flex-1 justify-center items-center">
//       <Video
//         playInBackground={false}
//         ref={videoRef}
//         source={videoProps.source}
//         className="w-full h-full"
//         resizeMode="none"
//         paused={paused}
//         repeat={videoProps.repeat}
//         controls={videoProps.controls}
//         onEnd={handleVideoEnd}
//         onLoad={({ duration }) => setVideoDuration(duration)}
//         onProgress={onProgress}
//       // bufferConfig={{
//       //   minBufferMs: 15000,
//       //   maxBufferMs: 30000,
//       //   bufferForPlaybackMs: 2500,
//       //   bufferForPlaybackAfterRebufferMs: 5000,
//       // }}
//       />
//       <View className="absolute bottom-5 left-0 right-0 items-center">
//         <View className="w-full">
//           <ReelsSlider
//             minimumValue={0}
//             maximumValue={100}
//             value={seekValue}
//             onValueChange={handleSeek}
//             minimumTrackTintColor="#2a9d8f"
//             maximumTrackTintColor="#e9c46a"
//           />
//           <View className="flex flex-row mt-1 mx-4">
//             <Text className="flex-1 text-white">{formatTime(currentTime)}</Text>
//             <Text className="flex-1 text-white text-right">{formatTime(videoDuration)}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// });

export default VideoCustom;