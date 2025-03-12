import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Utils/Constants";
import { ScrollView } from "react-native-gesture-handler";

export default function UserAppliedJobs() {

    const [userAppliedJobs, setUserAppliedJobs] = useState([]);

    const getUserAppliedJobs = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userJobs/getUserAppliedJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json();
            console.log("Data: ", data?.userAppliesJobs);
            setUserAppliedJobs(data?.userAppliesJobs);
        } catch (error) {
            console.log("Error in getExplore: ", error.message);
        }
    }

    useEffect(() => {
        getUserAppliedJobs();
    }, []);

    return (
        <ScrollView>
            {
                <View
                style = {{
                    gap: 10,
                    padding: 1,
                    marginTop: 10
                }}
                    >
                    {
                            userAppliedJobs?.length === 0?
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
                            userAppliedJobs?.map((job, index) => {
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
                                                source ={{uri: job.jobApplied?.postedBy?.profileURL}} 
                                            />
                                            <View>
                                                <Text
                                                    style = {{
                                                        fontWeight: "bold",
                                                        fontSize: 18
                                                    }}
                                                >
                                                    {job.jobApplied?.postedBy?.userName}
                                                </Text>
                                                <Text
                                                    style = {{
                                                        fontWeight: "semibold",
                                                        fontSize: 13,
                                                        color: "gray"
                                                    }}
                                                >
                                                    {job.jobApplied?.postedBy?.email}
                                                </Text>
                                                <Text
                                                    style = {{
                                                        fontWeight: "semibold",
                                                        fontSize: 13
                                                    }}
                                                >
                                                    {job.jobApplied?.role}
                                                </Text>
                                                <Text
                                                    style = {{
                                                        fontWeight: "semibold",
                                                        fontSize: 13
                                                    }}
                                                >
                                                    {job.status}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                </View>
            }
        </ScrollView>
    )
}