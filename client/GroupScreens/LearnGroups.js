import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Utils/Constants.js";
import { useNavigation } from "@react-navigation/native";

export default function LearnGroups() {

    const [groups, setGroups] = useState([]);
    const navigation = useNavigation();

    const fetchGroups = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "chat/getLearnGroups", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " +  token
                }
            });
            const data = await response.json();
            setGroups(data.groups);
        } catch (error) {
            console.log("Error in fetchGroups: ", error.message);   
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);
    
    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{
                marginTop: 10
            }}
        >
            <View
                style = {{
                    gap: 10,
                    padding: 1
                }}
            >
                {
                    groups?.length === 0?
                    <Text 
                        style = {{
                            textAlign: "center", 
                            marginVertical: 15, 
                            backgroundColor: "lightgray", 
                            color: "white", 
                            padding: 10, 
                            borderRadius: 5, 
                            fontSize: 15, 
                            fontWeight:"bold"
                        }}>
                            Nothing to show! 
                        </Text>: 
                    groups?.map((group, index) => {
                        return (
                            <Pressable 
                                onPress={() => {
                                    navigation.navigate("GroupChat", group);
                                }}
                                key = {index}
                                style = {{
                                    backgroundColor: "white",
                                    elevation: 3,
                                    borderRadius: 5,
                                }}
                            >
                                <View
                                    style = {{
                                        flexDirection: "row", 
                                        gap: 10,
                                        paddingVertical: 10,
                                        paddingHorizontal: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    <Image 
                                        style = {{
                                            height: 55, 
                                            width: 55, 
                                            borderRadius: 100
                                        }} 
                                        source ={{uri: group?.admin?.profileURL}} 
                                    />
                                    <View>
                                        <Text
                                            style = {{
                                                fontWeight: "bold",
                                                fontSize: 18
                                            }}
                                        >   
                                            {group?.groupName}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 12
                                            }}
                                        >   
                                            {group?.admin?.email}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    })
                }
            </View>
            <View style = {{marginBottom: 200}}/>
        </ScrollView>
    )
}