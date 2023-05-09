// Imports ---------------------------------------------------------------//
import tw from "twrnc"
import React, { useEffect, useState } from 'react';
import {
    Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, Text,
    TextInput, TouchableWithoutFeedback, View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { useToast } from "react-native-toast-notifications";

import NetflixLogo from "../ressources/images/NetflixLogo.svg"
//------------------------------------------------------------------------//



// COMPONENT 
// =========================================================================
function SignUp({ navigation }) {

    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        debounce(emailValidation());
        // console.log('Email: ', email, isValidEmail);
    }, [email]);

    useEffect(() => {
        debounce(passwordValidation());
        // console.log('Password: ', password, isValidPassword);
    }, [password]);

    useEffect(() => {
        if (password === secondPassword) {
            setPasswordMatch(true)
        } else (setPasswordMatch(false))

    }, [secondPassword])

    const emailValidation = () => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || emailRegex.test(email) === false) {
            setIsValidEmail(false);
            return false;
        }
        setIsValidEmail(true);
        return true;
    };

    const passwordValidation = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
        if (!password || passwordRegex.test(password) === false) {
            setIsValidPassword(false)
            return false
        }
        setIsValidPassword(true)
        return true
    }

    const registerUser = () => {
        console.log("mail is valid?: ", isValidEmail)
        console.log("password is valid?: ", isValidPassword)
        console.log("password match?: ", passwordMatch)

        if (isValidEmail && isValidPassword && passwordMatch) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => { console.log('User account created & signed in!') })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        toast.show("WARNING! - EMAIL ALREADY IN USE", {
                            type: "warning",
                            placement: "top",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                        });
                        return error;
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        toast.show("WARNING! - INVALID EMAIL", {
                            type: "warning",
                            placement: "top",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                        });
                        return error;
                    }
                    console.error(error);
                });
        }
        if (!passwordMatch) {
            toast.show("WARNING! - PASSWORD DOES NOT MATCH", {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }
        if (!isValidEmail) {
            toast.show("WARNING! - INVALID EMAIL", {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }
        if (!isValidPassword) {
            toast.show("WARNING! - INVALID PASSWORD", {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }
    }

    // Utility FN · Mover a carpeta utils/utils.js
    const debounce = fn => {
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



    // RETURN
    // =========================================================================
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
                                    placeholder={"Email"}
                                    value={email}
                                    onChangeText={textInput => {
                                        setEmail(textInput);
                                    }}
                                    autoCorrect={false}
                                    // autoComplete={"false"}
                                    autoCapitalize={'none'}
                                    keyboardType="email-address" />
                            </View>
                            <View style={tw`bg-white/40 rounded-md my-2 px-3 w-full`} >
                                <TextInput
                                    style={tw`text-white`}
                                    placeholderTextColor={tw.color("text-gray-200/40")}
                                    placeholder={'Password'}
                                    value={password}
                                    onChangeText={passwordInput => {
                                        setPassword(passwordInput)
                                    }}
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
                                    value={secondPassword}
                                    onChangeText={secondPassword => {
                                        setSecondPassword(secondPassword)
                                    }}
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
                                onPress={() => registerUser()}>
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