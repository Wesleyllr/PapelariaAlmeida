import { Image, View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Platform } from "react-native";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Erro", "Preencha todos os campos");
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[84vh] px-4 my-6">
          <View className="flex-row items-center justify-center">
            <Image
              source={images.moovcolumblue}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <View className="w-[1px] h-full bg-white" />
            <Image
              source={images.logopapelaria}
              resizeMode="contain"
              className="w-[35px] h-[35px]"
            />
          </View>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Entrar na Papelaria
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={`mt-7 w-full ${
              Platform.OS === "web" ? "max-w-[400px]" : ""
            }`}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={`mt-7 w-full ${
              Platform.OS === "web" ? "max-w-[400px]" : ""
            }`}
          />
          <CustomButton
            title="Entrar"
            handlePress={submit}
            containerStyles={`mt-7 w-full ${
              Platform.OS === "web" ? "max-w-[300px]" : ""
            }`}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">Não possuo conta!</Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Cadastrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
