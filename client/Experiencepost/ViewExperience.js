import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../Utils/Constants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from "timeago.js";

export default function ViewExperience(props) {

    const [posts, setPosts] = useState([]);

    const getExperiencePosts = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "experience/getLoggedUserPosts",{
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            const data = await responce.json();
            if(data?.experiencePosts) {
                setPosts(data.experiencePosts.map((post) => {
                    return {
                        ...post,
                        view: false
                    }
                }));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getExperiencePosts();
    },[]);

    return (
        <View>
            <Pressable 
                onPress = {() => {
                    props.navigation.goBack()
                }}
                style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
            >
                <Image style = {{width: 35, height: 35}} source = {require("../assets/back.png")}/> 
            </Pressable>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                style = {styles.container}
            >
                {
                    posts.length === 0 ? <Text 
                    style = {{
                        textAlign: "center", 
                        marginVertical: 15, 
                        backgroundColor: "lightgray", 
                        color: "white", 
                        padding: 10, 
                        borderRadius: 5, 
                        fontSize: 15, 
                        fontWeight:"bold"
                    }}>
                        No posts yet!
                    </Text>: posts.map((post) => {
                        return (
                            <Pressable onPress={() => {
                                setPosts(posts.map((p) => {
                                    if(p._id === post._id) {
                                        return {
                                            ...p,
                                            view: !p.view
                                        }
                                    }
                                    return p;
                                }));
                            }} key={post._id} style={styles.postContainer}>
                                <Pressable onPress={() => {
                                    console.log("User Profile");
                                }} style = {{flexDirection: "row", gap: 10}}>
                                    <View>
                                        <Image style={{width: 50, height: 50, borderRadius: 100}} source={{uri: post?.user?.profileURL}} />
                                    </View>
                                    <View style = {{paddingTop: 5}}>
                                        <Text>{post?.user?.userName}</Text>
                                        <Text>{post?.user?.email}</Text>
                                    </View>
                                </Pressable>
                                { 
                                    !post.view && <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{...styles.value, fontWeight: "bold"}}>{post.company} interview experience</Text>
                                        <Text style={{...styles.value, color: "gray"}}>...more</Text>
                                    </View>
                                }
                                {
                                    post.view && <View>
                                        <Text style={styles.label}>Company:</Text>
                                        <Text style={styles.value}>{post.company}</Text>
                                        <Text style={styles.label}>Role:</Text>
                                        <Text style={styles.value}>{post.role}</Text>
                                        <Text style={styles.label}>Hiring Mode:</Text>
                                        <Text style={styles.value}>{post.hiringMode}</Text>
                                        <Text style={styles.label}>Rounds:</Text>
                                        <Text style={styles.value}>{post.roundsDescription}</Text>
                                        <Text style={styles.label}>Difficulty:</Text>
                                        <Text style={styles.value}>{post.difficulty}</Text>
                                        <Text style={styles.label}>Offer Status:</Text>
                                        <Text style={styles.value}>{post.offerStatus}</Text>
                                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                            <View style={styles.voteContainer}>
                                                <View style={styles.voteItem}>
                                                    <Text style={styles.voteText}>{post.upVote}</Text>
                                                    <Image style={styles.voteIcon} source={require("../assets/emptyUpArrow.png")}/>
                                                    {/* <Image style={styles.voteIcon} source={require("../assets/fullUpArrow.png")}/> */}
                                                </View>
                                                <View style={styles.voteItem}>
                                                    <Text style={styles.voteText}>{post.downVote}</Text>
                                                    <Image style={styles.voteIcon} source={require("../assets/emptyDownArrow.png")}/>
                                                    {/* <Image style={styles.voteIcon} source={require("../assets/fullDownArrow.png")}/> */}
                                                </View>
                                            </View>
                                            <View style = {{paddingTop: 10}}>
                                                <Text style={styles.voteText}>{format(new Date(post.createdAt))}</Text>
                                            </View>
                                        </View>
                                        <Pressable style = {{backgroundColor: "orange", padding: 8, marginTop: 10, borderRadius: 5}}>
                                            <Text
                                                style = {{color: "white", textAlign: "center", fontWeight: "bold", fontSize: 15}}
                                            >Delete</Text>
                                        </Pressable>
                                    </View>
                                }
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 1,
        backgroundColor: '#f5f5f5',
    },
    postContainer: {
        elevation: 3,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        fontSize: 15,
        color: "gray",
        marginTop: 8,
    },
    value: {
        fontSize: 15,
        marginBottom: 8,
    },
    voteContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10
    },
    voteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    voteIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    voteText: {
        fontSize: 15,
    },
});