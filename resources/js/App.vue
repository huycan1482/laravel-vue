<template>
    <router-view/>
</template>

<script>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useStore } from 'vuex'

export default {
    name: "App",
    setup() {
        
        const store = useStore()
        const accessToken = store.getters.authToken
        window.Pusher = Pusher;

        // socket.on('connect', () => {
        //     console.log('socket connected: ' + socket.id);
        //     socket.emit('join');
        // });
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            // host: `${window.location.protocol}//${window.location.hostname}:6001`,
            host: `${window.location.protocol}//${window.location.hostname}`,

            // broadcaster: 'pusher',
            // key: process.env.MIX_PUSHER_APP_KEY,
            // cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            // encrypted: true,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            },
        });
    }
}
</script>

<style lang="scss" scoped>
    
</style>