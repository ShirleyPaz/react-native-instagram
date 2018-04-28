
import {
    AlertIOS,
    ToastAndroid,
    Platform
} from 'react-native'

export default class Notificacao {
    static exibe(mensagem) {

        ToastAndroid.alert(mensagem, ToastAndroid.SHORT)

    }
}


/* import {
    AlertIOS,
    ToastAndroid,
    Platform
} from 'react-native'

export default class Notificacao {
    static exibe(titulo, mensagem) {

        if (Platform.OS === 'ios') {
            AlertIOS.alert(titulo, mensagem)
        } else {
            ToastAndroid.alert(mensagem, ToastAndroid.SHORT)
        }
    }
} */