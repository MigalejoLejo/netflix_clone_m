import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import tw from "twrnc"



import { BASE_URL, API_KEY } from "@env"
import CONTENT_TYPE from '../ressources/lib/contentTypes';
import requests from '../ressources/lib/requests';
import ContentCard from '../components/contentCard';


import N_logo from "../ressources/images/N_logo.svg"
import { MagnifyingGlassIcon, TvIcon, User, UserIcon } from 'react-native-heroicons/outline';


const Home = ({ navigation }) => {
    const user = "Migalejo Lejo"

    const [displayModal, setDisplayModal] = useState(true)
    const [hidden, setHidden] = useState("")

    const imgAssets = process.env.IMG_ASSETS
    const [heroContent, setHeroContent] = useState()

    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [popularMovies, setPopularMovies] = useState()




    useEffect(() => {
        fetch(`${requests.fetchTopRated}`)
            .then(res => res.json())
            .then(data => {
                setTopMovies(data.results)
                setHeroContent(data.results[0])
                console.log(data.heroContent)
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
                console.log(data.heroContent)
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
                console.log(data.heroContent)
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
                console.log(data.heroContent)
            }).catch(e => {
                console.error(e)
                return e;
            })
    }, [])

   

    useEffect(() => {
        if (displayModal === false) {
            setHidden("")
        } else {
            setHidden("hidden")
        }
    }, [displayModal])



    function toggleModal() {
        setDisplayModal(!displayModal)
        console.log(`${imgAssets}/original${heroContent?.backdrop_path}`)
    }

    return (
        <SafeAreaView>

            {/* MODAL VIEW */}
            {/* ========================================================================== */}
            <View
                style={tw`absolute w-full h-full bg-black z-20 ${hidden}`}>
                {/* Image Container ------------------------------------------------------ */}
                <View style={tw`h-1/3 bg-gray-400 overflow-hidden shadow`} >
                    <Image style={tw`w-full h-full`}
                        source={{ uri: `${imgAssets}/w500${heroContent?.backdrop_path}` }} />
                </View>

                <Pressable
                    onPress={() => toggleModal()}
                    style={tw`absolute right-0 w-10 h-10 rounded-full bg-zinc-800/80 justify-center items-center m-4`}>
                    <Text style={tw`text-white text-xl font-bold`}>X</Text>
                </Pressable>

                {/* Information Container ------------------------------------------------ */}
                <ScrollView style={tw`my-5`}>
                    <Pressable>

                        <View style={tw`flex gap-5 items-center justify-end`}>

                            <Text style={tw`text-3xl bg-zinc-800/30 w-full text-white text-center font-bold`}>{heroContent?.title}</Text>
                            <Text style={tw`text-white bg-zinc-800/90 w-full text-center font-semibold`}> Genre1 · Genre2 · Genre 3</Text>

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

                        <Text style={tw`p-5 text-white text-lg`}>{heroContent?.overview}</Text>
                    </Pressable>
                </ScrollView>
            </View>



            {/* HOME VIEW */}
            {/* ========================================================================== */}

            {/* HEADER */}
            <View style={tw`absolute flex flex-row justify-between w-full min-h-20 bg-zinc-800/90 items-center top-0 z-10 p-3`}>
                <View style={tw`flex flex-row items-center gap-4`}>
                    <N_logo width={20} />
                    <Text style={tw`text-white text-xl `}>For {user}</Text>
                </View>
                <View style={tw`flex flex-row gap-4`}>
                    <MagnifyingGlassIcon color={tw.color(`white`)} size={30} />
                    <TvIcon color={tw.color(`white`)} size={30} />
                    <UserIcon color={tw.color(`white`)} size={30} />
                </View>
            </View>

            {/* BODY */}
            <ScrollView>


                {/* HERO FOCUS */}
                {/* ========================================================================== */}

                <View style={tw`bg-zinc-900 h-full flex flex-col `}>

                    {/* Background Gradient */}
                    <LinearGradient colors={[tw.color(`blue-500`), tw.color(`black`)]} style={tw`w-full h-[200] absolute `} >
                    </LinearGradient>

                    {/* Spacer to top */}
                    <View
                        style={tw`w-full h-25 `}>
                    </View>

                    {/* Header Buttons */}
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

                    {/* Focus Hero Container  ------------------------------------------------------ */}
                    <View
                        style={tw`w-full h-[130] p-3 `} >
                        <View style={tw`flex gap-5 w-full h-full rounded-md items-center justify-end`}>

                            {/* Image Container ------------------------------------------------------ */}
                            <View style={tw`absolute w-full h-full border-2 border-gray-500 rounded-3xl overflow-hidden shadow`} >
                                <Image style={tw`w-full h-full`}
                                    source={{ uri: `${imgAssets}/w500${heroContent?.backdrop_path}` }}
                                />
                            </View>

                            {/* Information Container ------------------------------------------------ */}
                            <Pressable onPress={() => toggleModal()}
                                style={tw`flex gap-5 w-full h-full rounded-md items-center justify-end`}>

                                <View style={tw`flex flex-row gap-2  items-center`}>
                                    <N_logo width={10} />
                                    <Text style={tw`text-lg text-white font-bold `}>Movies</Text>
                                </View>

                                <LinearGradient
                                    colors={[tw.color(`black/10`), tw.color(`black/40`), tw.color(`black/40`), tw.color(`black/40`), tw.color(`black/10`)]}
                                    style={tw`flex justify-center items-center w-full h-[180px]`}>
                                    <Text style={tw`text-[40px] w-full text-white text-center font-bold`}>{heroContent?.title}</Text>
                                    <Text style={tw`text-white w-auto text-center text-lg font-semibold`}> Genre1 · Genre · Genre 3</Text>
                                </LinearGradient>

                                {/* Buttons */}
                                <View style={tw`flex flex-row w-full gap-3 h-9 justify-evenly font-bold px-10 mb-5`}>
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
                            </Pressable>
                        </View>
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
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.movie} contentID={content.id} setContent={setHeroContent} toggle={toggleModal} />
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
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.tv} contentID={content.id} setContent={setHeroContent} toggle={toggleModal} />
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
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.movie} contentID={content.id} setContent={setHeroContent} toggle={toggleModal} />
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
                                    <ContentCard key={content.id} contentType={CONTENT_TYPE.tv} contentID={content.id} setContent={setHeroContent} toggle={toggleModal} />
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