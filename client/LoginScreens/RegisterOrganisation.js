import { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, Keyboard} from "react-native";
import { BASE_URL } from "../Utils/Constants";

export default function RegisterOrganisation (props)  {

    const [userName, setUsername] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [status, setStatus] = useState(0);


    const RegisterUser = async () => {
        try {
            const registerdetails = await fetch( BASE_URL + "auth/registerUser", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: userName.toLowerCase(),
                    email: email.toLowerCase(),
                    password: password,
                    confirmPassword: confirmPassword,
                    isOrganisation: true
                })
            });
            const data = await registerdetails.json();
            setStatus(registerdetails.status);
            setError(true);
            setErrorMessage(data?.message);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

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
                <Text style = {{marginTop: 10, marginLeft: 10, fontSize: 20}}>Register Organisation</Text>
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="Organisation name"
                    placeholderTextColor = "gray"
                    value = {userName}
                    onChangeText={(text) => {
                        setUsername(text);
                        setError(false);
                        if(status === 200) {
                            setStatus(0);
                        }
                    }}
                />
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="Organisation Email"
                    placeholderTextColor = "gray"
                    value = {email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setError(false);
                        if(status === 200) {
                            setStatus(0);
                        }
                    }}
                />
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="Password"
                    placeholderTextColor = "gray"
                    secureTextEntry = {true}
                    value= {password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError(false);
                        if(status === 200) {
                            setStatus(0);
                        }
                    }}
                />
                <TextInput 
                    style = {{borderWidth: 1, borderColor: "gray", marginHorizontal: 10, borderRadius: 5, marginTop: 15 }}
                    placeholder="Confirm Password"
                    placeholderTextColor = "gray"
                    secureTextEntry = {true}
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        setError(false);
                        if(status === 200) {
                            setStatus(0);
                        }
                    }}
                />
                {
                    error && <View style = {{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style = {{color: "white", marginBottom: 10, backgroundColor: status === 200? "green": "red", padding: 10, textAlign: "center", borderRadius: 5, width: 280}}>{errorMessage}</Text>
                    </View>
                }
                <View style = {{alignItems: "center", justifyContent: "center", marginVertical: 5, marginBottom: 10}}>
                    {
                        !error && <Pressable onPress={RegisterUser} style = {{marginTop: 5, backgroundColor: "#00428B", borderRadius: 4, width: 280, height: 40, alignItems: "center", justifyContent: "center"}}>
                            <Text style = {{color: "white"}}>Register Organisation</Text>
                        </Pressable>
                    }
                    {
                        status === 200 && <Pressable onPress={() => props.navigation.navigate("Login")} style = {{backgroundColor: "#00428B", borderRadius: 4, width: 280, height: 40, alignItems: "center", justifyContent: "center"}}>
                            <Text style = {{color: "white"}}>Login</Text>
                        </Pressable>
                    }
                    {
                        error && status !== 200 && <Pressable onPress={() => props.navigation.navigate("Login")} style = {{backgroundColor: "#00428B", borderRadius: 4, width: 280, height: 40, alignItems: "center", justifyContent: "center"}}>
                            <Text style = {{color: "white"}}>Back</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}