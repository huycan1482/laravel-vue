<template>
    <div class="content-header d-flex">
        <h5>User Form</h5>
        <div class="ms-2">
            <router-link :to="{ name: 'user.index' }" type="button" class="badge bg-primary cursor">User List</router-link>
        </div>
    </div>
    <div class="content-body">
        <!-- <div class="mt-2 mb-6 text-sm text-red-600" v-if="errorText !== ''">
            {{ errorText }}
        </div> -->
        <div class="">
            <form @submit.prevent="saveUser" class="">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.name" >
                    <span class="red-text" v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="form.email">
                    <span class="red-text" v-if="errors.email">{{ errors.email[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword" v-model="form.password">
                    <span class="red-text" v-if="errors.password">{{ errors.password[0] }}</span>
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <button type="submit" class="btn btn-primary">{{ userId ? "Update" : "Submit" }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from "vue"
import useUser from "../../composables/Model/user";

export default {
    name: 'UserForm',
    props: {
        userId : {
            require: false,
            type: String,
        }
    },
    setup(props) {
        let form = reactive({
            'id': null,
            'name': '',
            'email': '',
            'password': '',
        })

        const { user, errorText, errors, getUser, storeUser, updateUser } = useUser()

        if (props.userId) {
            onMounted(() => {
                getUser(props.userId)
            })
            form = user;
        }

        const saveUser = async () => {
            props.userId
                ? await updateUser(props.userId)
                : await storeUser({ ...form })
        }

        return {
            errors,
            errorText,
            form,
            saveUser,
        }
    },
}
</script>

<style lang="scss" scoped>
    .content-body {
        color: #5d596c;
    }
</style>