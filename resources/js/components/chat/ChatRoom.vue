<template>
    <div class="d-flex">
        <div class="chat-sidebar box">

        </div>
        <div class="chat-main box">
            <div class="chat-header">
                <div class="chat-info">
                    <div class="chat-img">
                        <img src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" alt="">
                    </div>
                    <div class="chat-title">
                        <span>Room Chat 1</span>
                        <span class="grey-text">Room 1</span>
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
            <div class="chat-content">
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
                        <!-- <p v-if="message.image">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
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
import { ref, reactive, onMounted, watch } from 'vue'
import { mapGetters, useStore } from 'vuex'
import common from '../../common/common'
import useMessage from '../../composables/Model/message'
export default {
    props : {
        chatId: {
            required :true,
            type: String
        }
    },
    // mounted() {
    //     // window.Echo.private('')
    //     //     .listen('MessageEvent', (e) => {
    //     //         console.log('New message received:', e.message);
    //     // });
    // },
    // created() {
    //     window.Echo.private('room.2')
    //         .listen('Test', (e) => {
    //             console.log('test successful ' + e)
    //     })
    // },
    setup(props) {
        let form = ref({
            'chat_id': '',
            'content': '',
        })

        const store = useStore()
        const authInfo = store.getters.authInfo
        const { formatDate } = common()
        const chatId = props.chatId

        const { sendMessage, getChatMessages, messages } = useMessage()

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

        onMounted(() => {
            getChatMessages({ chat_id: chatId })

            let roomName = 'chat.' + chatId   
            console.log("DH room name ", roomName)
            
            Echo.private(roomName)
                .listen('SendPrivateMessage', (e) => {
                    console.log('New message received:', e.message);
                })

            Echo.join(roomName)
                .joining((user) => { // gọi khi có user mới join vào phòng
                    // this.usersOnline.push(user)
                    console.log("New user ",user)
                })
                .leaving((user) => { // gọi khi có user rời phòng
                    // const index = this.usersOnline.findIndex(item => item.id === user.id)
                    // if (index > -1) {
                    //     this.usersOnline.splice(index, 1)
                    // }
                    console.log("User leaving ",user)
                })
                .here((users) => { // gọi ngay thời điểm ta join vào phòng, trả về tổng số user hiện tại có trong phòng (cả ta)
                    // this.usersOnline = users
                    console.log("Total user ",users)
                })
        })


        watch(messages, (newVal, oldVal) => {
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
        }
    }
} 
</script>

<style lang="scss" scoped>

    p {
        margin-bottom: 0;
    }

    .chat-sidebar {
        width: 30%;
        margin-right: 8px;
    }

    .chat-main {
        width: 70%;
        margin-left: 8px;
        padding: 16px 0;
        height: 550px;
        overflow: hidden;
        padding-bottom: 50px;
        color: rgb(93, 89, 108);
    }

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
                    width: 100%;
                    height: 100%;
                }
            }

            .chat-title {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
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
</style>