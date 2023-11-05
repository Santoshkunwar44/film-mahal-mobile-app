import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const {height,width} = Dimensions.get("window");

const TrendingMovies = ({trending}) => {

  const navigation =useNavigation()
  const handleClick=(movie)=>{
    navigation.navigate("Movie",movie)
  }
  return (
    <View>
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
      data={trending}
      firstItem={1}
      sliderWidth={width}
      itemWidth={width*0.62}
      inactiveSlideOpacity={0.6}
      renderItem={({item})=><MovieCard item={item} handleClick={()=>handleClick(item)}/>}
      slideStyle={{display:"flex",alignItems:"center"}}
      />
    </View>
  )
}

export default TrendingMovies


const MovieCard=({item,handleClick})=>{
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
      style={{width:width*0.6,height:height*0.6}}
      source={require("../assets/images/moviePoster1.png")}
      className="rounded-3xl"
      
      />
    </TouchableWithoutFeedback>
  )
}