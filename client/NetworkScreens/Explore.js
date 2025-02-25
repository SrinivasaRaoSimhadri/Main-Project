import { View, Text, ScrollView, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/Constants";

export default function Explore(props) {

    const [explore, setExplore] = useState([]);
    const [actualExplore, setActualExplore] = useState([]);

    const getExplore = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userNetwork/explore", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json();
            setExplore(data?.explore);
            setActualExplore(data?.explore);
        } catch (error) {
            console.log("Error in getExplore: ", error.message);
        }
    }

    const follow = async (userId) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userNetwork/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({userId})
            })
            const data = await response.json();
            if(response.status === 200) {
                setExplore((prev) => {
                    return prev.filter((item) => {
                        return item?._id !== data?.userId
                    })
                })
            }
        } catch (error) {
            console.log("Error in follow: ", error);
        }
    }

    useEffect(() => {
        getExplore();
    },[]); 

    useEffect(() => {
        setExplore(actualExplore.filter((user) => {
            return user?.userName.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            user?.email.toLowerCase().includes(props.searchInput.toLowerCase()) ||
            user?.about.toLowerCase().includes(props.searchInput.toLowerCase())
        }));
    },[props.searchInput]);

    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{marginTop: 10}}
        >
            <View style = {{
                gap: 10,
                padding: 1
            }}>
                {
                    explore.length === 0 ? <Text 
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
                    </Text> :
                    explore?.map((user, index) => {
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
                                        source = {{uri: user?.profileURL}}
                                    />
                                    <View>
                                        <Text
                                            style = {{
                                                fontWeight: "bold",
                                                fontSize: 18
                                            }}
                                        >
                                            {user?.userName}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13,
                                                color: "gray"
                                            }}
                                        >
                                            {user?.email}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13
                                            }}
                                        >
                                            {user?.about}
                                        </Text>
                                    </View>
                                </View>
                                <Pressable onPress={() => {
                                    follow(user?._id);
                                }} style = {{backgroundColor: "#00428B", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 5, marginHorizontal: 5}}>
                                    <Text style = {{color: "white", fontSize: 15, fontWeight: "bold"}}>Follow</Text>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
};