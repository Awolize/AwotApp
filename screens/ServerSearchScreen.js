import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    Image
} from "react-native";
import styles from "../styles.js";
import db from "./../config/firebase";

const BG_COLOR = "#36393f";
const ITEM_COLOR = "#2f3136";
const FONT_COLOR = "#e5e5e5";

export default class ServerSearchScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Servers   ",
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
        this.state = {
            loading: false,
            data: []
        };
    }

    componentDidMount() {
        this.getDataFromFirestore();
    }

    getDataFromFirestore = () => {
        var docRef = db.collection("servers").orderBy("Name");
        docRef
            .get()
            .then(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    if (typeof doc.data().Id !== "undefined") {
                        list.push({
                            // set list items
                            id: doc.data().Id,
                            name: doc.data().Name,
                            iconUrl: doc.data().IconUrl,
                            users: doc.data().Users
                        });
                    }
                });
                this.setState({
                    data: list
                });
            })
            .catch(error => {
                console.log("Error getting data from firestore: " + error);
            });
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            underlayColor={"black"}
                            onPress={() => {
                                this.props.navigation.navigate("UserSearch", {
                                    serverId: item.id,
                                    serverName: item.name,
                                    serverIconUrl: item.iconUrl,
                                    serverUsers: item.users
                                });
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <View
                                    style={[
                                        styles.item,
                                        {
                                            flex: 1 / 3
                                        }
                                    ]}
                                >
                                    <Image
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: 55 / 2,
                                            overlayColor: ITEM_COLOR,
                                            opacity: 1
                                        }}
                                        source={{
                                            uri: item.iconUrl
                                        }}
                                    />
                                </View>

                                <View
                                    style={[
                                        styles.item,
                                        {
                                            flex: 1 / 3
                                        }
                                    ]}
                                >
                                    <Text style={styles.list_item_text}>
                                        {item.name}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.item,
                                        {
                                            flex: 1 / 3
                                        }
                                    ]}
                                >
                                    <Text style={styles.list_item_text}>
                                        {item.users.length}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 2 }} />
                    )}
                />
            </SafeAreaView>
        );
    }
}
