<template>
    <div class="d-flex justify-content-center align-items-center flex-wrap">
        <div class="d-flex flex-wrap page-paginator">
            <a href="javascript:void(0)" class="page-item" v-for="page in pages" :key="page.page" :class="[(page.active) ? 'active' : '', (page.disabled) ? 'disabled' : '']">
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
import { reactive, ref, onUpdated, onMounted } from 'vue';
export default {
    props: ['currentPage', 'lastPage'],
    data(props) {
        // const pages = {
        //     currentPage: 2,
        //     lastPage: 8,
        //     totalCount: 28,
        //     currentCount: 10,
        //     data: [],
        // }

        const currentPage = ref(props.currentPage)
        const lastPage = ref(props.lastPage)
        const pages = []


        const renderPagination = (currentPage, lastPage) => {
            if (currentPage == 1) {
                pages.push({
                    type: 1,
                    active: 0,
                    disabled: 1,
                    content: `fa-solid fa-angle-left`,
                    page: '',
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
                        page: ''
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
                        page: ``
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
                    content: `fa-solid fa-ellipsis`,
                    page: ``
                });
            }

            // $('.loading-paginate').html(html);

        }

        renderPagination(currentPage.value, lastPage.value)
        // onMounted(() => {
        //     console.log("DH run")
        //     renderPagination(test.currentPage, test.lastPage)
        // })
        
        return {
            pages
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