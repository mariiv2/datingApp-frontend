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

<style>
    .modalDiv {
        text-align: center;
    }

    [type="file"] {
        height: 0;
        overflow: hidden;
        width: 0;
    }

    [type="file"] + label, [type="submit"] {
        background: #f93d7b;
        border: none;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        padding: 20px;
        margin: 5px;
        position: relative;
    }

    [type="file"]:hover + label:hover, [type="submit"]:hover {
        background-color: white;
        color: #f93d7b;
        transition: 0.3s;
    }

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

    .btn-close, .btn-close[type=file] {
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