import {View, Text, ScrollView, Image, Pressable, Alert} from 'react-native';
import { BASE_URL } from '../Utils/Constants';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopUtils from '../Utils/TopUtils';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function OrganisationActive() {

    const [jobs, setJobs] = useState([]);

    const getPosts = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "organisation/getJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            const data = await responce.json();
            setJobs(data?.jobs.map((job) => {
                return {
                    ...job,
                    show: false
                };
            }))
            console.log(data?.jobs?.[0].questions);
        } catch (error) {
            console.log(error.message);
        }
    }

    const closeApplications = (jobId) => {
        try {
            Alert.alert("Warning", "Are you sure you want to close applications?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        const userData = await AsyncStorage.getItem("userData");
                        let token;
                        if(userData) {
                            const parserUserData = JSON.parse(userData);
                            token = parserUserData?.data?.token;
                        }
                        const responce = await fetch(BASE_URL + "organisation/closeApplication", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                jobId
                            })
                        });
                        const data = await responce.json();
                        console.log("responce", responce.status, data);
                        if(responce.status === 200) {
                            Alert.alert("Success", "Applications closed successfully.");
                            getPosts();
                        }
                    }
                }
            ])
        } catch (error) {
            console.log(error.message);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getPosts();
        }, [])
    );


    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            style = {{
                padding: 1
            }}
        >
            <TopUtils  />
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
                                            {job.cutoffMarks}
                                        </Text>
                                    </Text>
                                    <Text
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: "bold",
                                            marginVertical: 10
                                        }}
                                    >Questions: </Text>
                                    {
                                        job?.questions && job.questions.map((question, index) => {
                                            return (
                                                <View
                                                    style = {{
                                                        marginBottom: 12,
                                                    }}
                                                    key={index}
                                                >
                                                    <Text
                                                        style = {{
                                                            fontSize: 16,
                                                            fontWeight: "bold",
                                                        }}
                                                    >{index + 1 + " " + question.question}</Text>
                                                    <Text>{"A. " + question.A}</Text>
                                                    <Text>{"B. " + question.B}</Text>
                                                    <Text>{"C. " + question.C}</Text>
                                                    <Text>{"D. " + question.D}</Text>
                                                    <Text
                                                        style = {{
                                                            fontWeight: "bold"
                                                        }}
                                                    >{"Answer: " + question.answer}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                <Pressable
                                    onPress = {() => {
                                        closeApplications(job._id);
                                    }}
                                >
                                    <Text
                                        style = {{
                                            textAlign: "center",
                                            backgroundColor: "#00428B",
                                            color: "white",
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 10
                                        }}
                                    >
                                        Close Applications
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