import { View, Text } from "react-native";

export default function ProfileView(props) {

    const { userData } = props;

    return (
        <View>
            <View style = {{gap: 10, padding: 4}}>
                <Text style = {{fontWeight: "bold", fontSize: 20, paddingLeft: 5, color: "gray", marginTop: 10}}>Education</Text>
                {
                    userData && userData?.userEducation?.map((education, index) => {
                        return (
                            <View key={index} style = {{elevation: 3, backgroundColor: "white", padding: 8, borderRadius: 5}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray"}}>
                                    Institution
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {education.institution}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    Degree
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {education.degree}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    Field Of Study
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {education.fieldOfStudy}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    Start Year
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {education.startYear}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    End Year
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {education.endYear}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style = {{gap: 10, padding: 4}}>
                <Text style = {{fontWeight: "bold", fontSize: 20, paddingLeft: 5, color: "gray", marginTop: 10}}>Experience</Text>
                {
                    userData && userData?.userExperience?.map((experience, index) => {
                        return (
                            <View key={index} style = {{elevation: 3, backgroundColor: "white", padding: 8, borderRadius: 5}}>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray"}}>
                                    Company
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {experience.company}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    Job Title
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {experience.jobTitle}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    Start Date
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {experience.startDate}
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 15, color: "gray", marginTop: 8}}>
                                    End Date
                                </Text>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {experience.endDate}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style = {{gap: 10, padding: 4, marginBottom: 10}}>
                <Text style = {{fontWeight: "bold", fontSize: 20, paddingLeft: 5, color: "gray", marginTop: 10}}>Skills</Text>
                {
                    userData && userData?.userSkills?.[0]?.skills.map((skill, index) => {
                        return (
                            <View key={index} style = {{elevation: 3, backgroundColor: "white", padding: 8, borderRadius: 5}}>
                                <Text style = {{fontWeight: "bold", fontSize: 20}}>
                                    {skill}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
};