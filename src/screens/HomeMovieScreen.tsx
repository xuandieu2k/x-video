import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailsScreen from './DetailsScreen';
import { HotScreen } from './HotScreen';
import { MovieDetailScreen } from './MovieDetailScreen';
import { HomeTabScreen } from './HomeTabScreen';

const Tab = createMaterialBottomTabNavigator();

export const HomeMovieScreen = () => {
    return <Tab.Navigator
        initialRouteName="Hot"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: '#e3d5ca' }}
    >

        <Tab.Screen
            key={0}
            name="Hot"
            component={HotScreen}
            options={{
                tabBarLabel: 'Hots',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={24} />
                ),
            }}
        />

        <Tab.Screen
            key={1}
            name="Home"
            component={HomeTabScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            key={2}
            name="Setting"
            component={DetailsScreen}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={24} />
                ),
            }}
        />
    </Tab.Navigator>
}