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

import NetflixLogo from "../ressources/images/NetflixLogo.svg"


function UserSelect({ navigation }) {

    return (
        <SafeAreaView>
            <View style={tw`bg-black h-full flex flex-col`}>

                {/* Netflix Logo */}
                {/* ----------------------------------------------------------- */}
                <View style={tw`h-30 justify-center`} >
                    <NetflixLogo width={"200"} />
                </View>

                {/* Profile Cards*/}
                {/* ----------------------------------------------------------- */}
                <View style={tw` w-full`} >
                    {USERS.map((user, index) => (
                            <Text style="text-white text-xs text-center">
                               User is:  {user.name}
                            </Text>
                    ))}
                </View>

                {/* Add new profile Cards*/}
                {/* ----------------------------------------------------------- */}
                <View style={tw` `} >

                </View>
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

export default UserSelect