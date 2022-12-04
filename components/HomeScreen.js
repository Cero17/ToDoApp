import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import ItemFormat from './ItemFormat'
import { collection, orderBy, query, onSnapshot, deleteDoc, doc} from 'firebase/firestore'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const HomeScreen = ({ navigation }) => {

    const [task, setTasks] = useState([])

    const fetchData = async () => {
        //querries
        const colRef = collection(db, 'tasks')

        const q = query(colRef, orderBy('createdAt', 'desc'))

        await onSnapshot(q, (snapshot) => {
            const taskData = []
            snapshot.docs.forEach((doc) => {
                taskData.push({...doc.data(), id: doc.id})
            })
           // console.log(taskData)
            setTasks(taskData)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    //delete a task 
    const deleteTask = (task) => {
        const docRef = doc(db, 'tasks', task.id)
        deleteDoc(docRef)
            .then(() => {
                //shows an alert
                alert('task deleted successfully')
            })
            .catch(error => alert(error.message))
    }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.container}>
        <View style={styles.upperView}>
              <View>
              <Text style={styles.upperText}>Tasks</Text>
              </View>
              <View style={{marginLeft: 190, marginTop: 10}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Item')}>
                  <AntDesign name='pluscircleo' style={{color: 'white', fontSize: 45}} />
                 </TouchableOpacity>
              </View>
          </View>

          <View style={styles.lowerView}>
              <FlatList
                  data={task}
                  renderItem={({ item }) => (
                      <ItemFormat data={item} deleteItem = {() => deleteTask(item)} />
                  )}
                  keyExtractor={item => item.id}
                />
          </View>
    </View>
    </GestureHandlerRootView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#810CA8',
        //alignItems: 'center'
    },
    upperView: {
        marginTop: 20,
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    upperText: {
        fontSize: 35,
        color: 'white'
    },
    lowerView: {
        flex: 1,
        marginTop: 15,
        //backgroundColor: 'pink',
       // marginHorizontal: 8
    },
})

