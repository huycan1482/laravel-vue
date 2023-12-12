import { ref } from 'vue'
import apiCaller from '../../plugins/axios';

export default function useUser () {
    const axiosInstance = apiCaller();

    const messages = ref([])
    const message = ref([])
    const errors = ref([])
    const errorText = ref('')
    const currentPage = ref('')
    const lastPage = ref('')
    const conditions = {}

    const sendMessage = async (data) => {
        errorText.value = ''
        errors.value = ''
        try {
            const res = await axiosInstance.post('/api/messages/send-message', data)
            await addNewItem(res.data.data);

        } catch (e) {
            console.log("Send mess error", e)
        }
    } 

    const getChatMessages = async (data) => {
        try {
            let response = await axiosInstance.get('/api/messages/get-chat-messages', {params : data})
            messages.value = response.data.data.data
            currentPage.value = response.data.data.page
            lastPage.value = response.data.data.lastPage
        } catch (e) {
            console.log("GetChatMessages error", e)
        }
    }

    const addNewItem = (data) => {
        messages.value.push(data)
    }
    
    return {
        messages,
        sendMessage,
        getChatMessages
    }
}