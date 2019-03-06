<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        Photo loading
                        <button type="button" class="btn-close" @click="close" aria-label="Close modal">Close</button>
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <div class="modalDiv">
                            <input type="file" @change="onFileChanged" id="file"/>
                            <label for="file">Choose file</label>
                            <input type="submit" value="Upload" v-on:click="changedPhotoSave"/>
                            <p v-if="complete">Photo loading is completed!</p>
                        </div>
                    </slot>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
    import {AXIOS} from './http-config'

    export default {
        name: 'modal',
        data() {
            return {
                file: 'file',
                complete: false
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            onFileChanged: function(event) {
                this.file = event.target.files[0]
            },
            changedPhotoSave: function() {
                let fd = new FormData();
                fd.append('file', this.file);
                let config = {header : {'Content-Type' : 'multipart/form-data'}};
                AXIOS.post('/users/images', fd, config);
                this.complete = true
            }
        },
    };
</script>

<style src="../style/ModalStyle.css" scoped>
</style>