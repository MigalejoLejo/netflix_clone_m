import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import tw from "twrnc"

import LinearGradient from 'react-native-linear-gradient'

import { BASE_URL, API_KEY, IMG_ASSETS } from "@env"
import CONTENT_TYPE from '../ressources/lib/contentTypes';

import requests from '../ressources/lib/requests';


import N_logo from "../ressources/images/N_logo.svg"
import { MagnifyingGlassIcon, TvIcon, User, UserIcon } from 'react-native-heroicons/outline';


const ModalView = ({ content, contentType, genres, toggle }) => {

    function goBack() {
        toggle()
    }


    return (
        <View
            style={tw`absolute w-full h-full bg-black z-20`}>

            {/* Image Container ------------------------------------------------------ */}
            <View style={tw`h-1/3 bg-gray-400 overflow-hidden shadow`} >
                {content?.backdrop_path === null ?
                    <Image style={tw`w-full h-full`}
                        source={{ uri: `${IMG_ASSETS}/w300/${content?.poster_path}` }}
                    /> :
                    <Image style={tw`w-full h-full`}
                        source={{ uri: `${IMG_ASSETS}/w300/${content?.backdrop_path}` }}
                    />}
            </View>

            {/* Close Button   ------------------------------------------------------ */}
            <Pressable
                onPress={() => goBack()}
                style={tw`absolute right-0 w-10 h-10 rounded-full bg-zinc-800/80 justify-center items-center m-4`}>
                <Text style={tw`text-white text-xl font-bold`}>X</Text>
            </Pressable>

            {/* Information Container ------------------------------------------------ */}
            <ScrollView style={tw`my-5`}>
                <Pressable>
                    <View style={tw`flex gap-5 items-center justify-end`}>

                        {/* title */}
                        <Text style={tw`text-3xl bg-zinc-800/30 w-full text-white text-center font-bold`}>
                            {contentType === CONTENT_TYPE.movie
                                ? content?.title
                                : content?.name}
                        </Text>

                        {/* genres */}
                        <Text style={tw`text-white bg-zinc-800/90 w-full text-center font-semibold`}>
                            {genres}
                        </Text>

                        {/* buttons */}
                        <View style={tw`flex flex-row w-full gap-3 h-9 justify-evenly font-bold px-10`}>

                            <Pressable
                                style={tw`bg-white shadow rounded-md w-1/2 justify-center items-center`}
                                onPress={() => (console.log("'Play' pressed"))}>
                                <Text style={tw`text-black font-semibold`}>
                                    Play
                                </Text>
                            </Pressable>

                            <Pressable
                                style={tw`bg-zinc-800 shadow rounded-md w-1/2 justify-center items-center`}
                                onPress={() => (console.log("'My List' pressed"))}>
                                <Text style={tw`text-white font-semibold`}>
                                    + My List
                                </Text>
                            </Pressable>

                        </View>
                    </View>

                    <Text style={tw`p-5 text-white text-lg`}>{content?.overview}</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default ModalView