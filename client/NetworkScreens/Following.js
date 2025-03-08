import { View, Text, ScrollView, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/Constants";
import { useNavigation } from "@react-navigation/native";

export default function Following(props) {

    const [following, setFollowing] = useState([]);
    const [actualFollowing, setActualFollowing] = useState([]);
    const navigation = useNavigation();

    const getFollowing = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userNetwork/following", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }  
            })
            const data = await response.json();
            setFollowing(data?.following?.following);
            setActualFollowing(data?.following?.following);
        } catch (error) {
            console.log("Error in getFollowing: ", error);
        }
    }


    const unfollow = async (userId) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userNetwork/unfollow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            if(response.status === 200) {
                setFollowing(following.filter((f) => f?._id !== userId));
            }
        } catch (error) {
            console.log("Error in unfollow: ", error);
        }
    }


    useEffect(() => {
        getFollowing();
    },[]);

    useEffect(() => {
        setFollowing(actualFollowing.filter((follow) => {
            return follow?.userName.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            follow?.email.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            follow?.about.toLowerCase().includes(props.searchInput.toLowerCase())
        }));
    },[props.searchInput]);

    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{marginTop: 10}}
        >
           <View
                style = {{
                    gap: 10,
                    padding: 1
                }}
            >
            {
                    following?.length === 0?
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
                    following?.map((follow, index) => {
                        return (
                            <View 
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
                                    <Image style = {{
                                            height: 55, 
                                            width: 55, 
                                            borderRadius: 100
                                        }} 
                                        source ={{uri: follow?.profileURL}} 
                                    />
                                    <View>
                                        <Text
                                            style = {{
                                                fontWeight: "bold",
                                                fontSize: 18
                                            }}
                                        >
                                            {follow?.userName}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13,
                                                color: "gray"
                                            }}
                                        >
                                            {follow?.email}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13
                                            }}
                                        >
                                            {follow?.about}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style = {{flexDirection: "row", justifyContent: "space-between"}}
                                >
                                    <Pressable 
                                        onPress={() => {
                                            unfollow(follow?._id);
                                        }} 
                                        style = {{
                                            backgroundColor: "orange", 
                                            padding: 10, 
                                            borderRadius: 5, 
                                            alignItems: "center", 
                                            marginBottom: 5, 
                                            marginHorizontal: 5,
                                            width: 160
                                        }}>
                                        <Text style = {{color: "white", fontSize: 15, fontWeight: "bold"}}>UnFollow</Text>
                                    </Pressable>
                                    <Pressable 
                                        onPress={() => {
                                            navigation.navigate("Chat", {
                                                userId: follow?._id,
                                                userName: follow?.userName,
                                                profileURL: follow?.profileURL,
                                                email: follow?.email
                                            });
                                        }} 
                                        style = {{
                                            backgroundColor: "#00428B", 
                                            padding: 10, 
                                            borderRadius: 5, 
                                            alignItems: "center", 
                                            marginBottom: 5, 
                                            marginHorizontal: 5,
                                            width: 160,
                                        }}>
                                        <Text style = {{color: "white", fontSize: 15, fontWeight: "bold"}}>Message</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
           </View>
           <View style = {{marginVertical: 90}}/>
        </ScrollView>
    )
};