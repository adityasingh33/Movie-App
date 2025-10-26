import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, View, ScrollView, ActivityIndicator, Text, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: '',
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

          {trendingMovies && (
            <View className="mt-10">
              <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
            </View>
          )}
        </View>

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-white text-center mt-5">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <>
            <FlatList
              className="mb-4 mt-3"
              data={trendingMovies}
              renderItem={({ item, index }) => {
                const mappedMovie = {
                  id: item.movie_id,
                  adult: false,
                  backdrop_path: item.poster_url ?? '',
                  genre_ids: [],
                  original_language: 'en',
                  original_title: item.title,
                  overview: '',
                  popularity: 0,
                  poster_path: item.poster_url ?? '',
                  release_date: '',
                  title: item.title,
                  video: false,
                  vote_average: 0,
                  vote_count:  0,
                };
                return (
                 
                  <View className="w-32">
                    <View className="h-48">
                      <MovieCard {...mappedMovie}  showRating={false} />
                       
                    </View>
                    <Text className="text-white text-xs mt-2 pb-16 text-center" numberOfLines={1}>
                     
                    </Text>
                  </View>


                )
              }}
              keyExtractor={(item) => item.movie_id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              // contentContainerStyle={{ gap: 16 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <MovieCard {...item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className="mt-2 pb-32"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}