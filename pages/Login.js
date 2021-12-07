import { Ionicons } from '@expo/vector-icons';
import * as React from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Animated,
    Keyboard, KeyboardAvoidingView, StyleSheet, Text,
    TextInput, TouchableOpacity, View
} from "react-native";
import firebase from '../services/firebase';


export default function Login({ navigation }) {
    const URL = 'http://localhost:3000';
    const [offSet] = React.useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = React.useState(new Animated.Value(0));
    const [logo] = React.useState(new Animated.ValueXY({ x: 130, y: 155 }));
    const [font] = React.useState(new Animated.Value(22));
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [hidePass, setHidePass] = React.useState(true);
    
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@logged',value)
        } catch (e) {
          // saving error
        }
      }    
    
    const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@logged')
        if(value !== null) {
            return value
        }
        } catch(e) {
        // error reading value
        }
    }
    
    (async () => {
        let isLogged = await getData();
        if(isLogged == "true"){
            navigation.navigate("Home");
            console.log(isLogged)
        }
      })()

    const handleLoginFirebase = () => {
        const db = firebase.getAll();
        const usersList = ref(db, 'users/');
        onValue(usersList, (snapshot) => {
            const data = snapshot.val();
            for (const element in data) {
                if (password == data[element].senha && email == data[element].email) {
                    navigation.navigate("Home");
                        storeData("true")
                      
                }
            }
        });
        
    }


    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offSet.y, {
                toValue: 0,
                speed: 1,
                useNativeDriver: false,

            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,

            }),
        ]).start();
    }, []);


    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 105,
                duration: 300,
                useNativeDriver: false,

            }),
            Animated.timing(logo.y, {
                toValue: 115,
                duration: 300,
                useNativeDriver: false,

            }),
            Animated.timing(font, {
                toValue: 14,
                duration: 300,
                useNativeDriver: false,

            }),
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 130,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(logo.y, {
                toValue: 155,
                duration: 300,
                useNativeDriver: false,

            }),
            Animated.timing(font, {
                toValue: 22,
                duration: 300,
                useNativeDriver: false,

            }),
        ]).start();
    }


    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Animated.Image style={{
                    width: logo.x,
                    height: logo.y,
                }} source={require('../src/images/movie.png')} />
                <Animated.Text style={[styles.title,
                {
                    fontSize: font,
                },
                ]}>
                    My Movie List
                </Animated.Text>
            </View>


            <Animated.View
                style={[
                    styles.containerEmail,
                    {
                        opacity: opacity,
                        transform: [{ translateY: offSet.y }],
                    },
                ]}
            >

                <TextInput
                    style={styles.inputEmail}
                    type="Email"
                    keyboardType="email-address"
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={setEmail}

                />
                <Animated.View style={styles.inputArea}>
                    <TextInput
                        maxLength={16}
                        secureTextEntry={hidePass}
                        style={styles.inputSenha}
                        type="password"
                        placeholder="Password"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(texto) => setPassword(texto)}

                    />

                    <TouchableOpacity style={styles.icon}>
                        {hidePass ?

                            <Ionicons name="eye" color="black" size={20} onPress={() => setHidePass(!hidePass)} />
                            :
                            <Ionicons name="eye-off" color="black" size={20} onPress={() => setHidePass(!hidePass)} />

                        }
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity style={styles.btnSubmit} onPress={handleLoginFirebase}>
                    <Text style={styles.submitText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Crie Sua Conta</Text>
                </TouchableOpacity>
            </Animated.View>

        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#191919",
    },
    containerLogo: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'italic',
        justifyContent: 'center',
        fontWeight: "600",
    },
    containerEmail: {
        flex: 1,
        alignItems: "center",
        width: "90%",
    },
    containerSenha: {
        flexDirection: 'row',
        alignItems: "center",
        width: "90%",
    },
    inputEmail: {
        backgroundColor: "#FFF",
        width: "90%",
        marginBottom: 15,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    inputSenha: {
        backgroundColor: "#FFF",
        marginBottom: 15,
        marginTop: 15,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        height: 45,
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputArea: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        marginBottom: 15,

    },
    icon: {
        width: '10%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerButtons: {
        flex: 1,
        alignItems: "center",
        width: "90%",
    },

    btnSubmit: {
        backgroundColor: "#CD2F0D",
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
    },
    submitText: {
        color: "#FFF",
        fontSize: 18,
    },
    btnRegister: {
        marginTop: 10,
    },
    registerText: {
        color: "#FFF",
    },
});
