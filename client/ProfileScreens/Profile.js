import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, Text, Pressable, ScrollView } from "react-native";
import ProfileView from "./ProfileView";
import PostExperience from "../Experiencepost/PostExperience.js";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/Constants.js";

export default function Profile (props) {

    const [showPost, setShowPost] = useState(false);
    const [userData, setUserData] = useState({});

    const getUserProfile = async () => {
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if (userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "profile/profile", {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + token
                }
            });
            const { data } = await response.json();
            setUserData(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator = {false} style = {{flex: 1}}>
            <View style = {{alignItems: "center"}}>
                <View style = {{flexDirection: "row", alignItems: "center", gap: 110}}>
                    <Pressable onPress={() => props.navigation.navigate("BottomTabs")}>
                        <Image style = {{width: 35, height: 35, marginTop: 20}} source = {require("../assets/back.png")}/>
                    </Pressable>
                    <Text style = {{fontWeight: "bold", fontSize: 20, marginTop: 20, marginRight: 25}}>Profile</Text>
                    <View />
                </View>
                <Image style={{ width: 150, height: 150, borderRadius: 100}} source={{uri: userData?.user?.profileURL}} />
                <View style = {{padding: 10, borderRadius: 10, alignItems: "center"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 20}}>{userData?.user?.userName}</Text>
                    <Text>{userData?.user?.email}</Text>
                </View>
                <View style = {{flexDirection: "row", marginTop: 10, gap: 10}}>
                    <Pressable onPress={
                        () => props.navigation.navigate("ProfileForm")
                    }>
                        <Text style = {{backgroundColor: "#00428B", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Edit Profile</Text>
                    </Pressable>
                    <Pressable onPress={() => setShowPost(true)}>
                        <Text style = {{backgroundColor: "green", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Post</Text>
                    </Pressable>
                    <Pressable onPress={() => props.navigation.navigate("ViewExperience")}>
                        <Text style = {{backgroundColor: "orange", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Posts</Text>
                    </Pressable>
                    <Pressable onPress={async () => {
                        await AsyncStorage.clear();
                        props.navigation.reset({
                            index: 0,
                            routes: [{name: "Login"} ]
                        });
                    }}>
                        <Text style = {{backgroundColor: "red", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Logout</Text>
                    </Pressable>
                </View>
            </View>
            <ProfileView userData = {userData}/>
            {
                showPost && <PostExperience setShowPost = {setShowPost}/>
            }
        </ScrollView>
    )
}