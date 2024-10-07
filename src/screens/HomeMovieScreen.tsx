import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeTabScreen } from './HomeTabScreen';

const Tab = createMaterialBottomTabNavigator();

export const HomeMovieScreen = () => {
    return (
        <Tab.Navigator
            style={{ borderTopEndRadius: 8, borderBottomStartRadius: 8 }}
            initialRouteName="HomeMovie"
            activeColor="#e91e63"
            backBehavior="initialRoute"
            barStyle={{ backgroundColor: '#e3d5ca' }}
            shifting={true} // Optional: This will give an animation effect
            sceneAnimationEnabled={false}
            labeled={false}
        >
            <Tab.Screen
                key={1}
                name="Home"
                component={HomeTabScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};