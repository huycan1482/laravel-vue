<template>
    <div class="content-header d-flex">
        <h5>User Setting</h5>
    </div>
    <div class="content-body">
        <div>
            <form class="">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName">
                    <span class="red-text"></span>
                </div>
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="inputEmail">
                    <span class="red-text"></span>
                </div>
                <div class="mb-3">
                    <label for="inputFile" class="form-label">Avatar</label>
                    <input type="file" class="form-control" id="inputFile">
                    <span class="red-text"></span>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserSetting"
}
</script>

<style>

</style>