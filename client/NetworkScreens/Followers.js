import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react"
import { BASE_URL } from "../Utils/Constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Followers(props) {

    const [followers, setFollowers] = useState([]);
    const [actualFollowers, setActualFollowers] = useState([]);

    const getFollowers = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userNetwork/followers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json();
            setFollowers(data?.followers?.followers);
            setActualFollowers(data?.followers?.followers);
        } catch (error) {
            console.log("Error in getFollowers: ", error.message);
        }
    }

    useEffect(() => {
        getFollowers();
    },[]);

    useEffect(() => {
        setFollowers(actualFollowers.filter((follower) => {
            return follower?.userName.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            follower?.email.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            follower?.about.toLowerCase().includes(props.searchInput.toLowerCase())
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
                    followers?.length === 0?
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
                    followers?.map((follower, index) => {
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
                                    <Image 
                                        style = {{
                                            height: 55, 
                                            width: 55, 
                                            borderRadius: 100
                                        }} 
                                        source ={{uri: follower?.profileURL}} 
                                    />
                                    <View>
                                        <Text
                                            style = {{
                                                fontWeight: "bold",
                                                fontSize: 18
                                            }}
                                        >   
                                            {follower?.userName}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13,
                                                color: "gray"
                                            }}
                                        >
                                            {follower?.email}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13
                                            }}
                                        >
                                            {follower?.about}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
};