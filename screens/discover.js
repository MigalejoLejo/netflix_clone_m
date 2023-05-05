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


function Discover({ navigation }) {

    return (
        <SafeAreaView>
            <View style={tw`bg-black h-full flex flex-col`}>
                <Text style={tw`text-white`}>downloads</Text>
            </View>
        </SafeAreaView>
    )
}


export default Discover