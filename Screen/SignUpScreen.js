
/*
import {TokenContext, UsernameContext} from "../Context/Context";
import React, {useContext} from "react";
import {Button, Text, TextInput, View} from "react-native";
import {signIn, signUp} from "../API/TodoAPI";

export default function SignUpScreen ({ navigation }) {
    const [error, setError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    
    return (
        <View>
            <TextInput
                //style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder={"username"}
            />
            <TextInput
                //style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="password"
            />
            <Button
                onPress={ () =>
                    signUp(username, password)
                        .then(token => {
                            setToken(token)
                            setUsername(username)
                            props.navigate('Home')
                        })
                        .catch(err => {
                            setError(err)
                        })
                }
                title="Sign Up"
            />
            {error != null ? <Text>{error}</Text> : <Text/>}
        </View>
    );
}
*/
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { signUp } from '../API/TodoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignUp () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  const getSignedUp = (setToken, setUsername) => {
    setError('')
    if (login == '' || password == '' || copyPassword == '') return
    if (password != copyPassword){
        setError("Passwords don't match")
        return
    } 
    setVisible(false)
    signUp(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
        console.log('token', token)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View  style={{backgroundColor:"#F8B195",flex:1, 
              justifyContent: "center",
              alignItems: "center",}}>
                {visible ? (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Login</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={login}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Password Again</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setCopyPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={copyPassword}
                      />
                    </View>
                    <Button
                    
                      onPress={() => getSignedUp(setToken, setUsername)
                      }
                      title='Sign Up'
                    />
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}
                  </>
                ) : (
                  <ActivityIndicator />
                )}
              </View>
            )
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  label: {
    width: 70
  },
  text_error: {
    color: 'red'
  },
  text_input: {
    marginBottom:30,
    borderRadius:20
    ,padding:5,
    backgroundColor: 'white',
    margin: 5
  }
})
