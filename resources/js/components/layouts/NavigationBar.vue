<template>
    <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div class="d-flex flex-wrap page-paginator">
            <a href="javascript:void(0)" class="page-item">1</a>
            <a href="javascript:void(0)" class="page-item">2</a>
            <a href="javascript:void(0)" class="page-item">3</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const pages = {
            data: [],
            conditions: [],
            currentPage: 1,
            lastPage: 1,
            totalCount: 1,
            currentCount: 1,
        }

        const renderPagination = () => {
            // if (lastPage < 2) {
            //     $('.loading-paginate').html('');
            //     return 0;
            // }

            // let html = `<div class="d-flex justify-content-between align-items-center flex-wrap">
            // <div class="d-flex flex-wrap py-2 mr-3 page-biz-content">`;

            // if (currentPage == 1) {
            //     html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light my-1 disabled page-biz-item"><i class="icon-biz-left-arrow"></i></a>`
            // } else {
            //     html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${(currentPage - 1)}"><i class="icon-biz-left-arrow"></i></a>`
            // }

            // for (let page = 1; page <= lastPage; page++) {
            //     if (currentPage > 4 && page == 2) {
            //         html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 disabled page-biz-item">...</a>`;
            //     }

            //     if (page == currentPage) {
            //         html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light btn-hover-primary active mr-2 my-1 page-biz-item">${page}</a>`;
            //     } else if(page == (currentPage + 1)
            //         || page == (currentPage + 2)
            //         || page == (currentPage - 1)
            //         || page == (currentPage - 2)
            //         || page == lastPage
            //         || page == 1) {
            //         html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${page}">${page}</a>`
            //     } 

            //     if (currentPage < (lastPage - 3) && page == (lastPage - 1)) {
            //         html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 disabled page-biz-item">...</a>`;
            //     }
            // }

            // if (currentPage != lastPage) {
            //     html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 page-biz-item" data-click="changePage" data-page="${(currentPage + 1)}"><i class="icon-biz-right-arrow"></i></a>`;
            // } else {
            //     html += `<a href="javascript:void(0)" class="btn btn-icon btn-sm btn-light mr-2 my-1 disabled page-biz-item"><i class="icon-biz-right-arrow"></i></a>`
            // }

            // html += `</div></div>`;

            // $('.loading-paginate').html(html);
        }

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
            border: 1px solid transparent;
            border-radius: 5px;
            background-color: #ecf0f1;
            color: #685dd8;

            &.active {
                color: #fff;
                background-color: #685dd8;
            }
        }   
    }
</style>