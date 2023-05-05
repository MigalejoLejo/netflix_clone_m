import tw from "twrnc"
import React from 'react';
import { useState, useEffect } from "react"
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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)

    const [isPaswordVisible, setIsPaswortVisible] = useState(false)


    useEffect(() => {
        debounce(emailValidation())
        console.log("email: ", email, isValidEmail)
    }, [email])

    useEffect(() => {
        debounce(passwordValidation())
        console.log("password: ", password, isValidPassword)
    }, [password])

    emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) {
            setIsValidEmail(false)
            return false
        } else {
            setIsValidEmail(true)
            return true
        }
    }

    passwordValidation = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
        if (!password || regex.test(password) === false) {
            setIsValidPassword(false)
            return false
        } else {
            setIsValidPassword(true)
            return true
        }
    }

    const debounce = (fn) => {
        let id = null;

        return (...args) => {
            if (id) {
                clearTimeout(id);
            }
            id = setTimeout(() => {
                fn(...args);
                id = null;
            }, 300);
        };
    };


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}>
                <KeyboardAvoidingView behaviour={Platform.OS == "ios" ? "padding" : "height"}>

                    <View style={tw`bg-black h-full px-10 flex flex-col justify-center`}>

                        {/* Netflix Logo */}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex h-1/3 justify-center items-center`} >
                            <NetflixLogo width={"200"} />
                            <Text style={tw`text-red-600 text-lg`}
                            >- clone -</Text>
                        </View>

                        {/* Input fields*/}
                        {/* ----------------------------------------------------------- */}
                        <View style={tw`flex items-center h-1/2 `} >

                            {/* Email field*/}
                            {/* --------------------------------------------------------- */}
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    value={email}
                                    onChangeText={(textInput) => {
                                        setEmail(textInput)
                                    }}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    // autoComplete={"false"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>

                            {/* Password field*/}
                            {/* --------------------------------------------------------- */}
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={(passwordInput) => {
                                        setPassword(passwordInput)
                                    }}
                                    autoCorrect={false}
                                    autoComplete={"off"}
                                    autoCapitalize={'none'}                                    
                                    secureTextEntry={!isPaswordVisible}/>
                            </View>


                            {/* Buttons */}
                            {/* ----------------------------------------------------------- */}
                            <Pressable
                                style={tw`w-full rounded-md flex justify-center h-[15] mt-4 items-center bg-red-600`}
                                title="Log In"
                                // TODO:  change this nav -------------------------------- <<<
                                onPress={() => navigation.navigate('SignUp')}>
                                <Text style={tw`text-white text-2xl`}>Log in</Text>
                            </Pressable>

                            <View style={tw`flex flex-col gap-4 mt-7 w-full items-center`}>
                                <Pressable
                                    title="Sign Up"
                                    onPress={() => navigation.navigate('SignUp')}>
                                    <View style={tw`flex flex-row gap-2 mt-7 w-full`}>
                                        <Text style={tw`text-white text-lg`}>Don't have an account? </Text>
                                        <Text style={tw`text-red-500 text-lg `}>Sign Up!</Text>
                                    </View>
                                </Pressable>
                                <Pressable
                                    title="Sign Up"
                                    onPress={() => navigation.navigate('PWRecovery')}>
                                    <Text style={tw`text-white/50 text-lg `}>Forgot your password?</Text>

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