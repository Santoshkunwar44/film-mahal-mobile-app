import { Platform, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { View ,Text} from "react-native-animatable"
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Cast from "../components/cast";
import MovieList from "../components/movieList";



const isIos = Platform.OS ==="ios";
const {width,height} = Dimensions.get("window")

const MovieScreen=()=>{


    const [isFavoutite,setIsFavorite] =useState(true);
    const [similarMovies,setSimilarMovies]  =useState([1,23,3,13,4])
    const [cast,setCast] = useState([1,2,35,32,1])
    const navigation =useNavigation()
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
                <View>
                    <Image 
                     source={require("../assets/images/moviePoster2.png")}
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


            </View>
            <View style={{marginTop:-height*0.09}} className="space-y-3">



                <Text className="text-white text-center text-3xl font-bold tracking-wider">

                    Movie name

                </Text>

            <Text className="text-neutral-400 font-semibold text-base text-center">
                Released . 2020 . 170 min
            </Text>
            <View className="flex-row justify-center  mx-4 tracking-wide space-x-2">

        <Text className="text-neutral-400 font-semibold text-base text-center">
                Action
            </Text><Text className="text-neutral-400 font-semibold text-base text-center">
               Thriller
            </Text><Text className="text-neutral-400 font-semibold text-base text-center">
                Comedy
            </Text>
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide">

            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...
            </Text>
                

            </View>
                <Cast cast={cast}/>
                <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies}/>

        </ScrollView>

        
    )
}
export default MovieScreen;



