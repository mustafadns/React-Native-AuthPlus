import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react'

export default function Button({ children, onPress }) {
    return (
        <Pressable style={
                ({pressed}) => [
                    styles.button, 
                    pressed && styles.pressed
                    ]}
                    onPress={onPress}
        >
            <View>
                <Text style={styles.text}>{ children }</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6f804a',
        paddingVertical: 12,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
})