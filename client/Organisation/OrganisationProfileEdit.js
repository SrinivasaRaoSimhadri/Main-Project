import React, { useState } from 'react';
import { View, Image, Text, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Utils/Constants';

export default function OrganisationProfileEdit(){

    const navigation = useNavigation();
    const router = useRoute();
    const { userData } = router.params;
    const [imagePath, setImagePath] = useState(userData?.user?.profileURL);
    const [about, setAbout] = useState(userData?.user?.about);
    console.log(userData?.user?.email);
    
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'You need to allow access to the gallery.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const saveImage = async (imageUri) => {
        try {
            const fileName = `image_${userData?.user?.email}.jpg`;
            const destinationPath = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.copyAsync({
                from: imageUri,
                to: destinationPath,
            });
            console.log('Image saved at:', destinationPath);
            setImagePath(destinationPath);
            postImage(destinationPath);
        } catch (error) {
            console.log('Error saving image:', error);
        }
    };

    const updateAbout = async () => {
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if (userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "organisationProfileEdit/updateAbout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    about
                })
            });
            const data = await response.json();
            console.log(data);
            if(response.status === 200) {
                Alert.alert("Success", "About updated successfully");
            } else {
                Alert.alert("Error", "Error in updating about");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const postImage = async (destinationPath) => {
        const userDetails = await AsyncStorage.getItem("userData");
        let token;
        if (userDetails) {
            const parserUserDetails = JSON.parse(userDetails);
            token = parserUserDetails?.data?.token;
        }

        const response = await fetch(BASE_URL + "organisationProfileEdit/updateImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({
                destinationPath
            })
        });
        const getUserProflile = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {  
                try {
                    let parserUserData = JSON.parse(userData);
                    if (parserUserData?.data) {  
                        parserUserData.data.profileURL = destinationPath;
                        await AsyncStorage.setItem("userData", JSON.stringify(parserUserData));
                        console.log("Profile URL updated successfully!");
                    } else {
                        console.warn("userData exists but 'data' field is missing.");
                    }
                } catch (error) {
                    console.error("Error parsing userData:", error);
                }
            } else {
                console.warn("No userData found in AsyncStorage.");
            }
        }
        getUserProflile();
        if(response.status === 200) {
            Alert.alert("Success", "Image uploaded successfully");
        } else {    
            Alert.alert("Error", "Error in uploading image");
        }
    }

    return (
        <View
            style={{ 
                flex: 1, 
            }}
        >
            <Pressable
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Image
                    style={{ width: 30, height: 30, borderRadius: 100, marginTop: 20 }}
                    source={require("../assets/back.png")}
                />
            </Pressable>
            <View style={{alignItems: 'center'}}>
            
                {
                    imagePath && 
                    <Image 
                        style={{ 
                            width: 150, 
                            height: 150, 
                            marginTop: 20,
                            borderRadius: 100 
                        }}
                        source={{ uri: imagePath }}  
                    />
                }
                <Pressable
                    style={{ marginTop: 20, backgroundColor: '#00428B', padding: 5, borderRadius: 5 }}
                    onPress={ () => {
                        pickImage();
                    }}
                >
                    <Text 
                        style={{ color: 'white', fontSize: 15 }}
                    >Change Image</Text>
                </Pressable>
                <TextInput
                    style={{ 
                        width: '90%', 
                        padding: 10, 
                        marginVertical: 20, 
                        borderColor: 'gray', 
                        borderWidth: 1,
                        borderRadius: 5,
                        minHeight: 100,
                        textAlignVertical: 'top'
                    }}
                    placeholder="About"
                    multiline = {true}
                    value={about}
                    onChangeText={(text) => setAbout(text)}
                />
                <Pressable
                    onPress={() => {
                        updateAbout();
                    }}
                >
                    <Text 
                        style={{ 
                            backgroundColor: '#00428B', 
                            color: 'white', 
                            padding: 10, 
                            borderRadius: 5 
                        }}
                    >Update About</Text>
                </Pressable>
            </View>
        </View>
    );
};