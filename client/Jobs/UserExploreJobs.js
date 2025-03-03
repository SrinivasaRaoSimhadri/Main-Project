import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Utils/Constants";
import { useNavigation } from "@react-navigation/native";

export default function UserExploreJobs() {

    const navigation = useNavigation();

    const [userExploreJobs, setUserExploreJobs] = useState([]);
    const [startExam, setStartExam] = useState(false);

    const getUserExploreJobs = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userJobs/getExploreJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json();
            setUserExploreJobs(data?.exploreJobs?.map((job) => {
                return {
                    ...job,
                    show: false
                }
            }));
        } catch (error) {
            console.log("Error in getExplore: ", error.message);
        }
    }

    useEffect(() => {   
        getUserExploreJobs();
    }, []);

    return(
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{marginTop: 10}}
        >
            {
                !startExam && 
                <View>
                    <View
                            style = {{
                                gap: 10,
                                padding: 1
                            }}
                        >
                        {
                                userExploreJobs.length === 0?
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
                                userExploreJobs?.map((job, index) => {
                                    return (
                                        <Pressable
                                            onPress={() => 
                                                setUserExploreJobs((prev) => {
                                                    return prev.map((jbs) => {
                                                        return {
                                                            ...jbs,
                                                            show: jbs._id === job._id ? !jbs.show : jbs.show
                                                        }
                                                    })
                                                })
                                            } 
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
                                                    source ={{uri: job?.postedBy?.profileURL}} 
                                                />
                                                <View>
                                                    <Text
                                                        style = {{
                                                            fontWeight: "bold",
                                                            fontSize: 18
                                                        }}
                                                    >
                                                        {job?.postedBy?.userName}
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontWeight: "semibold",
                                                            fontSize: 13,
                                                            color: "gray"
                                                        }}
                                                    >
                                                        {job?.postedBy?.email}
                                                    </Text>
                                                    {
                                                        !job.show && 
                                                        <Text
                                                            style = {{
                                                                fontSize: 13,
                                                                fontWeight: "semibold"
                                                            }}
                                                        >
                                                            Role: 
                                                            <Text
                                                                style = {{
                                                                    fontWeight: "bold",
                                                                    fontSize: 14,
                                                                }}
                                                            >
                                                                {" "  + job?.role}
                                                            </Text>
                                                        </Text>
                                                    }
                                                </View>
                                            </View>
                                            {
                                                job.show && 
                                                <View>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5
                                                        }}
                                                    >
                                                        About us:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.postedBy?.about}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Role:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.role}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Description:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.description}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Location:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.location}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Salary:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.salary}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Job Type:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.jobType}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Skills:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.skills}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Applications:{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.applications?.length}
                                                        </Text>
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Number of questions :{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.questions?.length}
                                                        </Text>
                                                    </Text>
        
                                                    <Text
                                                        style = {{
                                                            fontSize: 13,
                                                            fontWeight: "bold",
                                                            paddingHorizontal: 5,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        Cutoff :{"\n"} 
                                                        <Text
                                                            style = {{
                                                                fontWeight: "semibold",
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {job?.cutoffMarks}
                                                        </Text>
                                                    </Text>
        
                                                    <View
                                                        style = {{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}
                                                    >
                                                        <Pressable 
                                                            onPress={() => {
                                                                return navigation.navigate("ExamHosting", { jobPostId: job?._id });
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
                                                            <Text style = {{color: "white", fontSize: 15, fontWeight: "bold"}}>Start test</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            }
                                        </Pressable>
                                    )
                                })
                            }
                    </View>
                    <View style = {{marginVertical: 100}}/>
                </View>
            }
        </ScrollView>
    )
}