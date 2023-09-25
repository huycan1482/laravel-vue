import axios from 'axios'
import { ref } from 'vue'
import commonFunc from "../../composables/Common/common"

export default function useUser () {
    const users = ref([])
    const user = ref([])
    // const router = useRouter()
    const errors = ref([])
    const errorText = ref('')

    const { sweetAlert, sweetAlertChangePage } = commonFunc()

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
            sweetAlertChangePage('Store success', '', 'success')
            // await router.push({name: 'user.index'})

        } catch (e) {
            sweetAlert('Store fail', '', 'error')

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
            sweetAlertChangePage('Update success', '', 'success')
            // await router.push({name: 'user.index'})
            // router.push quay lại trang cũ
        } catch (e) {
            sweetAlert('Update fail', '', 'error')

            console.log(e)
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errorText.value += e.response.data.errors[key][0] + ' '
                }
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyUser = async (id) => {
        try {
            let response = await axios.delete('/api/users/' + id)
            if (response.data.success) {
                sweetAlert('Destroy success', '', 'success')
            } else {
                sweetAlert('Destroy fail', '', 'error')
            }
            
        } catch (e) {
            sweetAlert('Destroy fail', '', 'error')
            console.log(e)
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
        updateUser,
        destroyUser
    }
}