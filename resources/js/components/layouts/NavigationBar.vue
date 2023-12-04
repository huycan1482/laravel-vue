<template>
    <div class="d-flex justify-content-center align-items-center flex-wrap">
        <div class="d-flex flex-wrap page-paginator" v-html="pages.html">
            
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
import { ref } from 'vue';
export default {
    data() {
        const pages = {
            conditions: [],
            currentPage: 1,
            lastPage: 3,
            totalCount: 28,
            currentCount: 10,
            html: ref(''),
        }

        const renderPagination = (currentPage, lastPage) => {
            if (lastPage < 2) {
                return 0;
            }

            let html = ``;

            if (currentPage == 1) {
                html += `<a href="javascript:void(0)" class="page-item"><i class="fa-solid fa-angle-left"></i></a>`
            } else {
                html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${(currentPage - 1)}"><i class="icon-biz-left-arrow"></i></a>`
            }

            for (let page = 1; page <= lastPage; page++) {
                if (currentPage > 4 && page == 2) {
                    html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 disabled page-biz-item">...</a>`;
                }

                if (page == currentPage) {
                    html += `<a href="javascript:void(0)" class="page-item active">${page}</a>`;
                } else if(page == (currentPage + 1)
                    || page == (currentPage + 2)
                    || page == (currentPage - 1)
                    || page == (currentPage - 2)
                    || page == lastPage
                    || page == 1) {
                    // html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${page}">${page}</a>`
                    html += `<a href="javascript:void(0)" class="page-item">${page}</a>`
                } 

                if (currentPage < (lastPage - 3) && page == (lastPage - 1)) {
                    html += `<a href="javascript:void(0)" class="page-item disabled"><i class="fa-solid fa-ellipsis"></i></a>`
                }
            }

            if (currentPage != lastPage) {
                // html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${(currentPage + 1)}"><i class="icon-biz-right-arrow"></i></a>`;
                html += `<a href="javascript:void(0)" class="page-item"><i class="fa-solid fa-angle-right"></i></a>` 
            } else {
                html += `<a href="javascript:void(0)" class="page-item"><i class="fa-solid fa-angle-right"></i></a>`
            }

            // $('.loading-paginate').html(html);

            pages.html = html
        }

        renderPagination(pages.currentPage, pages.lastPage)
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