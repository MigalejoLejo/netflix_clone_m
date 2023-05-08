import tw from "twrnc"
import React, { useEffect, useState } from 'react';
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

import { useToast } from "react-native-toast-notifications";
import auth from '@react-native-firebase/auth';


import NetflixLogo from "../ressources/images/NetflixLogo.svg"


function SignIn({ navigation }) {
    const toast = useToast();


    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    useEffect(() => {
        debounce(emailValidation());
        console.log('Email: ', email, isValidEmail);
    }, [email]);

    const emailValidation = () => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || emailRegex.test(email) === false) {
            setIsValidEmail(false);
            return false;
        }
        setIsValidEmail(true);
        return true;
    };

    const PasswordRecovery = () => {
        if (isValidEmail) {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    console.log('Reset email was sent for password recovery');
                    toast.show("Password reset email was sent", {
                        type: "info",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                      navigation.navigate("SignIn")
                })
                .catch(error => {
                    if (error.code === "auth/user-not-found"){
                        toast.show("WARNING! - Unknown Email - User not found", {
                            type: "warning",
                            placement: "top",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                          });
                          console.log(error)
                          return error;
                    } else {
                        toast.show("WARNING! - Unknown error", {
                            type: "warning",
                            placement: "top",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                          });
                          console.log(error)
                          return error;
                    }
                       
                });        
        }
        if (!isValidEmail){
            toast.show("WARNING! - INVALID EMAIL", {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
              });
        }

    }

    


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


                            {/* Buttons */}
                            {/* ----------------------------------------------------------- */}
                            <Pressable
                                title="Log In"
                                // TODO:  change this nav -------------------------------- <<<
                                onPress={() => PasswordRecovery()}>
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