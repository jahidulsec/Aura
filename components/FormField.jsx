import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles || ``}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className="border-2 border-black-200 w-full h-16 px-4 bg-black-100
       rounded-2xl focus:border-secondary justify-center"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={props?.keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-5"
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
