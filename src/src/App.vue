<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import EnvelopeComponent from '@/components/EnvelopeComponent.vue'
import arrowDownSvg from '@/components/icon/arrow-down.vue'
import CoverBody from '@/components/index.vue'
import music from '@/components/music.vue'

import img12 from '@/assets/images/verify/1.jpg'
import img13 from '@/assets/images/verify/2.jpg'
import img14 from '@/assets/images/verify/3.jpg'

import SlideVerify from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'

const showVerify = ref(false) // 控制是否展示滑块
const verifySuccess = ref(false) // 滑块是否通过验证

const yanzhengimgs = [img12, img13, img14]
// 滑块验证成功后的回调
const onVerifySuccess = () => {
  verifySuccess.value = true
  showVerify.value = false
  open.value = true
}

// 验证失败或重试
const onFail = () => {
  verifySuccess.value = false
}

const onAgain = () => {
  block.value?.refresh()
}

const showImage = ref(false)
const hideText = ref(true)

const open = ref(false)

const scrollToMain = () => {
  const main = document.querySelector('main')
  main?.scrollIntoView({ behavior: 'smooth' })
  showImage.value = true
  hideText.value = true
}

const onScroll = () => {
  let main = document.querySelector('main')
  main = main.parentElement || null
  const arrow = document.querySelector('.arrow-down')
  if (!main || !arrow) return

  const scrollY = window.scrollY
  const mainTop = main.getBoundingClientRect().top + window.scrollY
  const triggerPoint = mainTop + main.offsetHeight - window.innerHeight - 100

  if (scrollY >= triggerPoint) {
    showImage.value = true
    hideText.value = false
  } else {
    showImage.value = false
    hideText.value = true
  }
}

// const handleBegin = () => {
//   console.log("动画开始");
//   open.value = true
// }
const handleBegin = () => {
  if (!verifySuccess.value) {
    showVerify.value = true // 显示滑块
  } else {
    open.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header :style="{ height: open && '0px' }">
    <div class="header-bg"></div>
    <i class="fas fa-graduation-cap grad-cap"></i>
    <div class="container header-content">
      <h1>青春不散场 · 未来皆可期</h1>
      <p>2025届毕业留念 | 珍藏每一份感动，记录每一段成长</p>
      <p>时光荏苒，岁月如歌，我们即将告别熟悉的时光，奔赴各自的远方</p>
    </div>
    <div class="in arrow-down">
      <!-- <img v-if="showImage" src="@/assets/images/yidangnian.png" alt="">
      <span v-if="hideText">往下翻哦~</span> -->
      <transition name="fade">
        <img v-if="showImage" src="@/assets/images/yidangnian.png" alt="">
      </transition>
      <transition name="fade">
        <span v-if="hideText">往下翻哦~</span>
      </transition>
      <arrowDownSvg />
    </div>
  </header>
  <!-- <main>
    <EnvelopeComponent @begin="handleBegin" />
    <transition name="expand">
      <div v-if="open" class="cover">
        <CoverBody />
      </div>
    </transition>
  </main> -->
  <main>
    <EnvelopeComponent @begin="handleBegin" />

    <!-- 滑块验证 -->
    <div v-if="showVerify" class="slider-verify">
      <slide-verify
        :imgs="yanzhengimgs"
        ref="block"
        slider-text="向右滑动验证"
        :accuracy="1"
        @success="onVerifySuccess"
        @fail="onFail"
        @again="onAgain"
      />
    </div>

    <!-- 验证通过后展示内容 -->
    <transition name="expand">
      <div v-if="open" class="cover">
        <CoverBody />
      </div>
    </transition>
  </main>
  <music />
</template>

<style lang="scss" scoped>
.slider-verify {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
/* 头部样式 */
header {
  background: linear-gradient(135deg, #112d4e, #3f72af);
  color: white;
  padding: 80px 0 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  height: 60vh;
  transition: height 0.6s ease;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.6s ease;
}

.expand-enter-from {
  opacity: 0;
  transform: scale(0.4) translateY(60%);
}

.expand-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.expand-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.expand-leave-to {
  opacity: 0;
  transform: scale(0.4) translateY(60%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-content h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: bolder;
}

.header-content p {
  font-size: 1.4rem;
  max-width: 700px;
  margin: 0 auto 30px;
  opacity: 0.9;
}

.grad-cap {
  position: absolute;
  top: 20px;
  right: 10%;
  font-size: 5rem;
  opacity: 0.2;
  transform: rotate(15deg);
  animation: float 6s ease-in-out infinite;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="5" fill="white"/></svg>');
  background-size: 40px 40px;
}

.in {
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: #ffffffb7;
    font-size: 16px;
    line-height: 50px;
    font-weight: 300;
    text-align: center;
  }

  img {
    width: 70%;
    max-width: 300px;
    position: absolute;
    bottom: 10px;
  }
}

main {
  overflow: hidden;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;

  .cover {
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    top: 0px;
    left: 0px;
    background-color: #fffffd;
    z-index: 999;
  }
}
</style>
