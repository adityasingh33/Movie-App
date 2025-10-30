import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const profile = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0 " resizeMode="cover" />


      <View className=' flex-row  justify-center mt-24'>
        <Image source={icons.logo} className='w-12 h-10' />
      </View>

      <View className=' justify-center mt-24 space-y-3.5'>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#A9A9A9"
          value={username}
          onChangeText={setUsername}
          className=' h-16  border-2 mx-6 border-white  rounded-2xl  px-4  text-white text-lg '
        />

        <TextInput
          placeholder="Phone Number "
          placeholderTextColor="#A9A9A9"
          value={phone}
          onChangeText={setPhone}
          className=' h-16  border-2 mx-6 border-white  rounded-2xl  px-4  text-white text-lg '
        />

      </View>


    </View>
  )
}

export default profile

