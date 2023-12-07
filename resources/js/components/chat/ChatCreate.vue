<template>
  <!-- Button trigger modal -->
<span class="badge bg-primary cursor" data-bs-toggle="modal" data-bs-target="#chatCreateModal">
  Add
</span>

<!-- Modal -->
  <div class="modal fade" id="chatCreateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Chat</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <form @submit.prevent="saveChat" class="">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.name">
                    <!-- <span class="red-text" v-if="errors.name"></span> -->
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Image</label>
                    <input class="form-control" type="file" @change="uploadFile" ref="file">
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
          <button type="button" class="btn btn-primary" @click="saveChat">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"

export default {
    props: ['storeChat'],
    setup (props) {
      let form = ref({
        'id': null,
        'name': '',
        'image': '',
      })

      const storeData = props.storeChat

      const saveChat = () => {

        let formData = new FormData();
        formData.append('name', form.value.name ? form.value.name : '');
        formData.append('image', form.value.newImage ? form.value.newImage : '');

        storeData(formData)
      }

      const uploadFile = (e) => {
        form.value.newImage = e.target.files[0]
      }

      return {
        form,
        saveChat,
        uploadFile, 
      }
    }
}
</script>

<style lang="scss" scoped>

</style>>
