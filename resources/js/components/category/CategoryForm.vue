<template>
    <div class="content-header d-flex">
        <h5>Category Form</h5>
        <div class="ms-2">
            <router-link :to="{ name: 'category.index' }" type="button" class="badge bg-primary cursor">Category List</router-link>
        </div>
    </div>
    <div class="content-body">
        <div class="">
            <form @submit.prevent="saveCategory" class="">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName" v-model="form.name" >
                    <span class="red-text" v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Image</label>
                    <div>
                        <img width="50" height="50" :src="getImgURL(form.image)" alt="" v-if="form.image">
                    </div>
                    <input class="form-control" type="file" @change="uploadFile" ref="file">
                </div>
                <div class="mb-3 form-check">
                    <input class="form-check-input" type="checkbox" v-model="form.active">
                    <label class="form-check-label" for="flexCheckDefault">
                        Active
                    </label>
                </div>
                <!-- <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="inputEmail" v-model="form.email">
                    <span class="red-text" v-if="errors.email">{{ errors.email[0] }}</span>
                </div> -->
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <button type="submit" class="btn btn-primary">{{ categoryId ? "Update" : "Submit" }}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue"
import useCategory from "../../composables/Model/category";

export default {
    name: 'CategoryForm',
    props: {
        categoryId : {
            require: false,
            type: String,
        }
    },
    setup(props) {
        let form = ref({
            'id': null,
            'name': '',
            'newImage': '',
            'active': false,
        })

        const { category, errorText, errors, getCategory, storeCategory, updateCategory } = useCategory()

        if (props.categoryId) {
            onMounted(() => {
                getCategory(props.categoryId)
            })
            form = category
        }

        const saveCategory = async () => {
            let formData = new FormData();
            formData.append('name', form.value.name ? form.value.name : '');
            formData.append('image', form.value.newImage ? form.value.newImage : '');
            formData.append('active', form.value.active ? form.value.active : '');
            
            props.categoryId
                ? await updateCategory(props.categoryId, formData)
                : await storeCategory(formData)
        }

        const uploadFile = (e) => {
            form.value.newImage = e.target.files[0]
        }

        const getImgURL = (img) => {
            return window.location.origin + '/storage/' + img;
        }

        // const uploadFile = (e) => {
        //     let files = e.target.files || e.dataTransfer.files;
        //     // Check if file is selected
        //     if (e.target.files && e.target.files[0]) {
        //         // Get uploaded file
        //         const file = e.target.files[0],
        //         // Get file size
        //         fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,
        //         // Get file extension
        //         fileExtention = file.name.split(".").pop(),
        //         // Get file name
        //         fileName = file.name.split(".").shift(),
        //         // Check if file is an image
        //         isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtention);
        //         // Print to console
        //         console.log(fileSize, fileExtention, fileName, isImage);


        //         let reader = new FileReader();
        //         // let vm = this; 
        //         reader.onload = (e) => {
        //             form.image = e.target.result;
        //         };
        //         reader.readAsDataURL(files[0]);

        //         console.log(form.image)
        //     }
        // }

        return {
            errors,
            errorText,
            form,
            saveCategory,
            uploadFile,
            getImgURL
        }
    },
}
</script>

<style lang="scss" scoped>
    .content-body {
        color: #5d596c;
    }
</style>