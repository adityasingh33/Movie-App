import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, View, ScrollView, ActivityIndicator, Text ,FlatList} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

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

        {/* <View className="mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
            value=""
            onChangeText={() => {}}
          />
        </View> */}

        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
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
           
            <FlatList 
              data = {movies}
              renderItem= {({item}) => (<MovieCard
                  {...item}
              />
              )}

              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle = {{
                justifyContent : 'flex-start',
                gap : 20,
                paddingRight : 5,
                marginBottom : 10
              }}
              className="mt-2 pb-32"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Client, Account } from 'react-native-appwrite';
// import { useState } from 'react';
// import Constants from 'expo-constants';

// export default function Index() {
//   const [status, setStatus] = useState('Ready to test');
//   const [isLoading, setIsLoading] = useState(false);

//   const sendPing = async () => {
//     setIsLoading(true);
//     try {
//       const client = new Client()
//         .setEndpoint(Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
//         .setProject(Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '');

//       const account = new Account(client);
      
//       // Try to get account info (will fail if not logged in, but proves connection works)
//       await account.get();
//       setStatus('✅ Appwrite Connected Successfully!');
//     } catch (error: any) {
//       // Error 401 means connection works but not authenticated (which is fine for testing)
//       if (error.code === 401) {
//         setStatus('✅ Appwrite Connected! (Not logged in, but connection works)');
//       } else {
//         setStatus(`❌ Error: ${error.message}`);
//       }
//       console.log('Appwrite test:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Appwrite Connection Test</Text>
//       <Text style={styles.status}>{status}</Text>
      
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={sendPing}
//         disabled={isLoading}
//       >
//         <Text style={styles.buttonText}>
//           {isLoading ? 'Testing...' : 'Send a Ping'}
//         </Text>
//       </TouchableOpacity>

//       <View style={styles.info}>
//         <Text style={styles.infoText}>Project ID: {Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_PROJECT_ID}</Text>
//         <Text style={styles.infoText}>Endpoint: {Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_ENDPOINT}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   status: {
//     fontSize: 16,
//     marginBottom: 30,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   button: {
//     backgroundColor: '#f02e65',
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   info: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//   },
//   infoText: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
// });