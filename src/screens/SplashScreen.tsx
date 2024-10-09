import React from "react";
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { ImageCustom } from "../components/base/ImageCustom";
import logo_team from "../assets/img/logo_xdeuhug_team.png";
import logo_app from "../assets/img/logo_movie_xd_vn.png";

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
});

export const SplashScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            {/* Set StatusBar to transparent */}
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
            >
                <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} 
                    end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5, 0.8]}
                    colors={['#d8f3dc', '#52b788', '#95d5b2']}
                    style={styles.linearGradient}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <View style={{ position: 'absolute', top: 40, left: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ color: '#15616d', fontSize: 20, fontWeight: 'bold' }}>Provide</Text>
                                <Text style={{ color: '#15616d', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>by</Text>
                            </View>
                            <ImageCustom style={{ width: 128, height: 16, marginTop: 8 }} source={logo_team} />
                        </View>
                        <ImageCustom style={{ width: 192, height: 192 }} source={logo_app} />
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </View>
    );
}