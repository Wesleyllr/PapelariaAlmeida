import { Image, View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Platform } from "react-native";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Erro", "Preencha todos os campos");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[84vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Cadastrar na Papelaria
          </Text>
          <FormField
            title="Usuário"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={`mt-10 w-full ${
              Platform.OS === "web" ? "max-w-[400px]" : ""
            }`}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={`mt-10 w-full ${
              Platform.OS === "web" ? "max-w-[400px]" : ""
            }`}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={`mt-10 w-full ${
              Platform.OS === "web" ? "max-w-[400px]" : ""
            }`}
          />
          <CustomButton
            title="Cadastrar"
            handlePress={submit}
            containerStyles={`mt-10  w-full ${
              Platform.OS === "web" ? "max-w-[300px]" : ""
            }`}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">Já tenho conta!</Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Entrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
