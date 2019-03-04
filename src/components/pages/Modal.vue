<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        Warning!
                        <button type="button" class="btn-close" @click="close" aria-label="Close modal">Close</button>
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <p>Your city does not  match to the country!</p>
                        <p>Please select a new one!</p>
                    </slot>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        methods: {
            close() {
                this.$emit('close');
            },
        },
    };
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        width: 580px;
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        line-height: 40px;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        padding: 20px;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        color: #f93d7b;
        font-weight: bold;
        justify-content: space-between;
    }


    .modal-body {
        position: relative;
        padding: 20px;
    }

    p {
        text-align: center;
    }

    .btn-close {
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        width: 120px;
        padding: 0;
        color: #f93d7b;
        border: 0;
        background-color: white;
        cursor: pointer;
        font-weight: bold;
    }

    .btn-close:hover {
        text-decoration: underline;
        background-color: white;
        color: #f93d7b;

    }
</style>