/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { React, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import tw from "twrnc"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { supabase } from "./ressources/lib/supabase"

import { HomeIcon, RocketLaunchIcon, StarIcon} from 'react-native-heroicons/outline';
import { HomeIcon as HomeIconSolid } from 'react-native-heroicons/solid';
import { StarIcon as StarIconSolid } from 'react-native-heroicons/solid';
import { RocketLaunchIcon as RocketLaunchIconSolid } from 'react-native-heroicons/outline';

import SignIn from "./screens/signIn"
import SignUp from "./screens/signUp"
import PWRecovery from "./screens/pwRecovery"
import UserSelect from './screens/userSelect';
import Home from './screens/home';
import NewAndHot from './screens/newAndHot';
import Discover from './screens/discover';
/* -----------------------------------------------------------------------*/

// const supabase = createClient()

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PWRecovery" component={PWRecovery} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <HomeIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'NewAndHot') {
            return focused ? (
              <StarIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <StarIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'Discover') {
            return focused ? (
              <RocketLaunchIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <RocketLaunchIcon color={tw.color('gray-400')} size={20} />
            );
          }
        },
        tabBarLabelStyle: {
          marginTop: -10,
          marginBottom: 7,
        },
      })}
    >

      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="NewAndHot" component={NewAndHot} options={{ headerShown: false }} />
      <Tab.Screen name="Discover" component={Discover} options={{ headerShown: false }} />

    </Tab.Navigator>
  )
}

function App() {
  const [user, setUser] = useState(true)
  console.log("app running since: ", new Date().toLocaleString())

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {
          !user
            ? (<RootStack.Screen name={"Auth"} component={AuthNavigator} options={{ headerShown: false }} />)
            : (<RootStack.Screen name={"TabsNav"} component={TabsNavigator} options={{ headerShown: false }} />)
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}



export default App;
