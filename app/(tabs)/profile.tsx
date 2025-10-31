import { StyleSheet, Text, View, Image, TextInput,Pressable } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { router } from 'expo-router'

const profile = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleGetOtp = async () => {
    console.log("Requesting for otp for : ", phone);

    router.push({
      pathname:"/otp/getOtp",
      params:{phoneNumber : phone}
    })  
  };
  
  
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0 " resizeMode="cover" />


      <View className=' flex-row  justify-center mt-24'>
        <Image source={icons.logo} className='w-12 h-10 mt-10' />
      </View>

      <View className=' justify-center mt-24 '>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#A9A9A9"
          value={username}
          onChangeText={setUsername}
          className=' h-16  border-2 mx-6 mt-6 border-white  rounded-2xl  px-4  text-white text-lg '
        />

        <TextInput
          placeholder="Phone Number "
          placeholderTextColor="#A9A9A9"
          value={phone}
          onChangeText={setPhone}
          className=' h-16  border-2 mx-6 mt-6 border-white  rounded-2xl  px-4  text-white text-lg '
        />

        <Pressable onPress={handleGetOtp}>
             <Text className='text-gray-500 text-center mt-6 border-2 border-white w-1/5 rounded-lg text-md self-center'>Get OTP</Text>

        </Pressable>

      </View>


    </View>
  )
}

export default profile

