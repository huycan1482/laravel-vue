import { ref } from 'vue'
import commonFunc from "../../common/common"
import apiCaller from '../../plugins/axios';

export default function useUser () {
    const axiosInstance = apiCaller();

    const chats = ref([])
    const chat = ref([])
    const errors = ref([])
    const errorText = ref('')
    const currentPage = ref('')
    const lastPage = ref('')
    const conditions = {}

    const { sweetAlert, sweetAlertChangePage, setParamsUrl } = commonFunc()

    const getChats = async () => {
        let response = await axiosInstance.get('/api/chats/search', {params: conditions})
        setParamsUrl(conditions)
        chats.value = response.data.data.data
        currentPage.value = response.data.data.page
        lastPage.value = response.data.data.lastPage
    }

    const getChat = async (id) => {
        let response = await axiosInstance.get('/api/chats/show/'+id)
        chat.value = response.data.data
    }

    const storeChat = async (data) => {
        errorText.value = ''
        errors.value = ''
        try {
            const res = await axiosInstance.post('/api/chats', data)
            await addNewItem(res.data.data);
            sweetAlert('Store success', '', 'success')
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

    const updateChat = async (id) => {
        errorText.value = ''
        errors.value = ''
        try {
            await axiosInstance.put('/api/chats/' + id, user.value)

            const alert = {
                title : 'Update success',
                text : '',
                icon : 'success'
            }

            sweetAlertChangePage(alert, 'chat.index')
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

    const destroyChat = async (id) => {
        try {
            let response = await axiosInstance.delete('/api/chats/' + id)
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

    const addNewItem = (data) => {
        chats.value.push(data)
    }
    
    return {
        chats,
        chat,
        errors,
        errorText,
        getChats,
        getChat,
        storeChat,
        updateChat,
        destroyChat,
        currentPage,
        lastPage,
        conditions
    }
}