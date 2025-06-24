<template>
    <div class="stage">
        <div class="container">
            <div class="ring" ref="ringRef">
                <div class="img" v-for="(img, i) in images" :key="i" ref="imgRefs" @mouseenter="handleEnter(i)"
                    @mouseleave="handleLeave">
                    <img :src="img" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick, defineProps, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    images: {
        type: Array,
        default: () => []
    }
})

const ringRef = ref(null)
const imgRefs = ref([])
let xPos = 0
let autoRotate = true
let rotateTween = null

function getBgPos(i) {
    return (
        100 -
        (gsap.utils.wrap(
            0,
            360,
            gsap.getProperty(ringRef.value, 'rotationY') - 180 - i * 36
        ) /
            360) *
        500 +
        'px 0px'
    )
}

function handleEnter(index) {
    imgRefs.value.forEach((img, i) => {
        gsap.to(img, {
            opacity: i === index ? 1 : 0.5,
            ease: 'power3'
        })
    })
}

function handleLeave() {
    imgRefs.value.forEach((img) => {
        gsap.to(img, {
            opacity: 1,
            ease: 'power2.inOut'
        })
    })
}

function dragStart(e) {
    autoRotate = false
    stopAutoRotate()

    if (e.touches) e.clientX = e.touches[0].clientX
    xPos = Math.round(e.clientX)
    gsap.set(ringRef.value, { cursor: 'grabbing' })
    window.addEventListener('mousemove', drag)
    window.addEventListener('touchmove', drag)
}

function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX

    gsap.to(ringRef.value, {
        rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
        onUpdate: () => {
            imgRefs.value.forEach((img, i) => {
                gsap.set(img, {
                    backgroundPosition: getBgPos(i)
                })
            })
        }
    })

    xPos = Math.round(e.clientX)
}

function dragEnd() {
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('touchmove', drag)
    gsap.set(ringRef.value, { cursor: 'grab' })

    autoRotate = true
    startAutoRotate()
}

function startAutoRotate() {
    if (rotateTween) rotateTween.kill()
    rotateTween = gsap.to(ringRef.value, {
        rotationY: "+=360",
        duration: 40,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
            imgRefs.value.forEach((img, i) => {
                gsap.set(img, {
                    backgroundPosition: getBgPos(i)
                })
            })
        }
    })
}

function stopAutoRotate() {
    if (rotateTween) rotateTween.kill()
    rotateTween = null
}

onMounted(async () => {
    await nextTick()

    gsap.set(ringRef.value, { rotationY: 180, cursor: 'grab' })
    gsap.set(imgRefs.value, {
        rotateY: (i) => i * -36,
        transformOrigin: '50% 50% 500px',
        z: -500,
        backgroundPosition: (i) => getBgPos(i),
        backfaceVisibility: 'hidden'
    })

    gsap.from(imgRefs.value, {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: 'expo'
    })

    window.addEventListener('mousedown', dragStart)
    window.addEventListener('touchstart', dragStart)
    window.addEventListener('mouseup', dragEnd)
    window.addEventListener('touchend', dragEnd)

    startAutoRotate()
})

onBeforeUnmount(() => {
    stopAutoRotate()
})
</script>

<style lang="scss" scoped>
.stage,
.ring,
.img {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    user-select: none;
}

.stage {
    overflow: hidden;
}

div,
svg {
    position: absolute;
}

.img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.container {
    perspective: 500px;
    width: 80vw;
    height: 60vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>