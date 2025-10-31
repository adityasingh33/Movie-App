import { StyleSheet, Text, View, Alert, Pressable, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

const getOtp = () => {
    const [code, setCode] = useState('');
    const { phoneNumber } = useLocalSearchParams();

    const handleVerifyOtp = async () => {
        console.log("Verifying code : ", code, "for number:", phoneNumber);

        Alert.alert("Verified")
    }
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="flex-1 absolute w-full z-0 " resizeMode="cover" />


            <View className=' flex-row  justify-center mt-24'>
                <Image source={icons.logo} className='w-12 h-10 mt-10' />
            </View>

            <View className=' justify-center mt-24 '>

                <Text className="text-gray-400  text-lg text-center mt-2 mb-8">
                    Enter the 6-digit code sent to {phoneNumber}
                </Text>

                <TextInput
                    placeholder='123456'
                    placeholderTextColor="#A9A9A9"
                    value={code}
                    onChangeText={setCode}
                    className="h-16 w-3/5 self-center border-2 border-white rounded-2xl px-4 text-white text-lg text-center "
                />


                <Pressable onPress={handleVerifyOtp}>
                    <Text className='text-gray-400 text-center mt-6 border-2 border-white w-1/5 rounded-lg text-md self-center'>Verify </Text>
                </Pressable>

                <Pressable className='mt-4'>
                    <Text className='text-blue-400 text-center border-2 border-white w-1/5 self-center rounded-lg'>
                        Resend Code
                    </Text>
                </Pressable>

            </View>


        </View>
    )
}

export default getOtp

const styles = StyleSheet.create({})