import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

//using the react-native-gesture-handler to enable gesture on the screen
//in this app we're using the swipeable function for deleting tasks

const ItemFormat = (props) => {

    const navigation = useNavigation();

    //this function defines the animation in the home screen
    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={props.deleteItem}>
                <View style={styles.deleteContainer}>
               
                    <Animated.View style={{ transform: [{ scale: trans }] }}>
                        <AntDesign
                            name='delete'
                            style={{ color: 'white', fontSize: 50 }} />
                    </Animated.View>
                 </View>
            </TouchableOpacity>
        )
    }

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
        <TouchableOpacity
              style={styles.itemList}
              onPress={() => navigation.navigate("Update", {
                  //the current data is passed to the EditItem screen
                  name: props.data.name, 
                  description: props.data.description,
                  itemId: props.data.id
              })}
            >
              <View style={{marginRight: 10, width: 200}}>
                <Text style={{paddingVertical: 4, fontSize: 18, fontWeight: 'bold'}}>{props.data.name}</Text>
                <Text style={{fontSize: 15}}>{props.data.description}</Text>  
              </View>

              <View style={styles.date}>
                  <Text style={{fontSize: 12, color: 'white'}}>{props.data.date}</Text>    
              </View>
        </TouchableOpacity>   
    </Swipeable>
  )
}

export default ItemFormat

const styles = StyleSheet.create({
    itemList: {
        marginVertical: 6,
        paddingVertical: 15,
        marginHorizontal: 3,
        paddingLeft: 24,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    deleteContainer: {
        flex: 1,
        marginVertical: 6,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        borderRadius: 5
    },
    date: {
        justifyContent: 'center',
        backgroundColor: '#810CA8',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        width: 115

    }
})