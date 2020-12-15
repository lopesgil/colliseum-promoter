import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
/* import { useNavigation } from '@react-navigation/native'; */
import { useForm, Controller } from 'react-hook-form';

interface EventData {
    name: string,
    /* date: string,
     * time: string, */
    address: string,
    district: string,
    complement: string,
    state: string,
    price: string,
    description: string,
}

export default function CreateEvent() {
    const { control, handleSubmit, errors } = useForm({ mode: 'onTouched' });
    const onSubmit = (data: EventData) => { console.log(data) };
    const onError = (errors: Object) => { console.log(errors) };

    return (
        <View style={styles.container}>
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
                {/* <View>
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
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                    </View> */}
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
                <View>
                    <Text style={styles.label}>Endereço:</Text>
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
                        name='address'
                        defaultValue=''
                    />
                    {errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
                </View>
                <View>
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
                </View>
                <View>
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
                    {/* {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>} */}
                </View>
                <View>
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
                </View>
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
                        name='price'
                        defaultValue=''
                    />
                    {errors.price && <Text style={{ color: 'red' }}>{errors.price.message}</Text>}
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
                    <Button title='CRIAR EVENTO' onPress={handleSubmit(onSubmit, onError)} />
                </View>
            </View>
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
