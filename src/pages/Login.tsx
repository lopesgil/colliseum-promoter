import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data: FormData) => { console.log(data) };
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>E-mail:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{
                            required: 'O e-mail é obrigatório.',
                            pattern: /^\S+@\S+$/i,
                        }}
                        name='email'
                        defaultValue=''
                    />
                </View>
                <View>
                    <Text style={styles.label}>Senha:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{ required: 'A senha é obrigatória.' }}
                        name='password'
                        defaultValue=''
                    />
                </View>
                <View style={styles.button}>
                    <Button title='ENTRAR' onPress={handleSubmit(onSubmit)} />
                </View>
                <View style={styles.button}>
                    <Button title='CADASTRAR-SE' onPress={() => navigation.navigate('Register')} />
                </View>
            </View>
        </View>
    );
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
