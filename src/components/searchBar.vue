<script>
    export default {
        name: 'search-bar',
        props: ['value'],
        data() {
            return {
                text: '',
                componentState: 'wating',
                textareaState: 'blur',
                lastEnterTime: Date.now(),
                inputHeight: '24'
            }
        },
        methods: {
            focusEvent(event) {
                this.textareaState = event.type
            },
            enterEvent(event) {
                // console.log(event);
                if (event.shiftKey) {
                    return
                }
                event.preventDefault()

                let tempTime = Date.now()
                console.log(tempTime - this.lastEnterTime);
                if ((tempTime - this.lastEnterTime) <= 500) {
                    this.text = ''
                }

                this.lastEnterTime = tempTime
                this.$nextTick(() => {
                    this.$emit('onEnter');
                })
            }
        },
        watch: {
            text: {
                handler: async function (newVal) {
                    this.$emit('inputMethods', newVal); // 触发一个自定义事件input，并将inputText的值作为参数传递给父组件
                    this.$emit('onEnter');

                    this.$nextTick(()=>{
                        this.inputHeight = this.$refs.textarea.clientHeight
                        console.log(this.inputHeight);
                    })
                },
                deep: true
            }
        }

    };
</script>

<template>
    <div class="inputBar">

        <div class="input" :style="{
                height:this.inputHeight + 'px'
            }">
            <div class="leftControl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
            <div class="content">
                <span  ref="textarea">{{ text }}</span>

                <textarea @keydown.enter="enterEvent" placeholder="键入你的内容" @focus="focusEvent" @blur="focusEvent"
                    v-model="text"></textarea>

                <!-- <textarea @keydown.enter="enterEvent" placeholder="键入你的内容"  @focus="focusEvent" @blur="focusEvent" v-model="text"></textarea> -->
            </div>


            <div class="rightControl">
                <div :class="['send',(text != '')?'visible':'']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-send-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                </div>
            </div>
        </div>

    </div>

</template>
<style scoped>
    .inputBar {
        position: relative;
        width: 400px;
        max-width: 100%;
        padding: 0 var(--paddingValue) 20px var(--paddingValue);
        transform: translateX(calc(-1 * var(--paddingValue)));
    }

    h1 {
        margin: 10px 0;
        font-size: 1rem;
        color: #0005;

    }

    textarea::placeholder {
        color: #0005;
    }

    .input {
        width: 100%;
        margin-top: 1.3rem;
        height: 24px;
        background-color: #fff7;
        border-radius: 1em;
        box-shadow: 0 0 1em #0001;
        margin-left: -8px;
        padding: 12px;
        display: flex;
        cursor: text;
        flex-direction: row;
        overflow: hidden;
        transition: 0.5s;
    }

    .input:hover {
        background-color: #fff9;
        box-shadow: 0 0 1em #0002;
    }

    .leftControl {
        color: #0006;
        max-width: 1.2em;
        min-width: 1.2em;
        flex-shrink: 0;
    }

    .content {
        margin: 0 6px;
        position: relative;
        /* height: fit-content; */
        flex-grow: 1;
        overflow: hidden;
        font-size: 0.9rem;
    }

    .content textarea {
        border: 0;
        position: absolute;
        left: 0;
        top: 0;
        resize: none;
        outline: none;
        height: 100%;
        width: 100%;
        font-size: 0.9rem;
        overflow: hidden;
        background: transparent;
        white-space: pre-wrap;
        padding: 0;
        word-wrap: break-word;
        color: #000b;
        border: none;
    }

    .content span {
        display: block;
        min-height: 24px;
        word-wrap: break-word;
        visibility: hidden;
        font-size: 0.9rem;
        white-space: pre-wrap
    }

    .rightControl {
        color: #0006;
        /* max-width: 1.2em; */
        min-width: 1.2em;
        flex-shrink: 0;
        height: 100%;
        /* margin-left: 5px; */
    }

    .rightControl>.send {
        display: block;
        width: 1.2em;
        height: 1.2em;
        color: rgb(0, 138, 211, 0);

        box-sizing: border-box;
        /* aspect-ratio: 1 / 1; */
        cursor: pointer;
        transition: 0.3s linear;
        scale: 0.8;
    }

    .send.visible {
        color: rgb(0, 138, 211);
        scale: 1;
    }
</style>