import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

interface RegisterData {
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    passwordConfirmation: string,
}

export default function Register() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data: RegisterData) => { console.log(data) };
    const navigation = useNavigation();

    console.log(errors);
    return (
        <View style={styles.container}>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>Nome:</Text>
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
                        rules={{ required: 'O nome é obrigatório.' }}
                        name='name'
                        defaultValue=''
                    />
                </View>
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
                        rules={{ required: 'O e-mail é obrigatório.' }}
                        name='email'
                        defaultValue=''
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefone:</Text>
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
                        rules={{ required: 'O telefone é obrigatório.' }}
                        name='phoneNumber'
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
                <View>
                    <Text style={styles.label}>Confirmação de senha:</Text>
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
                        rules={{ required: 'A confirmação de senha é obrigatória.' }}
                        name='passwordConfirmation'
                        defaultValue=''
                    />
                </View>
                <View style={styles.button}>
                    <Button title='CADASTRAR' onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
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
