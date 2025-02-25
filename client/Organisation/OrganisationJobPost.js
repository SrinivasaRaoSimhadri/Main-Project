import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
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
                    skills
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
                setErrorMessage("Experience posted successfully.");
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
                <Text style = {{fontWeight: "bold", marginBottom: 3}}>Skills: {skills}</Text>
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