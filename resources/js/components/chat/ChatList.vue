<template>
    <div class="content-header d-flex align-items-center">
        <h5 class="mb-0">Chat List</h5>
        <div class="ms-2">
            <ChatCreate :storeChat="storeChat"/>
            <!-- <router-link :to="{ name: 'chat.create' }" type="button" class="badge bg-primary cursor">+ Add Category</router-link> -->
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
            <tbody>
                <tr v-for="(chat, key) in chats" :key="chat.id">
                    <th scope="row">{{ key + 1 }}</th>
                    <td class="">
                        <img class="item-image" :src="getImgURL(chat.image)" alt="" width="50" height="50">
                    </td>
                    <td>
                        {{ chat.name }}
                    </td>
                    <!-- <td>{{ `${formatDate(category.created_at).date} ${formatDate(category.created_at).time}` }}</td> -->
                    <td class="">
                        <router-link :to="{ name: 'chat.chat-room', params: { chatId: chat.id } }" type="button" class="btn btn-primary me-2">Join</router-link>
                        <!-- <router-link :to="{ name: 'chat.chat-room', params: { chatId: chat.id } }" type="button" class="btn btn-primary me-2">Join</router-link> -->
                        <!-- <div class="btn btn-primary">+ Add User</div> -->
                        <AddUser :addUser="addUser" :chatId="chat.id"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <NavigationBar @changePage="changePage" :currentPage="currentPage ? currentPage : 0" :lastPage="lastPage ? lastPage : 0" v-if="lastPage != 1"/>
</template>

<script>
import { onMounted, watch, watchEffect } from 'vue'
import commonFunc from "../../common/main"
import alertFunc from "../../common/alert"
import ChatCreate from "./ChatCreate.vue"
import useChat from "./../../composables/Model/chat"
import NavigationBar from "./../layouts/NavigationBar.vue"
import AddUser from "./AddUser.vue"

export default {
    components: {
        ChatCreate,
        NavigationBar,
        AddUser
    },
    setup() {
        const { getImgURL } = commonFunc()
        const { loadingModal } = alertFunc()

        const { chats, getChats, storeChat, currentPage, lastPage, conditions, addUser } = useChat()

        onMounted(() => {
            getChats()
        })

        const changePage = (page) => {
            conditions.page = page
            getChats()
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
</style>
