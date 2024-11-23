import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Guest = () => {
  return (
    <SafeAreaView className='bg-primary h-full justify-center'>
        <View>
            <Text>
                Voce é um convidado
            </Text>
        </View>
    </SafeAreaView>
  )
}

export default Guest