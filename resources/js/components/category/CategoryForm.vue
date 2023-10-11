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
import { reactive, onMounted } from "vue"
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
        let form = reactive({
            'id': null,
            'name': '',
            'email': '',
        })

        const { category, errorText, errors, getCategory, storeCategory, updateCategory } = useCategory()

        if (props.categoryId) {
            onMounted(() => {
                getUser(props.categoryId)
            })
            form = category;
        }

        const saveCategory = async () => {
            props.categoryId
                ? await updateCategory(props.categoryId)
                : await storeCategory({ ...form })
        }

        return {
            errors,
            errorText,
            form,
            saveCategory,
        }
    },
}
</script>

<style lang="scss" scoped>
    .content-body {
        color: #5d596c;
    }
</style>