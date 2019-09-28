import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    Image,
    ScrollView,
    Button
} from "react-native";
import styles from "../styles.js";
import db from "./../config/firebase";
import { FlatList } from "react-native-gesture-handler";

const BG_COLOR = "#36393f";
const ITEM_COLOR = "#2f3136";
const FONT_COLOR = "#e5e5e5";

export default class ProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.userName + "      ",
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
            selectedTab: "games",
            userData: {
                id: navigation.getParam("userId", "NO-ID"),
                name: navigation.getParam("userName", "NO-ID"),
                names: "",
                games: [
                    {
                        id: "No games :(",
                        time: 0
                    }
                ],
                servers: [
                    {
                        id: "",
                        name: ""
                    }
                ],
                status: "",
                iconUrl: ""
            }
        };
    }

    componentDidMount() {
        this.getDataFromFirestore();
    }

    getDataFromFirestore = () => {
        var docRef = db
            .collection("users")
            .where("Id", "==", this.state.userData.id);
        docRef
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (typeof doc.data().Id !== "undefined") {
                        if (doc.exists) {
                            this.setState({
                                userData: {
                                    id: doc.data().Id,
                                    name: doc.data().Name,
                                    names: doc.data().Names,
                                    games: doc.data().Games,
                                    servers: doc.data().Servers,
                                    status: doc.data().Status,
                                    iconUrl: doc.data().IconUrl
                                }
                            });
                        }
                    }
                });
            })
            .catch(error => {
                console.log("Error getting data from firestore: " + error);
            });
    };

    tabRender = () => {
        // User game time tab render
        if (this.state.selectedTab == "games") {
            return (
                <FlatList
                    style={{
                        width: "100%"
                    }}
                    data={this.state.userData.games.sort(
                        (a, b) => b.time - a.time
                    )}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                width: "100%",
                                flexDirection: "row"
                            }}
                        >
                            <View
                                style={[
                                    styles.item,
                                    {
                                        flex: 1 / 2
                                    }
                                ]}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "white"
                                    }}
                                >
                                    {item.id}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.item,
                                    {
                                        flex: 1 / 2
                                    }
                                ]}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: FONT_COLOR
                                    }}
                                >
                                    {item.time / 60 / 60 > 99
                                        ? (item.time / 60 / 60).toFixed(0)
                                        : item.time / 60 / 60 > 9
                                        ? (item.time / 60 / 60).toFixed(1)
                                        : (item.time / 60 / 60).toFixed(2)}
                                    {" hours"}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 2 }} />
                    )}
                />
            );
        }
        // servers the user is connected to - tab render
        else if (this.state.selectedTab == "servers") {
            return (
                <FlatList
                    style={{
                        width: "100%"
                    }}
                    data={this.state.userData.servers.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                width: "100%",
                                flexDirection: "row"
                            }}
                        >
                            <View
                                style={[
                                    styles.item,
                                    {
                                        flex: 1 / 2
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
                                        flex: 1 / 2,
                                        alignItems: "flex-start"
                                    }
                                ]}
                            >
                                <Text style={styles.list_item_text}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 2 }} />
                    )}
                />
            );
        }
        // anything else of interest
        else if (this.state.selectedTab == "misc") {
            return (
                <ScrollView>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            style={{
                                width: "100%"
                            }}
                            data={this.state.userData.names}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        height: 65,
                                        width: "100%"
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.item,
                                            {
                                                flex: 1
                                            }
                                        ]}
                                    >
                                        <Text style={styles.list_item_text}>
                                            {item}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 2 }} />
                            )}
                        />
                    </ScrollView>
                </ScrollView>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        source={{ uri: this.state.userData.iconUrl }}
                        style={{
                            flex: 1,
                            height: "100%",
                            width: Dimensions.get("window").width,
                            resizeMode: "contain"
                        }}
                    />
                </View>
                <View
                    style={{
                        alignSelf: "center",
                        width: "75%",
                        height: 40,
                        backgroundColor: BG_COLOR,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}
                >
                    <View style={localStyles.statusListItem}>
                        <View
                            style={{
                                backgroundColor: "green",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 10,
                                width: 10,
                                borderRadius: 5
                            }}
                        ></View>
                        <Text
                            style={[
                                styles.list_item_text,
                                {
                                    textAlign: "center"
                                }
                            ]}
                        >
                            {" "}
                            {(
                                parseInt(this.state.userData.status.Online) /
                                60 /
                                60
                            ).toFixed(0)}
                        </Text>
                    </View>
                    <View style={localStyles.statusListItem}>
                        <View
                            style={{
                                backgroundColor: "yellow",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 10,
                                width: 10,
                                borderRadius: 5
                            }}
                        />
                        <Text style={styles.list_item_text}>
                            {" "}
                            {(
                                parseInt(this.state.userData.status.Idle) /
                                60 /
                                60
                            ).toFixed(0)}
                        </Text>
                    </View>
                    <View style={localStyles.statusListItem}>
                        <View
                            style={{
                                backgroundColor: "red",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 10,
                                width: 10,
                                borderRadius: 5
                            }}
                        />
                        <Text style={styles.list_item_text}>
                            {" "}
                            {(
                                parseInt(this.state.userData.status.Busy) /
                                60 /
                                60
                            ).toFixed(0)}
                        </Text>
                    </View>
                    <View style={localStyles.statusListItem}>
                        <View
                            style={{
                                backgroundColor: "gray",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 10,
                                width: 10,
                                borderRadius: 5
                            }}
                        />
                        <Text style={styles.list_item_text}>
                            {" "}
                            {(
                                parseInt(this.state.userData.status.Offline) /
                                60 /
                                60
                            ).toFixed(0)}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.bodyContainer,
                        {
                            padding: 0
                        }
                    ]}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 50,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <TouchableHighlight
                            underlayColor={"red"}
                            style={localStyles.buttonList}
                            title="Games"
                            onPress={() => {
                                this.setState({
                                    selectedTab: "games"
                                });
                            }}
                        >
                            <Text style={localStyles.buttonListText}>
                                Games
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={"blue"}
                            style={localStyles.buttonList}
                            title="Servers"
                            onPress={() => {
                                this.setState({
                                    selectedTab: "servers"
                                });
                            }}
                        >
                            <Text style={localStyles.buttonListText}>
                                Servers
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={"green"}
                            style={localStyles.buttonList}
                            onPress={() => {
                                this.setState({
                                    selectedTab: "misc"
                                });
                            }}
                        >
                            <Text style={localStyles.buttonListText}>
                                Names
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                            paddingTop: 2
                        }}
                    >
                        {this.tabRender()}
                    </View>
                </View>
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    buttonList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#2f3136"
    },
    buttonListText: {
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        color: FONT_COLOR
    },
    statusListItem: {
        flex: 1 / 4,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }
});
