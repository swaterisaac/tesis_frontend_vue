<template>
    <div>
        <h1>Random User</h1>
        <div
            class="user"
            v-for="user in users"
            :key="user.first">
            <div class="user-avatar">
                <img :src="user.picture.large" />
            </div>
            <div class="user-details">
                <h2 class="user-name">
                    {{ user.name.first }}
                    {{ user.name.last }}
                </h2>
                <ul>
                    <li><strong>Birthday:</strong> {{ formatDate(user.dob.date) }}</li>
                    <li><strong>Location:</strong> {{ user.location.city }}, {{ user.location.state }}</li>
                </ul>
            </div>

        </div>
        <div class="d-flex justify-center">
            <v-progress-circular
                v-show="cargarDatos"
                indeterminate
                color="black"
                size="100"></v-progress-circular>
        </div>
    </div>
</template>

<style>
.user {
    display: flex;
    background: #ccc;
    border-radius: 1em;
    margin: 1em auto;
}

.user-avatar {
    padding: 1em;
}

.user-avatar img {
    display: block;
    width: 100%;
    min-width: 64px;
    height: auto;
    border-radius: 50%;
}

.user-details {
    padding: 1em;
}

.user-name {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 900;
}
</style>

<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [],
            cargarDatos: false,
        };
    },
    methods: {
        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toDateString();
        },
        async obtenerOfertas() {
            let r = await axios.get('http://localhost:3632/ofertas');
            console.log("DATA: ", r.data);
        },
        getInitialUsers() {

            
            axios.get(`https://randomuser.me/api/?results=5`).then((response) => {
                this.users = response.data.results;
            });
        },
        getNextUser() {
            window.addEventListener('scroll', () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.cargarDatos = true;
                    axios.get(`https://randomuser.me/api/?results=5`).then(response => {
                        this.users.push(...response.data.results);
                        this.cargarDatos = false;
                    });
                }
            });
        }
    },
    beforeMount() {
        this.getInitialUsers();
    },
    mounted() {
        this.getNextUser();
        this.obtenerOfertas();
    }
}
</script>
