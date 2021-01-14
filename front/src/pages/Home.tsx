import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FAB, Card, Caption, Paragraph, Button } from 'react-native-paper';
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
    Home: { event: EventData } | undefined,
    EditEvent: { eventId: number },
}


type HomeScreenProp = RouteProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute<HomeScreenProp>();
    const [events, setEvents] = useState<Array<EventData>>([]);
    const event = {
        name: "Wacken OA - Edição 2021",
        description: "Descrição do Evento. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        date: "66/66/6666 - 66h-66h",
        address: "Endereço do Evento, Rua dos Bobos, 0 - São Paulo - SP",
        images: {
            img1: "https://www.giromarilia.com.br/img/news/party_1502548839.jpg"
        },
    }

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            api.get('promoterEvents', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).then((res) => {
                setEvents(res.data);
                /* console.log('eventos carregados com sucesso\n', res.data) */
            }).catch((err) => {
                console.log('falha no carregamento dos eventos\n', err);
            });
        }).catch((err) => {
            console.log('falha na recuperação do token\n', err);
        });
    }, [route.params?.event]);

    if (!(events.length > 0)) return <Text>Loading</Text>;
    return (
        <View style={styles.container}>
            <LinearGradient 
                colors = {['#FF4D00', '#FF9345']}
                style={styles.linearGradient}
                >
                <Text style={styles.title}>MEUS EVENTOS</Text>
            </LinearGradient>
            {/* <View style={styles.eventBox}>
                <Text style={styles.index}>{event.name}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.index}>{event.date}</Text>
                <Button title='Ver participantes e Editar Evento' onPress={() => navigation.navigate('EditEvent')} />
                </View> */}
            { events.map(event => {
                  return (
                      <Card key={event.id}>
                          <Card.Title title={event.name} subtitle={event.date}/>
                          <Card.Content>
                              <Paragraph>{event.description}</Paragraph>
                              <Caption>{event.price}</Caption>
                          </Card.Content>
                          <Card.Actions>
                              <Button onPress={() => navigation.navigate('EditEvent', { event: event })}>Editar Evento</Button>
                          </Card.Actions>
                      </Card>
                  )
            }) }
            <FAB
                style={styles.fab}
                small
                icon='plus'
                onPress={() => {navigation.navigate('CreateEvent')}}
            />
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
    description: {
        marginTop: 10,
        flex: 1,
        color: 'black',
    },
    date: {
        marginTop: 10,
        flex: 1,
        color: 'black',
    },
    eventBox: {
        flex: 10,
        padding: 8,
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
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
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
