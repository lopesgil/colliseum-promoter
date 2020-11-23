import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data: FormData) => { console.log(data) };

    return (
        <View style={styles.container}>
            <View>
                <Text>E-mail:</Text>
                <Controller
                    control={control}
                    render={(props) => (
                        <TextInput
                            onBlur={props.onBlur}
                            onChangeText={(value) => props.onChange(value)}
                            value={props.value}
                        />
                    )}
                    rules={{ required: true }}
                    name='email'
                    defaultValue=''
                />
            </View>
            <View>
                <Text>Senha:</Text>
                <Controller
                    control={control}
                    render={(props) => (
                        <TextInput
                            onBlur={props.onBlur}
                            onChangeText={(value) => props.onChange(value)}
                            value={props.value}
                        />
                    )}
                    rules={{ required: true }}
                    name='password'
                    defaultValue=''
                />
            </View>
            <View>
                <Button title='ENTRAR' onPress={handleSubmit(onSubmit)} />
            </View>
            <View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    }
});
