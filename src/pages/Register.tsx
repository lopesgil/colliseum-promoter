import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

interface RegisterData {
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
}

export default function Register() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data: FormData) => { console.log(data) };
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Hello Register!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#0e101c',
    },
    formBox: {
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 20,
    },
    label: {
        margin: 10,
        marginLeft: 0,
        color: 'white',
    },
    button: {
        marginTop: 20,
        height: 40,
        borderRadius: 4,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 20,
    }
});
