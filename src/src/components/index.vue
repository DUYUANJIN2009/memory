<template>
    <div class="graduation-container">
        <div class="header">
            <h1>毕业纪念</h1>
            <p>青春不散场，回忆不打烊</p>
        </div>

        <div class="photo-wall">
            <Swiper :modules="[Autoplay, EffectFade]" :slides-per-view="1" :space-between="0" :loop="true" effect="fade"
                :fade-effect="{ crossFade: true }" :autoplay="{ delay: 3000, disableOnInteraction: false }" pagination>
                <SwiperSlide v-for="(img, idx) in mainPhoto" :key="idx">
                    <img :src="img" class="main-photo" />
                </SwiperSlide>
            </Swiper>
            <p class="caption">{{ mainTitle }}</p>
        </div>

        <div class="timeline">
            <div class="year-block" v-for="item in memories" :key="item.year">
                <h2>{{ item.year }}</h2>
                <ul>
                    <li v-for="m in item.events" :key="m.title" class="event-item">
                        <span>{{ m.title }}</span>
                        <div v-viewer class="images-wrapper">
                            <Swiper :slides-per-view="1" :space-between="10" pagination :loop="true">
                                <SwiperSlide v-for="(img, idx) in m.images" :key="idx">
                                    <img :src="img" class="event-image" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="messages">
            <h2>留言墙</h2>
            <div class="message-card" v-for="(msg, index) in messages" :key="index">
                <p class="from">来自：{{ msg.from }}</p>
                <p class="content">“{{ msg.content }}”</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import 'viewerjs/dist/viewer.css'
import { directive as viewerDirective } from 'v-viewer'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import img1 from '@/assets/images/image3.jpg'
import img2 from '@/assets/images/image5.jpg'
import img6 from '@/assets/images/image6.jpg'
import img71 from '@/assets/images/image71.jpg'
import img72 from '@/assets/images/image72.jpg'
import img73 from '@/assets/images/image73.jpg'
import img74 from '@/assets/images/image74.jpg'


const mainTitle = ref('2025届三年级三班')

const mainPhoto = [
    img1,
    img6,
    img71,
    img72,
    img73,
    img74
]

const memories = [
    {
        year: '2022 初一',
        events: [
            { title: '开学报到，第一次见面', images: [img1, img2] },
            { title: '春游烧烤，集体大笑', images: [img1] },
            { title: '期末考试，第一次拼搏', images: [img1] }
        ],
    },
    {
        year: '2023 初二',
        events: [
            { title: '开学报到，第一次见面', images: [img1] },
            { title: '春游烧烤，集体大笑', images: [img1] },
            { title: '期末考试，第一次拼搏', images: [img1] }
        ],
    },
    {
        year: '2024 初三',
        events: [
            { title: '开学报到，第一次见面', images: [img1] },
            { title: '春游烧烤，集体大笑', images: [img1] },
            { title: '期末考试，第一次拼搏', images: [img1] }
        ],
    },
];

const messages = [
    { from: '张明', content: '三年真的很快，愿你前程似锦！' },
    { from: '李倩', content: '下次见面，希望我们都更优秀~' },
    { from: '王伟', content: '永远记得你讲笑话的样子，哈哈哈！' },
];
</script>

<style lang="scss" scoped>
.graduation-container {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to bottom right, #fceabb, #f8b500);
    min-height: 100vh;
    padding: 30px 20px;
    color: #333;
    box-sizing: border-box;
}

.header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
        font-size: 32px;
        font-weight: bold;
        color: #4b3f72;
    }

    p {
        font-size: 18px;
        color: #6a5a95;
    }
}

.photo-wall {
    text-align: center;
    margin-bottom: 40px;

    .main-photo {
        width: 90%;
        max-width: 500px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.03);
        }
    }

    .caption {
        margin-top: 10px;
        font-style: italic;
        color: #555;
    }
}

.timeline {
    margin-bottom: 40px;

    .year-block {
        background: #fff8dc;
        margin-bottom: 20px;
        padding: 20px;
        border-left: 6px solid #ffb347;
        border-radius: 8px;

        h2 {
            margin: 0;
            color: #b35c00;
        }

        ul {
            list-style: disc;
            padding-left: 10px;
            margin: 10px 0 0;

            li {
                margin-bottom: 6px;
            }
        }

        .event-item {
            display: flex;
            align-items: left;
            margin-bottom: 12px;
            flex-direction: column;

            .images-wrapper {
                width: 100%;
                max-width: 500px;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                .event-image {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    object-fit: cover;
                }
            }

        }

    }
}

:deep(.swiper-wrapper) {
    display: flex;
    align-items: center;
}

.messages {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 20px;
        color: #333;
        text-align: center;
    }

    .message-card {
        background: #f9f1e7;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 12px;

        .from {
            font-weight: bold;
            color: #8a5d3b;
        }

        .content {
            margin-top: 6px;
            font-style: italic;
        }
    }
}
</style>