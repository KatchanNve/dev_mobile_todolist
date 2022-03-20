import {Text,StyleSheet} from "react-native";
import {useContext} from "react";
import {UsernameContext} from "../Context/Context";
import { ImageBackground } from "react-native-web";

export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
        <>
        <ImageBackground 
        style={{flex:1}}
        source={require('../assets/img/fond.jpg')}
    >

      
            <Text style={styles.txt}>Welcome !</Text>
            <Text style={styles.txt2}>You are logged as <Text style={styles.user}>{username}</Text> !</Text> 
            </ImageBackground>
        </>
    )
}
const styles = StyleSheet.create({
    txt: {
        fontWeight:"bold",
         fontSize:30
    },

    txt2:{
        fontSize:15
    },
    user:{
        fontWeight:"bold",
        fontSize:15,
        color:"white"

    }

})