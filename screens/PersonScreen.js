import { Dimensions, Platform, Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { ScrollView } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles, theme } from "../theme"
import { useState } from "react"
import { View } from "react-native-animatable"
import { Image } from "react-native"
import MovieList from "../components/movieList"
import Loading from "../components/loading"

const ios = Platform.OS ==="ios"
const {height,width} = Dimensions.get("window")



const PersonScreen=()=>{
    const [isFavoutite,setIsFavorite] =useState(false)
    const [personMovie,setPersonMovie] =useState([1,35,14,12,55,11,234])
    const [loading,setLoading] =useState(false)
    const handlegoBack=()=>{

    }
    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20,height:"100%"}}>
                <SafeAreaView className={`absolute z-20 w-full flex-row items-center justify-between px-4 ${!ios && "mt-3" }`} >
                    <TouchableOpacity style={styles.background}  className="rounded-xl p1" onPress={handlegoBack}>
                        <ChevronLeftIcon size={"28"} strokeWidth={2.5} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartIcon  size={"28"} strokeWidth={2.5}  color={isFavoutite ? theme.background :"white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
         

         {/* person details */}
         {
            loading ? <Loading/> :   
                 <View >
            <View className="flex-row justify-center"
            style={{
                shadowColor:"gray",
                shadowRadius:40,
                shadowOffset:{width:0,height:5},
                shadowOpacity:1
            }}
            >
                    <View className="items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-400">

                <Image
                style={{height:height*0.43,width:width*0.74}}
                source={require("../assets/images/castImage2.png")}
                />
                </View>

            </View>
            <View className="mt-6">

                <Text className="text-3xl text-white font-bold text-center">

                    Spartan - Leonidas

                </Text>
                   <Text className="text-base text-neutral-500  text-center">

                    London UK

                </Text>

            </View>
            <View className="mx-3 mt-6  p-4  flex-row justify-between items-center bg-neutral-700 rounded-full">

                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Gender</Text>
                    <Text className="text-neutral-300 font-semibold">Male</Text>
                </View>
                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Birthday</Text>
                    <Text className="text-neutral-300 font-semibold">1964-03-11</Text>
                </View>
                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Known for </Text>
                    <Text className="text-neutral-300 font-semibold">Acting</Text>
                </View>
                <View className="border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Popularity</Text>
                    <Text className="text-neutral-300 font-semibold">64.23</Text>
                </View>

            </View>
            <View className="my-5 mx-4  space-y-2">

                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">

                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...


                </Text>

            </View>
            <MovieList hideSeeAll={true} data={personMovie}/>
               </View>
         }

 
        </ScrollView>
    )

}

export default PersonScreen;

