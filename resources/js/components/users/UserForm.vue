<template>
    <div class="content-header">
        
    </div>
    <div class="content-body">
        <div class="mt-2 mb-6 text-sm text-red-600" v-if="errorText !== ''">
            {{ errorText }}
        </div>
        <div class="">
            <form @submit.prevent="saveUser">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.name">
                    <!-- <div class="form-text">We'll never share your email with anyone else.</div> -->
                </div>
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="form.email">
                    <!-- <div class="form-text">We'll never share your email with anyone else.</div> -->
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
import { reactive, onMounted, ref } from "vue"
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

        if (errors) {
            console.log("DH", errors);
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

<style>

</style>