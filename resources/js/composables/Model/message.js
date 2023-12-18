import { ref } from 'vue'
import apiCaller from '../../plugins/axios';

export default function useMessage () {
    const axiosInstance = apiCaller();

    const messages = ref([])
    const message = ref([])
    const errors = ref([])
    const errorText = ref('')
    const totalMess = ref('')
    const conditions = {}
    const newMessage = ref(false)

    const sendMessage = async (data) => {
        
        try {
            const res = await axiosInstance.post('/api/messages/send-message', data)
            await addNewItem(res.data.data);

        } catch (e) {
            console.log("Send mess error", e)
        }
    } 

    const getChatMessages = async () => {
        try {
            let response = await axiosInstance.get('/api/messages/get-chat-messages', {params : conditions})
            await addItems(response.data.data);

        } catch (e) {
            console.log("GetChatMessages error", e)
        }
    }

    const addNewItem = (data) => {
        messages.value.unshift(data)
        newMessage.value = true
    }

    const addItems = (data) => {
        if (messages.value.length > 0) {
            messages.value.push(...data.data)
        } else {
            messages.value = data.data
        }
        totalMess.value = data.total
    }
    
    return {
        messages,
        sendMessage,
        getChatMessages,
        conditions,
        totalMess,
        newMessage
    }
}