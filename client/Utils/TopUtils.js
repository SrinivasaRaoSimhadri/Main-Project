import { View, Image, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TopUtils(props) {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: "row", alignItems: "center", borderRadius: 10, marginBottom: 5 }}>
            <Pressable onPress={() => navigation.navigate("Profile")}>
                <Image 
                    style={{ width: 50, height: 50, borderRadius: 100 }} 
                    source={require("../assets/ShakeHand.jpg")} 
                />
            </Pressable>
            <View style={{ flex: 1 }}>
                <TextInput 
                    style={{ borderColor: "gray", borderWidth: 1, flexGrow: true, borderRadius: 10 }}
                    placeholder="Search..."
                    value= {props.searchInput}
                    onChangeText={(text) => props.setSearchInput(text)}
                />
            </View>
        </View>
    );
}
