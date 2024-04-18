import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

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
            Sign up to Aora
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            handleChangeText={(e) => {
              setForm({ ...form, username: e });
            }}
            placeholder={`e.g. john21`}
            otherStyles={`mt-10`}
          />
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={`mt-7`}
            keyboardType={`email-address`}
            placeholder={`e.g. john@email.com`}
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            placeholder={`At lease 8 characters long`}
            otherStyles={`mt-7`}
          />
          <CustomButton
            title={`Sign In`}
            handlePress={() => {
              submit;
            }}
            containerStyles={`mt-7`}
            isLoading={isSubmitting}
          />
          <View className="flex-row gap-2 justify-center pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={`/sign-in`}
              className="text-lg text-secondary font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
