import {View, Text, TextInput, ScrollView, Pressable, Alert} from 'react-native';
import { useState } from 'react';
import { BASE_URL } from '../Utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrganisationJobPost() {

    const [error, setError] = useState(false);
    const [status, setStatus] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [skills, setSkills] = useState("");
    const [questionForm, setQuestionForm] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [cutoff, setCutoff] = useState(0);
    const [question, setQuestion] = useState({
        question: "what is java script?",
        A: "styling language",
        B: "mark up language",
        C: "scripthing language",
        D: "database systems",
        answer: "C"
    });

    const postJob = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "organisation/postjob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    role,
                    description,
                    location,
                    salary,
                    jobType,
                    skills,
                    questions,
                    cutoffMarks: cutoff
                })
            })
            setError(true);
            setStatus(responce.status);
            if(responce.status === 200) {
                setRole("");
                setDescription("");
                setLocation("");
                setSalary("");
                setJobType("");
                setSkills("");
                setCutoff(0);
                setQuestions([]);
                setErrorMessage("Job posted successfully.");
            } else {
                const errorData = await responce.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <ScrollView 
            style = {{marginTop: 10}}
            showsVerticalScrollIndicator = {false}
        >
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Role: </Text>
                <TextInput 
                    placeholder = "Ex: SDE"
                    value= {role}
                    onChangeText = {(text) => {
                        setRole(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Description: </Text>
                <TextInput 
                    placeholder = "Ex: Role as backend developer"
                    multiline = {true}
                    value= {description}
                    onChangeText = {(text) => {
                        setDescription(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Location: </Text>
                <TextInput 
                    placeholder = "Ex: Hyderabad"
                    value= {location}
                    onChangeText = {(text) => {
                        setLocation(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Salary: </Text>
                <TextInput 
                    placeholder = "Ex: 10-15 lpa"
                    value= {salary}
                    onChangeText = {(text) => {
                        setSalary(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>JobType: </Text>
                <TextInput 
                    placeholder = "Ex: fulltime"
                    value= {jobType}
                    onChangeText = {(text) => {
                        setJobType(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>skills: </Text>
                <TextInput 
                    placeholder = "Ex: java python c++"
                    value= {skills}
                    onChangeText = {(text) => {
                        setSkills(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View style = {{marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Cutoff:  (1 mark for each question) </Text>
                <TextInput 
                    placeholder = "Ex: 3"
                    value= {cutoff}
                    onChangeText = {(text) => {
                        setCutoff(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                    style = {{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "gray",
                    }}
                />
            </View>
            <View>
                {
                    questions.length > 0 && 
                    <View style = {{elevation: 5, padding: 10, marginBottom: 5, borderRadius: 5, backgroundColor: "white", margin: 5}}>
                        {
                            questions.map((item, index) => {
                                return (
                                    <View key = {index} style = {{marginBottom: 10, backgroundColor: "lightgray", padding: 5, borderRadius: 5}}>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>{index + 1 + ". " + item.question}</Text>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>{"A. " + item.A}</Text>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>{"B. " + item.B}</Text>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>{"C. " + item.C}</Text>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>{"D. " + item.D}</Text>
                                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>Answer: {item.answer}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                }
                {
                    questionForm && 
                    <View  style = {{elevation: 5, padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: "white", margin: 5}}>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>Question: </Text>
                            <TextInput 
                                placeholder = "Ex: What is JavaScript?"
                                value= {question.question}
                                onChangeText = {(text) => {
                                    setQuestion({...question, question: text});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                multiline = {true}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>option 1: </Text>
                            <TextInput 
                                placeholder = "Ex: Styling language"
                                value= {question.A}
                                onChangeText = {(text) => {
                                    setQuestion({...question, A: text});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                multiline = {true}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>option 2: </Text>
                            <TextInput 
                                placeholder = "Ex: Markup language"
                                value= {question.B}
                                onChangeText = {(text) => {
                                    setQuestion({...question, B: text});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                multiline = {true}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>option 3: </Text>
                            <TextInput 
                                placeholder = "Ex: Scripting language"
                                value= {question.C}
                                onChangeText = {(text) => {
                                    setQuestion({...question, C: text});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                multiline = {true}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>option 4: </Text>
                            <TextInput 
                                placeholder = "Ex: Database system"
                                value= {question.D}
                                onChangeText = {(text) => {
                                    setQuestion({...question, D: text});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                multiline = {true}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                        <View style = {{marginBottom: 10}}>
                            <Text style = {{fontWeight: "bold", marginBottom: 3}}>Answer: </Text>
                            <TextInput 
                                multiline = {true}
                                placeholder = "Ex: A or B or C or D"
                                value= {question.answer}
                                onChangeText = {(text) => {
                                    setQuestion({...question, answer: text.toUpperCase()});
                                    if(error) {
                                        setError(false);
                                    }
                                }}
                                style = {{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: "gray",
                                }}
                            />
                        </View>
                    </View>
                }
                {
                    !questionForm && 
                    <Pressable
                        onPress = {() => {
                            setQuestionForm(!questionForm);
                        }}
                        style = {{
                            backgroundColor: "blue", 
                            color: "white", 
                            textAlign: "center", 
                            padding: 1,
                            paddingVertical: 10,
                            borderRadius: 5,
                            fontWeight: "bold",
                            fontSize: 16,
                            width: 340,
                            marginBottom: 10
                        }}
                    >
                        <Text style = {{fontWeight: "bold", marginBottom: 3, color: "white", textAlign: "center"}}>Add questions </Text>
                    </Pressable>
                }
                {
                    questionForm && 
                    <View style = {{flexDirection: "row", justifyContent: "space-between", marginHorizontal:5}}>
                        <Pressable
                            onPress={() => {
                                setQuestions([...questions, question]);
                                setQuestion({
                                    // question: "",
                                    // A: "",
                                    // B: "",
                                    // C: "",
                                    // D: "",
                                    // answer: ""
                                    question: "what is java script?",
                                    A: "styling language",
                                    B: "mark up language",
                                    C: "scripthing language",
                                    D: "database systems",
                                    answer: "C"
                                });
                            }}
                            style = {{
                                backgroundColor: "blue", 
                                color: "white", 
                                textAlign: "center", 
                                padding: 1,
                                paddingVertical: 10,
                                borderRadius: 5,
                                fontWeight: "bold",
                                fontSize: 16,
                                width: 160,
                                marginBottom: 10
                            }}
                        >
                            <Text style = {{fontWeight: "bold", marginBottom: 3, color: "white", textAlign: "center"}}>Add</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setQuestionForm(!questionForm);
                            }}
                            style = {{
                                backgroundColor: "orange", 
                                color: "white", 
                                textAlign: "center", 
                                padding: 1,
                                paddingVertical: 10,
                                borderRadius: 5,
                                fontWeight: "bold",
                                fontSize: 16,
                                width: 160,
                                marginBottom: 10
                            }}
                        >
                            <Text style = {{fontWeight: "bold", marginBottom: 3, color: "white", textAlign: "center"}}>Cancel </Text>
                        </Pressable>
                    </View>
                }
            </View>
            <View>
                {
                    error && <Text 
                        style = {{
                            backgroundColor: status === 200?"green":"red", 
                            color: "white", 
                            textAlign: "center", 
                            padding: 1,
                            paddingVertical: 10,
                            borderRadius: 5,
                            fontWeight: "bold",
                            fontSize: 16,
                            width: 340,
                            marginBottom: 10
                        }}
                    >{errorMessage}</Text>
                }
                <Pressable
                    onPress={postJob}
                >
                    <Text style = {{
                        backgroundColor: "green", 
                        color: "white", 
                        textAlign: "center", 
                        paddingVertical: 10,
                        borderRadius: 5,
                        fontWeight: "bold",
                        fontSize: 16,
                        width: 340
                    }}>
                        Post
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}