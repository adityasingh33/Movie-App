// import { StyleSheet, Text, View ,Image ,TextInput} from 'react-native'
// import React from 'react'
// import { icons } from '@/constants/icons'

// interface Props{
//     placeholder: string;
//     onPress?: () => void;
//     value? : string;
//     onChangeText? : (text : string) => void ;
// }
// const SearchBar = ({placeholder,onPress,value,onChangeText} : Props) => {

//   return (
//     <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
//       <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>

//       <TextInput
//        onPress={onPress}
//        placeholder={placeholder}
//        value={value}
//       //  onChangeText={() => {}}
//        onChangeText={onChangeText}
//        placeholderTextColor="#a8b5db"
//        className='flex-1 ml-2 text-white'
//       />
//     </View> 
//   )
// }

// export default SearchBar


import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  // If an onPress is provided we make the whole bar pressable.
  // Also call onPress when the input receives focus (useful for navigation-based search screens).
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      className="flex-row items-center bg-dark-200 rounded-full px-5 py-4"
    >
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          if (onPress) onPress();
        }}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
