<template>
    <div class="content-header d-flex">
        <h5>User List</h5>
        <div class="ms-2">
            <!-- <span class="badge bg-primary cursor">+ Add User</span> -->
            <router-link :to="{ name: 'user.create' }" type="button" class="badge bg-primary cursor">+ Add User</router-link>
        </div>
    </div>
    <div class="content-body">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, key) in users" :key="user.id">
                    <th scope="row">{{ key + 1 }}</th>
                    <td>{{ user.email }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ `${formatDate(user.created_at).date} ${formatDate(user.created_at).time}` }}</td>
                    <td>
                        <router-link :to="{ name: 'user.edit', params: { id: user.id } }" type="button" class="btn btn-primary me-2">Edit</router-link>
                        <div @click="confirmDeleteUser(user.id)" class="btn btn-danger">Delete</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <NavigationBar/>
</template>

<script>
import NavigationBar from "./../layouts/NavigationBar.vue"

import useUser from "../../composables/Model/user"
import { onMounted, inject, computed } from "vue"
import commonFunc from "../../Common/common"
import { useStore } from 'vuex'

export default {
    components: {
        NavigationBar,
    },
    setup () {
        const swal = inject('$swal')
        const { users, getUsers, destroyUser } = useUser()
        const { formatDate } = commonFunc()
        const store = useStore()

        onMounted(getUsers)

        const deleteUser = async (id) => {
            await destroyUser(id);
            await getUsers();
        }

        const confirmDeleteUser = (id) => {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser(id);
                }
            })
        }
        return {
            users,
            formatDate,
            confirmDeleteUser,
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-body .table > :not(caption) > * > * {
        color: #5d596c;
    }
</style>>
