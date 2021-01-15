import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventData {
    id: number,
    date: string,
    name: string,
    description: string,
    price: number,
}

interface FormData {
    name: string,
    date: string,
    description: string,
}

type RootStackParamList = {
    Login: undefined,
    Register: undefined,
    CreateEvent: undefined,
    Home: { event: EventData | undefined, eventDeleted: number | undefined } | undefined,
    EditEvent: { event: EventData },
}

type EditEventScreenProp = RouteProp<RootStackParamList, 'EditEvent'>;

export default function EditEvent() {
    const navigation = useNavigation();
    const route = useRoute<EditEventScreenProp>();
    const event = route.params.event;

    const { control, handleSubmit } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: FormData) => {
        AsyncStorage.getItem('token').then((token) => {
            api.put(`event/${event.id}`, data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then((res) => {
                /* console.log('evento atualizado com sucesso\n', res.data); */
                const ev = res;
                navigation.navigate('Home', { event: ev });
            }).catch((err) => {
                console.log('erro na atualização do evento\n', err);
            });
        }).catch((err) => {
            console.log('erro na recuperação do token\n', err);
        });
    }
    const onError = (errors: Object) => { console.log(errors) }

    const handleDelete = () => {
        AsyncStorage.getItem('token').then((token) => {
            api.delete(`event/${event.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then((res) => {
                navigation.navigate('Home', { eventDeleted: event.id });
            }).catch((err) => {
                console.log('erro na deleção do evento\n', err);
            });
        }).catch((err) => {
            console.log('erro na recuperação do token\n', err);
        });
    }

    return (
        <LinearGradient 
                colors = {['#EEF2F2', '#8E9EAB']} style={styles.title}>
        <View style={styles.container}>
            <Text style={styles.title}>Edite seu Evento</Text>

            <Text style={styles.index}>Nome</Text>
            <Controller
                control={control}
                render={(props) => (
                    <TextInput
                        style={styles.title1}
                        onBlur={props.onBlur}
                        onChangeText={(value) => props.onChange(value)}
                        value={props.value}
                    />
                )}
                name='name'
                defaultValue={event.name}
            />

            <Text style={styles.index}>Descrição do Evento</Text>
            <Controller
                control={control}
                render={(props) => (
                    <TextInput
                        style={styles.description}
                        multiline={true}
                        onBlur={props.onBlur}
                        onChangeText={(value) => props.onChange(value)}
                        value={props.value}
                    />
                )}
                name='description'
                defaultValue={event.description}
            />

            <Text style={styles.index}>Data</Text>
            <Controller
                control={control}
                render={(props) => (
                    <TextInput
                        style={styles.title1}
                        onBlur={props.onBlur}
                        onChangeText={(value) => props.onChange(value)}
                        value={props.value}
                    />
                )}
                name='date'
                defaultValue={event.date}
            />

            <Button style={styles.button} onPress={handleSubmit(onSubmit, onError)}>
            <Text style={{color: '#000'}}>SALVAR ALTERAÇÕES</Text>
            </Button>
            <Button style={styles.button} onPress={handleDelete}>
            <Text style={{color: '#000'}}>DELETAR EVENTO</Text>
            </Button>
        </View>
        </LinearGradient>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1,
        padding: 8,
    },
    label: {
        margin: 10,
        marginLeft: 0,
        color: 'black',
    },
    title: {
        backgroundColor: 'transparent' ,
        flex: 1,
        fontSize: 30,
        alignSelf: 'center',
    },
    index: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        height: 40,
        padding: 10,
        borderRadius: 20,
    },
    title1:{
        marginTop: 10,
        flex: 3,
        color: 'black',
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        fontSize: 30,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    description: {
        marginTop: 10,
        flex: 3,
        color: 'black',
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    date: {
        marginTop: 10,
        flex: 1,
        color: 'black',
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    address: {
        backgroundColor: 'transparent' ,
        borderRadius: 5,
        flex: 1,
        fontSize: 12,
    },
    submitButton: {
        marginTop: 20,
        height: 40,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: 'red',
        height: 40,
        borderRadius: 20,
        marginTop: 10,
    },
    image: {
        flex: 3,
        resizeMode: "cover",
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        height: 40,
        borderRadius: 4,
        backgroundColor: '#FF4D00',
        fontColor: '#000000'
    },
});
