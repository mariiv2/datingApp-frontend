<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        Error
                        <button type="button" class="btn-close" @click="close" aria-label="Close modal">Close</button>
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <div class="modalDiv">
                            <p v-for="error in errors">{{error['code']}}</p>
                        </div>
                    </slot>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ErrorModal",
        props: {
            errors: {
                required: true
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        },
    }
</script>

<style src='../style/ModalStyle.css' scoped>

</style>