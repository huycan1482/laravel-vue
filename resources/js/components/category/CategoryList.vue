<template>
    <div class="content-header d-flex">
        <h5>Category List</h5>
        <div class="ms-2">
            <!-- <span class="badge bg-primary cursor">+ Add User</span> -->
            <router-link :to="{ name: 'category.create' }" type="button" class="badge bg-primary cursor">+ Add Category</router-link>
        </div>
    </div>
    <div class="content-body">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, key) in categories" :key="category.id">
                    <th scope="row">{{ key + 1 }}</th>
                    <td>{{ category.name }}</td>
                    <td>
                        <img class="item-image" :src="getImgURL(category.image)" alt="" width="50" height="50">
                    </td>
                    <td>{{ `${formatDate(category.created_at).date} ${formatDate(category.created_at).time}` }}</td>
                    <td>{{ (category.active == true) ? 'Active' : 'Disable' }}</td>
                    <td>
                        <router-link :to="{ name: 'category.edit', params: { id: category.id } }" type="button" class="btn btn-primary me-2">Edit</router-link>
                        <div @click="confirmDeleteCategory(category.id)" class="btn btn-danger">Delete</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import useCategory from "../../composables/Model/category"
import { onMounted, inject, computed } from "vue"
import commonFunc from "../../Common/common"

export default {
    setup () {
        const swal = inject('$swal')
        const { categories, getCategories, destroyCategory } = useCategory()
        const { formatDate } = commonFunc()

        onMounted(getCategories)

        const deleteCategory = async (id) => {
            await destroyCategory(id);
            await getCategories();
        }

        const confirmDeleteCategory = (id) => {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteCategory(id);
                }
            })
        }

        const getImgURL = (img) => {
            return window.location.origin + '/storage/' + img;
        }

        return {
            categories,
            formatDate,
            confirmDeleteCategory,
            getImgURL
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-body .table > :not(caption) > * > * {
        color: #5d596c;
    }
</style>>
