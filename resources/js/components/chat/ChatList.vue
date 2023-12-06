<template>
    <div class="content-header d-flex">
        <h5>Chat List</h5>
        <div class="ms-2">
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
                        <!-- <router-link :to="{ name: 'category.edit', params: { id: category.id } }" type="button" class="btn btn-primary me-2">Edit</router-link> -->
                        <div class="btn btn-primary">Join</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <ChatCreate />
</template>

<script>
import { ref, reactive, methods } from 'vue'
import commonFunc from "../../Common/common"
import ChatCreate from "./ChatCreate.vue"


export default {
    components: {
        ChatCreate,
    },
    data () {
        return {
            
        }
    },
    setup() {
        const { getImgURL } = commonFunc()

        return {
            chats: [
                {
                    id: 1,
                    name: "Chat 1",
                    images: "image",
                },
                {
                    id: 2,
                    name: "Chat 2",
                    images: "image",
                },
                {
                    id: 3,
                    name: "Chat 3",
                    images: "image",
                }
            ],

            getImgURL
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
