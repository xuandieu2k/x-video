import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/Index';
import ErrorBoundary from './src/components/base/ErrorBoundary';
import { Alert, BackHandler, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import { SplashScreen } from './src/screens/SplashScreen';

const App = () => {
  const [isSplash, setSplash] = useState<boolean>(true)
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <ErrorBoundary>
      <Provider store={store}>
        {!isSplash ?
          <SafeAreaProvider>
            {/* <SafeAreaView style={{ flex: 1 }}> */}
            <StackNavigator />

            {/* </SafeAreaView> */}
          </SafeAreaProvider> :
          <SplashScreen />
        }

      </Provider>
    </ErrorBoundary>
  );
};

export default App;