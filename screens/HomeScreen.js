import { Platform, StatusBar, View,Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import TrendingMovies from '../components/trendingMovies'

const ios = Platform.OS === "ios"



export default function HomeScreen() {
  
  const [trending,setTrending] = useState([1,3,4])


  return (
    <View className="flex-1 bg-neutral-800">

      <SafeAreaView className={ios ? "-mb-2":"-mb-3"}>

      <StatusBar  barStyle={"light-content"}/>
      <View className="flex-row justify-between items-center mx-4 p-3">

        <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color={"white"}/>
        <Text className="text-white text-3xl font-bold">
          <Text>M</Text>ovies
        </Text>
        <TouchableOpacity>
          <MagnifyingGlassIcon size={"30"} strokeWidth={2} color={"white"}/>
        </TouchableOpacity>

      </View>


      </SafeAreaView>


      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{paddingBottom:10}}
      >
        {/* trending movies carousel */}
        <TrendingMovies trending={trending}/>
      </ScrollView>

      
  </View>
      

   
  )
}

