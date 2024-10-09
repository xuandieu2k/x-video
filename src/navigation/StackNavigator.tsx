
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import { MovieDetailScreen } from '../screens/MovieDetailScreen';
import { HomeMovieScreen } from '../screens/HomeMovieScreen';
import { WatchMovieScreen } from '../screens/WatchMovieScreen';
import { SearchMovieScreen } from '../screens/SearchMovieScreen';
import { SeemoreScreen } from '../screens/SeemoreScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          key={0}
          name="Home"
          component={HomeMovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          key={1}
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          key={2}
          name="WatchMovieScreen"
          component={WatchMovieScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          key={3}
          name="SeemoreScreen"
          component={SeemoreScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          key={4}
          name="SearchMovieScreen"
          component={SearchMovieScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;