import { Dimensions, Platform, Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { ScrollView } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles, theme } from "../theme"
import { useEffect, useState } from "react"
import { View } from "react-native-animatable"
import { Image } from "react-native"
import MovieList from "../components/movieList"
import Loading from "../components/loading"
import { useNavigation, useRoute } from "@react-navigation/native"
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb"

const ios = Platform.OS ==="ios"
const {height,width} = Dimensions.get("window")



const PersonScreen=()=>{
    const [isFavoutite,setIsFavorite] =useState(false)
    const [personMovie,setPersonMovie] =useState([])
    const [loading,setLoading] =useState(true);
    const navigation =useNavigation()
    const [person,setPerson] = useState({})
    const {params:item}= useRoute()


    useEffect(()=>{
        if(!item.id)return;
        getPersonDetails(item.id)
        getPersonMovies(item.id)
        },[item])
    

    const getPersonMovies=async id=>{
        try {
            const data  = await fetchPersonMovies(id)
            if(data && data.cast){
                setPersonMovie(data.cast)
            }
        } catch (error) {
            console.log(error)
        }
    }
       const getPersonDetails=async id=>{

        try {
                const data = await fetchPersonDetails(id)
                if(data){
                    setPerson(data)
                }
                setLoading(false)
        } catch (error) {
            setLoading(false)
        }

       } 
      const handlegoBack=()=>{

        navigation.goBack()
    }



    return (
        <ScrollView className="flex-1 bg-neutral-900 " contentContainerStyle={{paddingBottom:20}}>

                <SafeAreaView className={`flex-row items-center justify-between mx-4 z-10 px-4 ${!ios && "mt-3" }`} >
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
            <View 
            className="flex-row justify-center"
            style={{
                shadowColor:"gray",
                shadowRadius:40,
                shadowOffset:{width:0,height:5},
                shadowOpacity:1
            }}
            >
                    <View className="items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-500">

                <Image
                style={{height:height*0.43,width:width*0.74}}
                source={{uri:image342(person?.profile_path)|| fallbackPersonImage}}
                />
                </View>

            </View>
            <View className="mt-6">

                <Text className="text-3xl text-white font-bold text-center">

                    {person?.name}

                </Text>
                   <Text className="text-base text-neutral-500  text-center">

                    {person?.place_of_birth}
                </Text>

            </View>
            <View className="mx-3 mt-6  p-4  flex-row justify-between items-center bg-neutral-700 rounded-full">

                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Gender</Text>
                    <Text className="text-neutral-300 font-semibold">{person.gender ===1 ?"Female":"Male"}</Text>
                </View>
                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Birthday</Text>
                    <Text className="text-neutral-300 font-semibold">{person.birthday}</Text>
                </View>
                <View className="border-r-2  border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Known for </Text>
                    <Text className="text-neutral-300 font-semibold">{person.known_for_department}</Text>
                </View>
                <View className="border-neutral-400 px-2 items-center" >
                    <Text className="text-white font-semibold">Popularity</Text>
                    <Text className="text-neutral-300 font-semibold">{person.popularity?.toFixed(2)}%</Text>
                </View>

            </View>
            <View className="my-5 mx-4  space-y-2">

                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">

                  {person.biography ?? "NA"}

                </Text>

            </View>
            <MovieList hideSeeAll={true} data={personMovie}/>
               </View>
         }

 
        </ScrollView>
    )

}

export default PersonScreen;

