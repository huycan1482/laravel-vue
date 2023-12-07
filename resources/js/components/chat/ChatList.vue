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
            <tbody>
                <tr v-for="chat in chats" :key="chat.id">
                    <td class="text-start">
                        <img class="item-image" :src="getImgURL(chat.image)" alt="" width="50" height="50">
                    </td>
                    <td>
                        {{ chat.name }}
                    </td>
                    <!-- <td>{{ `${formatDate(category.created_at).date} ${formatDate(category.created_at).time}` }}</td> -->
                    <td class="text-end">
                        <router-link :to="{ name: 'chat.chat-room', params: { id: chat.id } }" type="button" class="btn btn-primary me-2">Join</router-link>
                        <!-- <div class="btn btn-primary">Join</div> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <NavigationBar @changePage="changePage" :currentPage="currentPage ? currentPage : 0" :lastPage="lastPage ? lastPage : 0" v-if="lastPage != 1"/>
</template>

<script>
import { onMounted, watch, watchEffect } from 'vue'
import commonFunc from "../../common/common"
import ChatCreate from "./ChatCreate.vue"
import useChat from "./../../composables/Model/chat"
import NavigationBar from "./../layouts/NavigationBar.vue"

export default {
    components: {
        ChatCreate,
        NavigationBar
    },
    setup() {
        const { getImgURL } = commonFunc()

        const { chats, getChats, storeChat, currentPage, lastPage, conditions } = useChat()

        onMounted(getChats)

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
        width: 10%;
    }
</style>
