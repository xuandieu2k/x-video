import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { EmbedConfig } from "../config/EmbedConfig";
import Orientation from "react-native-orientation-locker";
import { StatusBar, StyleSheet } from "react-native";

interface WatchMovieScreenParams {
  id: number;
  isTvShow: boolean;
  season: number;
  episode: number;
  idIMDB: string;
}

interface WatchMovieScreenProps {
  route: RouteProp<{ params: WatchMovieScreenParams }, 'params'>;
}
export const WatchMovieScreen = ({ route }: WatchMovieScreenProps) => {
  const { id, isTvShow, season, episode, idIMDB } = route.params;
  const [src, setSrc] = useState<string>('');
  const getSrc = () => {
    if (isTvShow) {
      setSrc(`${EmbedConfig.SERVER_2EMBED_TV_EMBED}${id}&s=${season}&e=${episode}`)
    } else {
      setSrc(`${EmbedConfig.SERVER_2EMBED_EMBED}${idIMDB}`)
    }
  }

  useEffect(() => {
    // Lock screen orientation to landscape when this screen is displayed
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    // Fetch the correct URL for the iframe
    getSrc();

    // Unlock orientation when leaving this screen
    return () => {
      Orientation.unlockAllOrientations();
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    if (src != "") {
      setHtml(`
              <html>
                <body style='margin:0;padding:0;'>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="${src}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                </body>
              </html>
            `);
    }
  }, [src])

  const [html, setHtml] = useState<string>(`
      <html>
        <body style='margin:0;padding:0;'>
          <iframe 
            width="100%" 
            height="100%" 
            src="${src}" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </body>
      </html>
    `);

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    return false;
    // if (event.navigationType == "click" || event.navigationType == "other") {
    //   return false;
    // }
    // return true;
  };

  return (<WebView
    setBuiltInZoomControls={false}
    setDisplayZoomControls={false}
    onNavigationStateChange={handleNavigationStateChange}
    originWhitelist={['*']}
    source={{ html: html }}
    style={styles.webView}
    scalesPageToFit={true} // Ensures the content scales properly
    javaScriptEnabled={true} // Enables JavaScript for the WebView
    domStorageEnabled={true} // Allows DOM storage
    startInLoadingState={true} // Shows loading indicator while loading
  />)
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',  // Ensure the background is black for a seamless full-screen effect
  },
  webView: {
      flex: 1,
      marginTop: 0,  // Ensure there's no margin at the top
      marginBottom: 0, // Ensure there's no margin at the bottom
      marginLeft: 0, // Ensure there's no margin at the left
      marginRight: 0, // Ensure there's no margin at the right
  },
});