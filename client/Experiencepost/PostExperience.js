import { View, Text, TextInput, Modal, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostExperience(props) {
    
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [hiringMode, setHiringMode] = useState("");
    const [roundsDescription, setRoundsDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [offerStatus, setOfferStatus] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [status, setStatus] = useState(0);

    const postExperience = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "experience/postExperience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    company: company,
                    role: role,
                    hiringMode: hiringMode,
                    roundsDescription: roundsDescription,
                    difficulty: difficulty,
                    offerStatus: offerStatus
                })
            })
            setError(true);
            setStatus(responce.status);
            if(responce.status === 200) {
                setCompany("");
                setRole("");
                setHiringMode("");
                setRoundsDescription("");
                setDifficulty("");
                setOfferStatus("");
                setErrorMessage("Experience posted successfully.");
            } else {
                const errorData = await responce.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    }

    const deleteExperience = async (id) => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "experience/deleteExperience/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    }

    return (
        <Modal 
            animationType="slide"
        >
            <View style = {{padding: 10}}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                >
                    <View style = {{marginBottom: 10}}>
                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>Company: </Text>
                        <TextInput 
                            placeholder = "Ex: Amazon"
                            value= {company}
                            onChangeText = {(text) => {
                                setCompany(text);
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
                        <Text style = {{fontWeight: "bold", marginBottom: 3}}>InterviewRounds </Text>
                        <TextInput 
                            placeholder = "Ex: Description of the rounds"
                            value= {roundsDescription}
                            multiline={true}
                            onChangeText = {(text) => {
                                setRoundsDescription(text);
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
                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Hiring Mode </Text>
                    <View style = {{borderColor: "gray", borderWidth: 1, borderRadius: 5, marginBottom: 10}}>
                        <Picker
                            selectedValue={hiringMode}
                            onValueChange={(selecteLevel) => {
                                setHiringMode(selecteLevel);
                                if(error) {
                                    setError(false);
                                }
                            }}
                        >
                            <Picker.Item label = "Select Hiring Mode: " value = {null}/>
                            <Picker.Item label = "On-Campus" value = "On-Campus"/>
                            <Picker.Item label = "Off-Campus" value = "Off-Campus"/>
                            <Picker.Item label = "Virtual" value = "Virtual"/>
                        </Picker>
                    </View>
                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Difficulty Level </Text>
                    <View style = {{borderColor: "gray", borderWidth: 1, borderRadius: 5, marginBottom: 10}}>
                        <Picker
                            selectedValue={difficulty}
                            onValueChange={(selecteLevel) => {
                                setDifficulty(selecteLevel);
                                if(error) {
                                    setError(false);
                                }
                            }}
                        >
                            <Picker.Item label = "Select Difficulty Level" value = {null}/>
                            <Picker.Item label = "Easy" value = "Easy"/>
                            <Picker.Item label = "Easy-Medium" value = "Easy-Medium"/>
                            <Picker.Item label = "Medium" value = "Medium"/>
                            <Picker.Item label = "Medium-Hard" value = "Medium-Hard"/>
                            <Picker.Item label = "Hard" value = "Hard"/>
                        </Picker>
                    </View>
                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Offer Status </Text>
                    <View style = {{borderColor: "gray", borderWidth: 1, borderRadius: 5, marginBottom: 10}}>
                        <Picker
                            selectedValue={offerStatus}
                            onValueChange={(selectedOffer) => {
                                setOfferStatus(selectedOffer);
                                if(error) {
                                    setError(false);
                                }
                            }}
                        >
                            <Picker.Item label = "Select Offer Status" value = {null}/>
                            <Picker.Item label = "Accepted" value = "Accepted"/>
                            <Picker.Item label = "Rejected" value = "Rejected"/>
                        </Picker>
                    </View>
                    {
                        error && <Text style = {{color: "white", marginBottom: 10, backgroundColor: status === 200? "green": "red", padding: 10, textAlign: "center", borderRadius: 5}}>{errorMessage}</Text>
                    }
                    <View style ={{flexDirection: "row", gap: 10, justifyContent: "center"}}>
                        <Pressable onPress={postExperience}>
                            {
                                !error && <Text style = {{
                                    backgroundColor: "green", 
                                    color: "white", 
                                    textAlign: "center", 
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    width: 165
                                }}>
                                    Post
                                </Text>
                            }
                        </Pressable>
                        <Pressable style = {{paddingRight: error? 10: 0}} onPress={() => props.setShowPost(false)}>
                            <Text style = {{
                                backgroundColor: "#00428B", 
                                color: "white", 
                                textAlign: "center", 
                                paddingVertical: 10,
                                borderRadius: 5,
                                fontWeight: "bold",
                                fontSize: 16,
                                width: !error ? 165: 340,
                            }}>
                                {
                                    !error && "Cancel"
                                }
                                {
                                    error && "Back"
                                }
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}