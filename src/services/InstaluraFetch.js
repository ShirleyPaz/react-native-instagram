
import {
    AsyncStorage
} from 'react-native'

// const uri = `http://instalura-api.herokuapp.com/api${recurso}`

export default class InstaluraFetch {

    static get(recurso) {

        const uri = `http://instalura-api.herokuapp.com/api${recurso}`

        return AsyncStorage.getItem('usuario')
            .then(usuarioString => JSON.parse(usuarioString))
            .then(usuario => {
                // .then(token => {

                const request = {
                    headers: new Headers({
                        "X-AUTH-TOKEN": usuario.token
                        // "X-AUTH-TOKEN": token
                    })
                }
                return request
            })

            //.then(request => fetch('http://192.168.0.137:8080/api/fotos', request)
            .then(request => fetch(uri, request))
            .then(response => {
                if (!response.ok)
                throw new Error('Não foi possível carregar')
                
                return response.json()
            })
    }

    static post(recurso, dados) {

        const uri = `http://instalura-api.herokuapp.com/api${recurso}`

        return AsyncStorage.getItem('usuario')
            // AsyncStorage.getItem('token')
            .then(usuarioString => JSON.parse(usuarioString))
            .then(usuario => {
                // .then(token => {

                const request = {
                    method: 'POST',
                    body: JSON.stringify({
                        dados
                    }),
                    headers: new Headers({
                        "X-AUTH-TOKEN": usuario.token,
                        // "X-AUTH-TOKEN": token
                        "Content-type": "application/json"
                    })
                }
                return request
            })
            .then(request => fetch(uri, request))
            .then(response => response.json())
            .then(response => {
                if (!response.ok)
                throw new Error('Não foi possível carregar')
                
                return response.json()
            })
    }
}



/* AsyncStorage.getItem('usuario')
// AsyncStorage.getItem('token')
.then(usuario => JSON.parse(usuario))
.then(usuario => {
    // .then(token => {

    const request = {
        method: 'POST',
        body: JSON.stringify({
            dados
        }),
        headers: new Headers({
            "X-AUTH-TOKEN": usuario.token,
            // "X-AUTH-TOKEN": token,
            "Content-type": "application/json"
        })
    }
    return request
})
.then(request => fetch(uri, request)) */