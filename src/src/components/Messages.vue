<template>
    <div class="graduation-messages">
        <div class="message-book">
            <div class="card-container" :style="{ transform: flipStyle }">
                <!-- 正面卡片 -->
                <div class="message-card front">
                    <div class="card-content">
                        <div class="message">{{ currentMessage.content }}</div>
                        <div class="author">{{ currentMessage.from }}</div>
                    </div>
                    <div class="card-footer">毕业寄语</div>
                </div>

                <!-- 背面卡片 -->
                <div class="message-card back">
                    <div class="card-content">
                        <div class="message">{{ nextMessageContent.content }}</div>
                        <div class="author">{{ nextMessageContent.from }}</div>
                    </div>
                    <div class="card-footer">同窗祝福</div>
                </div>

            </div>

            <!-- 装饰元素 -->
            <i class="decoration cap fas fa-graduation-cap"></i>
            <i class="decoration book fas fa-book"></i>
        </div>

        <!-- <div class="controls">
            <button class="nav-btn" @click="prevMessage" :disabled="currentIndex === 0">
                <i class="fas fa-arrow-left"></i> 上一条
            </button>
            <button class="nav-btn" @click="nextMessage" :disabled="currentIndex === messages.length - 1">
                下一条 <i class="fas fa-arrow-right"></i>
            </button>
        </div> -->

        <!-- <div class="page-indicator">
            <div v-for="(msg, index) in messages" :key="index" class="page-dot"
                :class="{ active: currentIndex === index }"></div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    messages: {
        type: Object,
        required: true
    }
})

const messages = ref([]);

Object.entries(props.messages).map(([name, { msg }]) => ({
    from: name,
    content: msg,
})).forEach(item => {
    messages.value.push(item)
});

const currentIndex = ref(0);
const isFlipping = ref(false);

const currentMessage = computed(() => messages.value[currentIndex.value]);
const nextMessageContent = computed(() => {
    return messages.value[(currentIndex.value + 1) % messages.value.length];
});

const flipStyle = computed(() => {
    return isFlipping.value ? 'rotateY(180deg)' : 'rotateY(0deg)';
});

const nextMessage = () => {
    if (currentIndex.value < messages.value.length - 1) {
        isFlipping.value = true;
        setTimeout(() => {
            currentIndex.value++;
            isFlipping.value = false;
        }, 600);
    } else {
        currentIndex.value = 0;
    }
};

const prevMessage = () => {
    if (currentIndex.value > 0) {
        isFlipping.value = true;
        setTimeout(() => {
            currentIndex.value--;
            isFlipping.value = false;
        }, 600);
    } else {
        currentIndex.value = messages.value.length - 1;
    }
};
defineExpose({
    nextMessage,
    prevMessage,
});
</script>

<style lang="scss">
.graduation-messages {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;

    .message-book {
        perspective: 1500px;
        height: 400px;
        position: relative;
        margin-bottom: 30px;

        .card-container {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .message-card {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.9);
            padding: 30px 10px;
            border-left: 6px solid #ffb347;

            &.back {
                transform: rotateY(180deg);
                background: rgba(255, 248, 220, 0.95);
                border-left: 6px solid #b35c00;
            }

            .card-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 20px;
                text-align: center;

                .message {
                    font-size: 22px;
                    line-height: 1.7;
                    color: #5a4a7a;
                    margin-bottom: 30px;
                    font-style: italic;
                    position: relative;

                    &::before,
                    &::after {
                        content: '"';
                        font-size: 50px;
                        color: rgba(179, 92, 0, 0.2);
                        position: absolute;
                    }

                    &::before {
                        top: -20px;
                        left: -15px;
                    }

                    &::after {
                        bottom: -40px;
                        right: -15px;
                    }
                }

                .author {
                    font-size: 20px;
                    font-weight: bold;
                    color: #4b3f72;
                    align-self: flex-end;
                    position: relative;
                    padding-right: 15px;

                    &::before {
                        content: "— ";
                    }
                }
            }

            .card-footer {
                height: 50px;
                background: linear-gradient(to right, #f8b500, #ffb347);
                border-radius: 0 0 20px 20px;
                margin: 0 -30px -30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: bold;
                font-size: 16px;
            }
        }

        .decoration {
            position: absolute;
            z-index: -1;
            opacity: 0.1;

            &.cap {
                top: -30px;
                right: 10%;
                font-size: 80px;
                transform: rotate(15deg);
            }

            &.book {
                bottom: -30px;
                left: 10%;
                font-size: 70px;
                transform: rotate(-10deg);
            }
        }
    }

    .controls {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 30px;

        .nav-btn {
            background: linear-gradient(to right, #4b3f72, #6a5a95);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            }

            &:active {
                transform: translateY(1px);
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
        }
    }

    .page-indicator {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 15px;

        .page-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #b35c00;
            opacity: 0.4;
            transition: all 0.3s ease;

            &.active {
                opacity: 1;
                transform: scale(1.2);
                background: #4b3f72;
            }
        }
    }
}
</style>