import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  return (
    <SafeAreaView className='bg-primary h-full justify-center'>
    <View>
        <Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </Text>
    </View>
</SafeAreaView>
  );
};

export default LoadingScreen;
