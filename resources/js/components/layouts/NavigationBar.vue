<template>
    <div class="d-flex justify-content-center align-items-center flex-wrap">
        <div class="d-flex flex-wrap page-paginator">
            <a href="javascript:void(0)" class="page-item" v-for="page in pages" 
            :key="page" 
            :class="[(page.active) ? 'active' : '', (page.disabled) ? 'disabled' : '']"
            @click="changePage(page.page)">
                <i class="" v-if="(page.type)" :class="page.content"></i>
                {{ (page.type == 0) ? page.content : '' }}
            </a>
        </div>

        <!-- <a href="javascript:void(0)" class="page-item">  
                <i class="fa-solid fa-angle-left"></i>
            </a>
            <a href="javascript:void(0)" class="page-item">1</a>
            <a href="javascript:void(0)" class="page-item active">2</a>
            <a href="javascript:void(0)" class="page-item disabled">
                <i class="fa-solid fa-ellipsis"></i>
            </a>
            <a href="javascript:void(0)" class="page-item">3</a>
            <a href="javascript:void(0)" class="page-item">  
                <i class="fa-solid fa-angle-right"></i>
            </a> -->
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
export default {
    props: ['currentPage', 'lastPage'],
    data(props) {
        const currentPage = ref(props.currentPage)
        const lastPage = ref(props.lastPage)
        const pages = []

        const renderPagination = (currentPage, lastPage) => {
            pages.length = 0
            if (currentPage == 1) {
                pages.push({
                    type: 1,
                    active: 0,
                    disabled: 1,
                    content: `fa-solid fa-angle-left`,
                    page: 0,
                })
            } else {
                pages.push({
                    type: 1,
                    active: 0,
                    disabled: 0,
                    content: `fa-solid fa-angle-left`,
                    page: (currentPage - 1)
                })
            }

            for (let page = 1; page <= lastPage; page++) {
                if (currentPage > 4 && page == 2) {
                    pages.push({
                        type: 1,
                        disabled: 1,
                        active: false,
                        content: `fa-solid fa-ellipsis`,
                        page: 0
                    })
                }

                if (page == currentPage) {
                    pages.push({
                        type: 0,
                        disabled: 1,
                        active: true,
                        content: page,
                        page: page
                    });
                } else if(page == (currentPage + 1)
                    || page == (currentPage + 2)
                    || page == (currentPage - 1)
                    || page == (currentPage - 2)
                    || page == lastPage
                    || page == 1) {

                    pages.push({
                        type: 0,
                        disabled: 0,
                        active: false,
                        content: page,
                        page: page
                    });
                } 

                if (currentPage < (lastPage - 3) && page == (lastPage - 1)) {
                    pages.push({
                        type: 1,
                        disabled: 1,
                        active: false,
                        content: `fa-solid fa-ellipsis`,
                        page: 0
                    });
                }
            }

            if (currentPage != lastPage) {
                pages.push({
                    type: 1,
                    disabled: 0,
                    active: false,
                    content: `fa-solid fa-angle-right`,
                    page: (currentPage + 1)
                });
            } else {
                pages.push({
                    type: 1,
                    disabled: 1,
                    active: false,
                    content: `fa-solid fa-angle-right`,
                    page: 0
                });
            }
        }

        const changePage = (page) => {
            if (page != 0) {
                this.$emit('changePage', page)
            }
        }

        watchEffect(() => {
            currentPage.value = props.currentPage;
            lastPage.value = props.lastPage;
            if (!isNaN(parseInt(currentPage.value)) && !isNaN(parseInt(lastPage.value))) {
                renderPagination(currentPage.value, lastPage.value)
            }
        });
        
        return {
            pages,
            changePage
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-paginator {
        .page-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            width: 30px;
            margin: 0 3px;
            border: 1.5px solid transparent;
            border-radius: 5px;
            background-color: #f8f8f8;
            color: #685dd8;
            font-size: 12px;
            transition: .5s all;

            &:not(.disabled):hover {
                border-color: #685dd8;
            }

            &.disabled {
                cursor: not-allowed;
            }

            &.active {
                color: #fff;
                background-color: #685dd8;
            }
        }   
    }
</style>