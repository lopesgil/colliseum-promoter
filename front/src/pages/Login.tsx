import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigation = useNavigation();
    const { control, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: FormData) => {
        console.log(data);
        api.post('login', data).then((res) => {
            AsyncStorage.setItem('token', res.data.token).then(() => {
                navigation.navigate('Home');
            });
            console.log('login feito com sucesso\n', res.data.user);
        }).catch((err) => {
            console.log('erro no login\n', err);
        });
    };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <View style={styles.container}>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>E-mail:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                autoCompleteType='email'
                                autoCorrect={false}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{
                            required: 'O e-mail é obrigatório.',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Formato de e-mail inválido.'
                            },
                        }}
                        name='email'
                        defaultValue=''
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Senha:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                secureTextEntry
                                autoCompleteType='password'
                                autoCorrect={false}
                                textContentType='password'
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
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                </View>
                <View style={styles.button}>
                    <Button title='ENTRAR' onPress={handleSubmit(onSubmit, onError)} />
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
