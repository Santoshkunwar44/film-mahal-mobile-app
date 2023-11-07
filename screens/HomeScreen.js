import { Platform, StatusBar, View,Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon} from "react-native-heroicons/outline"
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import {styles} from "../theme/index"
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

const ios = Platform.OS === "ios"



export default function HomeScreen() {
 

  const [trending,setTrending] = useState([])
  const [upcomingMovies,setUpcomingMovies] = useState([])
  const [topRated,setTopRated] = useState([  ])
  const [loading,setLoading] =useState(true)
  const navigation =useNavigation()

  useEffect(()=>{
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  },[])
  
  const getTrendingMovies=async()=>{
    try {
      const data =   await fetchTrendingMovies()
      if(data && data.results){
        setTrending(data.results)

      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const getUpcomingMovies=async()=>{
    try {
      const data =   await fetchUpcomingMovies()
      if(data && data.results){
        setUpcomingMovies(data.results)

      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const getTopRatedMovies=async()=>{
    try {
      const data =   await fetchTopRatedMovies()
      if(data && data.results){
        setTopRated(data.results)

      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-800">

      <SafeAreaView className={ios ? "-mb-2":"mb-2"}>

      <StatusBar  barStyle={"light-content"}/>
      <View className="flex-row justify-between items-center mx-4 p-3">

        {/* <Bars3CenterLeftIcon size={"30"} strokeWidth={2} color={"white"}/> */}
        <Text className="text-white text-3xl font-bold">
          <Text style={styles.text}>FilM</Text>ahal
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

