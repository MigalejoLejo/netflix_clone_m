import tw from "twrnc"
import React from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import auth from '@react-native-firebase/auth';


import NetflixLogo from "../ressources/images/NetflixLogo.svg"


const Profile = ({ navigation }) => {

    const SignUserOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <SafeAreaView style={tw``} >


            <View style={tw` h-full flex flex-col bg-black justify-center`} >
                <View style={tw`absolute w-full top-0 py-8 `} >
                    <NetflixLogo width={"200"} />
                </View>
                {/* Profile Cards*/}
                {/* ----------------------------------------------------------- */}
                <View style={tw` bg-red-400 flex flex-row flex-wrap `} >
                    {USERS.map((user, index) => (
                        <Text key={index} style="text-white text-xs text-center">
                            User is:  {user.name}
                        </Text>
                    ))}
                </View>

                {/* Add new profile Cards*/}
                {/* ----------------------------------------------------------- */}
                <View style={tw`bg-green-400 flex flex-row flex-wrap `} >
                    <Text style="text-white text-xs text-center">
                        add new card
                    </Text>
                </View>

                {/* Log Out */}
                {/* ----------------------------------------------------------- */}
                <Pressable
                    style={tw`justify-center items-center`}
                    onPress={() => SignUserOut()}>
                    <Text style={tw`text-white text-xl`}>Log Out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const USERS = [
    { name: "Felix", avatar: "https://api.dicebear.com/6.x/personas/svg?seed=Felix", link: "/browse" },
    { name: "Aneka", avatar: "https://api.dicebear.com/6.x/personas/svg?seed=Aneka", link: "/browse" },
    { name: "Matias", avatar: "https://api.dicebear.com/6.x/personas/svg?seed=Matias", link: "/browse" },
    { name: "Add Profile", avatar: "https://api.dicebear.com/6.x/icons/svg?icon=plug", link: "/browse" },
]

export default Profile