import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import tw from "twrnc"

import LinearGradient from 'react-native-linear-gradient'
import { MagnifyingGlassIcon, TvIcon, User, UserIcon } from 'react-native-heroicons/outline';
import ImageColors from 'react-native-image-colors'


import { BASE_URL, API_KEY, IMG_ASSETS } from "@env"
import CONTENT_TYPE from '../ressources/lib/contentTypes';
import requests from '../ressources/lib/requests';

import ContentCard from '../components/contentCard';
import ModalView from '../components/modalView';
import ContentFocus from '../components/contentFocus';

import N_logo from "../ressources/images/N_logo.svg"


const Home = ({ navigation }) => {
    console.log("HOME SCREEN running since: ", new Date().toLocaleString())

    const user = "Migalejo Lejo"

    const [displayModal, setDisplayModal] = useState(true)
    const [hidden, setHidden] = useState("")

    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [popularMovies, setPopularMovies] = useState()

    const [heroContent, setHeroContent] = useState()
    const [heroContentGenres, setHeroContentGenres] = useState([])
    const [heroContentGenresAsText, setHeroContentGenresAsText] = useState()
    
    const [heroColor, setHeroColor] = useState(`${tw.color("gray-500")}`)

    const [contentType, setContentType] = useState(CONTENT_TYPE.movie)


    useEffect(() => {
        fetch(`${requests.fetchTopRated}`)
            .then(res => res.json())
            .then(data => {
                setTopMovies(data.results)
            }).catch(e => {
                console.error(e)
                return e;
            })
    }, [])

    useEffect(() => {
        fetch(`${requests.fetchTopSeries}`)
            .then(res => res.json())
            .then(data => {
                setTopSeries(data.results)
            }).catch(e => {
                console.error(e)
                return e;
            })
    }, [])

    useEffect(() => {
        fetch(`${requests.fetchPopularMovies}`)
            .then(res => res.json())
            .then(data => {
                setPopularMovies(data.results)
            }).catch(e => {
                console.error(e)
                return e;
            })
    }, [])

    useEffect(() => {
        fetch(`${requests.fetchPopularSeries}`)
            .then(res => res.json())
            .then(data => {
                setPopularSeries(data.results)
            }).catch(e => {
                console.error(e)
                return e;
            })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/${contentType}/${topMovies?.[0].id}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setHeroContent(data)
            }).catch(e => {
                console.error("requesting heroContent from Home: ", e)
                return e;
            })
    }, [topMovies])

    useEffect(() => {
        if (displayModal === false) {
            setHidden("")
        } else {
            setHidden("hidden")
        }
    }, [displayModal])


    useEffect(() => {
        setHeroContentGenres(
            heroContent?.genres
        )
        console.log("genres in array: ", heroContentGenres)
    }, [heroContent])

    useEffect(() => {
        result = ""
        try {
            for (i = 0; i < heroContentGenres.length; i++) {
                result = result + " · " + heroContentGenres[i].name
            }
            setHeroContentGenresAsText(result.slice(3))
            console.log(heroContentGenresAsText)
        } catch (e) {
            console.log(e)
        }

    }, [heroContentGenres])

    useEffect(() => {
        // console.log(`${IMG_ASSETS}/original${heroContent?.backdrop_path}`)
        ImageColors.getColors(`${IMG_ASSETS}/original${heroContent?.backdrop_path}`, {
            fallback: '#228B22',
            cache: false,
            key: 'unique_key',
        }).then(res => (
            setHeroColor(res.vibrant)
            // console.log("resulting color: ",res),
            // console.log("heroColor",heroColor)
        )
           
        ).catch((e) => console.log("uri: ", uri, "error: ", e))
    }, [heroContent])

    function toggleModal() {
        setDisplayModal(!displayModal)
        console.log("modal toggled")
    }


    return (
        <SafeAreaView>

            {/* MODAL VIEW */}
            {/* ========================================================================== */}
            <View
                style={tw`absolute w-full h-full bg-black z-20 ${hidden}`}>
                {/* Image Container ------------------------------------------------------ */}
                <ModalView content={heroContent} contentType={contentType} genres={heroContentGenresAsText} toggle={toggleModal} />
            </View>

            {/* HEADER */}
            <View style={tw`absolute flex flex-row justify-between w-full min-h-20 bg-zinc-800/90 items-center top-0 z-10 p-3`}>
                <View style={tw`flex flex-row items-center gap-4`}>
                    <N_logo width={20} />
                    <Text style={tw`text-white text-xl `}>For {user}</Text>
                </View>

                <View style={tw`flex flex-row gap-4`}>
                    <Pressable>
                        <MagnifyingGlassIcon color={tw.color(`white`)} size={30} />
                    </Pressable>

                    <Pressable>
                        <TvIcon color={tw.color(`white`)} size={30} />
                    </Pressable>

                    <Pressable
                    onPress={()=> navigation.navigate("Profile")}>
                        <UserIcon color={tw.color(`white`)} size={30} />
                    </Pressable>
                </View>

            </View>

            {/* BODY */}
            <ScrollView>
                <View style={tw`bg-zinc-900 h-full flex flex-col `}>

                    {/* Background Gradient */}
                    <LinearGradient colors={[`${heroColor}`, tw.color(`black`)]} style={tw`w-full h-[200] absolute `} >
                    </LinearGradient>

                    {/* Spacer to top */}
                    <View
                        style={tw`w-full h-25 `}>
                    </View>

                    {/* Top Buttons */}
                    <View style={tw`flex flex-row w-full gap-3 h-9 font-bold px-3`}>
                        <Pressable
                            style={tw`border-2 border-white shadow rounded-full justify-center items-center px-3`}
                            onPress={() => (console.log("'TV Shows' pressed"))}>
                            <Text style={tw`text-white font-semibold`}>
                                TV Shows
                            </Text>
                        </Pressable>
                        <Pressable
                            style={tw` border-2 border-white shadow rounded-full justify-center items-center px-3`}
                            onPress={() => (console.log("'Movies' pressed"))}>
                            <Text style={tw`text-white font-semibold`}>
                                Movies
                            </Text>
                        </Pressable>
                        <Pressable
                            style={tw` border-2 border-white shadow rounded-full justify-center items-center px-3`}
                            onPress={() => (console.log("'Categories' pressed"))}>
                            <Text style={tw`text-white font-semibold`}>
                                Categories
                            </Text>
                        </Pressable>
                    </View>

                    {/* HERO FOCUS */}
                    {/* ========================================================================== */}
                    <View
                        style={tw`w-full h-[120] mt-3 px-3`} >
                        <ContentFocus content={heroContent} contentType={contentType} genres={heroContentGenresAsText} toggle={toggleModal} />
                    </View>
                    {/* ------------------------------------------------------------------------------------------------- */}


                    {/* LISTAS */}
                    {/* ========================================================================== */}

                    <View>

                        {/* Top Rated Movies */}
                        <View style={tw}>
                            <Text style={tw`text-white text-xl font-bold p-2`}>
                                Top Movies
                            </Text>
                            <ScrollView horizontal={true}>
                                {topMovies?.map((content) => (
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.movie} contentID={content.id} setContent={setHeroContent} setContentType={setContentType} toggle={toggleModal} />
                                ))}
                            </ScrollView>
                        </View>
                        {/* ------------------------------------------------------------------------------------------------- */}

                        {/* Top Rated Series */}
                        <View style={tw}>
                            <Text style={tw`text-white text-xl font-bold p-2`}>
                                Top Series                            </Text>
                            <ScrollView horizontal={true}>
                                {topSeries?.map((content) => (
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.tv} contentID={content.id} setContent={setHeroContent} setContentType={setContentType} toggle={toggleModal} />
                                ))}
                            </ScrollView>
                        </View>
                        {/* ------------------------------------------------------------------------------------------------- */}

                        {/* Popular Movies */}
                        <View style={tw}>
                            <Text style={tw`text-white text-xl font-bold p-2`}>
                                Popular Movies                            </Text>
                            <ScrollView horizontal={true}>
                                {popularMovies?.map((content) => (
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.movie} contentID={content.id} setContent={setHeroContent} setContentType={setContentType} toggle={toggleModal} />
                                ))}
                            </ScrollView>
                        </View>
                        {/* ------------------------------------------------------------------------------------------------- */}


                        {/* Popular Series */}
                        <View style={tw}>
                            <Text style={tw`text-white text-xl font-bold p-2`}>
                                Top Series                            </Text>
                            <ScrollView horizontal={true}>
                                {popularSeries?.map((content) => (
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.tv} contentID={content.id} setContent={setHeroContent} setContentType={setContentType} toggle={toggleModal} />
                                ))}
                            </ScrollView>
                        </View>
                        {/* ------------------------------------------------------------------------------------------------- */}



                    </View>



                </View>

            </ScrollView>
            {/* ========================================================================== */}

        </SafeAreaView >
    )
}


export default Home