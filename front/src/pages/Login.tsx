import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginImage from '../../assets/login.png'

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigation = useNavigation();
    const { control, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: FormData) => {
        /* console.log(data); */
        api.post('login', data).then((res) => {
            AsyncStorage.setItem('token', res.data.token).then(() => {
                navigation.navigate('Home');
            });
            /* console.log('login feito com sucesso\n', res.data.user); */
        }).catch((err) => {
            console.log('erro no login\n', err);
        });
    };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <View style={styles.container}>
            <ImageBackground source={loginImage} resizeMode='contain' style={styles.bgImage}>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>E-mail:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                accessibilityLabel='email input'
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
                                accessibilityLabel='password input'
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
                    <Button style= {styles.button} onPress={handleSubmit(onSubmit, onError)} ><Text style={{color: '#000'}}>LOGIN</Text>  </Button>

                    <Button style= {styles.button1} onPress={() => navigation.navigate('Register')} ><Text style={{color: '#000'}}>CADASTRAR-SE</Text> </Button>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
    },
    formBox: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    label: {
        margin: 10,
        marginLeft: 0,
        color: 'black',
    },
    button: {
        marginTop: 20,
        height: 40,
        borderRadius: 6,
        backgroundColor: '#FF4D00',
        color: '#000000'
    },
    button1: {
        marginTop: 20,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'transparent',
        color: '#000000',
        borderColor: '#FF4D00',
        borderWidth: 3,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 20,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
      },
});
