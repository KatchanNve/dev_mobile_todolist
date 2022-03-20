import {Button} from "react-native";
import {useContext} from "react";
import {TokenContext} from "../Context/Context";
import { ImageBackground } from "react-native-web";

export default function SignOutScreen ({ navigation, route }) {
    const [token, setToken] = useContext(TokenContext);

    return( <ImageBackground 
        style={{flex:1}}
        source={require('../assets/img/fond.jpg')}
    >
        <Button title='Sign me out' onPress={() =>  {setToken(null); navigation.navigate('SignIn')}} />
        </ImageBackground>)
    
}
