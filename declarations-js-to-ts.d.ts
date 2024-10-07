// src/types/react-native-flatlist-slider.d.ts
declare module 'react-native-flatlist-slider' {
    import { Component } from 'react';
    import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
  
    interface ImageData {
      image: ImageSourcePropType;
      desc?: string;
    }
  
    interface FlatListSliderProps {
      data: ImageData[];
      height?: number;
      width?: number;
      timer?: number;
      onPress?: (item: number) => void;
      contentContainerStyle?: StyleProp<ViewStyle>;
      indicatorActiveColor?: string;
      indicatorInActiveColor?: string;
      indicatorActiveWidth?: number;
      indicatorContainerStyle?: StyleProp<ViewStyle>;
    }
  
    export class FlatListSlider extends Component<FlatListSliderProps> {}
  }
  