import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import api from '../services/api';
import MockedNavigator from '../__mocks__/MockedNavigator';
import Login from '../pages/Login';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    return {
        ...(jest.requireActual('@react-navigation/native')),
        useNavigation: () => ({
            navigate: mockedNavigate,
        })
    }
});

describe('rendering: ', () => {
    test('renders the whole screen', async ()=> {
        const { getByText, getByLabelText } = render(<MockedNavigator component={Login} />);
        await act(async () => {});
        getByText('E-mail:');
        getByText('Senha:');
        getByLabelText('email input');
        getByLabelText('password input');
        getByText('LOGIN');
        getByText('CADASTRAR-SE');
    });
});

describe('validation: ', () => {
    test('catches only malformed input', async () => {
        const { getByText, getByLabelText, queryByText } = render(<MockedNavigator component={Login} />);
        await act(async () => {});
        const stringInvalidEmail = 'Formato de e-mail inválido.';

        const emailInput = getByLabelText('email input');
        const passwordInput = getByLabelText('password input');
        const enterButton = getByText('LOGIN');

        await act(async () => {
            fireEvent(emailInput, 'onBlur');
        });
        getByText('O e-mail é obrigatório.');

        await act(async () => {
            fireEvent.changeText(emailInput, 'abcd');
            fireEvent(emailInput, 'onBlur');
        });
        getByText(stringInvalidEmail);

        await act(async () => {
           fireEvent.changeText(emailInput, 'abcd@abcd');
        });
        expect(queryByText(stringInvalidEmail)).toBeNull();
        expect(queryByText('O e-mail é obrigatório.')).toBeNull();

        jest.spyOn(api, 'post').mockImplementation((url: string, data: any ) => {
            return Promise.resolve({
                data: {
                    token: 'all okf'
                }
            });
        });

        await act(async () => {
            fireEvent.press(enterButton);
        })
        expect(api.post).not.toBeCalled();
        expect(mockedNavigate).not.toBeCalled();

        await act(async () => {
            fireEvent.changeText(passwordInput, '12345678');
            fireEvent.press(enterButton);
        })
        expect(api.post).toBeCalled();
        expect(mockedNavigate).toBeCalled();
        jest.clearAllMocks();
    });

});
