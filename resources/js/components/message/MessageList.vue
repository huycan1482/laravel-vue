<template>
    <div class="content-header d-flex">
        <h5>Message List</h5>
    </div>
    
</template>

<script>

export default {
    setup () {
        
    },
    mounted() {
        window.Echo.channel('chat')
        .listen('MessageEvent', (e) => {
            console.log('New message received:', e.message);
            // this.messages.push(e.message);
        });
  }
}
</script>

<style lang="scss" scoped>

</style>>
