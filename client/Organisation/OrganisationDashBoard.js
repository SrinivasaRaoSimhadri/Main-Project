import { View, Text } from 'react-native';
export default function OrganisationDashBoard() {

    const getDashBoard = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            let token;
            if(userData) {
                const parserUserData = JSON.parse(userData);
                token = parserUserData?.data?.token;
            }
            const responce = await fetch(BASE_URL + "organisation/getDashBoard", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });
            const data = await responce.json();
            setJobs(data?.jobs.map((job) => {
                return {
                    ...job,
                    show: false
                };
            }))
            console.log(data?.jobs?.[0].questions);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View>
            <Text>Organisation DashBoard</Text>
        </View>
    )
}