import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-pblack'>Hello Worldss!</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: "dodgerblue" }}>Ir para Home</Link>
    </View>
  );
}