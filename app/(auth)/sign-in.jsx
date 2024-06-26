import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      await signIn({
        email: form.email,
        password: form.password,
      });

      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Log in to Aora
          </Text>
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={`mt-7`}
            keyboardType={`email-address`}
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles={`mt-7`}
          />
          <CustomButton
            title={`Sign In`}
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={isSubmitting}
          />
          <View className="flex-row gap-2 justify-center pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={`/sign-up`}
              className="text-lg text-secondary font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
