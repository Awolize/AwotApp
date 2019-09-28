import { StyleSheet, Dimensions } from "react-native";

const BG_COLOR = "#36393f";
const ITEM_COLOR = "#2f3136";
const FONT_COLOR = "#e5e5e5";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        height: Dimensions.get("window").height
    },
    header: {
        fontWeight: "bold"
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    item: {
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ITEM_COLOR
    },
    list_item_text: {
        fontSize: 16,
        color: FONT_COLOR
    },

    bodyContainer: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: BG_COLOR
    },
    headerContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: BG_COLOR
    }
});

export default styles;
