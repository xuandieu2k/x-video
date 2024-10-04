import React, { useEffect } from 'react';
import VideoPlayer from '../components/reels/VideoPlayer';
import VideoPlayerFlatlist from '../components/reels/VideoPlayerWithFlatlist';
import VideoPlayerWithRecycler from '../components/reels/VideoPlayerWithRecycler';
import { PermissionsAndroid } from 'react-native';

async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Permission to use storage",
        message: "We need access to your storage to cache videos.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the storage");
    } else {
      console.log("Storage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}


const HomeScreen = () => {
  useEffect(() => {
    requestStoragePermission()
  }, [])
  return (
    <VideoPlayer />
  );
};

export default HomeScreen;
