import { View, Text,TouchableOpacity,Image,Button } from 'react-native'
import React,{useState,useContext} from 'react'
import {TokenContext, UsernameContext} from "../Context/Context";


const todoView = (props) => {
  const [token, setToken] = useContext(TokenContext);
    const[title] = useState(props.item.title)

    

  return (
      
    <View style={{ 
        flex: 1,flexDirection: 'row' }}>

             <View style={{flex:1}}>
                  <Button 
                  title={title} 
                  onPress={() =>{ props.navigation.navigate('todolist', {title:title} )} }/>
                       </View>
       <TouchableOpacity
       onPress={ () => props.deleteTaskLists(props.item.id,token) }  >
       <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
       </TouchableOpacity>
       
    </View>
    
  )
}

export default todoView