import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import {Button } from 'react-native-paper';

interface EventData {
    name: string,
    description: string,
    price_raw: string,
    price: number,
    date: string,
    starts_at: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    latitude: number,
    longitude: number,
}

export default function CreateEvent() {
    const navigation = useNavigation();
    const { control, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: EventData) => {
        data.price = parseFloat(data.price_raw);
        data.starts_at = '1900';
        data.city = 'Rio de Janeiro';
        data.neighborhood = 'Lapa';
        data.street = 'Rua da Lapa';
        data.number = '422';
        data.latitude = 31231;
        data.longitude = 541123;
        console.log(data);

        AsyncStorage.getItem('token').then((token) => {
            api.post('event', data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then((res) => {
                console.log('evento criado com sucesso\n', res.data);
                navigation.navigate('Home', { event: res.data });
            }).catch((err) => {
                console.log('erro na criação do evento\n',err);
            });
        }).catch((err) => {
            console.log('erro na recuperação do token\n', err);
        });
    };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <LinearGradient 
                colors = {['#EEF2F2', '#8E9EAB']} style={styles.title}>
        <View style={styles.container}>
            <Text style = {styles.title}>Crie o seu Evento</Text>
            <View style={styles.formBox}>
                <View>
                    <Text style={styles.label}>Nome do evento:</Text>
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
                        rules={{ required: 'O nome do evento é obrigatório.' }}
                        name='name'
                        defaultValue=''
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Data:</Text>
                    <Controller
                        control={control}
                        render={({ onBlur, onChange, value }) => (
                            <TextInput
                                autoCompleteType='off'
                                autoCorrect={false}
                                keyboardType='numeric'
                                textContentType='name'
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        rules={{ required: 'A data é obrigatória.' }}
                        name='date'
                        defaultValue=''
                    />
                    {errors.date && <Text style={{ color: 'red' }}>{errors.date.message}</Text>}
                </View>
                {/* <View>
                    <Text style={styles.label}>Nome do evento:</Text>
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
                    rules={{ required: 'O nome do evento é obrigatório.' }}
                    name='name'
                    defaultValue=''
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                    </View> */}
                {/* <View>
                    <Text style={styles.label}>Rua:</Text>
                    <Controller
                    control={control}
                    render={({ onBlur, onChange, value }) => (
                    <TextInput
                    autoCompleteType='street-address'
                    autoCorrect={false}
                    textContentType='streetAddressLine1'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    />
                    )}
                    rules={{ required: 'O endereço é obrigatório' }}
                    name='street'
                    defaultValue=''
                    />
                    {errors.street && <Text style={{ color: 'red' }}>{errors.street.message}</Text>}
                    </View> */}
                {/* <View>
                    <Text style={styles.label}>Bairro:</Text>
                    <Controller
                    control={control}
                    render={({ onBlur, onChange, value }) => (
                    <TextInput
                    autoCompleteType='off'
                    autoCorrect={false}
                    textContentType='streetAddressLine2'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    />
                    )}
                    rules={{ required: 'O bairro é obrigatório.' }}
                    name='district'
                    defaultValue=''
                    />
                    {errors.district && <Text style={{ color: 'red' }}>{errors.district.message}</Text>}
                    </View> */}
                {/* <View>
                    <Text style={styles.label}>Complemento:</Text>
                    <Controller
                    control={control}
                    render={({ onBlur, onChange, value }) => (
                    <TextInput
                    autoCompleteType='off'
                    autoCorrect={false}
                    textContentType='sublocality'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    />
                    )}
                    name='complement'
                    defaultValue=''
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                    </View> */}
                {/* <View>
                    <Text style={styles.label}>Estado:</Text>
                    <Controller
                    control={control}
                    render={({ onBlur, onChange, value }) => (
                    <TextInput
                    autoCompleteType='off'
                    autoCorrect={false}
                    textContentType='addressState'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    />
                    )}
                    rules={{ required: 'O estado é obrigatório.' }}
                    name='state'
                    defaultValue=''
                    />
                    {errors.state && <Text style={{ color: 'red' }}>{errors.state.message}</Text>}
                    </View> */}
                <View>
                    <Text style={styles.label}>Preço:</Text>
                    <Controller
                        control={control}
                        render={({ onBlur, onChange, value }) => (
                            <TextInput
                                autoCompleteType='off'
                                autoCorrect={false}
                                keyboardType='numeric'
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        rules={{ required: 'O preço é obrigatório.' }}
                        name='price_raw'
                        defaultValue=''
                    />
                    {errors.price_raw && <Text style={{ color: 'red' }}>{errors.price_raw.message}</Text>}
                </View>
                <View>
                    <Text style={styles.label}>Descrição:</Text>
                    <Controller
                        control={control}
                        render={({ onBlur, onChange, value }) => (
                            <TextInput
                                autoCompleteType='off'
                                autoCorrect={false}
                                multiline
                                numberOfLines={5}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                            />
                        )}
                        rules={{ required: 'A descrição é obrigatória.' }}
                        name='description'
                        defaultValue=''
                    />
                    {errors.description && <Text style={{ color: 'red' }}>{errors.description.message}</Text>}
                </View>
                <View style={styles.button}>
                    <Button onPress={handleSubmit(onSubmit, onError)} ><Text style={{color: '#000'}}>CRIAR EVENTO</Text></Button>
                </View>
            </View>
        </View>
        </LinearGradient>
    );
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
