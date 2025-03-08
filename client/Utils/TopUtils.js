import { View, Image, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopUtils(props) {

    const [userProfile, setUserProfile] = useState(null);
    const navigation = useNavigation();

    const getUserProflile = async () => {
        const userData = await AsyncStorage.getItem("userData");
        const parserUserData = JSON.parse(userData);
        setUserProfile(parserUserData?.data?.profileURL);
    }

    useEffect(() => {
        getUserProflile();
    }, []);

    return (
        <View style={{ flexDirection: "row", alignItems: "center", borderRadius: 10, marginBottom: 5, gap: 5 }}>
            <Pressable onPress={() => navigation.navigate("Profile")}>
                <Image 
                    style={{ width: 50, height: 50, borderRadius: 100 }} 
                    source={{ uri: userProfile }} 
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