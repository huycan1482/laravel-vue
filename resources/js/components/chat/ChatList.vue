<template>
    <div class="content-header d-flex align-items-center">
        <h5 class="mb-0">Chat List</h5>
        <div class="ms-2">
            <ChatCreate :storeChat="storeChat"/>
        </div>
    </div>

    <div class="content-body">
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody v-if="(chats.length < 1)">
                <tr v-for="item in 5" :key="item">
                    <td v-for="item2 in 4" :key="item2">
                        <el-skeleton class="w-100" style="height: 100%" :rows="1" animated/>
                    </td>
                </tr>
            </tbody>

            <tbody>
                <tr v-for="(chat, key) in chats" :key="chat.id">
                    <th scope="row">{{ key + 1 }}</th>
                    <td class="">
                        <img class="item-image" :src="getImgURL(chat.image)" alt="" width="50" height="50">
                    </td>
                    <td>
                        {{ chat.name }}
                    </td>
                    <td class="">
                        <router-link :to="{ name: 'chat.chat-room', params: { chatId: chat.id } }" type="button" class="btn btn-primary me-2">Join</router-link>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal" @click="getUserChatRoom(chat.id)">
                            + <i class="fa-solid fa-user"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
            
        </table>
    </div>
    <NavigationBar @changePage="changePage" :currentPage="currentPage ? currentPage : 0" :lastPage="lastPage ? lastPage : 0" v-if="lastPage != 1"/>

    <AddUser :addUser="addUser" :chatId="chatIdSelected" :users="users"/>

    <!-- <ChatFormUI/> -->
</template>

<script>
import { ref, onMounted, watch, watchEffect } from 'vue'
import commonFunc from "../../common/main"
import alertFunc from "../../common/alert"
import ChatCreate from "./ChatCreate.vue"
import useChat from "./../../composables/Model/chat"
import NavigationBar from "./../layouts/NavigationBar.vue"
import AddUser from "./AddUser.vue"
import ChatFormUI from "./ChatFormUI.vue"

export default {
    components: {
        ChatCreate,
        NavigationBar,
        AddUser,
        ChatFormUI,
    },
    setup() {
        const { getImgURL } = commonFunc()
        const { loadingModal } = alertFunc()

        const { chats, getChats, storeChat, currentPage, lastPage, conditions, addUser, users, getUsers } = useChat()

        const chatIdSelected = ref('0')

        onMounted(() => {
            getChats()
        })

        const changePage = (page) => {
            conditions.page = page
            getChats()
        }

        const getUserChatRoom = (chatId) => {
            getUsers(chatId)
        }

        return {
            chats,
            getImgURL,
            currentPage,
            lastPage,
            conditions,
            changePage,
            storeChat,
            addUser,
            chatIdSelected,
            getUserChatRoom,
            users
        }
    }
}
</script>

<style lang="scss" scoped>
    table td {
        height: 60px;
        vertical-align: middle;
    }

    table td:first-child, table td:last-child {
        width: 20%;
    }

    .content-body .table {
        color: #5d596c;
    }

    .table > :not(caption) > * > * {
        color: #5d596c;
    }
</style>
