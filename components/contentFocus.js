import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import tw from "twrnc"

import LinearGradient from 'react-native-linear-gradient'

import { BASE_URL, API_KEY, IMG_ASSETS } from "@env"
import CONTENT_TYPE from '../ressources/lib/contentTypes';

import requests from '../ressources/lib/requests';


import N_logo from "../ressources/images/N_logo.svg"
import { MagnifyingGlassIcon, PlusIcon, TvIcon, User, UserIcon } from 'react-native-heroicons/outline';
import { PlayIcon as PlayIconSolid } from 'react-native-heroicons/solid';



const ContentFocus = ({ content, contentType, genres, toggle }) => {

    function useToggle() {
        toggle()
    }

    const [focusContentType, setFocusContentType] = useState(contentType)


    useEffect(() => {
        if (contentType === CONTENT_TYPE.movie) {
            setFocusContentType("Movie")
        }
        if (contentType === CONTENT_TYPE.tv) {
            setFocusContentType("Series")
        }
    })






    return (

        <View style={tw`flex gap-5 w-full h-full rounded-sm items-center justify-end`}>

            {/* Image Container ------------------------------------------------------ */}
            <View style={tw`absolute w-full h-full border-2 border-gray-900 rounded-xl overflow-hidden shadow`} >
                {content?.backdrop_path === null ?
                    <Image style={tw`w-full h-full`}
                        source={{ uri: `${IMG_ASSETS}/original/${content?.poster_path}` }}
                    /> :
                    <Image style={tw`w-full h-full`}
                        source={{ uri: `${IMG_ASSETS}/original/${content?.backdrop_path}` }}
                    />}

                <Pressable onPress={() => useToggle()}
                    style={tw`absolute flex w-full h-full rounded-md items-center justify-end z-20`}>

                    <LinearGradient
                        colors={[tw.color(`black/10`), tw.color(`black/40`), tw.color(`black/50`), tw.color(`black/40`), tw.color(`black/10`)]}
                        style={tw`flex justify-center gap-6 pt-40 items-center w-full h-full`}>
                        <View style={tw`flex flex-row gap-2  items-center`}>
                            <N_logo width={20} />
                            <Text style={tw`text-2xl text-white font-bold `}>
                                {focusContentType}
                            </Text>
                        </View>

                        <Text style={tw`text-[40px] w-full h-25 overflow-hidden text-white text-center font-bold`}>
                            {contentType === CONTENT_TYPE.movie
                                ? content?.title
                                : content?.name}
                        </Text>
                        <View style={tw`flex flex-row flex-wrap gap-3 `}>
                            <Text style={tw`text-white w-auto text-center text-lg font-semibold`}>{genres}</Text>
                            {/* {genres?.map((genre)=>(
                        <Text style={tw`text-white w-auto text-center text-lg font-semibold`}>{genre.name} </Text>
                    ))} */}
                        </View>

                        <View style={tw`flex flex-row w-full gap-5 h-9 justify-evenly font-bold px-6 mb-5`}>
                            <Pressable
                                style={tw`bg-white shadow rounded-sm w-1/2 justify-center items-center`}
                                onPress={() => (console.log("'Play' pressed"))}>

                                <View style={tw`flex flex-row gap-2`}>
                                    <PlayIconSolid color={tw.color('black')} size={30} />
                                    <Text style={tw`text-black font-semibold text-lg`}>
                                        Play
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={tw`bg-zinc-800 shadow rounded-sm w-1/2 justify-center items-center`}
                                onPress={() => (console.log("'My List' pressed"))}>
                                <View style={tw`flex flex-row gap-2`}>
                                    <PlusIcon color={tw.color('white')} size={30} />
                                    <Text style={tw`text-white font-semibold text-lg`}>
                                        My List
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </LinearGradient>

                    {/* Buttons */}

                </Pressable>
            </View>

            {/* Information Container ------------------------------------------------ */}

        </View>

    )
}

export default ContentFocus