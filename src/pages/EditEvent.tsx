import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditEvent() {
    const event = {
        name: "Wacken OA - Edição 2021",
        description: "Descrição do Evento. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        date: "66/66/6666 - 66h-66h",
        address: "Endereço do Evento, Rua dos Bobos, 0 - São Paulo - SP",
        images: {
            img1: "https://www.giromarilia.com.br/img/news/party_1502548839.jpg"
        },
    }
    const cu = () => {return 'cu'}

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
                     <TextInput 
                    style={styles.address} 
                    defaultValue={event.address}
                    />
                </LinearGradient>
            </View>

            <Image 
            style={styles.image} 
            source={{uri: event.images.img1,}}
            />
            <View style={styles.deleteButton}>
                <Button color="transparent" title='DELETAR EVENTO' onPress={cu} />
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


            <View style={styles.submitButton}>
                <Button title='SALVAR ALTERAÇÕES' onPress={cu} />
            </View>
        </View>


)

}
