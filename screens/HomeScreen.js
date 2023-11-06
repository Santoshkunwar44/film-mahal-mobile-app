import { Platform, StatusBar, View,Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTrendingMovies } from '../api/moviedb'

const ios = Platform.OS === "ios"



export default function HomeScreen() {


  const [trending,setTrending] = useState([])
  const [upcomingMovies,setUpcomingMovies] = useState([1,2,3])
  const [topRated,setTopRated] = useState([1,2,3])
  const [loading,setLoading] =useState(true)
  const navigation =useNavigation()

  useEffect(()=>{
    setLoading(false)
    getTrendingMovies()
  },[])
  
  console.log(trending)
  const getTrendingMovies=async()=>{
    
    const data = await fetchTrendingMovies()
    console.log(data)
    setTrending(data.results)
    
  }



  return (
    <View className="flex-1 bg-neutral-800">

      <SafeAreaView className={ios ? "-mb-2":"-mb-3"}>

      <StatusBar  barStyle={"light-content"}/>
      <View className="flex-row justify-between items-center mx-4 p-3">

        <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color={"white"}/>
        <Text className="text-white text-3xl font-bold">
          <Text>M</Text>ovies
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
          <MagnifyingGlassIcon size={"30"} strokeWidth={2} color={"white"}/>
        </TouchableOpacity>

      </View>


      </SafeAreaView>
      {
        loading ? <Loading/> :
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{paddingBottom:10}}
      >
        {/* trending movies carousel */}
      {trending.length >0 &&  <TrendingMovies trending={trending}/>}  
        <MovieList title={"Upcoming"} data={upcomingMovies}/>
        <MovieList title={"Top Rated"} data={topRated}/>
      </ScrollView>
      }



      
  </View>
      

   
  )
}

