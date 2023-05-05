import tw from "twrnc"
import React from 'react';
import {
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


function SignIn({ navigation }) {

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}>
                <KeyboardAvoidingView behaviour={Platform.OS == "ios" ? "padding" : "height"}>

                    <View style={tw`bg-black h-full px-10 flex flex-col justify-center bg-gray-300`}>

                        {/* Netflix Logo */}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex h-1/3 justify-center items-center`} >
                            <NetflixLogo width={"200"} />
                        </View>



                        {/* Input fields*/}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex items-center h-1/2 `} >

                            <Text style={tw`text-gray-800 text-base w-full text-center mb-4`}>We will send you an email with instructions on how to reset your password.</Text>

                            <View style={tw`bg-white rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-lg text-black`}
                                    placeholderTextColor={tw.color("text-gray-600/50")}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    // autoComplete={"false"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>


                            {/* Buttons */}
                            {/* ----------------------------------------------------------- */}
                            <Pressable
                                title="Log In"
                                // TODO:  change this nav -------------------------------- <<<
                                onPress={() => navigation.navigate('SignIn')}>
                                <Text style={tw`text-sky-500 text-xl font-bold mt-8`}>Send me a code</Text>
                            </Pressable>

                            <View style={tw`flex flex-col gap-4 mt-5 w-full items-center`}>
                                <Pressable
                                    title="Sign Up"
                                    onPress={() => navigation.navigate('SignIn')}>
                                    <View style={tw`flex flex-row gap-2 mt-20 w-full`}>
                                        <Text style={tw`text-black text-lg `}>Go back</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default SignIn