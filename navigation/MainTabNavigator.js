import React from "react";
import { Platform } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import UserSearch from "../screens/UserSearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
        />
    )
};

HomeStack.path = "";

const UserSearchStack = createStackNavigator(
    {
        Search: UserSearch
    },
    config
);

UserSearchStack.navigationOptions = {
    tabBarLabel: "Search",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
        />
    )
};

UserSearchStack.path = "";

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen
    },
    config
);

ProfileStack.navigationOptions = {
    tabBarLabel: "Profile",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
        />
    )
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    UserSearchStack,
    ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
