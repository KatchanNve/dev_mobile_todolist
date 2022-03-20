import {Button, FlatList, View,Image,TouchableOpacity,ScrollView,ImageBackground} from "react-native";
import {getTaskListsByUsername} from "../API/TodoAPI";
import {useContext, useEffect, useState} from "react";
import {TokenContext, UsernameContext} from "../Context/Context";
import Input from "./UI/Input";
import { deleteTaskLists } from "../API/TodoAPI";
import TodoView from "./todoView";
import TodoItem from "./TodoItem";

export default function TodoLists ({ navigation }) {
    
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState();
   
   
    
    const showTodo = () =>{
        getTaskListsByUsername(username,token)
        .then(result => setData(result))

    }

    useEffect(()=>{
        showTodo()
    },[data])
    

    return (
       <ImageBackground
       style={{flex:1}}
       source={require('../assets/img/bleu.png')}
       >
        <ScrollView>
          

            
            <FlatList
            style={{backgroundColor:"`#6495ed",flex:1}}
                data={data}
                renderItem={({item}) =>
                
                      (<TodoView navigation={navigation} deleteTaskLists={deleteTaskLists}  item={item}/>)
    
                }
            />
            <Input/>
           
        </ScrollView>
        </ImageBackground>
    )
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom : 20
    },
});*/
