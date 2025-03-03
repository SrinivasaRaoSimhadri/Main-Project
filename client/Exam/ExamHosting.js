import { useEffect, useState } from 'react';
import { AppState, Alert, View, Text, Pressable, BackHandler } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Utils/Constants';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExamHosting() {

    const [appState, setAppState] = useState(AppState.currentState);
    const [backgroundCount, setBackGroundCount] = useState(0);
    const route = useRoute();
    const navigation = useNavigation();
    const { jobPostId } = route.params || {};
    const [score, setScore] = useState(0);
    const [unAttemped, setUnAttemped] = useState(0);
    const [examData, setExamData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [showtest, setShowtest] = useState(true);

    const getExamData = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userJobs/getExamData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({jobPostId})
            })
            const data = await response.json();
            setExamData(data?.jobPost);
            setQuestions(data?.jobPost?.questions?.map((question) => {
                return {
                    ...question,
                    selected: ""
                }
            }));
            console.log("Data: ", data?.jobPost?.questions[0]);
        } catch (error) {
            console.log("Error in getExplore: ", error.message);
        }
    }

    const Apply = async () => {
        try {
            console.log("Score: ", score);
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "userJobs/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    jobPostId,
                    status: "Applied",
                    marks: questions?.length,                    
                    scored: score,
                    cutOff: examData?.cutoffMarks
                })
            })
            const data = await response.json();
            console.log("Data: ", data);
        } catch (error) {
            console.log("Error in getExplore: ", error.message);
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert(
                "Submit and exit test?",
                "Are you sure you want to submit and exit the exam?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Yes",
                        style: "destructive",
                        onPress: () => {
                            checkScore();
                            setShowtest(false);
                        }
                    },
                ]
            );
            return true;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        getExamData();
    }, [jobPostId]);

    useEffect(() => {
        if(backgroundCount === 2) {
            checkScore();  
            setShowtest(false);
            setBackGroundCount(3);
        }
    },[backgroundCount]);

    useEffect(() => {

        const handleAppStateChange = async (nextAppState) => {
            if (appState === 'active' && nextAppState === 'background') {
                setBackGroundCount((backgroundCount) => backgroundCount + 1);    
            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [appState]); 


    const checkScore = () => {
        questions?.map((question) => {
            if(question?.selected === "") {
                setUnAttemped((unAttemped) => unAttemped + 1);
            } else if(question?.selected === question?.answer) {
                setScore((score) => score + 1);
            }
        });
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
        >
            {
                showtest && 
                <View>
                    <View style={{
                        margin: 2,
                        padding: 10,
                        backgroundColor: "white",
                        elevation: 4,
                        borderRadius: 5,
                        marginBottom: 15,
                        marginTop: 2
                    }}>
                        <Text>Questions: {examData?.questions?.length}</Text>
                        <Text>Cutoff Marks: {examData?.cutoffMarks}</Text>
                    </View>
                    <View>
                        {
                            questions?.map((question, index) => {
                                return (
                                    <View key={index} style={{
                                        marginVertical: 5,
                                        marginHorizontal: 2,
                                        padding: 10,
                                        backgroundColor: "white",
                                        elevation: 4,
                                        borderRadius: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 16

                                            }}
                                        >
                                            {index + 1 + ". " + question?.question}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 6
                                            }}
                                        >
                                            <Pressable
                                                style = {{
                                                    backgroundColor: question?.selected === "A" ? "#00428B" : "white",
                                                    paddingHorizontal: question?.selected === "A" ? 5 : 0,
                                                    borderRadius:  question?.selected === "A" ? 5 : 0
                                                }}
                                                onPress={() => setQuestions((prev) => {
                                                    return prev.map((item, i) => {
                                                        return {
                                                            ...item,
                                                            selected: question?._id === item._id? "A": item?.selected
                                                        }
                                                    })
                                                })}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        marginVertical: 2,
                                                        color: question?.selected === "A" ? "white" : ""
                                                    }}
                                                >
                                                    {"A. " + question?.A}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style = {{
                                                    backgroundColor: question?.selected === "B" ? "#00428B" : "white",
                                                    paddingHorizontal: question?.selected === "B" ? 5 : 0,
                                                    borderRadius:  question?.selected === "B" ? 5 : 0
                                                }}

                                                onPress={() => setQuestions((prev) => {
                                                    return prev.map((item, i) => {
                                                        return {
                                                            ...item,
                                                            selected: question?._id === item._id? "B": item?.selected
                                                        }
                                                    })
                                                })}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        marginVertical: 2,
                                                        color: question?.selected === "B" ? "white" : ""
                                                    }}
                                                >
                                                    {"B. " + question?.B}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style = {{
                                                    backgroundColor: question?.selected === "C" ? "#00428B" : "white",
                                                    paddingHorizontal: question?.selected === "C" ? 5 : 0,
                                                    borderRadius:  question?.selected === "C" ? 5 : 0
                                                }}

                                                onPress={() => setQuestions((prev) => {
                                                    return prev.map((item, i) => {
                                                        return {
                                                            ...item,
                                                            selected: question?._id === item._id? "C": item?.selected
                                                        }
                                                    })
                                                })}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        marginVertical: 2,
                                                        color: question?.selected === "C" ? "white" : ""
                                                    }}
                                                >
                                                    {"C. " + question?.C}
                                                </Text>
                                            </Pressable>
                                            <Pressable

                                                style = {{
                                                    backgroundColor: question?.selected === "D" ? "#00428B" : "white",
                                                    paddingHorizontal: question?.selected === "D" ? 5 : 0,
                                                    borderRadius:  question?.selected === "D" ? 5 : 0
                                                }}

                                                onPress={() => setQuestions((prev) => {
                                                    return prev.map((item, i) => {
                                                        return {
                                                            ...item,
                                                            selected: "D",
                                                            selected: question?._id === item._id? "D": item?.selected
                                                        }
                                                    })
                                                })}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        marginVertical: 2,
                                                        color: question?.selected === "D" ? "white" : ""
                                                    }}
                                                >   
                                                    {"D. " + question?.D}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Pressable
                        style = {{
                            backgroundColor: "#00428B",
                            padding: 10,
                            borderRadius: 5,
                            alignItems: "center",
                            marginBottom: 5,
                            marginHorizontal: 5
                        }}
                        onPress = {() => {
                            Alert.alert(
                                "Submit and exit test?",
                                "Are you sure you want to submit and exit the test?",
                                [
                                    { text: "Cancel", style: "cancel"},
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            checkScore();
                                            setShowtest(false);
                                            Apply();
                                        }
                                    },
                                ]
                            );
                        }}
                    >
                        <Text
                            style = {{
                                color: "white",
                                fontSize: 15,
                                fontWeight: "bold"
                            }}
                        >
                            Submit
                        </Text>
                    </Pressable>
                    <View style = {{marginVertical: 10}}/>
                </View>
            }
            {
                backgroundCount === 1 && Alert.alert("Warning", "Your app is going to background, test will be submitted.", [
                    {
                        text: "Ok",
                        style: "cancel",
                        onPress: () => {
                            console.log("background alert");
                        },
                    },
                ])
            }
            {
                backgroundCount === 2 && Alert.alert("Warning", "Your app went twice to background, test submitted.", [
                    {
                        text: "Ok",
                        style: "cancel",
                        onPress: () => {
                            console.log("background alert sdbjk");
                        }
                    },
                ])
            }
            {
                !showtest &&
                <View
                    style = {{
                        elevation: 10,
                        backgroundColor: "white",
                        marginTop: 150,
                        borderRadius: 5,
                        padding: 10,
                        marginHorizontal: 5
                    }}>
                    <Text
                        style = {{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >Test submitted</Text>
                    <View
                        style = {{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 10,
                            paddingHorizontal: 10
                        }}
                    >
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15

                            }}>
                            Answered: 
                        </Text>
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15
                            }}>
                            {questions?.length - unAttemped}
                        </Text>
                    </View>
                    <View
                        style = {{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 10,
                            paddingHorizontal: 10
                        }}
                    >
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15

                            }}>
                            Not answered:  
                        </Text>
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15

                            }}>
                            {unAttemped}
                        </Text>
                    </View>
                    <View
                        style = {{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 10,
                            paddingHorizontal: 10
                        }}
                    >
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15

                            }}>
                            Marks secured:  
                        </Text>
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15

                            }}>
                            {score}
                        </Text>
                    </View>
                    <View
                        style = {{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 10,
                            paddingHorizontal: 10
                        }}
                    >
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15
                            }}>
                            Cut off marks:   
                        </Text>
                        <Text
                            style = {{
                                fontWeight: "bold",
                                fontSize: 15
                            }}>
                            {examData?.cutoffMarks}
                        </Text>
                    </View>
                    <Pressable
                        style = {{
                            backgroundColor: "#00428B",
                            padding: 10,
                            borderRadius: 5,
                            alignItems: "center",
                            marginBottom: 5,
                            marginHorizontal: 5,
                            marginTop: 20
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text
                            style = {{
                                color: "white",
                                fontSize: 15,
                                fontWeight: "bold"
                            }}
                        >Go Back</Text>
                    </Pressable>
                </View>
            }
        </ScrollView>
    );
}