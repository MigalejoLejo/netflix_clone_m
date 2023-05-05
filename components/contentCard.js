import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'

import tw from "twrnc"
import { BASE_URL, API_KEY } from "@env"
import CONTENT_TYPE from '../ressources/lib/contentTypes';



const ContentCard = ({ contentType, contentID, setContent, toggle }) => {

    const apiKey = process.env.API_KEY
    const baseUrl = process.env.BASE_URL

    const imgAssets = process.env.IMG_ASSETS

    const [detailedContent, setDetailedContent] = useState({})

    useEffect(() => {
        fetch(`${baseUrl}/${contentType}/${contentID}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setDetailedContent(data)
            }).catch(e => {
                console.error("Hey Jo: ", e)
                return e;
            })
    }, [])


    function setCardContent() {
        setContent(detailedContent)
        toggle()
        console.log("card pressed")
    }

    function getInfo () {
        console.log("info for: ", detailedContent.id)
        console.log(contentType)
        console.log(`${baseUrl}/${contentType}/${contentID}?api_key=${apiKey}&language=en-US`)
        console.log(detailedContent)
    }


    if (contentType === CONTENT_TYPE.movie) {
        return (
            <View style={tw`w-30 h-45  rounded-lg mx-1`}>
                <Pressable
                    onPress={() => setCardContent()}>
                    <View style={tw`flex w-full h-full items-center justify-end`}>
                        <View style={tw`absolute w-full h-full rounded-xl overflow-hidden shadow`} >
                            <Image style={tw`w-full h-full`}
                                source={{ uri: `${imgAssets}/w300/${detailedContent?.poster_path}` }}
                            />
                        </View>

                        <View style={tw`flex gap-5 w-full h-full rounded-md items-end justify-end`}>
                            <Pressable
                                style={tw`rounded-full border-2 border-white w-[8] justify-end items-center m-2`}
                                onPress={() => getInfo()}>
                                <Text style={tw`text-white font-semibold text-xl`}>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>

        )
    }

    else if (contentType === CONTENT_TYPE.tv) {
        return (
            <View style={tw`w-30 h-45  rounded-lg mx-1`}>
                <Pressable
                    onPress={() => setCardContent()}>
                    <View style={tw`flex w-full h-full items-center justify-end`}>
                        <View style={tw`absolute w-full h-full rounded-xl overflow-hidden shadow`} >
                            <Image style={tw`w-full h-full`}
                                source={{ uri: `${imgAssets}/w300/${detailedContent?.poster_path}` }}
                            />
                        </View>

                        <View style={tw`flex gap-5 w-full h-full rounded-md items-end justify-end`}>
                            <Pressable
                                style={tw`rounded-full border-2 border-white w-[8] justify-end items-center m-2`}
                                onPress={() => getInfo()}>
                                <Text style={tw`text-white font-semibold text-xl`}>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>

        )
    } else {

        return (



            <View style={tw`w-30 h-45  rounded-lg mx-1`}>
                <Pressable
                    onPress={() => setCardContent()}>
                    <View style={tw`flex w-full h-full items-center justify-end`}>
                        <View style={tw`absolute w-full h-full bg-gray-200 rounded-xl overflow-hidden shadow`} >
                        </View>
                        <View style={tw`flex gap-5 w-full h-full rounded-md items-end justify-end`}>
                            <Pressable
                                style={tw`rounded-full border-2 border-white w-[8] justify-end items-center m-2`}
                                onPress={() => detailedContent.title ? console.log("card add to list pressed: " + detailedContent.title) : console.log("card add to list pressed for movie: " + detailedContent.name)}>
                                <Text style={tw`text-white font-semibold text-xl`}>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }



}

export default ContentCard