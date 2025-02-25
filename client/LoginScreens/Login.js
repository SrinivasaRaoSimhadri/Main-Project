import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../Utils/Constants.js";

export default function Login(props) {

    const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [status, setStatus] = useState(0);

    const LoginUser = async () => {
        try {
            const logindetails = await fetch(BASE_URL + "auth/login", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password: password
                })
            });
            const data = await logindetails.json();
            console.log("data", data);
            if(logindetails.status === 400) {
                console.log(data.message);
                setErrorMessage(data?.message);
                setError(true);
                return;
            } 
            try {
                await AsyncStorage.setItem("userData", JSON.stringify(data));
                if(data?.data?.isOrganisation) {
                    props.navigation.replace("OrganisationBottomTabs");
                } else {
                    props.navigation.replace("BottomTabs");
                }
            } catch (error) {
                console.log(error.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setError(true);
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const userData = await AsyncStorage.getItem("userData");
            const parserdUserData = JSON.parse(userData);
            if(parserdUserData) {
                if(parserdUserData?.data?.isOrganisation) {
                    props.navigation.replace("OrganisationBottomTabs");
                } else {
                    props.navigation.replace("BottomTabs");
                }
            }
        }
        checkUser();
    },[]);

    useEffect(() => {

        const showingKeyboard = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyBoardVisible(true);
        });

        const hidingKeyboard = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyBoardVisible(false);
        });

        return () => {
            showingKeyboard.remove();
            hidingKeyboard.remove();
        }

    },[]);

    return (
        <View style = {{flex: 1, alignItems: "center", gap: 30, marginTop: !isKeyBoardVisible? 100 : 40}} >
            {
                !isKeyBoardVisible && <View style = {{alignItems: "center", justifyContent: "center"}}>
                    <Image style = {{width: 100, height: 100, borderRadius: 100}} source={require("../assets/ShakeHand.jpg")} />
                    <Text>Get your Dream job!</Text>
                </View >
            }
            <View style = {{borderWidth: 0.1, width: 300, borderRadius: 5}}>
                <Text style = {{marginTop: 10, marginLeft: 10, fontSize: 20}}>Login</Text>
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="user email or organisation email"
                    placeholderTextColor = "gray"
                    value= {email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                />
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="Password"
                    placeholderTextColor = "gray"
                    secureTextEntry ={true}
                    value= {password}
                    onChangeText ={(text) => {
                        setPassword(text);
                        if(error) {
                            setError(false);
                        }
                    }}
                />
                {
                    error && <View style = {{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style = {{color: "white", backgroundColor: status === 200? "green": "red", padding: 10, textAlign: "center", borderRadius: 5, width: 280}}>{errorMessage}</Text>
                    </View>
                }
                <View style = {{alignItems: "center", justifyContent: "center", marginTop: 15}}>
                    <Pressable onPress={LoginUser} style = {{backgroundColor: "#00428B", borderRadius: 4, width: 280, height: 40, alignItems: "center", justifyContent: "center"}}>
                        <Text style = {{color: "white"}}>Login</Text>
                    </Pressable>
                </View>
                <View style = {{flexDirection: "row",justifyContent: "space-between", marginHorizontal: 10, marginTop: 10}}>
                    <Text style = {{fontSize: 12}}>Haven't registered yet?</Text>
                    <Pressable onPress={() => props.navigation.navigate("RegisterUser")}>
                        <Text style = {{fontSize: 12, color: "blue", textDecorationColor: "blue", textDecorationLine: "underline"}}>Register user</Text>
                    </Pressable>
                </View>
                <View style = {{alignItems: "center", justifyContent: "center", marginVertical: 15}}>
                    <Pressable onPress={() => props.navigation.navigate("RegisterOrganisation")} style = {{backgroundColor: "#00428B", borderRadius: 4, width: 280, height: 40, alignItems: "center", justifyContent: "center"}}>
                        <Text style = {{color: "white"}}>New organisation</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}