import { View, Text,TouchableOpacity,Image,Button } from 'react-native'
import React,{useState} from 'react'

const todoView = (props) => {

    const[title] = useState(props.item.item.title)

    const todoTaskScreen = (title) => {
        props.navigation.navigate("TodoListScreen",{title:title})
    }


  return (
      <View>
 <Text>test</Text>
      </View>
     
      /*
    <View style={{ 
        flex: 1,flexDirection: 'row' }}>

             <View style={{flex:1}}>
                  <Button 
                  title={title} 
                  onPress={() => 
                    {todoTaskScreen(titles)}
                     // props.navigation.navigate('todolist'), {title:title}
                      
                       }/>
                       </View>
       <TouchableOpacity
       onPress={ () => props.deleteTaskLists(item) }  >
       <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
       </TouchableOpacity>
       
    </View>
    */
  )
}

export default todoView