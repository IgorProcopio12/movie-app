import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';


export default function Profile({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: "#222", }}>
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
                <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate("Login")}>
                    <Icon
                        name="logout"
                        size={30}
                        color={"#FFF"}
                        style={styles.icon}
                    />

                    <Text style={{ fontSize: 20, color: 'white' }}>Sair</Text>
                </TouchableOpacity>
            </View>

        </View>
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
