import React, {useState,useContext,useEffect} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch,ScrollView,Share } from 'react-native';
import * as Progress from 'react-native-progress';

import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';
import todoView from "./todoView";
import { TokenContext } from "../Context/Context";
import {createTask,
    deleteTask,
    showTask,
    updateTaskCheckAll,
    updateTaskCheckNone} from "../API/TodoAPI";
import { ImageBackground } from "react-native-web";

export default function TodoList(props){
    const [count,setCount] = useState();
    const [todos,setTodos] = useState(todos);
    const [countGlobal,setCountGlobal] = useState()
    
    const [newTodoText,setNewTodoText] = useState("")
    const [showDoneItems,setShowDoneItems] = useState(false)
    const [showNotDoneItems,setShowNotDoneItems] = useState(false)
    const [token,setToken] = useContext(TokenContext)
   
    const[title,setTitle] = useState(props.route.params.title)



    const onChange = (state) => {
        if(state)
            setCount(count+1)
        else
            setCount(count-1)
    }
    
    const updateCount = (offset) => {
        setCount(offset + count)
    }
    
    const showDataTask =()=>{
        showTask(title,token).then(result =>setTodos(result))
    }
    useEffect(() =>{
       showDataTask()
    },[todos])

   
    const addNewTodo = () =>{
        createTask(title,newTodoText,token)
    }
    const checkAll = () => {
        updateTaskCheckAll(title,token)
    }

    const checkNone = () =>{
        updateTaskCheckNone(title,token)
    }

    const deleteTodo = (id) => {
        deleteTask(id,token)
    }
   
    
    return (
        
        <ScrollView>
           
          
            <Text>Bienvenue dans votre todolist <Text style={{fontWeight:"bold"}}>{title}</Text></Text>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={todos}
                renderItem={({item}) => <TodoItem updateCount={updateCount}  todosNotDone = {showNotDoneItems} todosDone={showDoneItems} item={item} deleteTodo={deleteTodo} />}
            />
            <View style={{marginBottom:10,marginTop:10}}>

            <Text>Progression des taches :</Text>
            <Progress.Bar
            progress={count} width={1000} hight={20}
            inActivesStrokeColor={"red"}
            />
           </View>
            <View style={styles.button_container}>
                <Button
                    title='checkAll'
                    onPress={() => checkAll()}/>
                <Button
                    title='checkNone'
                    onPress={() => checkNone()}/>
                <Button
                    title='showTodosDone'
                    onPress={() => setShowDoneItems(!showDoneItems)}/>
                <Button
                    title='ShowTodosNotDone'
                    onPress={() => setShowNotDoneItems(!showNotDoneItems)}/>
            </View>
            <View style={styles.add_box}>
                <TextInput
                    onChangeText={setNewTodoText}
                    placeholder='saisir ici un nouvel item'
                    onSubmitEditing={addNewTodo}
                    value={newTodoText}
                />
                <Button
                    title="new"
                    onPress={() => addNewTodo(newTodoText)}/>
                <Button
                    title="Back"
                    onPress={() => props.navigation.goBack()}/>
                    
            </View>
           
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    add_box: {
        //flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    button_container:{
        //flex: 1,
    },
    
})
