import { ref } from 'vue'
import commonFunc from "../../Common/common"
import apiCaller from '../../plugins/axios';

export default function useUser () {
    const axiosInstance = apiCaller();

    const users = ref([])
    const user = ref([])
    const errors = ref([])
    const errorText = ref('')
    const currentPage = ref('')
    const lastPage = ref('')

    const { sweetAlert, sweetAlertChangePage } = commonFunc()

    const getUsers = async () => {
        let response = await axiosInstance.get('/api/users/search')
        users.value = response.data.data.data
        currentPage.value = response.data.data.page
        lastPage.value = response.data.data.lastPage
    }

    const getUser = async (id) => {
        let response = await axiosInstance.get('/api/users/show/'+id)
        user.value = response.data.data
    }

    const storeUser = async (data) => {
        errorText.value = ''
        errors.value = ''
        try {
            await axiosInstance.post('/api/users', data)

            const alert = {
                title : 'Store success',
                text : '',
                icon : 'success'
            }
            
            sweetAlertChangePage(alert, 'user.index')
            // await router.push({name: 'user.index'})

        } catch (e) {
            sweetAlert('Store fail', e.response.data.message ? e.response.data.message :  '', 'error')

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
            await axiosInstance.put('/api/users/' + id, user.value)

            const alert = {
                title : 'Update success',
                text : '',
                icon : 'success'
            }

            sweetAlertChangePage(alert, 'user.index')
            // await router.push({name: 'user.index'})
        } catch (e) {
            sweetAlert('Update fail', e.response.data.message ? e.response.data.message :  '', 'error')

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
            let response = await axiosInstance.delete('/api/users/' + id)
            if (response.data.success) {
                sweetAlert('Destroy success', '', 'success')
            } else {
                sweetAlert('Destroy fail', '', 'error')
            }
            
        } catch (e) {
            sweetAlert('Destroy fail', e.response.data.message ? e.response.data.message :  '', 'error')
            console.log(e)
        }
    }

    const updateSettingUser = async (id) => {
        try {
            let response = await axiosInstance.delete('/api/users/' + id)
            if (response.data.success) {
                sweetAlert('Destroy success', '', 'success')
            } else {
                sweetAlert('Destroy fail', '', 'error')
            }
            
        } catch (e) {
            sweetAlert('Destroy fail', e.response.data.message ? e.response.data.message :  '', 'error')
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
        destroyUser,
        currentPage,
        lastPage,
    }
}