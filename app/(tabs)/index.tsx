// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
// import {Text, Image, View,ScrollView, ActivityIndicator } from "react-native";
// import SearchBar from "@/components/SearchBar";
// import { useRouter } from "expo-router";
// import useFetch from "@/services/useFetch";
// import { fetchMovies } from "@/services/api";


// export default function Index() {

//   const router = useRouter();

//   const {data : movies , 
//     loading : moviesLoading ,
//     error : moviesError} = useFetch(() => fetchMovies({
//     query : ''
//   })

// )

//   return (
//     <View className="flex-1 bg-primary">
//       <Image source={images.bg} className="absolute w-full z-0"/>
      
//       <ScrollView className="flex-1 px-5" 
//                   showsVerticalScrollIndicator={false} 
//                   contentContainerStyle={{minHeight : "100%", paddingBottom : 10}}>
//                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

//                {moviesLoading ? (
//                 <ActivityIndicator
//                   size = "large"
//                   color="#0000ff"
//                   className="mt-10 self-center"
//                 />
//                ) : moviesError ? (
//                 <Text> Error : {moviesError?.message}</Text>
//                ) : (
//                   <View className="flex-1 mt-5">
//                    <SearchBar
//                        onPress={() => router.push("/search")}
//                        placeholder = "Search for a movie"
//                    />
//                  </View>
//                )}

//                <>
//                   <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
//                </>

//          </ScrollView>

       
//     </View>
//   );
// }



import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
// Make sure you've imported Text!
import { Image, View, ScrollView, ActivityIndicator, Text } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    // Make sure this variable name matches your check below
    error: moviesError, 
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        <View className="mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>

        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
          {/* Flat list banana idhar se  */}
        </Text>

       
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white text-center mt-5">
            Error: {moviesError?.message}
          </Text>
        ) : (
          
          <>
             {/* e.g., <MovieList data={movies} /> */}
          </>
        )}
      </ScrollView>
    </View>
  );
}