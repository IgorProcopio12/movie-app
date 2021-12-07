import * as React from 'react';
import { Text, Animated, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@logged', value)
        console.log(value)
    } catch (e) {
        // saving error
    }
}



export default function Profile({ navigation }) {
    const [opacity] = React.useState(new Animated.Value(0));


    React.useEffect(() => {

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,

            }),
        ]).start();
    }, []);
    return (
        <Animated.View style={{ flex: 1, opacity: opacity, backgroundColor: "#222", }}>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center', color: 'white', marginTop: 40, marginBottom: 10 }}>Perfil</Text>
            <View>
                <TouchableOpacity style={styles.itens}>
                    <Icon
                        name="settings"
                        size={30}
                        color={"#FFF"}
                        style={styles.icon}
                    />

                    <Text style={{ fontSize: 20, color: 'white' }}>Configurações do aplicativo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itens}>
                    <Icon
                        name="face-retouching-natural"
                        size={30}
                        color={"#FFF"}
                        style={styles.icon}
                    />

                    <Text style={{ fontSize: 20, color: 'white' }}>Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itens}>
                    <Icon
                        name="help"
                        size={30}
                        color={"#FFF"}
                        style={styles.icon}
                    />

                    <Text style={{ fontSize: 20, color: 'white' }}>Ajuda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itens} onPress={() => { navigation.navigate("Login"); storeData("false") }}>
                    <Icon
                        name="logout"
                        size={30}
                        color={"#FFF"}
                        style={styles.icon}
                    />

                    <Text style={{ fontSize: 20, color: 'white' }}>Sair</Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    itens: {
        textAlign: 'left',
        backgroundColor: '#333',
        marginTop: 2,
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 10


    },
    icon: {
        flexDirection: 'row',
        paddingRight: 8,
    }
})
