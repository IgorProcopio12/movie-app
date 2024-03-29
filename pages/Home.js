import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, Feather } from '@expo/vector-icons';

import HomeScreen from './TabsPages/HomeScreen';
import Add from './TabsPages/Add';
import Profile from './TabsPages/Profile';
import AddButton from '../Components/AddButton';
import Favorties from './TabsPages/Favorites';





const Tab = createBottomTabNavigator();



export default function Home({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName="Início"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopColor: 'transparent',


                },
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: '#FFFFFF',
                tabStyle: {
                    paddingTop: 15,
                    paddingBottom: 5,
                }
            }}>
            <Tab.Screen
                name="Início"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="home" size={size} color={color} style={{ marginBottom: 10, }} />
                    )
                }}
            />
            <Tab.Screen
                name="Adicionar"
                component={Add}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="add-to-list" size={size} color={color} style={{ marginBottom: 10, }} />
                    )
                }}
            />

            <Tab.Screen
                name="Favoritos"
                component={Favorties}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="list" size={size} color={color} style={{ marginBottom: 10, }} />
                    )
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="user" size={size} color={color} style={{ marginBottom: 10, }} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

