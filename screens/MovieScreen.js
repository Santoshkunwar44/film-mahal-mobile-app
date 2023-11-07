import { Platform, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { View ,Text} from "react-native-animatable"
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";
import Loading from "../components/loading";



const isIos = Platform.OS ==="ios";
const {width,height} = Dimensions.get("window")

const MovieScreen=()=>{

    const [isFavoutite,setIsFavorite] =useState(true);
    const [similarMovies,setSimilarMovies]  =useState([])
    const [loading,setLoading] =useState(true)
    const navigation =useNavigation()
    const {params:item} =useRoute()
    const [movie,setMovie] = useState({})
    const [cast,setCast] =  useState([])


    
    
    useEffect(()=>{
        console.log("mounting",loading)
        if(!item.id)return;
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)

        return()=>{
            setLoading(true)
        }

    },[item])


    const getSimilarMovies=async id=>{
        try {
          const data = await  fetchSimilarMovies(id);    
          if(data && data.results){
            setSimilarMovies(data.results)
          }

        } catch (error) {
            console.log(error)
        }
    }
    const getMovieCredits=async id=>{
        try {
          const data = await  fetchMovieCredits(id);    
          if(data && data.cast){
            setCast(data.cast)
          }

        } catch (error) {
            console.log(error)
        }
    }
    const getMovieDetails=async id =>{

        try {

            const data = await fetchMovieDetails(id)
            if(data){
                setMovie(data)
            }
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
                console.log(error)
        }


    }

    const handlegoBack=()=>{

        navigation.goBack()
    }

    return (
        <ScrollView 
        contentContainerStyle={{paddingBottom:20}}
        className="flex-1 bg-neutral-900"

        >
            <View className="w-full"> 
                <SafeAreaView  className={`absolute z-20 w-full flex-row items-center justify-between px-4 ${!isIos && "mt-3" }`} >
                    <TouchableOpacity style={styles.background}  className="rounded-xl p1" onPress={handlegoBack}>
                        <ChevronLeftIcon size={"28"} strokeWidth={2.5} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartIcon size={"28"} strokeWidth={2.5}  color={isFavoutite ? theme.background :"white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
           
        {
            loading ? <Loading/> :  <>
            
             <View>
                    <Image 
                     source={{uri:image500(movie?.poster_path)||fallbackMoviePoster}}
                     style={{width,height:height*0.55}}

                    />
                    <LinearGradient

                    colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                    style={{height:height*0.40,width}}
                    start={{x:0.5,y:0}}
                    end={{x:0.5,y:1}}
                    className="absolute bottom-0"
                    
                    
                    />
                </View>
            </>

        }

             

          
                  <View style={{marginTop:-height*0.09}} className="space-y-3">



                <Text className="text-white text-center text-3xl font-bold tracking-wider">

                    {movie?.title}

                </Text>
                {/*  */}

           { movie?.status &&  <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
            </Text>}
            <View className="flex-row justify-center  mx-4 tracking-wide space-x-2">


        {
            movie?.genres?.map((genre,index)=>{
                
                let showDot  = index +1 !== movie.genres.length;
                return   <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                {genre.name} {showDot ? ".":null}
            </Text>
})
}
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">
                {movie.overview}
            </Text>
                

            </View>
             
        
               { cast.length >0 && <Cast cast={cast}/>}
                { similarMovies.length > 0 && <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies}/>}
             </View>

        </ScrollView>

        
    )
}
export default MovieScreen;



