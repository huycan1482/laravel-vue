<template>
    <div class="content-header d-flex">
        <h5>Message List</h5>
    </div>
    
</template>

<script>

export default {
    mounted() {
        window.Echo.channel('chat-message')
            .listen('MessageEvent', (e) => {
                console.log('New message received:', e.message);
        });
  }
}
</script>

<style lang="scss" scoped>

</style>>
