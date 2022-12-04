import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Scren_width = Dimensions.get('window').width;

const ItemFormat = (props) => {

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
                        {/* <Text style={styles.deleteText}>Delete</Text> */}
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
            >
                <Text>{props.data.name}</Text>
                <Text>{props.data.description}</Text>
        </TouchableOpacity>   
    </Swipeable>
  )
}

export default ItemFormat

const styles = StyleSheet.create({
    itemList: {
        marginVertical: 4,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    deleteContainer: {
        flex: 1,
        marginVertical: 4,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        borderRadius: 2
    },
})