import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, isLoading, textStyles }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${
        containerStyles || ""
      } ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
