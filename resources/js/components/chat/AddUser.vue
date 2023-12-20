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
            <form @submit.prevent="addUserToChat" class="">
                <!-- <div class="mb-3">
                    <label for="inputName" class="form-label">Email</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.user_email">
                </div> -->
                <!-- <div class="mb-3">
                    <label for="inputName" class="form-label">Email</label>
                    <select class="form-control" name="" id="" v-model="form.user_email">
                      <option value="" selected disabled>-- Chọn --</option>
                      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
                    </select>
                </div> -->
                <div class="mb-3">
                  <label for="inputName" class="form-label">Email</label>
                  <Select2 id="tetsSelect" class="js-select2" :options="users" :settings="{ width: '100%', dropdownParent: '#addUserModal' }" v-model="form.user_id"/>
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
import {onMounted, ref} from "vue"
import alertCommon from "../../common/alert"
import Select2 from 'vue3-select2-component';
import useChat from "./../../composables/Model/chat"

export default {
    components: {
        Select2
    },
    props: ['addUser', 'chatId'],
    setup (props) {
      let form = ref({
        'chat_id': '',
        'user_id': '',
        // 'user_email': '',
      })

      const addUser = props.addUser
      // const users = props.users

      const { loadingModal } = alertCommon()
      const { users, getUsers } = useChat()

      const addUserToChat = () => {
        loadingModal()

        let data = {
            'chat_id': props.chatId,
            'user_id': form.value.user_id,
            // 'user_email': form.value.user_email,
        }        
        addUser(data)
      }

      const myChangeEvent = (val) => {
        console.log('myChangeEvent', val);
      }

      const mySelectEvent = ({id, text}) =>{
        console.log('mySelectEvent', {id, text})
      }

      onMounted(() => {
        getUsers()
      })

      return {
        form,
        addUserToChat,
        myChangeEvent,
        mySelectEvent,
        selectedVal: '',
        users,  
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
