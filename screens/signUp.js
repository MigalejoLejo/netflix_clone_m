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


function SignUp({ navigation }) {

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}>
                <KeyboardAvoidingView behaviour={Platform.OS == "ios" ? "padding" : "height"}>

                    <View style={tw`bg-black h-full px-10 flex flex-col justify-center`}>

                        {/* Netflix Logo */}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex h-1/3 justify-center items-center`} >
                            <NetflixLogo width={200} />
                            <Text style={tw`text-red-600 text-lg`}
                            >- clone -</Text>
                        </View>

                        {/* Input fields*/}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex items-center h-1/2 `} >
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    // autoComplete={"false"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    placeholder="Password"
                                    autoCorrect={false}
                                    autoComplete={"off"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    placeholder="Repeat password"
                                    autoCorrect={false}
                                    autoComplete={"off"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>


                            {/* Buttons */}
                            {/* ----------------------------------------------------------- */}
                            <Pressable
                                style={tw`w-full rounded-md flex justify-center h-[15] mt-4 items-center bg-red-600`}

                                title="Log In"
                                // TODO:  change this nav -------------------------------- <<<
                                onPress={() => navigation.navigate('SignUp')}>
                                <Text style={tw`text-white text-2xl`}>Sign up</Text>
                            </Pressable>

                            <View style={tw`flex flex-col gap-4 mt-7 w-full items-center`}>
                                <Pressable
                                    title="Sign Up"
                                    onPress={() => navigation.navigate('SignIn')}>
                                    <View style={tw`flex flex-row gap-2 mt-7 w-full`}>
                                        <Text style={tw`text-white text-lg`}>Already an user? </Text>
                                        <Text style={tw`text-red-500 text-lg `}>Log in!</Text>
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

export default SignUp