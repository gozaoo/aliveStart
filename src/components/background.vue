<script>
    export default {
        name: 'app',
        components: {},
        data() {
            return {
                skyColor: {
                    night: '#9591AB',
                    morning: '#678BA3',
                    noon: '#7CC0D9',
                    evening: '#F7E4EA',
                    sundown: '#F0E8B4'
                },
                starColor: {
                    night: '#ffffff99',
                    morning: 'rgb(234,151,74)',
                    noon: 'rgb(234,225,123)',
                    evening: 'rgb(246,102,50)',
                    sundown: 'rgb(169,109,143)'
                },
                timeAngle: '0deg',
                timeskycolor: '#9591AB',
                timestarcolor: '#ffffff99'
            }
        },
        methods: {
            getTimeState() {
                const currentDate = new Date();
                const currentHours = currentDate.getHours();

                if (currentHours >= 19 || currentHours < 6) {
                    return 'night';
                } else if (currentHours >= 6 && currentHours < 12) {
                    return 'morning';
                } else if (currentHours >= 12 && currentHours < 15) {
                    return 'noon';
                } else if (currentHours >= 18 && currentHours < 19) {
                    return 'evening';
                } else if (currentHours >= 18 && currentHours < 19) {
                    return 'sundown';
                }
            },
            timeToAngle() {

                const now = new Date();

                const hours = now.getHours();
                const minutes = now.getMinutes(); 
                const seconds = now.getSeconds();

                const totalSeconds = hours * 3600 + minutes * 60 + seconds;

                const degreePerSecond = 360 / 86400;

                return (totalSeconds * degreePerSecond - 90)+ 'deg';

            }
        },
        created(){
            let timeLoop = ()=>{
                    
                this.timeAngle = this.timeToAngle()
                this.timeskycolor = this.skyColor[this.getTimeState()]
                this.timestarcolor = this.starColor[this.getTimeState()]
                
                setTimeout(() => {
                    timeLoop()
                }, 10000);
            }
            timeLoop()
        }
    };
</script>

<template>

    <div :style="{
        'background-color':timeskycolor
    }" class="background-row full-screan-size">
        <div class="background-position full-screan-size">
            <div :style="{
                '--star-color':timestarcolor,
                '--time-rotate': timeAngle
            }" class="image-area">

            </div>
            <div class="blur-area full-screan-size">

            </div>
        </div>
    </div>

</template>

<style scoped>
    .background-row {
        position: fixed;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .full-screan-size {
        height: 100vh;
        width: 100vw;
    }

    .background-position {
        position: relative;
    }

    .blur-area {
        position: absolute;
        z-index: 2;
        backdrop-filter: blur(5vmin);
    }

    .image-area {

        position: absolute;
        left: -30vw;
        top: -30vh;
        height: 160vh;
        width: 160vw;
        z-index: 1;
        transform: rotate(var(--time-rotate));
        --star-color: #0000000;
        background: conic-gradient(from 180deg at 50% 50%, #00000000 0deg, var(--star-color)  90deg, #00000000 150deg);
        ;
    }
</style>