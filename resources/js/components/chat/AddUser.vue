<template>
  <!-- Button trigger modal -->
<!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
  + Add User
</button> -->

<!-- Modal -->
  <div class="modal fade" id="addUserModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <!-- <form @submit.prevent="addUserToChat" class="">
                <div class="mb-3">
                  <label for="inputName" class="form-label">Email</label>
                  <Select2 id="tetsSelect" class="js-select2" :options="users" :settings="{ width: '100%', dropdownParent: '#addUserModal' }" v-model="form.user_id"/>
                </div>
            </form> -->

            <form @submit.prevent="addUserToChat" class="">
                <div class="mb-3">
                  <label for="inputName" class="form-label">Email</label>
                  <el-select v-model="form.user_id" filterable placeholder="Select" class="w-100">
                    <el-option class=""
                        v-for="item in props.users"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addUserToChat">Save</button>
          <!-- <button type="button" class="btn btn-primary" @click="loadingOn">On</button>
          <button type="button" class="btn btn-primary" @click="loadingOff">Off</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref, watch} from "vue"
import alertCommon from "../../common/alert"
// import Select2 from 'vue3-select2-component';
import useChat from "./../../composables/Model/chat"

export default {
    props: ['addUser', 'chatId', 'users'],
    setup (props) {
      let form = reactive({
        'chat_id': '',
        'user_id': '',
      })

      const addUser = props.addUser
      const chatId = props.chatId
      let users = props.users

      const { loadingModal } = alertCommon()
    //   const { users, getUsers } = useChat()

      const addUserToChat = () => {
        loadingModal()

        let data = {
          'chat_id': props.chatId,
          'user_id': form.user_id,
        }        
        addUser(data)
      }

      const myChangeEvent = (val) => {
        console.log('myChangeEvent', val);
      }

      const mySelectEvent = ({id, text}) =>{
        console.log('mySelectEvent', {id, text})
      }

    //   watch(props.chatId, (newVal, oldVal) => {
    //     // scrollToBottom()
    //     console.log("DH newVal", newVal)
    //     getUsers(chatId)
    //   }, { deep: true })

    //   onMounted(() => {
    //     getUsers(chatId)
    //   })

      return {
        form,
        addUserToChat,
        myChangeEvent,
        mySelectEvent,
        selectedVal: '',
        users,  
        props,
      }
    }
}
</script>

<style lang="scss" scoped>
  .select2-close-mask{
      z-index: 2099;
  }
  .select2-dropdown{
      z-index: 3051;
  }

</style>
