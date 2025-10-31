import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
   <>
    {/* To hide the date and battery etc  */}
    <StatusBar hidden = {true}/> 

   <Stack >
    <Stack.Screen
      name="(tabs)"
      options={{headerShown : false}}
    />

    <Stack.Screen 
      name = "movies/[id]"
      options={{ headerShown : false}}
    />

    <Stack.Screen 
      name = "otp/getOtp"
      options={{ headerShown : false}}
    />

    </Stack>
   


   </>
   
    )
}
