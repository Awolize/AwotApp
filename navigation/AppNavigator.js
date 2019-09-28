import React from "react";
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";

import UserSearchScreen from "../screens/UserSearchScreen";
import ServerSearchScreen from "../screens/ServerSearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AppStackNavigator = createStackNavigator(
    {
        ServerSearch: ServerSearchScreen,
        UserSearch: UserSearchScreen,
        Profile: ProfileScreen
    },
    {
        headerMode: "float",
        headerBackTitleVisible: true,
        headerLayoutPreset: "center",
        cardStyle: {
            backgroundColor: "rgba(0,0,0,0)",
            opacity: 1
        }
    }
);
//-----------------------------------------------------------------
export default createAppContainer(
    createSwitchNavigator({
        App: AppStackNavigator
    })
);
