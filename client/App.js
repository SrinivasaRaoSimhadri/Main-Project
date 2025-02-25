import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from './ProfileScreens/Profile.js';
import ProfileForm from './ProfileScreens/ProfileForm.js';
import ViewExperience from './Experiencepost/ViewExperience.js';
import Home from './Experiencepost/AllExperiencePosts.js';

import Login from './LoginScreens/Login.js';
import RegisterOrganisation from './LoginScreens/RegisterOrganisation';
import RegisterUser from "./LoginScreens/RegisterUser";


import OrganisationProfile from './Organisation/OrganisationProfile.js';
import OrganisationJobPost from './Organisation/OrganisationJobPost.js';
import OrganisationActive from './Organisation/OrganisationActive.js';
import OrganisationHirings from './Organisation/OrganisationHirings.js';
import OrganisationDashBoard from './Organisation/OrganisationDashBoard.js';

import Network from './NetworkScreens/Network';
import Organisation from './Organisations/Organisation';
import Job from './Jobs/Job';
import Groups from './GroupScreens/Groups.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/home.png")} style={{ width: 28, height: 28 }} />
          }} 
          component={Home}
        />
        <Tab.Screen 
          name="Network" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/connection.png")} style={{ width: 30, height: 30}} />
          }} 
          component={Network} 
        />
        <Tab.Screen 
          name="Organisation" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/office.png")} style={{ width: 30, height: 30}} />
          }}
          component={Organisation} 
        />
        <Tab.Screen 
          name="Jobs" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/suitcase.png")} style={{ width: 30, height: 30}} />
          }}
          component={Job} 
        />
        <Tab.Screen 
          name="Groups" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/people.png")} style={{ width: 30, height: 30}} />
          }}
          component={Groups} 
        />
      </Tab.Navigator>
    </View>
  );
}

function OrganisationBottomTabs() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Profile" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/company-profile.png")} style={{ width: 28, height: 28 }} />
          }} 
          component={OrganisationProfile}
        />
        <Tab.Screen 
          name="Post" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/job-offer.png")} style={{ width: 30, height: 30}} />
          }} 
          component={OrganisationJobPost} 
        />
        <Tab.Screen 
          name="Active" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/checklist.png")} style={{ width: 25, height: 25}} />
          }}
          component={OrganisationActive} 
        />
        <Tab.Screen 
          name="Hirings" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/hiring.png")} style={{ width: 30, height: 30}} />
          }}
          component={OrganisationHirings} 
        />
        <Tab.Screen 
          name="Dashboard" 
          options={{ headerShown: false, tabBarIcon: () => 
            <Image  source={require("./assets/dashboard.png")} style={{ width: 30, height: 30}} />
          }}
          component={OrganisationDashBoard} 
        />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
            <Stack.Screen name="RegisterOrganisation" options={{ headerShown: false }} component={RegisterOrganisation} />
            <Stack.Screen name="RegisterUser" options={{ headerShown: false }} component={RegisterUser} />
            <Stack.Screen name="BottomTabs" options={{ headerShown: false }} component={BottomTabs} />
            <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile}/>
            <Stack.Screen name="ProfileForm" options={{headerShown: false}} component={ProfileForm}/>
            <Stack.Screen name="ViewExperience" options={{headerShown: false}} component={ViewExperience}/>
            <Stack.Screen name="OrganisationBottomTabs" options={{ headerShown: false }} component={OrganisationBottomTabs} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
});