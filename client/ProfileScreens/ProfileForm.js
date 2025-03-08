import { Alert, View, Text, Pressable, Image, Modal } from "react-native";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../Utils/Constants.js";

export default function ProfileForm (props) {

    const [openEducation, setOpenEducation] = useState(false);
    const [openExperience, setOpenExperience] = useState(false);
    const [openSkills, setOpenSkills] = useState(false);

    const [showEducation, setShowEducation] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showSkills, setShowSkills] = useState(false);

    const [EducationDetails, setEducationDetails] = useState([]);
    const [ExperienceDetails, setExperienceDetails] = useState([]);   
    const [SkillsDetails, setSkillsDetails] = useState([]);


    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [education, setEducation] = useState({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: ""
    });

    const [experience, setExperience] = useState({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: ""
    });

    const [skills, setSkills] = useState({
        skill: ""
    });

    const addDetails = async (details, url) => {
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if(userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "profile/" + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(details)
            });
            setError(true);
            if(response.ok) {
                setErrorMessage("Added successfully!");
                if(url === "AddEducationDetails") {
                    setEducation({
                        institution: "",
                        degree: "",
                        fieldOfStudy: "",
                        startYear: "",
                        endYear: ""
                    })
                } else if(url === "AddExperienceDetails") {
                    setExperience({
                        company: "",
                        jobTitle: "",
                        startDate: "",
                        endDate: ""
                    })
                } else if(url === "AddSkillDetails") {
                    setSkills({
                        skill: ""
                    })
                }
                return;
            }
            setErrorMessage("Something went wrong!");
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    const getDetails = async (url) => {
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if(userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "profile/" + url, {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + token 
                }
            });
            if(response.ok) {
                const data = await response.json();
                if(url === "GetEducationDetails") {
                    setEducationDetails(data?.userEducation);
                    setShowEducation(true);
                }
                if(url === "GetExperienceDetails") {
                    setExperienceDetails(data?.userExperience);
                    setShowExperience(true);
                }
                if(url === "GetSkillsDetails") {
                    setSkillsDetails(data?.userSkills?.skills);
                    setShowSkills(true);
                }
            } else {
                setError(true);
                setErrorMessage("Something went wrong!");
            }
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
        }
    }

    const deleteEducation = async (id) => {
        console.log(id);
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if(userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "profile/DeleteEducationDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({id})
            });
            console.log(response.status);
            if(response.status === 200) {
                setEducationDetails(EducationDetails.filter((education) => education._id !== id));
                Alert.alert("Success", "Deleted successfully");
            } else {
                Alert.alert("Error", "Could not delete the education detail");
            }
        } catch (error) {
            Alert.alert("Error", "Could not delete the education detail");
        }
    }

    const deleteExperience = async (id) => {
        console.log(id);
        try {
            const userDetails = await AsyncStorage.getItem("userData");
            let token;
            if(userDetails) {
                const parserUserDetails = JSON.parse(userDetails);
                token = parserUserDetails?.data?.token;
            }
            const response = await fetch(BASE_URL + "profile/DeleteExperienceDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({id})
            });
            console.log(response.status);
            if(response.status === 200) {
                setExperienceDetails(ExperienceDetails.filter((experience) => experience._id !== id));
                Alert.alert("Success", "Deleted successfully");
            } else {
                Alert.alert("Error", "Could not delete the experience detail");
            }
        } catch (error) {
            Alert.alert("Error", "Could not delete the experience detail");
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false} style = {{flex: 1, marginTop: 20}}>  

            {/* Education */}
            <Pressable 
                onPress = {() => {
                    props.navigation.goBack()
                }}
                style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
            >
                <Image style = {{width: 35, height: 35}} source = {require("../assets/back.png")}/> 
            </Pressable>
            <View style = {{
                    backgroundColor: "lightgray", 
                    borderRadius:5, 
                    marginBottom: 10, 
                    padding: 5,
                }}>
                <View style = {{
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    borderRadius: 5,
                    paddingVertical: 5
                }}>
                    <View style = {{flexDirection: "column", gap: 10}}>
                        <View style = {{flexDirection: "row", gap: 10}}>
                            <Pressable onPress= {
                                () => {
                                    if(showEducation) {
                                        setShowEducation(false);
                                    } else {
                                        getDetails("GetEducationDetails");
                                    }
                                }
                            }>
                                <Text style = {{
                                    color: "white", 
                                    backgroundColor: showEducation? "green" :"#00428B",
                                    padding: 5,
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    width: 290,
                                    textAlign: "center"
                                }}>
                                    {
                                        showEducation ? "Cancel": "Education"
                                    }
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setOpenEducation(!openEducation)}>
                                {
                                    !openEducation && <Image style = {{width: 30, height: 30}} source={require("../assets/plus.png")}/>
                                }
                                {
                                    openEducation && <Image style = {{width: 30, height: 30}} source={require("../assets/minus.png")}/>
                                }
                            </Pressable>
                        </View>
                        <View>
                            {
                                showEducation && <View style = {{flexDirection: "column", gap: 10}}>
                                    {
                                        EducationDetails?.map((education, index) => {
                                            return (
                                                <View key = {index} style = {{marginBottom: 10, backgroundColor: "white", padding: 10, borderRadius: 5, elevation: 3}}>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Institution Name:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{education.institution}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Degree:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{education.degree}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Field Of Study:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{education.fieldOfStudy}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Start Year:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{education.startYear}</Text>
                                                    </View>
                                                    <View style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <View>
                                                            <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>End Year:</Text>
                                                            <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{education.endYear}</Text>
                                                        </View>
                                                        <View>
                                                            <Pressable onPress={() => {
                                                                Alert.alert(
                                                                    "Delete item",
                                                                    "Are you sure, you want to delete?",
                                                                    [
                                                                        {
                                                                            text: "Cancel", source: "cancel"
                                                                        },
                                                                        {
                                                                            text: "Delete", onPress: () => {
                                                                                deleteEducation(education._id);
                                                                            }
                                                                        }
                                                                    ]
                                                                )
                                                            }}>
                                                                <Image source = {require("../assets/delete.png")} style = {{width: 30, height: 30}}/>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View>
                    {
                        openEducation && <Modal
                            visible={openEducation}
                            animationType="slide"
                            onRequestClose={() => setOpenEducation(false)}
                        >
                            <View style = {{padding: 20}}>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Institution Name: </Text>
                                    <TextInput 
                                        placeholder = "Ex: GMRIT"
                                        value= {education.institution}
                                        onChangeText ={(text) => {
                                            setError(false);
                                            setEducation({...education, institution: text});
                                        }}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Degree: </Text>
                                    <TextInput 
                                        placeholder="Ex: Bachelors"
                                        value= {education.degree}
                                        onChangeText ={(text) => {
                                            setError(false);
                                            setEducation({...education, degree: text});
                                        }}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Field Of Study: </Text>
                                    <TextInput 
                                        placeholder = "Ex: Computer Science"
                                        value= {education.fieldOfStudy}
                                        onChangeText ={(text) => {
                                            setError(false);
                                            setEducation({...education, fieldOfStudy: text});
                                        }}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Start Year: </Text>
                                    <TextInput 
                                        placeholder = "Ex: 2021"
                                        value= {education.startYear}
                                        onChangeText ={(text) => {
                                            setError(false);
                                            setEducation({...education, startYear: text});
                                        }}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>End Year: </Text>
                                    <TextInput 
                                        placeholder = "Ex: 2025"
                                        value= {education.endYear}
                                        onChangeText ={(text) => {
                                            setError(false);
                                            setEducation({...education, endYear: text});
                                        }}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View>
                                    {
                                        openEducation && error && <Text style = {{color: "red", textAlign: "center", marginBottom: 10}}>{errorMessage}</Text>
                                    }
                                </View>
                                <View style ={{flexDirection: "row", gap: 10, justifyContent: "center"}}>
                                    <Pressable onPress={() =>addDetails(education, "AddEducationDetails")}>
                                        <Text style = {{
                                            backgroundColor: "green", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Add Education
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={() => setOpenEducation(false)}>
                                        <Text style = {{
                                            backgroundColor: "#00428B", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Cancel
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    }
                </View>
            </View>

            {/* Experience */}
            <View style = {{
                    backgroundColor: "lightgray", 
                    borderRadius:5, 
                    marginBottom: 10, 
                    padding: 5,
                }}>
                <View style = {{
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    borderRadius: 5,
                    paddingVertical: 5
                }}>
                    <View style = {{flexDirection: "column", gap: 10}}>
                        <View style ={{flexDirection: "row", gap: 10}}>
                            <Pressable onPress={() => {
                                    if(showExperience) {
                                        setShowExperience(false);
                                    } else {
                                        getDetails("GetExperienceDetails");
                                    }
                                }}>
                                <Text style = {{
                                    color: "white", 
                                    backgroundColor: showExperience? "green" :"#00428B",
                                    padding: 5,
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    width: 290,
                                    textAlign: "center"
                                }}>
                                    {
                                        showExperience? "Cancel": "Experience"
                                    }
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setOpenExperience(!openExperience)}>
                                {
                                    !openExperience && <Image style = {{width: 30, height: 30}} source={require("../assets/plus.png")}/>
                                }
                                {
                                    openExperience && <Image style = {{width: 30, height: 30}} source={require("../assets/minus.png")}/>
                                }
                            </Pressable>
                        </View>
                        <View>
                            {
                                showExperience && <View style = {{flexDirection: "column", gap: 10}}>
                                    {
                                        ExperienceDetails?.map((experience, index) => {
                                            return (
                                                <View key = {index} style = {{marginBottom: 10, backgroundColor: "white", padding: 10, borderRadius: 5, elevation: 3}}>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Company Name:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{experience.company}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Job Title:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{experience.jobTitle}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Start Date:</Text>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{experience.startDate}</Text>
                                                    </View>  
                                                    <View style = {{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <View>
                                                            <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>End Date:</Text>
                                                            <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{experience.endDate}</Text>
                                                        </View>
                                                        <View>
                                                            <Pressable onPress={() => {
                                                                Alert.alert(
                                                                    "Delete item",
                                                                    "Are you sure, you want to delete?",
                                                                    [
                                                                        {
                                                                            text: "Cancel", source: "cancel"
                                                                        },
                                                                        {
                                                                            text: "Delete", onPress: () => {
                                                                                deleteExperience(experience._id);
                                                                            }
                                                                        }
                                                                    ]
                                                                )
                                                            }}>
                                                                <Image source = {require("../assets/delete.png")} style = {{width: 30, height: 30}}/>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View>
                    {
                        openExperience && <Modal
                            visible={openExperience}
                            animationType="slide"
                            onRequestClose={() => setOpenExperience(false)}
                        >
                            <View style = {{padding: 20}}>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Company Name: </Text>
                                    <TextInput 
                                        placeholder = "Ex: Google"
                                        value={experience.company}
                                        onChangeText={(text) => setExperience({...experience, company: text})}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Job Title: </Text>
                                    <TextInput 
                                        placeholder="Ex: Software Engineer"
                                        value={experience.jobTitle}
                                        onChangeText={(text) => setExperience({...experience, jobTitle: text})}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Start Date: </Text>
                                    <TextInput 
                                        placeholder = "MM/YYYY"
                                        value={experience.startDate}
                                        onChangeText={(text) => setExperience({...experience, startDate: text})}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>End Date: </Text>
                                    <TextInput 
                                        placeholder = "MM/YYYY"
                                        value={experience.endDate}
                                        onChangeText={(text) => setExperience({...experience, endDate: text})}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                {
                                    openExperience && error && <Text style = {{color: "red", textAlign: "center", marginBottom: 10}}>{errorMessage}</Text>
                                }
                                <View style ={{flexDirection: "row", gap: 10, justifyContent: "center"}}>
                                    <Pressable onPress={() => {
                                        addDetails(experience, "AddExperienceDetails");
                                    }}>
                                        <Text style = {{
                                            backgroundColor: "green", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Add Experience
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={() => setOpenExperience(false)}>
                                        <Text style = {{
                                            backgroundColor: "#00428B", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Cancel
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    }
                </View>
            </View>
            
            {/* Skills */}
            <View style = {{
                    backgroundColor: "lightgray", 
                    borderRadius:5, 
                    marginBottom: 10, 
                    padding: 5,
                }}>
                <View style = {{
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    borderRadius: 5,
                    paddingVertical: 5
                }}>
                    <View style = {{flexDirection: "column", gap: 10}}>
                        <View style ={{flexDirection: "row", gap: 10}}>
                            <Pressable onPress={() => {
                                if(showSkills) {
                                    setShowSkills(false);
                                } else {
                                    getDetails("GetSkillsDetails");
                                }
                            }}>
                                <Text style = {{
                                    color: "white", 
                                    backgroundColor: showSkills? "green" :"#00428B",
                                    padding: 5,
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    width: 290,
                                    textAlign: "center"
                                }}>
                                    {
                                        showSkills? "Cancel": "Skill"
                                    }
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setOpenSkills(!openSkills)}>
                                {
                                    !openSkills && <Image style = {{width: 30, height: 30}} source={require("../assets/plus.png")}/>
                                }
                                {
                                    openSkills && <Image style = {{width: 30, height: 30}} source={require("../assets/minus.png")}/>
                                }
                            </Pressable>
                        </View>
                        <View>
                            {
                                showSkills && 
                                <View style = {{flexDirection: "column", gap: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 1, color: "gray"}}>Skills:</Text>
                                    {
                                        SkillsDetails?.map((skill, index) => {
                                            return (
                                                <View key = {index} style = {{marginBottom: 10, backgroundColor: "white", padding: 10, borderRadius: 5, elevation: 3}}>
                                                    <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                                                        <Text style = {{fontWeight: "bold", fontSize: 20, marginBottom: 1}}>{skill}</Text>
                                                        <Pressable onPress={() => {
                                                            Alert.alert(
                                                                "Delete item",
                                                                "Are you sure, you want to delete?",
                                                                [
                                                                    {
                                                                        text: "Cancel", source: "cancel"
                                                                    },
                                                                    {
                                                                        text: "Delete", onPress: () => {
                                                                            console.log("delelted");
                                                                        }
                                                                    }
                                                                ]
                                                            )
                                                        }}>
                                                            <Image source = {require("../assets/delete.png")} style = {{width: 30, height: 30}}/>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View>
                    {
                        openSkills && <Modal
                            visible={openSkills}
                            animationType="slide"
                            onRequestClose={() => setOpenSkills(false)}
                        >
                            <View style = {{padding: 20}}>
                                <View style = {{marginBottom: 10}}>
                                    <Text style = {{fontWeight: "bold", marginBottom: 3}}>Skill: </Text>
                                    <TextInput 
                                        placeholder = "Ex: React Native"
                                        value={skills.skill}
                                        onChangeText={(text)=>setSkills({...skills, skill: text})}
                                        style = {{
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: "gray",
                                        }}
                                    />
                                </View>
                                {
                                    openSkills && error && <Text style = {{color: "red", textAlign: "center", marginBottom: 10}}>{errorMessage}</Text>
                                }
                                <View style ={{flexDirection: "row", gap: 10, justifyContent: "center"}}>
                                    <Pressable onPress={()=>addDetails(skills, "AddSkillDetails")}>
                                        <Text style = {{
                                            backgroundColor: "green", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Add Skill
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={() => setOpenSkills(false)}>
                                        <Text style = {{
                                            backgroundColor: "#00428B", 
                                            color: "white", 
                                            textAlign: "center", 
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            width: 155
                                        }}>
                                            Cancel
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    }
                </View>
            </View>

        </ScrollView>
    )
}