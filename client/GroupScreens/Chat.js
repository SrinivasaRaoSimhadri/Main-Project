import { View, Text, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../Utils/Constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import { BASE_URL } from "../Utils/Constants";
import { format } from "timeago.js";

export default function Chat() {

    const route = useRoute();
    const targetUser = route.params;
    const navigation = useNavigation();
    const [loggedUserId, setLoggedUserId] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [Socket, setSocket] = useState(null); 
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef(null);

    const getCurrentLoggedinUser = async () => {
        const userData = await AsyncStorage.getItem("userData");
        const parserUserData = JSON.parse(userData);
        setLoggedUserId(parserUserData?.data?._id);
    };

    const sendMessage = () => {
        if(newMessage && Socket) {
            Socket.emit("message", {loggedUserId, targetUserId: targetUser.userId, message: newMessage});
            setNewMessage("");
            scrollViewRef?.current?.scrollToEnd({animated: true});
        }
    }

    const getMessages = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const response = await fetch(BASE_URL + "chat/getPrivateMessages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    loggedUserId,
                    targetUserId: targetUser.userId
                })
            });
            const data = await response.json();
            console.log(data?.messages);
            if(response.status === 200) {
                setMessages(data?.messages);
            }
        } catch (error) {
            console.log("Error in unfollow: ", error);
        }
    }


    useEffect(() => {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, [messages]);
    
    useEffect(() => {
        if(loggedUserId && targetUser.userId) {
            getMessages();
        }
    }, [loggedUserId, targetUser]);

    useEffect(() => {
        getCurrentLoggedinUser();
        if(loggedUserId && targetUser.userId) {
            const socket = createSocketConnection();
            setSocket(socket);
            socket.emit("joinChat", {loggedUserId, targetUserId: targetUser.userId});
            socket.on("receiveMessage", ({loggedUserId, message}) => {
                setMessages((messages) => [...messages, {sender: loggedUserId, message, timestamp: Date.now()}]);
            });
            return () => {
                socket.disconnect();
            }
        }

    },[loggedUserId, targetUser]);


    return (
        <View
            style = {{
                flex: 1,
                justifyContent: "space-between"
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                    elevation: 5,
                    backgroundColor: "white",
                }}>
                <Pressable
                    onPress = {() => {
                        navigation.goBack();
                    }
                }>
                    <Image style ={{
                    width: 33,
                    height: 40,
                    borderRadius: 30
                }} source={require("../assets/back.png")}/>
                </Pressable>
                <Image style ={{
                    width: 50, 
                    height: 50,
                    borderRadius: 30
                }} source={{uri: targetUser?.profileURL}}/>
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 18
                        }}
                    >{targetUser?.userName}</Text>
                    <Text
                        style={{
                            fontWeight: "semibold",
                            fontSize: 13,
                            color: "gray"
                        }}
                    >{targetUser?.email}</Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {
                    messages.map((message, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    marginVertical: 4,
                                    marginHorizontal: 10,
                                    alignSelf: message.sender === loggedUserId ? "flex-end" : "flex-start",
                                    borderRadius: 18,
                                    borderBottomRightRadius: message.sender === loggedUserId ? 3 : 18,
                                    borderBottomLeftRadius: message.sender === loggedUserId ? 18 : 3,
                                    maxWidth: "75%",
                                    elevation: 3,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    backgroundColor: "white"
                                }}
                                
                            >
                                <Text
                                    style={{
                                        color: "black"
                                    }}
                                >{message.message + "\n"}</Text>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: "gray",
                                        textAlign: "right"
                                    }}
                                >{format(new Date(message.timestamp))}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center", position: "relative" }}>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius:10,
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        paddingLeft: 15, 
                        paddingRight: 40,
                        marginBottom: 5,
                        width: "87%"
                    }}
                    value= {newMessage}
                    multiline = {true}
                    onChangeText={(text) => setNewMessage(text)}
                    placeholder="Type your message here.."
                />
                <Pressable
                    onPress = {() => {
                        sendMessage();
                    }}
                    style={{
                        position: "absolute",
                        right: 1, 
                        bottom: 5
                    }}
                >
                    <Image
                        style={{
                            width: 42,
                            height: 42,
                        }}
                        source={require("../assets/dm.png")}
                    />
                </Pressable>
            </View>
        </View>
    )
}