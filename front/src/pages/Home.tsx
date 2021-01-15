import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FAB, Card, Caption, Paragraph, Button } from 'react-native-paper';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../constants'

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


type HomeScreenProp = RouteProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute<HomeScreenProp>();
    const [events, setEvents] = useState<Array<EventData>>([]);

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
    }, [route.params?.event, route.params?.eventDeleted]);

    //if (!(events.length > 0)) return <Text>Loading</Text>;
    return (
        <LinearGradient 
                colors = {['#EEF2F2', '#8E9EAB']} style={styles.title}>
        <View style={styles.container}>
            <LinearGradient 
                colors = {['#FF4D00', '#FF9345']}
                style={styles.linearGradient}
                >
                <Text style={styles.title}>Meus Eventos</Text>
                
            </LinearGradient>
            {/* <View style={styles.eventBox}>
                <Text style={styles.index}>{event.name}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.index}>{event.date}</Text>
                <Button title='Ver participantes e Editar Evento' onPress={() => navigation.navigate('EditEvent')} />
                </View> */}
                
            { events.map(event => {
                  return (
                      <Card style={styles.eventBox} key={event.id}>
                          <Card.Title title={event.name} style={styles.title} subtitle={event.date}/>
                          <Image style = {styles.image}
                            source={{
                                uri: 'http://www.folhadonordeste.com.br/arquivos/imgnot/b836e78340dce3e20911f9d27840c7e6.jpg',}}/>
                          <Card.Content>
                              <Paragraph style={styles.description}>{event.description}</Paragraph>
                              <Caption>R${event.price}</Caption>
                          </Card.Content>
                          <Card.Actions>
                              <Button style= {styles.button} onPress={() => navigation.navigate('EditEvent', { event: event })}><Text style={{color: '#000'}}>Editar Evento</Text></Button>
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
        </LinearGradient>
        
    );
}

const styles = StyleSheet.create({
    eventBox: {
        flex: 10,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    },
    description: {
        marginTop: 10,
        flex: 1,
        color: 'black',
        textAlign: 'justify',
    },
    date: {
        marginTop: 10,
        flex: 1,
        color: 'black',
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
        backgroundColor: '#FF9345',
        fontColor: '#000000'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 20,
    },
    linearGradient: {
        padding: 8,
        borderRadius: 10,
        flex: 1,
        marginBottom: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        textAlign: 'center',
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
    image: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 300,
        height: 200,
        resizeMode: "contain",
    },
});
