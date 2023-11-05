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

const ios = Platform.OS ==="ios"
const {height,width} = Dimensions.get("window")




const PersonScreen=()=>{
    const [isFavoutite,setIsFavorite] =useState(false)
    const handlegoBack=()=>{

    }
    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20}}>
                <SafeAreaView className={`absolute z-20 w-full flex-row items-center justify-between px-4 ${!ios && "mt-3" }`} >
                    <TouchableOpacity style={styles.background}  className="rounded-xl p1" onPress={handlegoBack}>
                        <ChevronLeftIcon size={"28"} strokeWidth={2.5} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <HeartIcon  size={"28"} strokeWidth={2.5}  color={isFavoutite ? theme.background :"white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
         

         {/* person details */}

         <View>
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
            <View>
                
            </View>
         </View>
        </ScrollView>
    )

}

export default PersonScreen;

