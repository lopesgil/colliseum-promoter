import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* import DateTimePicker from '@react-native-community/datetimepicker'; */
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

interface RegisterData {
    name: string,
    email: string,
    birthdate: string,
    gender: string,
    password: string,
    passwordConfirmation: string,
    role: string,
}

export default function Register() {
    const navigation = useNavigation();
    const { control, getValues, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: RegisterData) => {
        data.role = 'promoter';
        /* console.log(data); */
        api.post('register', data).then((response) => {
            AsyncStorage.setItem('token', response.data.token).then(() => {
                navigation.navigate('Home');
            });
            /* console.log('cadastrado com sucesso\n', response.data.user); */
        }).catch((err) => {
            console.log('erro no cadastro\n', err);
        });
    };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <LinearGradient 
                colors = {['#EEF2F2', '#8E9EAB']} style={styles.title}>
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua conta</Text>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>Nome:</Text>
                    <Controller
                        control={control}
                        render={({ onBlur, onChange, value }) => (
                            <TextInput
                                autoCompleteType='name'
                                autoCorrect={false}
                                textContentType='name'
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        rules={{ required: 'O nome é obrigatório.' }}
                        name='name'
                        defaultValue=''
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                </View>
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
                    <Text style={styles.label}>Data de nascimento:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                autoCorrect={false}
                                keyboardType='numeric'
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{ required: 'A data de nascimento é obrigatória.' }}
                        name='birthdate'
                        defaultValue=''
                    />
                    {errors.birthdate && <Text style={{ color: 'red' }}>{errors.birthdate.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Telefone:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                autoCorrect={false}
                                keyboardType='phone-pad'
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{ required: 'O telefone é obrigatório.' }}
                        name='phone'
                        defaultValue=''
                    />
                    {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Gênero:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                autoCorrect={false}
                                style={styles.input}
                                onBlur={props.onBlur}
                                onChangeText={(value) => props.onChange(value)}
                                value={props.value}
                            />
                        )}
                        rules={{ required: 'O gênero é obrigatório.' }}
                        name='gender'
                        defaultValue=''
                    />
                    {errors.gender && <Text style={{ color: 'red' }}>{errors.gender.message}</Text>}
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
                                textContentType='newPassword'
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
                <View>
                    <Text style={styles.label}>Confirmação de senha:</Text>
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
                        rules={{
                            required: 'A confirmação de senha é obrigatória.',
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || 'As senhas não coincidem.';
                                }
                            }
                        }}
                        name='passwordConfirmation'
                        defaultValue=''
                    />
                    {errors.passwordConfirmation && <Text style={{ color: 'red' }}>{errors.passwordConfirmation.message}</Text>}
                </View>
                <View style={styles.button}>
                    <Button onPress={handleSubmit(onSubmit, onError)} ><Text style={{color: '#000'}}>CADASTRAR</Text> </Button>
                </View>
            </View>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    },
    formBox: {
        paddingVertical: 20,
    },
    title: {
        backgroundColor: 'transparent' ,
        fontSize: 30,
        textAlign: 'center',
    },
    label: {
        margin: 10,
        marginLeft: 0,
        color: 'black',
    },
    button: {
        marginTop: 20,
        height: 40,
        borderRadius: 4,
        backgroundColor: '#FF4D00',
        color: '#000000'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    }
});
