import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
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
    const test = () => {return 'test'}

    const handleDelete = () => {
        AsyncStorage.getItem('token').then((token) => {
            api.delete(`event/${event.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then((res) => {
                console.log('evento deletado com sucesso\n', res);
                navigation.navigate('Home', { eventDeleted: event.id });
            }).catch((err) => {
                console.log('erro na deleção do evento\n', err);
            });
        }).catch((err) => {
            console.log('erro na recuperação do token\n', err);
        });
    }

    return (
        <View style={styles.container}>
            
            <View>
                <LinearGradient 
                    colors = {['#FF4D00', '#FF9345']}
                    style={styles.linearGradient}
                >
                    <TextInput 
                        style={styles.title}
                        defaultValue={event.name}
                    />
                </LinearGradient>
            </View>


            <Text style={styles.index}>Descrição do Evento</Text>
            <TextInput 
                style={styles.description}
                defaultValue={event.description}
                multiline={true}
            />

            <Text style={styles.index}>Data</Text>
            <View>
                <TextInput 
                    style={styles.description}
                    defaultValue={event.date}
                    multiline={true}
                />
            </View>

            <View style={styles.deleteButton}>
                <Button color="transparent" title='DELETAR EVENTO' onPress={handleDelete} />
            </View>

            <View style={styles.submitButton}>
                <Button title='SALVAR ALTERAÇÕES' onPress={test} />
            </View>
        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    linearGradient: {
        flex: 1,
        padding: 8,
    },
    title: {
        backgroundColor: 'transparent' ,
        flex: 1,
        fontSize: 30,
    },
    index: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
    },
    description: {
        marginTop: 10,
        flex: 3,
        color: 'black',
    },
    date: {
        marginTop: 10,
        flex: 1,
        color: 'black',
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
});
