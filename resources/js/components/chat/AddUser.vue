<template>
  <!-- Button trigger modal -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
  + 
  <i class="fa-solid fa-user"></i>
</button>

<!-- Modal -->
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <form @submit.prevent="addUserToChat" class="">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Email</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.user_email">
                    <!-- <span class="red-text" v-if="errors.name"></span> -->
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
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
import {ref} from "vue"
import alertCommon from "../../common/alert"

export default {
    props: ['addUser', 'chatId'],
    setup (props) {
      let form = ref({
        'chat_id': '',
        'user_id': '',
        'user_email': '',
      })

      const addUser = props.addUser
      const chatId = props.chatId

      const { loadingModal } = alertCommon()

      const addUserToChat = () => {
        loadingModal()
        let data = {
            'chat_id': chatId,
            'user_id': form.value.user_id,
            'user_email': form.value.user_email,
        }

        console.log("DH send data", data)
                    
        addUser(data)

        // loadingHide()
      }

      return {
        form,
        addUserToChat,
        // loadingOn,
        // loadingOff,
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
