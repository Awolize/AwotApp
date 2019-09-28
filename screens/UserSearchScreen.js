import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    Dimensions
} from "react-native";
import styles from "../styles.js";

const BG_COLOR = "#36393f";
const ITEM_COLOR = "#2f3136";
const FONT_COLOR = "#e5e5e5";

export default class UserSearchScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.serverName + "    ",
        headerTintColor: FONT_COLOR,
        headerStyle: {
            backgroundColor: BG_COLOR
        },
        headerTitleStyle: {
            color: FONT_COLOR
        }
    });

    constructor(props) {
        super(props);

        const { navigation } = this.props;

        this.state = {
            loading: false,
            data: [],
            serverData: {
                id: navigation.getParam("serverId", "NO-ID"),
                name: navigation.getParam("serverName", "NO-ID"),
                iconUrl: navigation.getParam("serverIconUrl", "NO-ID"),
                users: navigation.getParam("serverUsers", "NO-ID")
            }
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.serverData.users.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            underlayColor={"black"}
                            onPress={() => {
                                this.props.navigation.navigate("Profile", {
                                    userId: item.id,
                                    userName: item.name
                                });
                            }}
                        >
                            <View style={styles.item}>
                                <Text style={styles.list_item_text}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 2 }} />
                    )}
                />
            </SafeAreaView>
        );
    }
}

const local_styles = StyleSheet.create({
    item: {
        backgroundColor: ITEM_COLOR,
        alignItems: "center",
        justifyContent: "center",
        height: 65
    },
    list_item_text: {
        fontSize: 22,
        color: FONT_COLOR
    }
});
