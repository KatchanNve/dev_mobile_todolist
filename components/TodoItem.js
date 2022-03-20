
import React, {useEffect, useState,useContext} from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { updateTask } from "../API/TodoAPI";
import { TokenContext } from "../Context/Context";

export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);
    const [token,setToken] = useContext(TokenContext)
    const changeDone = (state) => {
        setDone(state)
        props.updateCount(state)
    }
    //console.log('titre ou pas ?'+JSON.stringify(props.item))
    
    useEffect(() => {
        changeDone(props.item.done)
      //  updateTask(props.item.id ,done ,props.item.title,token )
    },[props.item.done])
    
    
    if(props.todosDone){
        return (
            <View style={styles.content}>
                {done ? (<Switch value={done} onValueChange={changeDone} />) : null}
                {done ? (<Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>) : null}
                {done ? (<TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                    <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>) : null}
            </View>
        )
    }
    else if(props.todosNotDone){
        return (
            <View style={styles.content}>
                {!done ? (<Switch value={done} onValueChange={changeDone} />) : null}
                {!done ? (<Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>) : null}
                {!done ? (<TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                    <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>) : null}
            
            </View>
        )
    }
    else{
        return (
            <View style={styles.content}>
                <Switch value={done} onValueChange={changeDone} />
                <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
                <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                    <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        
    },
    text_item: {
        marginLeft: 10,
        width: 150,
    }
})
