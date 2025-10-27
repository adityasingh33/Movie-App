

import { images } from '@/constants/images'
import { getMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'; // No longer need useEffect/useState
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'


const MovieDetailsPage = () => {

  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error
  } = useFetch<MovieDetails>(() => {
    if (!id || Array.isArray(id)) return Promise.reject(new Error("Invalid ID"));
    return getMovieDetails(id);
  }); // Removed extra comma

  return (
    <View className=' flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full h-full z-0" resizeMode='cover' />

      <FlatList
        data={[]} // You could put movie.genres or movie.cast here later!
        keyExtractor={(item) => item.id.toString()} // <-- 3. FIXED KEY EXTRACTOR
        // columnWrapperStyle = {{
        //   justifyContent:'center'
        // }}

        ListHeaderComponent={() => (
          // 1. WRAPPED IN A FRAGMENT AND A VIEW
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
                <Text className='text-white text-3xl font-bold mt-4'>{movie.title}</Text>

                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }}
                  className='w-full h-80 rounded-lg my-4 c'
                  resizeMode='cover'
                />

                <Text className='text-white text-lg font-bold mb-2'>Overview</Text>
                <Text className='text-gray-300 text-base'>{movie.overview}</Text>

                <Text className='text-white mt-4'>
                  Release Date : {movie.release_date}
                </Text>

                <Text className='text-white flex-col'>
                  Rating : {movie.vote_average.toFixed(1)}/10

                </Text>

                <Text className='text-white'>
                  Popularity : {movie.popularity}
                </Text>
                  
                  <Text className='text-white'>
                        Production :  {movie.production_companies?.map(company => company.name).join(', ')}
                  </Text>

                  <Text className='text-white'> 
                      Adult : {movie.adult ? "Yes" : "No"}
                  </Text>

                  <Text className='text-white'> 
                       Genre : {movie.genres?.map(genre => genre.name).join(",")}
                  </Text>
                
              </>
            )}
          </View>
        )}
      />
    </View>
  )
}

export default MovieDetailsPage