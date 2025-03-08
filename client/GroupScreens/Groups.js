import { View, Text, Pressable } from "react-native";
import TopUtils from "../Utils/TopUtils";
import { useState } from "react";
import  YourGroups  from "./YourGroups";  
import  LearnGroups  from "./LearnGroups";
import CreateGroup  from "./CreateGroup";

export default function Groups() {

    const [searchInput, setSearchInput] = useState("");

    const [showYourGroups, setShowYourGroups] = useState(true);
    const [showLearnGroups, setShowLearnGroups] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    return (
        <View>
            <TopUtils searchInput = {searchInput} setSearchInput = {setSearchInput}/>
            <View style = {{flexDirection: "row", justifyContent: "space-around"}}>
                <Pressable onPress={() => {
                    setShowYourGroups(true);
                    setShowLearnGroups(false);
                    setShowCreateGroup(false);
                }} style = {{
                    backgroundColor: showYourGroups? "#00428B": "white", 
                    paddingHorizontal: 28, 
                    paddingVertical: 5, 
                    borderRadius:5, 
                    width: 110
                }}>
                    <Text style = {{
                        color: showYourGroups? "white": "",
                        textAlign: "center"
                    }}>Groups</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setShowYourGroups(false);
                    setShowLearnGroups(true);
                    setShowCreateGroup(false);
                }} style = {{
                    backgroundColor: showLearnGroups? "#00428B": "white", 
                    paddingHorizontal: 28, 
                    paddingVertical: 5, 
                    borderRadius:5, 
                    width: 110
                }}>
                    <Text style = {{
                        color: showLearnGroups? "white": "",
                        textAlign: "center"
                    }}>Learn</Text>
                </Pressable>
                <Pressable 
                    onPress={() => {
                        setShowYourGroups(false);
                        setShowLearnGroups(false);
                        setShowCreateGroup(true);
                    }} 
                    style = {{
                        backgroundColor: showCreateGroup? "#00428B": "white", 
                        paddingHorizontal: 28, 
                        paddingVertical: 5, 
                        borderRadius:5, 
                        width: 110
                    }}
                >
                    <Text style = {{
                        color: showCreateGroup? "white": "",
                        textAlign: "center"
                    }}>New</Text>
                </Pressable>
            </View>
            <View>
                {
                    showYourGroups && <YourGroups searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
                {
                    showLearnGroups && <LearnGroups searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
                {
                    showCreateGroup && <CreateGroup searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
            </View>
        </View>
    )
}