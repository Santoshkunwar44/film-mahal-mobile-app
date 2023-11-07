import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { fallbackMoviePoster, image500 } from '../api/moviedb';

const {height,width} = Dimensions.get("window");
const apiBaseUrl = 'https://api.themoviedb.org/3';

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
      source={{uri:image500(item.poster_path) || fallbackMoviePoster}}
      className="rounded-3xl"
      
      />
    </TouchableWithoutFeedback>
  )
}