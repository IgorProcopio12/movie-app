import * as React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard
} from "react-native";

import Login from "./pages/Login";
import Home from "./pages/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        // headerTitleAlign: "center",
        // headerMode: "screen",
        // headerTintColor: "#CD2F0D",
        // headerStyle: { backgroundColor: "#191919" },
        headerShown: false,
        
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

  export default function App() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
