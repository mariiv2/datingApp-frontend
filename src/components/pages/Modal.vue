<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        Warning
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

<style src="../style/ModalStyle.css" scoped>
</style>