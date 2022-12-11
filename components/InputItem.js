import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'

//using the real-time-modal-datetime-picker library selecting dates (calendar)

const InputItem = ({ navigation }) => {

    const [taskName, setTaskName] = useState("");

    const [taskDescription, setTaskDescription] = useState("")

    const [isDataPickerVisible, setIsDataPickerVisible] = useState(false) // checks if the date picker is visible

    const [date, setDate] = useState(new Date().toDateString()) 
  
    const showDataPicker = () => setIsDataPickerVisible(true)

    const hideDataPicker = () => setIsDataPickerVisible(false)


    const dateHandler = (selectedDate) => {
        //sets the date chose by the user
        const currentDate = selectedDate || date;

        // returns a new format of the selected date
        let formatedDate = new Date(currentDate).toDateString();
                       
       // setTextDate(formatedDate)
        setDate(formatedDate)

        console.log(formatedDate)
    }

    // Add new task to the database
    const AddTask = async() => {
        const colRef = await collection(db, 'tasks')
        await addDoc(colRef, {
            name: taskName,
            description: taskDescription,
            date: date,
            createdAt: serverTimestamp()
        }).then(() => {
            console.log("Data Added succesfully")
            setTaskDescription("")
            setTaskName("")
        }).catch(error => alert(error.message))
    }

    // checks for possible exceptions before creating a new task
    const AddTaskHandler = async() => {
        if (!taskName && !taskDescription) { alert("Task name and description is required") }
        else if (!taskName || !taskDescription) { alert("Task name or description is required") }
        else {
            await AddTask()
            navigation.navigate("Home")
        }
    }


  return (
      <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
              <Image
                  style={{ height: 100, width: 100, marginTop: 30 }}
                  source={require('../assets/Images/task.png')}
              />
        <View style={styles.inputContainer}>
            <Text style={{fontSize: 18, color: 'white'}}>Task Name</Text>
              <TextInput
                  style={styles.input}
                  placeholder='Name'
                  onChangeText={text => setTaskName(text)}
                  value={taskName}
              />
               <Text style={{fontSize: 18, marginTop: 30, color: 'white'}}>Task Description</Text>
              <TextInput
                  style={styles.input}
                  placeholder='Description'
                  onChangeText={text => setTaskDescription(text)}
                  value={taskDescription}
              />
              </View>

              <View style={styles.datePicker}>
                        <DateTimePickerModal
                          isVisible={isDataPickerVisible}
                          mode="date"
                          onConfirm={dateHandler}
                          onCancel={hideDataPicker}
                          display="default"
                        />

                  <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>{date}</Text>
                      <View style={{
                          flex: 1, height: 1,
                          backgroundColor: 'black',
                          width: 150,
                          marginTop: 5,
                          backgroundColor: 'white'
                      }} />
                  </View>

                  <TouchableOpacity onPress={() => {
                      console.log("Date button pressed")
                      showDataPicker()
                  }}>
                      <AntDesign name='calendar' style={{color: 'white', fontSize: 45}} />
                  </TouchableOpacity>
              </View>

          <TouchableOpacity
              style={styles.btn}
                  onPress={AddTaskHandler}
              >
                <Text style={{fontSize: 18, fontWeight: '400'}}>Create Task</Text>
              </TouchableOpacity>
    </View>
   </ScrollView>
  )
}  

export default InputItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#150050" 
    },
    inputContainer: {
        marginLeft: 35,
        width: '100%',
        marginTop: 15,
        paddingVertical: 16
    },
    input: {
        marginTop: 8,
        width: '90%',
        height: 50,
        backgroundColor: '#E5B8F4',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 18
    },
    btn: {
        marginTop: 55,
        width: 250,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5B8F4',
        marginBottom: 25
    },
    datePicker: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 50
    },
    dateText: {
        fontSize: 20,
        marginBottom: 2,
        color: 'white'
        
    },
    dateContainer: {
        marginRight: 75,
        padding: 12
    }
})