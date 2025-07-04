<template>
    <div class="music-icon" :class="{ hidden: hidden }"
        :style="{ boxShadow: isPlaying ? `0 0 10px ${currentColor}` : 'none', backgroundColor: isPlaying ? currentColor + '66' : '' }"
        @click="togglePlay">
        <!-- 水波纹容器 -->
        <div v-if="isPlaying" :style="{ borderColor: currentColor }" class="ripple"></div>
        <div v-if="isPlaying" :style="{ borderColor: currentColor }" class="ripple ripple2"></div>
        <svg fill="#000000" viewBox="0 0 24 24" id="music-disable" xmlns="http://www.w3.org/2000/svg"
            class="icon line-color">
            <path id="primary" d="M13,17.5V3a25.84,25.84,0,0,0,3.44,3c1.66,1.07,1.91,2.76,1.15,5"
                style="fill: none; stroke: black; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" />
            <circle id="primary-2" cx="9.5" cy="17.5" r="3.5"
                style="fill: none; stroke: black; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" />
            <!-- 播放状态下不显示斜杠 -->
            <line v-if="!isPlaying" id="secondary" x1="19" y1="21" x2="5" y2="3"
                style="fill: none; stroke: #2ca9bc; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" />
        </svg>

        <!-- 控制用的 audio 元素 -->
        <audio ref="audioRef" loop preload="auto">
            <source src="./bg-music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const hidden = ref(false)
const isPlaying = ref(false)
const audioRef = ref(null)
let scrollTimer = null
const currentColor = ref('#4ac4e3') // 默认颜色
const colors = [
    '#1E88E5', '#64B5F6', '#0D47A1', '#42A5F5', '#1565C0', '#90CAF9',
    '#FB8C00', '#FFB74D', '#E65100', '#FFA726', '#F57C00', '#FFCC80',
    '#26A69A', '#66BB6A', '#7E57C2', '#AB47BC', '#EC407A', '#8D6E63'
];
let colorIndex = 0
const colorTimer = ref(null)

const startColorCycle = () => {
    if (colorTimer.value) return
    colorTimer.value = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length
        currentColor.value = colors[colorIndex]
    }, 600)
}

const stopColorCycle = () => {
    clearInterval(colorTimer.value)
    colorTimer.value = null
}


const togglePlay = () => {
    const audio = audioRef.value
    if (!audio) return

    if (isPlaying.value) {
        audio.pause()
        isPlaying.value = false
    } else {
        audio.play().then(() => {
            isPlaying.value = true
        }).catch(() => {
            // 自动播放失败，可能需要用户手动交互
        })
    }
}

// 播放状态变化时启动或停止颜色动画
watch(isPlaying, (playing) => {
    if (playing) {
        startColorCycle()
    } else {
        stopColorCycle()
    }
})

const handleScroll = () => {
    hidden.value = true
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
        hidden.value = false
    }, 1500)
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    audioRef.value?.pause()
    stopColorCycle()
})
</script>

<style scoped>
.music-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 38px;
    height: 38px;
    z-index: 9999;
    transition: all 1s ease;
    cursor: pointer;
    background-color: aliceblue;
    border-radius: 50%;
    padding: 6px;
}

.music-icon.hidden {
    opacity: 0;
}

/* 水波纹样式 */
.ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid #4ac4e3;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: rippleEffect 1.4s infinite;
    opacity: 0.6;
    pointer-events: none;
}

/* 第二个 ripple 加延迟，实现交替 */
.ripple2 {
    animation-delay: 0.9s;
}

@keyframes rippleEffect {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.6;
    }

    50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.3;
    }

    100% {
        transform: translate(-50%, -50%) scale(1.6);
        opacity: 0;
    }
}
</style>