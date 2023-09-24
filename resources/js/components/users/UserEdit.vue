<template>
    <UserForm :userId="id"/>
</template>

<script>
import UserForm from "./UserForm"

export default {
    name: "UserEdit",
    props : {
        id: {
            required :true,
            type: String
        }
    },
    components: {
        UserForm,
    }
}
</script>

<style>

</style>