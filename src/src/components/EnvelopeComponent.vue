<template>
    <div class="vertical-envelope">
        <div class="envelope-top" :class="{ open }"></div>
        <div class="envelope-body">
            <div class="stamp" @click="clickIn">毕业<br />快乐</div>
            <div class="address">
                <div class="from">寄：2025届全体毕业生</div>
                <div class="to">收：未来可期的你</div>
            </div>
        </div>
        <div class="envelope-bottom"></div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['begin'])
const open = ref(false)

const clickIn = () => {
    open.value = true
    emit('begin')
}
</script>

<style scoped lang="scss">
.vertical-envelope {
    width: 85%;
    min-width: 320px;
    height: 90%;
    background: linear-gradient(to bottom, #fdf6e3, #f5e9d6);
    border: 1px solid #d2b48c;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    margin: 0 auto;
}

/* 顶部封口 */
.envelope-top {
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom right, #f9e7c3, #f3d9b0);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    border-bottom: 1px solid #d2b48c;
    transform-origin: top center;
    transition: transform 0.6s ease;
}

.envelope-top.open {
    transform: rotateX(150deg);
    z-index: 10;
}

/* 主体 */
.envelope-body {
    padding: 20px;
    height: calc(100% - 120px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* 底部线条 */
.envelope-bottom {
    height: 60px;
    background: repeating-linear-gradient(45deg,
            #e1c29d,
            #e1c29d 10px,
            #f9f3e7 10px,
            #f9f3e7 20px);
    border-top: 1px solid #d2b48c;
}

/* 邮票 */
.stamp {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
    border-radius: 50%;
    border: 2px dashed white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    align-self: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 300;
    color: #fdf6e3;
    cursor: pointer;
    user-select: none;
}

/* 地址信息 */
.address {
    margin-top: 20px;
    font-size: 0.85rem;
    color: #5c4b3b;
    line-height: 1.5;
}

.from,
.to {
    background: rgba(255, 255, 255, 0.4);
    padding: 6px 10px;
    border-left: 4px solid #d88756;
    margin-bottom: 10px;
    border-radius: 4px;
}
</style>