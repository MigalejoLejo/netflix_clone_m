// Imports ---------------------------------------------------------------//
import tw from "twrnc"
import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View, } from 'react-native';

import auth from '@react-native-firebase/auth';

import NetflixLogo from "../ressources/images/NetflixLogo.svg"
import { PlusIcon } from 'react-native-heroicons/outline';

//------------------------------------------------------------------------//



// COMPONENT 
// =========================================================================
const Profile = ({ navigation }) => {

    const SignUserOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }



    // RETURN 
    // =========================================================================
    return (
        <SafeAreaView style={tw``} >


            <View style={tw` h-full flex flex-col bg-black justify-center`} >
                <View style={tw`absolute w-full top-0 py-8 `} >
                    <NetflixLogo width={"200"} />
                </View>
                {/* Profile Cards*/}
                {/* ----------------------------------------------------------- */}
                <View style={tw` flex flex-row flex-wrap gap-3 justify-evenly`} >
                    {USERS.map((user, index) => (
                        <Pressable key={index} style={tw`flex flex-col justify-center items-center`} >
                            <View style={tw`flex w-25 h-25 `}>
                                <Image style={tw`w-full h-full`}
                                    source={{ uri: `${user.avatar}` }}
                                />
                            </View>
                            <Text style={tw`text-white text-xl text-center font-semibold`}>
                                {user.name}
                            </Text>
                        </Pressable>

                    ))}
                    <Pressable style={tw`flex flex-col justify-center items-center`} >
                        <View style={tw` w-25 h-25 flex justify-center items-center`}>
                            <PlusIcon color={tw.color('white')} size={70} />
                        </View>
                        <Text style={tw`text-white text-xl text-center font-semibold`}>
                            Add User
                        </Text>
                    </Pressable>
                </View>

                {/* Add new profile Cards*/}
                {/* ----------------------------------------------------------- */}


                {/* Log Out */}
                {/* ----------------------------------------------------------- */}
                <Pressable
                    style={tw`justify-end items-center pt-30`}
                    onPress={() => SignUserOut()}>
                    <Text style={tw`text-red-500 text-xl font-semibold`}>Log Out</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    )
}

const USERS = [
    { name: "Felix", avatar: "https://api.dicebear.com/6.x/personas/jpg?seed=Felix", link: "/browse" },
    { name: "Aneka", avatar: "https://api.dicebear.com/6.x/personas/jpg?seed=Aneka", link: "/browse" },
    { name: "Matias", avatar: "https://api.dicebear.com/6.x/personas/jpg?seed=Matias", link: "/browse" }]

export default Profile