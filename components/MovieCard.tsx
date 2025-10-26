// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native' 
// import React from 'react'
// import { Link } from 'expo-router'
// import { icons } from '@/constants/icons'

// interface MovieCardProps extends Movie { 
//   showRating?: boolean; 
// }


// const MovieCard = ({id, poster_path, title ,vote_average , release_date, showRating = false } : MovieCardProps) => {
//   return (
//     <Link href={`/movies/${id}`} asChild>
          
//         <TouchableOpacity className="flex-1"> 
//             <Image 
//                 source = {{
//                  uri : poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placeholder.co/600x400/1a1a1a/ffffff.png'
//                 }}
//                 className = "w-full h-52 rounded-lg"
//                 />
            
//             <Text className='text-sm font-bold text-white mt-2' numberOfLines={1} >{title}</Text>
             
//             <View className="flex-row items-center justify-start gap-x-1">
//                 <Image source= {icons.star} className="size-4"/>
//                 <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average/2)}</Text>
//             </View>
            
//             <View className="flex-row items-center justify-between">

//                 <Text className="text-xs text-light-300 font-medium mt-1">
//                     {release_date?.split('-')[0]}

//                 </Text>

//                 {/* <Text className="text-xs font-medium text-light-300 uppercase">
//                      Movie
//                 </Text> */}

//             </View>
//         </TouchableOpacity> 
//     </Link>
//   )
// }

// export default MovieCard



import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native' 
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'


interface MovieCardProps extends Movie { 
  showRating?: boolean; 
}


const MovieCard = ({
  id, 
  poster_path, 
  title, 
  vote_average, 
  release_date, 
  showRating = true
} : MovieCardProps) => { 
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="flex-1"> 
        <Image 
          source={{
            uri : poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placeholder.co/600x400/1a1a1a/ffffff.png'
          }}
          className="w-full h-52 rounded-lg"
        />
        
        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>
          
        {/* 2. Wrap the rating View in this conditional */}
        {showRating && (
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4"/>
            <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average / 2)}</Text>
          </View>
        )}
        
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split('-')[0]}
          </Text>
        </View>
      </TouchableOpacity> 
    </Link>
  )
}

export default MovieCard