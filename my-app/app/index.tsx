import { Image, ScrollView, Text, View, Platform } from 'react-native';
import { Link, Redirect, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href={'/home'} />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full justify-center items-center min-h-[84vh] px-4'>
          <Image 
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
            />
            <Image
              source={images.cards}
              className='max-w-[380px] w-full h-[300px]'
              resizeMode='contain'
            />

          <View className='relative mt-5'            >
            <Text className='text-3xl text-white font-bold text-center'>
              Vendas simplificadas
            </Text>
            <Text className='text-3xl text-secondary-200 font-bold text-center'>
              Almeida App
            </Text>
            <Text className='text-gray-200 ext-sm font-pregular mt-7 text-center'>
              Descomplicando suas vendas
            </Text>
          </View>

          <CustomButton
          title="Continue com Email"
          handlePress={() => router.push('/sign-in')}
          containerStyles={`w-full mt-7 ${Platform.OS === 'web' ? 'max-w-[300px]' : ''}`}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor= '#161622'
        style='light'/>
    </SafeAreaView>
  );
}