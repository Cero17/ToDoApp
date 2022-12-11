import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { db } from '../firebaseConfig'
import { updateDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const EditItem = ({ route }) => {

    // this screen updates the existing tasks by updating 
    // the task name and description
    
    // the existing data is passed as params
    const { name, description, itemId } = route.params;

    const navigation = useNavigation();

    const [newTaskName, setNewTaskName] = useState(name) 
    const [newDescription, setNewDescription] = useState(description)

    //updates existing tasks
    const updateTask = async() => {
        const docRef = doc(db, "tasks", itemId)
        await updateDoc(docRef, {
            name: newTaskName,
            description: newDescription
        })
    }

return (
    <ScrollView> 
        <View style={styles.container}>
        <Image
            style={styles.img}
            source={require('../assets/Images/target.png')}
          />
          
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Enter new task"
            onChangeText={text => setNewTaskName(text)}  
          />  
          
          <TextInput
            style={styles.input}
            placeholder="Enter new description"
            onChangeText={text => setNewDescription(text)}  
          />    
        </View>

          <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                  updateTask()
                  navigation.navigate('Home')
              }}
          >
              <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>     
  )
}

export default EditItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#150050"
    },
    input: {
        marginVertical: 18,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFBEB',
        height: 60
    },
    inputContainer: {
        marginTop: 30,
        padding: 15,
        width: "95%",
    },
    btn: {
        marginTop: 80,
        backgroundColor: '#E5B8F4',
        padding: 12,
        width: 250,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 120
    },
    btnText: {
        fontSize: 20,
        
    },
    img: {
        height: 100,
        width: 100,
        marginTop: 30 
    }
})