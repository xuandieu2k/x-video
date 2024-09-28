import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider, { SliderProps } from '@react-native-community/slider';

const ReelsSlider: React.FC<SliderProps> = (props: SliderProps) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={props.minimumValue}
        maximumValue={props.maximumValue}
        value={props.value}
        onValueChange={props.onValueChange}
        minimumTrackTintColor="#e63946" 
        maximumTrackTintColor="#ccc"
        thumbTintColor="#e63946" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
  }
});

export default ReelsSlider;