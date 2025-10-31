import { icons } from '@/constants/icons';
import { images } from '@/constants/images'
import { getMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'; 
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';



const MovieDetailsPage = () => {

  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error
  } = useFetch<MovieDetails>(() => {
    if (!id || Array.isArray(id)) return Promise.reject(new Error("Invalid ID"));
    return getMovieDetails(id);
  });

  return (
    <View className=' flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full h-full z-0" resizeMode='cover' />

      <FlatList
        data={null} 
        renderItem={({item}) => null} 
        keyExtractor={(item) => item.id.toString()}
        

        ListHeaderComponent={() => (
          <View className="px-5 mt-20 pb-10">


            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-10' />
            )}

            {error && (
              <Text className='text-red-500 my-3'>
                Error : {error.message}
              </Text>
            )}

            {!loading && movie && (
              <>


                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }}
                  className='p-20 h-80 flex-1 justify-center items-center'
                  resizeMode='contain'
                />

                <Text className='text-white text-3xl font-bold mt-4'>{movie.title}</Text>

                <Text className=' text-blue-400 text-sm  mb-2 mt-12'>Overview</Text>
                <Text className='text-gray-300 text-base'>{movie.overview}</Text>


                <View className='flex flex-row items-center space-x-20 mb-2'>

                  <View>
                    <Text className='text-white mt-4 text-md-start ml-2'>Release Date </Text>
                    <Text className='text-white font-bold text-lg'> {movie.release_date} </Text>
                  </View>

                  <View>
                    <Text className='text-white mt-4 text-md-start ml-2'>Status </Text>
                    <Text className='text-white font-bold text-lg'> {movie.status} </Text>
                  </View>


                </View>

                <View className='mb-4'>
                  <Text className='text-white mb-1 ml-1'>Countries</Text>
                  <Text className='text-white font-bold '> {movie.production_countries.map(country => country.name).join(" , ")}</Text>
                </View>


                <View className='mb-4 ml-1'>
                  <Text className='text-white  rounded-lg shadow-lg"'>
                    Genre
                  </Text>

                  <View className='flex-row flex-wrap'>

                    {movie.genres?.map((genre) => (
                      <View
                        key={genre.id}
                        className="bg-[#221F3D] rounded-lg  py-2 px-4 mr-2 mb-2"
                      >
                        <Text className='text-white'> {genre.name}</Text>
                      </View>
                    ))}


                  </View>


                </View>

                <View className='mb-4 ml-1'>
                  <Text className='text-white flex-col mb-2'>
                    Rating
                  </Text>

                  <Text className='text-white'>
                    {movie.vote_average.toFixed(1)}/10
                  </Text>
                </View>

                <View className='mb-4 ml-1'>
                  <Text className='text-white flex-col mb-2'>
                    Adult
                  </Text>

                  <Text className='text-white'>
                    {movie.adult ? "Yes" : "No"}
                  </Text>
                </View>


                <Pressable 
                      onPress={() => router.push("/")}
                          
                  >
                       <LinearGradient
                  colors={['#D6C7FF', '#AB8BFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className='mb-4 ml-1 flex flex-row justify-center items-center p-3 rounded-lg'
                >
                 

                  <Text>Visit Homepage</Text>
                  <Image
                    className='h-4 w-4 tint-white'
                    source={icons.arrow}
                    resizeMode='contain'
                  />
                </LinearGradient>
                      <Text>Visit Homepage</Text>
                  </Pressable>



              </>
            )}
          </View>



        )}
      />
    </View>
  )
}

export default MovieDetailsPage