import { Pressable, View, Text } from "react-native"
import { useState } from "react";
import Followers from "./Followers";
import Following from "./Following";
import Explore from "./Explore";
import TopUtils from "../Utils/TopUtils";

export default function Network() {

    const [showFollowers, setShowFollowers] = useState(true);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    return (
        <View>
            <TopUtils searchInput = {searchInput} setSearchInput = {setSearchInput}/>
            <View style = {{flexDirection: "row", justifyContent: "space-around"}}>
                <Pressable onPress={() => {
                    setShowFollowers(true);
                    setShowFollowing(false);
                    setShowExplore(false);
                }} style = {{backgroundColor: showFollowers? "#00428B": "white", paddingHorizontal: 28, paddingVertical: 5, borderRadius:5}}>
                    <Text style = {{color: showFollowers? "white": ""}}>Followers</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setShowFollowers(false);
                    setShowFollowing(true);
                    setShowExplore(false);
                }} style = {{backgroundColor: showFollowing? "#00428B": "white", paddingHorizontal: 28, paddingVertical: 5, borderRadius:5}}>
                    <Text style = {{color: showFollowing? "white": ""}}>Following</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setShowFollowers(false);
                    setShowFollowing(false);
                    setShowExplore(true);
                }} style = {{backgroundColor: showExplore? "#00428B": "white", paddingHorizontal: 28, paddingVertical: 5, borderRadius:5}}>
                    <Text style = {{color: showExplore? "white": ""}}>Explore</Text>
                </Pressable>
            </View>
            <View>
                {
                    showFollowers && <Followers searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
                {
                    showFollowing && <Following searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
                {
                    showExplore && <Explore searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
            </View>
        </View>
    )
}