import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../Utils/Constants";
import TopUtils from '../Utils/TopUtils';


export default function OrganisationHirings() {

    const [jobs, setJobs] = useState([]);

    const gethirings = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "organisation/hirings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            const data = await responce.json();
            setJobs(data?.jobs)
            console.log(data?.jobs[0].applications);
        } catch (error) {
            console.log(error.message);
        }
    }

    const closeHiring = async (jobId) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "organisation/closeHiring", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    jobId
                })
            });
            if(responce.status === 200) {
                gethirings();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        gethirings();
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{
                padding: 1
            }}
        >
            <TopUtils />
            {
                jobs.length === 0? <Text 
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
                jobs && jobs.map((job, index) => {
                    return (
                        <Pressable
                            onPress = {() => {
                                setJobs((prev) => {
                                    return prev.map((item) => {
                                        return {
                                            ...item,
                                            show: item._id === job._id ? !item.show : item.show
                                        }
                                    })  
                                })
                            }}
                            style = {{
                                elevation: 3,
                                backgroundColor: "white",
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                marginBottom: 15,
                            }} 
                            key={index}
                        >
                            <View
                                style = {{
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center"
                                }}
                            >
                                <Image 
                                    style = {{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 100
                                    }}
                                    source = {{uri: job.postedBy.profileURL}} 
                                />
                                <View>
                                    <Text
                                        style = {{
                                            fontSize: 16,
                                            fontWeight: "bold"
                                        }}
                                    >{job.role}</Text>
                                    <Text
                                        style = {{
                                            fontSize: 15,
                                            color: "gray"
                                        }}
                                    >{job.jobType}</Text>
                                    <Text
                                        style = {{
                                            fontSize: 15,
                                            color: "gray"
                                        }}
                                    >{job.location}</Text>

                                </View>
                            </View>

                            {
                                job.show && 
                                <View>
                                    <Text
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: "bold",
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
                                            {job.description}
                                        </Text>
                                    </Text>
                                    <Text
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: "bold",
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
                                            {job.salary}
                                        </Text>
                                    </Text>
                                    <Text
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: "bold",
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
                                            {job.skills}
                                        </Text>
                                    </Text>
                                    <View>
                                        <Text
                                            style = {{
                                                fontSize: 13,
                                                fontWeight: "bold",
                                                marginTop: 10
                                            }}
                                        >
                                            Applications:{"\n"} 
                                        </Text>
                                        {
                                            job.applications.length === 0? <Text 
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
                                                    No applications yet!
                                                </Text> :
                                            job.applications.map((application, index) => {
                                                return (
                                                    <View
                                                        key = {index}
                                                        style = {{
                                                            backgroundColor: "lightgray",
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            marginBottom: 10
                                                        }}
                                                    >
                                                        <Text
                                                            style = {{
                                                                fontSize: 13,
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            {application.userName}
                                                        </Text>
                                                        <Text
                                                            style = {{
                                                                fontSize: 13,
                                                                color: "gray"
                                                            }}
                                                        >
                                                            {application.email}
                                                        </Text>
                                                        <Text
                                                            style = {{
                                                                fontSize: 13,
                                                                color: "gray"
                                                            }}
                                                        >
                                                            {application.about}
                                                        </Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>        
                                    <Pressable
                                        onPress = {() => {
                                            closeHiring(job._id);
                                        }}
                                    >
                                        <Text
                                            style = {{
                                                textAlign: "center",
                                                backgroundColor: "#00428B",
                                                color: "white",
                                                padding: 5,
                                                paddingVertical: 10,
                                                borderRadius: 5,
                                                marginTop: 10
                                            }}
                                        >
                                            Close Hirings
                                        </Text>
                                    </Pressable>
                                </View>
                            }
                        </Pressable>
                    )
                })
            }
        </ScrollView>
    )
}