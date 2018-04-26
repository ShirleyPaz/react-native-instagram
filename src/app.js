
import {
    AsyncStorage
} from 'react-native';

import {Navigation} from 'react-native-navigation'

import Feed from './components/Feed'
import Login from './screens/Login'



export default () => {
    Navigation.registerComponent('TelaLogin', () => Login);
    Navigation.registerComponent('TelaFeed', () => Feed);

    AsyncStorage.getItem('usuario')
    .then(usuario => {
        if (usuario)
        return {
            screen: 'TelaFeed',
            title: 'Instalura'
        }

        return {
                screen: 'TelaLogin',
                title: 'Tela de Login',
                navigatorStyle: {
                    navBarHidden: true
                }
        }
    })

    Navigation.startSingleScreenApp({ screen })
}
