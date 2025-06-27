<template>
    <div class="container">
        <div class="number">
            {{ currentIndex + 1 }} / {{ imgNums }}
        </div>
        <div class="img-list">
            <div class="img-box" v-for="(cat, i) in catsArray" :key="i"
                :class="{ active: i === currentIndex, 'slide-out': currentIndex > i }"
                :style="{ zIndex: catsArray.length - i, transform: `rotate(${cat.angle}deg)` }">
                <div class="img">
                    <img :src="cat.src" :style="{ transform: `rotate(${cat.angle}deg)` }" />
                </div>
                <!-- <div class="img-box" v-for="(cat, i) in catsArray" :key="i">
                    <div class="img">
                        <img :src="cat.src" :style="{ transform: `rotate(${cat.angle}deg)` }" />
                    </div> -->
            </div>
        </div>
        <div class="text">
            <h2>{{ catsArray[currentIndex].name }}</h2>
            <em>
                <!-- {{ catsArray[currentIndex].msg }} -->
                <div class="btns">
                    <button class="button-3d" @click="prev">
                        <div class="button-top">
                            <span class="material-icons">❮</span>
                        </div>
                        <div class="button-bottom"></div>
                        <div class="button-base"></div>
                    </button>
                    <button class="button-3d" @click="next">
                        <div class="button-top">
                            <span class="material-icons">❯</span>
                        </div>
                        <div class="button-bottom"></div>
                        <div class="button-base"></div>
                    </button>
                </div>
            </em>

        </div>
    </div>
    <!-- <section :style="`--n: ${catsArray.length}; --k: ${currentIndex}`">
        <article v-for="(cat, i) in catsArray" :key="i" :style="`--i: ${i}; --a: ${cat.angle}deg`">
            <img :src="cat.src" />
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px">
                <h2>{{ cat.name }}</h2>
                <em>{{ cat.msg }}</em>
            </div>
        </article>
        <div class="controls">
            <button aria-label="previous" data-inc="-1" @click="changeIndex(1)"></button>
            <button aria-label="next" data-inc="1" @click="changeIndex(-1)"></button>
        </div>
    </section> -->
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';

const emits = defineEmits(['next', 'prev'])
const props = defineProps({
    images: {
        type: Object,
        required: true
    }
})

const currentIndex = ref(0);

const imgNums = computed(() => {
    return catsArray.value.length || 1
})

const catsArray = ref([]);

Object.entries(props.images).map(([name, { msg, src }]) => ({
    name,
    msg,
    src,
    angle: getRandomInRange(10, -10)
})).forEach(item => {
    catsArray.value.push(item)
});

function getRandomInRange(min, max) {
    if (min > max) [min, max] = [max, min];
    const range = max - min;
    return Math.floor(Math.random() * range) + min;
}

const prev = () => {
    emits('prev')
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = imgNums.value - 1;
    }
}

const next = () => {
    emits('next')
    if (currentIndex.value < imgNums.value - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
}

// const cats = {
//     '张三': {
//         msg: 'Panthera tigris',
//         src: '1501705388883-4ed8a543392c',
//         desc: 'tiger in the water'
//     },
// };
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .number {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        font-style: italic;
        font-family: 'Brush Script MT';
        margin-bottom: 30px;
    }

    .img-list {
        position: relative;
        width: 100%;
        height: 380px;

        .img-box {
            position: absolute;
            width: 80%;
            height: 100%;
            left: 32px;
            transition: transform 0.5s ease, opacity 0.5s ease;

            &.slide-out {
                transform: translateX(-120%) rotate(0deg) !important;
                opacity: 0;
            }

            &.active {
                transform: translateX(0%) scale(1.05);
                opacity: 1;
                z-index: 100;
            }

            .img {
                width: 100%;
                height: 350px;
                margin-bottom: 30px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .text {
        text-align: center;
        padding: 0px 40px;

        h2 {
            /* 同学名字样式 */
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #2c3e50;
            /* 深蓝色-灰色，显得稳重 */
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            letter-spacing: 1px;
            transition: color 0.3s ease;
        }

        em {
            position: relative;
            /* 寄语文字样式 */
            display: block;
            font-size: 16px;
            font-style: italic;
            color: #7f8c8d;
            /* 柔和的灰色 */
            line-height: 28px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

            .btns {
                position: absolute;
                width: calc(100% + 120px);
                margin-left: -60px;
                height: 80px;
                left: 0px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                justify-content: space-between;


                .button-3d {
                    -webkit-appearance: none;
                    appearance: none;
                    position: relative;
                    border-width: 0;
                    padding: 0 8px;
                    width: 40px;
                    height: 40px;
                    box-sizing: border-box;
                    background: transparent;
                    font: inherit;
                    cursor: pointer;
                    margin: 10px;
                    border-radius: 20px;
                }

                .button-top {
                    transform: translateX(-4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                    padding: 8px 16px;
                    transform: translateY(0);
                    color: #fff;
                    background-image: linear-gradient(145deg, #ff7373, #F8B80D);
                    text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
                    border-radius: 20px;
                    transition: transform 0.3s, border-radius 0.3s, background 10s;
                }

                .button-3d:active .button-top {
                    border-radius: 10px 10px 8px 8px / 8px;
                    transform: translateY(2px);
                    background-image: linear-gradient(145deg, #ff7373, #F8B80D);
                }

                .button-bottom {
                    position: absolute;
                    z-index: 1;
                    bottom: 4px;
                    right: -4px;
                    border-radius: 20px;
                    padding-top: 6px;
                    width: calc(100% - 8px);
                    height: calc(100% - 10px);
                    background-image: linear-gradient(145deg, #F8D067, #F8B80D);
                    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
                    transition: border-radius 0.2s, padding-top 0.2s;
                }

                .button-base {
                    position: absolute;
                    z-index: 0;
                    top: 4px;
                    left: 0;
                    border-radius: 20px;
                    width: 100%;
                    height: calc(100% - 4px);
                    background-color: rgba(0, 0, 0, 0.15);
                    box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75),
                        inset 0 2px 2px rgba(0, 0, 0, 0.25);
                    transition: border-radius 0.2s, padding-top 0.2s;
                }

                .button-3d:active .button-bottom {
                    border-radius: 10px 10px 8px 8px / 8px;
                    padding-top: 0;
                }

                .button-3d:active .button-base {
                    border-radius: 10px 10px 8px 8px / 8px;
                }

            }
        }
    }



}
</style>