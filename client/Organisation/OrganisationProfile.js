import {View, Text, Pressable, ScrollView, Image} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Utils/Constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';

export default function OrganisationProfile() {

    const navigation = useNavigation();
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
            console.log(error.message, "jhbuy");
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getUserProfile();
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator = {false} style = {{flex: 1}}>
            <View style = {{alignItems: "center"}}>
                <Text style = {{fontWeight: "bold", fontSize: 20, marginVertical: 20}}>Profile</Text>
                <Image style={{ width: 150, height: 150, borderRadius: 100}} source={{uri: userData?.user?.profileURL}} />
                <View style = {{padding: 10, borderRadius: 10, alignItems: "center"}}>
                    <Text style = {{fontWeight: "bold", fontSize: 20}}>{userData?.user?.userName}</Text>
                    <Text>{userData?.user?.email}</Text>
                </View>
                <View style = {{flexDirection: "row", marginTop: 10, gap: 10}}>
                    <Pressable onPress={
                        () => navigation.navigate("OrganisationProfileEdit", {
                            userData
                        })
                    }>
                        <Text style = {{backgroundColor: "#00428B", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Edit Profile</Text>
                    </Pressable>
                    <Pressable 
                    onPress={async () => {
                        await AsyncStorage.clear();
                        navigation.reset({
                            index: 0,
                            routes: [{name: "Login"} ]
                        });
                    }}>
                        <Text style = {{backgroundColor: "red", color: "white", textAlign: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5}}>Logout</Text>
                    </Pressable>
                </View>
                <Text style = {{padding: 10, marginTop: 10}}>
                    {userData?.user?.about}
                </Text>
            </View>
        </ScrollView>
    );
}