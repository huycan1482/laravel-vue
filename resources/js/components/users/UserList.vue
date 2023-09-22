<template>
    <div class="content-header">
        <h5>User List</h5>
        <div class="">

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
                        <router-link :to="{}" type="button" class="btn btn-primary">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import useUser from "../../composables/Model/user"
import { onMounted } from "vue"
import commonFunc from "../../composables/Common/common-functions"

export default {
    setup () {
        const {users, getUsers} = useUser()
        const {formatDate} = commonFunc()

        onMounted(getUsers)

        return {
            users,
            formatDate,
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-header {
        
    }
</style>>
