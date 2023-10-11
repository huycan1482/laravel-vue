<template>
    <CategoryForm :categoryId="id"/>
</template>

<script>
import CategoryForm from "./CategoryForm"

export default {
    name: "CategoryEdit",
    props : {
        id: {
            required :true,
            type: String
        }
    },
    components: {
        CategoryForm,
    }
}
</script>

<style>

</style>