import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Utils/Constants.js";

export default function CreateGroup() {

    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(0);

    const createGroup = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "chat/createGroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +  token
                },
                body: JSON.stringify({
                    groupName,
                })
            });
            setStatus(response.status);
            if(response.status === 200) {
                setGroupName("");
            }
            setError(true);
        } catch (error) {
            console.log("Error in createGroup: ", error.message);   
        }
    }

    return (
        <View>
            <TextInput 
                style = {{
                    borderWidth: 1,
                    borderColor: "black",
                    marginVertical: 10,
                    marginHorizontal: 2,
                    padding: 10,
                    borderRadius: 5
                }}
                placeholder = "Enter group name.." 
                value={groupName}
                onChangeText = {(text) => {
                    if(error) {
                        setError(false);
                    }
                    setGroupName(text);
                }}
            />
            {
                error && 
                <Text
                    style = {{
                        backgroundColor: status === 200? "green": "red",
                        color: "white",
                        padding: 10,
                        borderRadius: 5,
                        textAlign: "center",
                        marginHorizontal: 2,
                        marginVertical: 10
                    }}
                >
                    {status === 200? "Created group successfully": "Error in creating group"}
                </Text>   
            }
            <Pressable
                onPress = {() => {
                    createGroup();
                }}
            >
                <Text
                    style = {{
                        backgroundColor: "#00428B",
                        color: "white",
                        padding: 10,
                        borderRadius: 5,
                        textAlign: "center",
                        marginHorizontal: 2,
                    }}
                >
                    Create Group
                </Text>   
            </Pressable>
        </View>
    )
}
