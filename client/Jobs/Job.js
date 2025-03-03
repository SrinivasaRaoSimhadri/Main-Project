import { Pressable, View, Text } from "react-native"
import { useState } from "react";
import TopUtils from "../Utils/TopUtils";
import UserAppliedJobs from "./UserAppliedJobs";
import UserExploreJobs from "./UserExploreJobs";

export default function Network() {

    const [applied, setApplied] = useState(true);
    const [explore, setExplore] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    return (
        <View>
            <TopUtils searchInput = {searchInput} setSearchInput = {setSearchInput}/>
            <View style = {{flexDirection: "row", justifyContent: "space-around", gap: 4}}>
                <Pressable onPress={() => {
                    setApplied(true);
                    setExplore(false);
                }} style = {{
                    backgroundColor: applied? "#00428B": "white", 
                    paddingHorizontal: 28, 
                    paddingVertical: 5, 
                    borderRadius:5, 
                    width: 168
                }}>
                    <Text style = {{color: applied? "white": "", textAlign: "center"}}>Applied</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setApplied(false);
                    setExplore(true);
                }} style = {{
                    backgroundColor: explore? "#00428B": "white", 
                    paddingHorizontal: 28, 
                    paddingVertical: 5, 
                    borderRadius:5, 
                    width: 168
                }}>
                    <Text style = {{color: explore? "white": "", textAlign: "center"}}>Explore</Text>
                </Pressable>
            </View>
            <View>
                {
                    applied && <UserAppliedJobs searchInput = {searchInput} setSearchInput = {setSearchInput} />
                }
                {
                    explore && <UserExploreJobs searchInput = {searchInput} setSearchInput = {setSearchInput} />
                }
            </View>
        </View>
    )
}