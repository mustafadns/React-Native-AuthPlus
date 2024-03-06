import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function Input(
        {
            label,
            keyboardType, 
            onUpdateValue,
            value,
            secure,
            isInvalid,
        }) 
{
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label,isInvalid && styles.labelInvalid]}>{label}</Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputİnvalid]}
                autoCapitalize='none'
                keyboardType={keyboardType}
                onChangeText={onUpdateValue}
                value={value}
                secureTextEntry={secure}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8, 
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    labelInvalid: {
        color: 'red'
    },
    input: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 16,
    },
    inputİnvalid: {
        backgroundColor: 'red',
    },
})