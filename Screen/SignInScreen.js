import {TokenContext, UsernameContext,} from "../Context/Context";
import {Button, View, TextInput, Text,ImageBackground} from "react-native";
import React, {useContext} from "react";
import {signIn} from "../API/TodoAPI";

export default function SignInScreen ({ navigation }) {
    const [error, setError] = React.useState();
    const [password, setPassword] = React.useState('');
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    
    return (
     
        <View style={{backgroundColor:"#F8B195",flex:1, 
        justifyContent: "center",
        alignItems: "center",}}>
            <TextInput
                style={{borderRadius:20,padding:5}}
                onChangeText={setUsername}
                value={username}
                placeholder={"username"}
            />
            <TextInput
                style={{margin:20,borderRadius:20,padding:5}}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="password"
            />
            <Button
            
                onPress={ () =>
                    signIn(username, password)
                        .then(t => {
                            setToken(t)
                            setUsername(username)
                            props.navigation.navigate('Home')
                        })
                        .catch(err => {
                            setError(err)
                        })
                }
                title="Sign In"
            />
            {error != null ? <Text>{error}</Text> : <Text/>}
        </View>
        
    );
}

