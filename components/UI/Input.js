import React, {useContext} from "react";
import { Button, TextInput, SafeAreaView } from "react-native";
import {TokenContext, UsernameContext} from "../../Context/Context";
import {createTaskLists} from "../../API/TodoAPI";

export default function Input(props) {
    
    const [text, setText] = React.useState(null);
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const [error, setError] = React.useState('');
    
    return (
        <SafeAreaView>
            <TextInput
                onChangeText={setText}
                value={text}
            />
            <Button
                onPress={ () =>
                    createTaskLists(username, token, text)
                      
                }
                title="Create"
            />
        </SafeAreaView>
    );
}
