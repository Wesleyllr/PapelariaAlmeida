import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { Account, Avatars } from 'react-native-appwrite'
import { icons } from '@/constants'
const logout = () => {

}


const profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className='w-full items-end'
              onPress={logout}
              >
              <Image source={icons.logout}
              resizeMode='contain'
              className='w-6 h-6' />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image source={{uri: user?.avatar}}
              className='w-[90%] h-[90%] rounded-lg'/>
            </View>
          </View>
        )}
        renderItem={() => null}
      />
    </SafeAreaView>
  );
};


export default profile
