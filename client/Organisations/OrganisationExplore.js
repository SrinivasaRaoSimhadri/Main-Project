import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrganisationExplore(props) {

    const [organisations, setOrganisations] = useState([]);

    const getOrganisations = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userOrganisation/getOrganisations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            const data = await response.json();
            setOrganisations(data?.organisations);
        } catch (error) {
            console.log("Error in getOrganisations: ", error);
        }
    }

    const followOrganisation = async (userId) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userOrganisation/followOrganisation", {
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
                setOrganisations(organisations.filter((organisation) => organisation?._id !== userId));
            }
        } catch (error) {
            console.log("Error in followOrganisation: ", error);
        }
    }

    useEffect(() => {
        getOrganisations();
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
                    organisations.length === 0?
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
                    organisations?.map((organisation, index) => {
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
                                            followOrganisation(organisation?._id);
                                        }} 
                                        style = {{
                                            backgroundColor: "#00428B", 
                                            padding: 10, 
                                            borderRadius: 5, 
                                            alignItems: "center", 
                                            marginBottom: 5, 
                                            marginHorizontal: 5,
                                            width: 328,
                                        }}>
                                        <Text style = {{color: "white", fontSize: 15, fontWeight: "bold"}}>Follow</Text>
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