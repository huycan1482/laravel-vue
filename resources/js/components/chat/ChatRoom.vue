<template>
    <div class="d-flex">
        <div class="chat-sidebar box">
            <div class="chat-header">
                <div class="chat-title">
                    <p>Online</p>
                </div>
                <form class="form-find-user">
                    <div class="search-input">
                        <input type="text" class="form-control" id="" placeholder="Search...">
                        <button type="button" class="btn">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div class="chat-list-user">
                <div class="users-list" v-for="user in usersOnline" :key="user.id" :class="user.id == authInfo.id ? 'active' : ''">
                    <div class="image-status me-2 ms-2">
                        <div class="wrap-img">
                            <img :src="(user.avatar) ? getImgURL(user.avatar) : getImgDefault()" alt="">
                        </div>
                        <span class="dot dot-green"></span>
                    </div>
                    <div class="">
                        <p>{{ user.name }} {{ user.id == authInfo.id ? ' (you)' : '' }}</p>
                    </div>
                </div>                
            </div>
        </div>
        <div class="chat-main box">
            <div class="chat-header">
                <div class="chat-info">
                    <div class="chat-img">
                        <img :src="(chat.image) ? getImgURL(chat.image) : getImgDefault()" alt="">
                    </div>
                    <div class="chat-title">
                        <span>{{ chat.name }}</span>
                        <span class="grey-text">Online</span>
                    </div>
                </div>
                <div class="chat-settings">
                    <div class="setting-item">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div class="setting-item">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
            <div class="chat-content" @scroll="scroll">
                <div class="chat-message" v-for="message in messages" :key="message.id" :class="(message.sender_id == authInfo.id) ? 'right' : 'left'">
                    <div class="sender-img">
                        <div class="avatar">
                            <img :src="(message.avatar) ? message.avatar : getImgDefault()" alt="">
                        </div>
                    </div>
                    <div class="content-detail">
                        <div class="content-message">
                            <p v-if="message.content">{{ message.content }}</p>
                        </div>
                        <div class="content-info grey-text">
                            <span>Đã gửi lúc </span>
                            <span>{{ `  ${formatDate(message.created_at).time} ${formatDate(message.created_at).date}` }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-footer">
                <form class="form-send-message" @submit.prevent="saveMessage">
                    <input type="text" class="form-control me-2" id="" placeholder="" v-model="form.content">
                    <button type="button" class="btn btn-primary" @click="saveMessage">
                        <i class="fa-solid fa-location-arrow"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import common from '../../common/common'
import useMessage from '../../composables/Model/message'
import useChat from '../../composables/Model/chat'

export default {
    props : {
        chatId: {
            required :true,
            type: String
        }
    },
    setup(props) {
        let form = ref({
            'chat_id': '',
            'content': '',
        })

        const usersOnline = ref([])

        const store = useStore()
        const authInfo = store.getters.authInfo
        const { formatDate, getImgURL } = common()
        const chatId = props.chatId

        const { sendMessage, getChatMessages, messages, conditions, totalMess, newMessage } = useMessage()
        const { chat, getChatRoom } = useChat()

        //functions
        const saveMessage = () => {
            let formData = new FormData();
            formData.append('content', form.value.content ? form.value.content : '');
            formData.append('sender_id', authInfo.id);
            formData.append('chat_id', chatId);

            sendMessage(formData)

            form.value.content = '';

            // scrollToBottom()
        }

        const getImgDefault = () => {
            return 'https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png'
        }

        const scrollToBottom = () => {
            var element = document.querySelector('.chat-content');
            element.scrollTop = element.scrollHeight;
        }

        const scroll = (e) => {
            const {target} = e;

            if (messages.value.length >= totalMess.value) {
                return 0
            }

            if (Math.ceil(target.scrollTop)*(-1) == (target.scrollHeight - target.offsetHeight)) {
                conditions.last_id = messages.value[messages.value.length - 1].id;
                conditions.chat_id = chatId
                getChatMessages()
            }
        }

        //watch
        let privateRoom = 'chat.' + chatId   
        let publicRoom = 'room.' + chatId   
        
        onMounted(() => {
            conditions.chat_id = chatId
            getChatRoom(chatId)
            getChatMessages()
            
            console.log("DH privateRoom ", privateRoom)
            
            Echo.private(privateRoom)
                .listen('SendPrivateMessage', (e) => {
                    console.log('New message received:', e.message);
                    const newMessage = e.message
                    if (newMessage.chat_id == chatId) {

                    }
                })

            Echo.join(publicRoom)
                .listen('MessagePosted', (e) => {
                    console.log("MessagePosted", e)
                })
                .joining((user) => { 
                    // gọi khi có user mới join vào phòng
                    usersOnline.value.push(user)
                    console.log("New user ",user)
                })
                .leaving((user) => { 
                    // gọi khi có user rời phòng
                    const index = usersOnline.value.findIndex(item => item.id === user.id)
                    if (index > -1) {
                        usersOnline.value.splice(index, 1)
                    }
                    console.log("User leaving ",user)
                })
                .here((users) => { 
                    // gọi ngay thời điểm ta join vào phòng, trả về tổng số user hiện tại có trong phòng (cả ta)
                    usersOnline.value = users
                    console.log("Total user ",users)
                })
        })

        onBeforeUnmount(() => {
            Echo.leave(privateRoom)
            Echo.leave(publicRoom)
        })

        watch(newMessage, (newVal, oldVal) => {
            scrollToBottom()
        }, { deep: true })

        
        return {
            form,
            authInfo,
            formatDate,
            saveMessage,
            messages,
            getImgDefault,
            scrollToBottom,
            scroll,
            usersOnline,
            chat,
            getImgURL,
        }
    }
} 
</script>

<style lang="scss" scoped>

    p {
        margin-bottom: 0;
    }

    .chat-sidebar {
        padding: 16px 0;
        width: 30%;
        margin-right: 8px;

        .chat-header {
            padding: 0px 16px 8px;

            .chat-title {
                font-size: 18px;
            }
            
            .form-find-user {
                .search-input {
                    position: relative;

                    button {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        box-shadow: none;
                        color: #5d596c;
                    }
                }
            }
        }

        .chat-list-user {
            margin: 0 16px;
            .users-list {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                border-left: 1px solid transparent;
                padding: 10px 0;

                &.active {
                    border-left-color: #2ecc71;
                }
            }

            .image-status {
                position: relative;
                height: 40px;
                width: 40px;

                .wrap-img {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid transparent;
                    border-radius: 100%;
                    overflow: hidden;
                   
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                
                .dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    height: 10px;
                    width: 10px;
                    border: 1px solid transparent;
                    border-radius: 100%;
                    overflow: hidden;

                    &-green {
                        background-color: #2ecc71;
                    }
                    // <span class="dot dot-green"></span>
                }
            }
        }
    }

    .chat-main {
        width: 70%;
        margin-left: 8px;
        padding: 16px 0;
        height: 550px;
        overflow: hidden;
        padding-bottom: 50px;
        color: rgb(93, 89, 108);

        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 16px 8px;
            border-bottom: 1px solid #ecf0f1;

            .chat-info {
                display: flex;
                align-items: center;

                .chat-img {
                    height: 40px;
                    width: 40px;
                    overflow: hidden;
                    border: 1px solid transparent;
                    border-radius: 100%;
                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
                }

                .chat-title {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    & > span:first-of-type {
                        font-size: 18px;
                    }
                }
            }

            .chat-settings {
                display: flex;
                justify-items: flex-end;
                align-items: center;

                .setting-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    border: 1px solid transparent;
                    border-radius: 100%;
                    transition: .5s all;
                    cursor: pointer;

                    &:hover {
                        background-color: #f8f8f8;
                        i {
                            color: #5d596c;
                        }
                    }

                    i {
                        font-size: 30px;
                    }
                }
            }
        }

        .chat-content {
            display: flex;
            flex-direction: column-reverse;
            padding: 0px 16px 8px;
            height: 80%;
            overflow-y: scroll;
            border-bottom: 1px solid #ecf0f1;

            .chat-message {
                display: flex;
                margin: 15px 0;

                &.right {
                    flex-direction: row-reverse;
                    .content-message {
                        background: #685dd8;
                        color: #ffff;
                        margin-left: 52px;
                    }

                    .content-info {
                        justify-content: flex-end;
                    }
                }

                &.left {
                    flex-direction: row;
                    .content-message {
                        background: #f8f8f8;
                        margin-right: 52px;
                    }

                    .content-info {
                        justify-content: flex-start;
                    }
                }

                .sender-img {
                    margin: 0 5px;
                    
                    img {
                        width: 40px;
                        height: 40px;
                        // width: 100%;
                        // height: 100%;
                    }
                }

                .content-message {
                    padding: 12px 16px;
                    border: 1px solid transparent;
                    border-radius: 5px;
                }

                .content-info {
                    margin: 5px 0 0 5px;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .chat-footer {
            .form-send-message {
                display: flex;
                align-items: center;
                padding: 20px 23px;
            }
        }
    }

    
</style>