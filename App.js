import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles.js";

import Tabs from "./navigation/AppNavigator";

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            /* main */
            <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}

                <Tabs></Tabs>
            </View>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        })
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}
