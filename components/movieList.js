import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import {styles} from "../theme"
import { useNavigation } from '@react-navigation/native'

const {width,height} =Dimensions.get("window")
const movieName = "Chandini Chowk to Chinan is the best movie in the world"



const MovieList = ({title,data ,hideSeeAll}) => {


  const navigation = useNavigation()

  const handlePress=(movie)=>{
    navigation.navigate("Movie",movie)
  }
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">

        <Text className="text-white text-xl">{title}</Text>
      {
        !hideSeeAll && <TouchableOpacity>
          <Text className="text-lg" style={styles?.text}>See All</Text>
        </TouchableOpacity>
      }  

      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
    >

    {
      data.map((movie ,index)=>(
        <TouchableWithoutFeedback  onPress={()=>handlePress(movie)} key={index}>
          <View className="space-y-1 mr-4">
            <Image
              source={require("../assets/images/moviePoster2.png")}
              style={{width:width*0.33, height:height*0.22}}
              />
            <Text className={"text-neutral-300 ml-1"}>
              {movieName.length > 14 ? movieName.slice(0,14)+"...":movieName}
            </Text>

          </View>
        </TouchableWithoutFeedback>
      ))
    }
    </ScrollView>

    </View>
  )
  
}

export default MovieList