import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderAppProps {
  title: string;
  showBackButton?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const HeaderApp: React.FC<HeaderAppProps> = ({
  title,
  showBackButton = true,
  backgroundColor = 'bg-white',
  textColor = 'text-black',
}) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={backgroundColor.replace('bg-', '')} barStyle="dark-content" />
      <View className={`${backgroundColor} flex-row items-center px-4 py-2 absolute top-0 left-0 right-0 z-50`}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
            <Icon name="arrow-back" size={24} color={textColor.replace('text-', '')} />
          </TouchableOpacity>
        )}
        <Text className={`${textColor} text-lg font-bold flex-1 text-center`}>{title}</Text>
      </View>
    </>
  );
};

export default HeaderApp;