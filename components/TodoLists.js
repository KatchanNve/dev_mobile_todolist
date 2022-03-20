import {Button, FlatList, View,Image,TouchableOpacity,ScrollView} from "react-native";
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
   
    //useEffect( () => {getTaskListsByUsername(username, token).then(r => {setData(r.taskLists); console.log(r.taskLists)})}, []);
    
    const showTodo = () =>{
        getTaskListsByUsername(username,token)
        .then(result => setData(result))

    }

    useEffect(()=>{
        showTodo()
    },[data])
    

    return (
        <ScrollView>
            <FlatList
                data={data}
                renderItem={(item) =>
                
                      (<TodoView navigation={navigation} deleteTaskLists={deleteTaskLists}  item={item}/>)
              
            
                /*

                <View style={{ flex: 1, flexDirection: 'row' }}>
                         <View style={{flex:1}}> 
                         <Button title={item.title} 
                                 onPress={() => {navigation.navigate('todolist'),{title:item.title}}}/></View>
                   <TouchableOpacity
                   onPress={ () => deleteTaskLists(item.id,token)}>
                   <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                   </TouchableOpacity>
                </View>
                */
                }
            />
            <Input/>
        </ScrollView>
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
