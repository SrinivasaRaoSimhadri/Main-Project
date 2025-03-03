import { Pressable, View, Text } from "react-native"
import { useState } from "react";
import TopUtils from "../Utils/TopUtils";
import OrganisationFollowing from "./OrganisationFollowing";
import OrganisationExplore from "./OrganisationExplore";

export default function Organisation() {

    const [followingCompanies, setFollowingCompanies] = useState(true);
    const [companiesExplore, setComapaniesExplore] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    return (
        <View>
            <TopUtils searchInput = {searchInput} setSearchInput = {setSearchInput}/>
            <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
                <Pressable 
                    onPress={() => {
                        setFollowingCompanies(true);
                        setComapaniesExplore(false);
                    }} 
                    style = {{
                        backgroundColor: followingCompanies? "#00428B": "white", 
                        paddingHorizontal: 28, 
                        paddingVertical: 5, 
                        borderRadius:5, 
                        width: 168
                    }}
                >
                    <Text style = {{color: followingCompanies? "white": "", textAlign: "center"}}>Following</Text>
                </Pressable>

                <Pressable 
                    onPress={() => {
                        setFollowingCompanies(false);
                        setComapaniesExplore(true);
                    }} 
                    style = {{
                        backgroundColor: companiesExplore? "#00428B": "white", 
                        paddingHorizontal: 28, 
                        paddingVertical: 5, 
                        borderRadius:5, 
                        width: 168
                    }}
                >
                    <Text style = {{color: companiesExplore? "white": "", textAlign: "center"}}>Explore</Text>
                </Pressable>
            </View>
            <View>
                {
                    followingCompanies && <OrganisationFollowing searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
                {
                    companiesExplore && <OrganisationExplore searchInput = {searchInput} setSearchInput = {setSearchInput}/>
                }
            </View>
        </View>
    )
}