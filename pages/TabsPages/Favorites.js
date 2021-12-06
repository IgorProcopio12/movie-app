import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useList } from 'react-firebase-hooks/database'
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from '../../services/firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

import { Modalize } from 'react-native-modalize';

export default function Favorties() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#222" }}>
        <Text>Lista</Text>
      </View>
    )
}