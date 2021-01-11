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
    const navigation = useNavigation();
    const { control, getValues, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: RegisterData) => {
        console.log(data);
        navigation.navigate('CreateEvent');
    };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <View style={styles.container}>
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
                    <Text style={styles.label}>Telefone:</Text>
                    <Controller
                        control={control}
                        render={(props) => (
                            <TextInput
                                autoCompleteType='tel'
                                autoCorrect={false}
                                keyboardType='phone-pad'
                                textContentType='telephoneNumber'
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
                    {errors.phoneNumber && <Text style={{ color: 'red' }}>{errors.phoneNumber.message}</Text>}
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
                    <Button title='CADASTRAR' onPress={handleSubmit(onSubmit, onError)} />
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
