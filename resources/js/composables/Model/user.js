import {reactive, ref} from 'vue'
import axios from 'axios'

export default function useUser () {
    const users = ref([])
    const user = ref([])
    // const router = useRouter()
    const errors = ref([])
    const errorText = ref('')

    const getUsers = async () => {
        let response = await axios.get('/api/users/getAll')
        users.value = response.data.data
    }

    const getUser = async (id) => {
        let response = await axios.get('/api/users/'+id)
        user.value = response.data.data
    }

    const storeUser = async (data) => {
        errorText.value = ''
        errors.value = ''
        try {
            await axios.post('/api/users', data)
            // await router.push({name: 'user.index'})
        } catch (e) {
            console.log(e)
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errorText.value += e.response.data.errors[key][0] + ' '
                }
                errors.value = e.response.data.errors
            }

        }
    } 

    const updateUser = async (id) => {
        errorText.value = ''
        errors.value = ''
        try {
            await axios.put('/api/users/' + id, user.value)
            // await router.push({name: 'user.index'})
            // router.push quay lại trang cũ
        } catch (e) {
            console.log(e)
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errorText.value += e.response.data.errors[key][0] + ' '
                }
                errors.value = e.response.data.errors
            }
        }
    }

    return {
        users,
        user,
        errors,
        errorText,
        getUsers,
        getUser,
        storeUser,
        updateUser
    }
}