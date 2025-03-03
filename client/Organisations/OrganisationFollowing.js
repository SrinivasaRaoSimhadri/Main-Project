import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrganisationFollowing(props) {

    const [followingOrganisations, setFollowingOrganisations] = useState([]);

    const getFollowingComapanies = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userOrganisation/followingOrganisations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            const data = await response.json();
            if(response.status === 200) {
                setFollowingOrganisations(data?.OrganisationsFollowing?.OrganisationsFollowing); 
            }

        } catch (error) {
            console.log("Error in getFollowingComapnies: ", error);
        }
    }

    const UnFollowOrganisation = async (userId) => {
        console.log("userId: ", userId);
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userOrganisation/unfollowOrganisation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            console.log("response: ", response.status);
            if(response.status === 200) {
                setFollowingOrganisations(followingOrganisations.filter((organisation) => organisation?._id !== userId));
            }
        } catch (error) {
            console.log("Error in UnFollowOrganisation: ", error);
        }
    }

    useEffect(() => {
        getFollowingComapanies();
    },[]);

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
                    followingOrganisations?.length === 0?
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
                    followingOrganisations?.map((organisation, index) => {
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
                                        source ={{uri: organisation?.profileURL}} 
                                    />
                                    <View>
                                        <Text
                                            style = {{
                                                fontWeight: "bold",
                                                fontSize: 18
                                            }}
                                        >
                                            {organisation?.userName}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13,
                                                color: "gray"
                                            }}
                                        >
                                            {organisation?.email}
                                        </Text>
                                        <Text
                                            style = {{
                                                fontWeight: "semibold",
                                                fontSize: 13
                                            }}
                                        >
                                            {organisation?.about}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style = {{flexDirection: "row", justifyContent: "space-between"}}
                                >
                                    <Pressable 
                                        onPress={() => {
                                            UnFollowOrganisation(organisation?._id);
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
                                        onPress={() => {}} 
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
        </ScrollView>
    )
}