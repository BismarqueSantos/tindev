import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import api from '../services/api'; 

import logo from '../assets/imgs/logo.png';

function Main({ navigation }){

    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);

    console.log(id);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: { 
                    user: id,
                 }
            });

            setUsers(response.data);
        }

        loadUsers();
    }, [id])

    async function handleLike(){

        const [user, ... rest] = users;

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {user: id},
        })

        setUsers(rest);
    }

    async function handleDislike(){

        const [user, ... rest] = users;

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {user: id},
        })

        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }


    return(
        <SafeAreaView style={Styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={Styles.logo} source={logo}/>
            </TouchableOpacity> 
                <View style={Styles.cardsContainer}>
                    {users.length === 0 
                    ? <Text style={Styles.empty}>VOCÊ NÃOOOOOO TEM MAIS AMIGOS </Text>
                        :(
                            users.map((user, index) => (
                                <View key={user._id} style={[Styles.card, {zIndex: users.length - index }]}>  
                                    <Image style={Styles.imgCard} source={ {uri: user.avatar }}/>
                                    <View style={Styles.footerCard}>
                                        <Text style={Styles.nameCard}>
                                            {user.name}
                                        </Text>
                                        <Text style={Styles.bioCard} numberOfLines={3}>
                                            {user.bio}
                                        </Text>
                                    </View>
                                </View>
                            )) 

                        )
                    }  
        
                </View>

            
                {users.length > 0 && (
                    <View style={Styles.buttonsContainer}>
                        <TouchableOpacity style={Styles.buttonLike} onPress={handleLike}>
                            <Text style={Styles.buttonText}>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.buttonDelike} onPress={handleDislike}>
                            <Text style={Styles.buttonText}>DesLike</Text>
                        </TouchableOpacity>
                    </View>
                )}

        </SafeAreaView>
    )
}
export default Main;

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width - 100;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
    },
    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card:{
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imgCard:{
        flex: 1,
        height: 300,
    },
    footerCard:{
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    nameCard:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    bioCard:{
        fontSize: 14,
        color: '#999999',
        marginTop: 5,
        lineHeight: 18,
    },
    logo:{
        marginTop: 30,
        width: imageWidth,
        height: 100,
        resizeMode: "contain",
    },
    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 30,
    },
    buttonLike:{
        borderWidth : 1,
        borderColor: '#dddddd',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 100,
        marginHorizontal: 10,
        backgroundColor: 'cyan',
        elevation:  2,
    },
    buttonDelike:{
        borderWidth : 1,
        borderColor: '#dddddd',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 100,
        marginHorizontal: 10,
        backgroundColor: 'lightcoral',
        elevation:  2,
    },
    buttonText:{
        textAlign: 'center',
        color: '#ffffff',
    },
    empty:{
        alignSelf: 'center',
        color: '#999999',
        fontSize: 24,
        textAlign: 'center',

    }

})