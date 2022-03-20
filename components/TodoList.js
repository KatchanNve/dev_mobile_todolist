import React, {useState} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch,ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';

import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';
import todoView from "./todoView";

export default function TodoList(props){
    const [count,setCount] = useState(todoData.filter((item)=>item.done).length);
    const [todos,setTodos] = useState(todoData);
    const [countGlobal,setCountGlobal] = useState(todos.length)
    
    const [newTodoText,setNewTodoText] = useState("")
    const [showDoneItems,setShowDoneItems] = useState(false)
    const [showNotDoneItems,setShowNotDoneItems] = useState(false)
    const a=props.navigation.getParent(todoView)
   
    //const[title,setTitle] = useState(props.route.params.title)

console.log("test"+JSON.stringify(props,null,2))
console.log("test2"+JSON.stringify(props.route))
console.log("ici          "+   props.navigation.getParent(todoView))

    const onChange = (state) => {
        if(state)
            setCount(count+1)
        else
            setCount(count-1)
    }
    
    const updateCount = (offset) => {
        setCount(offset + count)
    }
    
    
    const checkAll = () => {
        setTodos(todos.map(item => {return {id: item.id, content: item.content, done: true }}))
        setCount(todos.length)
    }
    
    
    const checkNone = () =>{
        setTodos(todos.map(item => {return {id: item.id, content: item.content, done: false }}))
        setCount(0)
    }
    
    const deleteTodo = (id) => {
        const newTodos = todos.filter(item => item.id !== id)
        setTodos(newTodos)
        setCount(newTodos.filter(item=>item.done).length)
        setCountGlobal(todos.length)
    }
    
    const addNewTodo = () =>{
        setNewTodoText(newTodoText);
        setTodos([...todos, { id:  Math.max(...todos.map(item => item.id)) + 1, content: newTodoText, done: false }])
        setNewTodoText("")
        setCount(todos.filter(item=>item.done).length)
        setCountGlobal(todos.length)
    }
    
    
    
    
    return (
        <ScrollView>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={todos}
                renderItem={({item}) => <TodoItem updateCount={updateCount}  todosNotDone = {showNotDoneItems} todosDone={showDoneItems} item={item} deleteTodo={deleteTodo} />}
            />
            <Progress.Bar progress={count/countGlobal} width={1000} hight={20}/>
           
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
