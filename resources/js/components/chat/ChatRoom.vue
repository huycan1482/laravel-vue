<template>
    <div class="d-flex">
        <div class="chat-sidebar box">

        </div>
        <div class="chat-main box">
            <div class="chat-header">
                <div class="chat-info">
                    <div class="chat-img">
                        <img src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" alt="">
                    </div>
                    <div class="chat-title">
                        <span>Room Chat 1</span>
                        <span class="grey-text">Room 1</span>
                    </div>
                </div>
                <div class="chat-settings">
                    <div class="setting-item">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div class="setting-item">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
            <div class="chat-content">
                <div class="chat-message right">
                    <div class="sender-img">
                        <div class="avatar">
                            <img src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" alt="">
                        </div>
                    </div>
                    <div class="content-detail">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>

                <div class="chat-message left">
                    <div class="sender-img">
                        <div class="avatar">
                            <img src="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" alt="">
                        </div>
                    </div>
                    <div class="content-detail">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.


                        </p>
                    </div>
                </div>
            </div>
            <div class="chat-footer">

            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

    p {
        margin-bottom: 0;
    }

    .chat-sidebar {
        width: 30%;
        margin-right: 8px;
    }

    .chat-main {
        width: 70%;
        margin-left: 8px;
        padding: 16px 0;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 16px 8px;
        border-bottom: 1px solid #ecf0f1;

        .chat-info {
            display: flex;
            align-items: center;

            .chat-img {
                height: 40px;
                width: 40px;
                overflow: hidden;
                border: 1px solid transparent;
                border-radius: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .chat-title {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
            }
        }

        .chat-settings {
            display: flex;
            justify-items: flex-end;
            align-items: center;

            .setting-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                overflow: hidden;
                border: 1px solid transparent;
                border-radius: 100%;
                transition: .5s all;
                cursor: pointer;

                &:hover {
                    background-color: #f8f8f8;
                    i {
                        color: #5d596c;
                    }
                }

                i {
                    font-size: 30px;
                }
            }
        }
    }

    .chat-content {
        padding: 0px 16px 8px;

        .chat-message {
            display: flex;
            margin: 15px 0;

            &.right {
                flex-direction: row-reverse;
                .content-detail {
                    background: #685dd8;
                    color: #ffff;
                }
            }

            &.left {
                flex-direction: row;
                .content-detail {
                    background: #f8f8f8;
                }
            }

            .sender-img {
                margin: 0 5px;
                
                img {
                    width: 40px;
                    height: 40px;
                    // width: 100%;
                    // height: 100%;
                }
            }

            .content-detail {
                padding: 12px 16px;
                border: 1px solid transparent;
                border-radius: 5px;
            }
        }
    }
</style>>