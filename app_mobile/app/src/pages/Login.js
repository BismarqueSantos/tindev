import React, { useState, useEffect} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { View, Image,Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import api from '../services/api';

import logo from '../assets/imgs/logo.png';

function Login({ navigation }){
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })
            }
        })
    }, []);

    async function handleLogin(){
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id});
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
        >
        <Image style={styles.logo} source={logo} />
        <TextInput  
            autoCapitalize="none"
            autoCorrect={false}            
            placeholder="Digite Seu usuario no github"
            style={styles.input}
            value= {user}
            onChangeText={setUser}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.botao}>
            <Text style={styles.textobotao}> Vaiii</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
export default Login;


const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width - 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    logo: {
        width: imageWidth,
        height: 100,
        resizeMode: "contain",
    },
    input:{
        height: 50,
        alignSelf: 'stretch',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },
    botao:{
        backgroundColor: '#333',
        marginTop: 20,
        alignSelf: 'stretch',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textobotao:{
        fontSize: 14,
        color: '#fff',

    }
})