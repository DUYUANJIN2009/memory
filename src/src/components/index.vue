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

        <!-- 旋转照片 -->
        <div class="photo-movie-x">
            <div class="photo-movie">
                <div class="text-bg">
                    <img :src="xingchendahai" alt="">
                </div>
                <PhotoCarousel :images="imgMovies" />
            </div>
        </div>

        <div class="messages" style="position: relative;">
            <div class="header">
                <h1>毕业留言簿</h1>
                <p>同窗数载，情谊长存。每一句祝福都是青春最珍贵的记忆。</p>
            </div>
            <ClassmateBook :images="classmates" @next="handleNext" @prev="handlePrev" />
            <Messages ref="messagesRef" :messages="classmates" />
            <!-- <div class="message-card" v-for="(msg, index) in messages" :key="index">
                <p class="from">来自：{{ msg.from }}</p>
                <p class="content">“{{ msg.content }}”</p>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

import PhotoCarousel from './PhotoCarousel.vue'
import ClassmateBook from './ClassmateBook.vue'
import Messages from './Messages.vue'

const messagesRef = ref(null)
import 'viewerjs/dist/viewer.css'
import { directive as viewerDirective } from 'v-viewer'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import xingchendahai from '@/assets/images/xingchengdahai.png'

import img1 from '@/assets/images/image1.jpg'
import img12 from '@/assets/images/image12.jpg'
import img13 from '@/assets/images/image13.jpg'
import img14 from '@/assets/images/image14.jpg'
import img15 from '@/assets/images/image15.jpg'
import img16 from '@/assets/images/image16.jpg'
import img17 from '@/assets/images/image17.jpg'
import img18 from '@/assets/images/image18.jpg'
import img19 from '@/assets/images/image19.jpg'
import img20 from '@/assets/images/image20.jpg'
import img21 from '@/assets/images/image21.jpg'
import img22 from '@/assets/images/image22.jpg'
import img23 from '@/assets/images/image23.jpg'
import img24 from '@/assets/images/image24.jpg'
import img25 from '@/assets/images/image25.jpg'
import img26 from '@/assets/images/image26.jpg'
import img27 from '@/assets/images/image27.jpg'
import img28 from '@/assets/images/image28.jpg'
import img29 from '@/assets/images/image29.jpg'
import img3 from '@/assets/images/image3.jpg'
import img30 from '@/assets/images/image30.jpg'
import img31 from '@/assets/images/image31.jpg'
import img32 from '@/assets/images/image32.jpg'
import img33 from '@/assets/images/image33.jpg'
import img34 from '@/assets/images/image34.jpg'
import img35 from '@/assets/images/image35.jpg'
import img36 from '@/assets/images/image36.jpg'
import img37 from '@/assets/images/image37.jpg'
import img38 from '@/assets/images/image38.jpg'
import img39 from '@/assets/images/image39.jpg'
import img4 from '@/assets/images/image4.jpg'
import img40 from '@/assets/images/image40.jpg'
import img41 from '@/assets/images/image41.jpg'
import img42 from '@/assets/images/image42.jpg'
import img43 from '@/assets/images/image43.jpg'
import img44 from '@/assets/images/image44.jpg'
import img45 from '@/assets/images/image45.jpg'
import img46 from '@/assets/images/image46.jpg'
import img47 from '@/assets/images/image47.jpg'
import img48 from '@/assets/images/image48.jpg'
import img49 from '@/assets/images/image49.jpg'
import img5 from '@/assets/images/image5.jpg'
import img50 from '@/assets/images/image50.jpg'
import img51 from '@/assets/images/image51.jpg'
import img52 from '@/assets/images/image52.jpg'
import img53 from '@/assets/images/image53.jpg'
import img54 from '@/assets/images/image54.jpg'
import img55 from '@/assets/images/image55.jpg'
import img56 from '@/assets/images/image56.jpg'
import img57 from '@/assets/images/image57.jpg'
import img58 from '@/assets/images/image58.jpg'
import img59 from '@/assets/images/image59.jpg'
import img6 from '@/assets/images/image6.jpg'
import img60 from '@/assets/images/image60.jpg'
import img61 from '@/assets/images/image61.jpg'
import img62 from '@/assets/images/image62.jpg'
import img63 from '@/assets/images/image63.jpg'
import img68 from '@/assets/images/image68.jpg'
import img69 from '@/assets/images/image69.jpg'
import img7 from '@/assets/images/image7.jpg'
import img71 from '@/assets/images/image71.jpg'
import img72 from '@/assets/images/image72.jpg'
import img73 from '@/assets/images/image73.jpg'
import img74 from '@/assets/images/image74.jpg'
import img75 from '@/assets/images/image75.jpg'
import img76 from '@/assets/images/image76.jpg'
import img78 from '@/assets/images/image78.jpg'
import img79 from '@/assets/images/image79.jpg'
import img80 from '@/assets/images/image80.jpg'
import img82 from '@/assets/images/image82.jpg'
import img83 from '@/assets/images/image83.jpg'
import img84 from '@/assets/images/image84.jpg'
import img85 from '@/assets/images/image85.jpg'

import person1 from '@/assets/images/personal/image1.jpg'

import person4  from '@/assets/images/personal/image4.jpg'
import person5  from '@/assets/images/personal/image5.jpg'
import person6  from '@/assets/images/personal/image6.jpg'
import person7  from '@/assets/images/personal/image7.jpg'
import person8  from '@/assets/images/personal/image8.jpg'
import person9  from '@/assets/images/personal/image9.jpg'
import person10  from '@/assets/images/personal/image10.jpg'
import person11  from '@/assets/images/personal/image11.jpg'

import person13  from '@/assets/images/personal/image13.jpg'
import person14  from '@/assets/images/personal/image14.jpg'
import person15  from '@/assets/images/personal/image15.jpg'

import person17  from '@/assets/images/personal/image17.jpg'

import person19  from '@/assets/images/personal/image19.jpg'

const allImage = [
    { src: img1, name: 'image1' },
    { src: img12, name: 'image12' },
    { src: img13, name: 'image13' },
    { src: img14, name: 'image14' },
    { src: img15, name: 'image15' },
    { src: img16, name: 'image16' },
    { src: img17, name: 'image17' },
    { src: img18, name: 'image18' },
    { src: img19, name: 'image19' },
    { src: img20, name: 'image20' },
    { src: img21, name: 'image21' },
    { src: img22, name: 'image22' },
    { src: img23, name: 'image23' },
    { src: img24, name: 'image24' },
    { src: img25, name: 'image25' },
    { src: img26, name: 'image26' },
    { src: img27, name: 'image27' },
    { src: img28, name: 'image28' },
    { src: img29, name: 'image29' },
    { src: img3, name: 'image3' },
    { src: img30, name: 'image30' },
    { src: img31, name: 'image31' },
    { src: img32, name: 'image32' },
    { src: img33, name: 'image33' },
    { src: img34, name: 'image34' },
    { src: img35, name: 'image35' },
    { src: img36, name: 'image36' },
    { src: img37, name: 'image37' },
    { src: img38, name: 'image38' },
    { src: img39, name: 'image39' },
    { src: img4, name: 'image4' },
    { src: img40, name: 'image40' },
    { src: img41, name: 'image41' },
    { src: img42, name: 'image42' },
    { src: img43, name: 'image43' },
    { src: img44, name: 'image44' },
    { src: img45, name: 'image45' },
    { src: img46, name: 'image46' },
    { src: img47, name: 'image47' },
    { src: img48, name: 'image48' },
    { src: img49, name: 'image49' },
    { src: img5, name: 'image5' },
    { src: img50, name: 'image50' },
    { src: img51, name: 'image51' },
    { src: img52, name: 'image52' },
    { src: img53, name: 'image53' },
    { src: img54, name: 'image54' },
    { src: img55, name: 'image55' },
    { src: img56, name: 'image56' },
    { src: img57, name: 'image57' },
    { src: img58, name: 'image58' },
    { src: img59, name: 'image59' },
    { src: img6, name: 'image6' },
    { src: img60, name: 'image60' },
    { src: img61, name: 'image61' },
    { src: img62, name: 'image62' },
    { src: img63, name: 'image63' },
    { src: img68, name: 'image68' },
    { src: img69, name: 'image69' },
    { src: img7, name: 'image7' },
    { src: img71, name: 'image71' },
    { src: img72, name: 'image72' },
    { src: img73, name: 'image73' },
    { src: img74, name: 'image74' },
    { src: img75, name: 'image75' },
    { src: img76, name: 'image76' },
    { src: img78, name: 'image78' },
    { src: img79, name: 'image79' },
    { src: img80, name: 'image80' },
    { src: img82, name: 'image82' },
    { src: img83, name: 'image83' },
    { src: img84, name: 'image84' },
    { src: img85, name: 'image85' }
]

const imgMovies = ref([
    img1,
    img12,
    img6,
    img71,
    img72,
    img73,
    img74,
    img12,
    img6,
    img71,
    img72,
    img73,
    img74
])

const classmates = reactive({
    '董涵宇': {
        msg: '河马真帅',
        src: person1,
    },
    '李梦涵': {
        msg: '×&%￥#@（←此处省略豆包生成的）…… 无论走到哪里，请记得：山高水长，怕什么来不及，慌什么到不了，人生自有花期。（哈哈哈，豆包太给力了……）',
        src: img71,
    },
    '倪依琪': {
        msg: '大家好，我们一起度过了三年，有喜怒哀乐，有悲欢离合，在这里祝大家天天开心，前程似锦，毕业快乐。',
        src: person11,
    },
    '金子涵': {
        msg: '毕业不是终点，我们顶峰相见！',
        src: person4,
    },
    '冯思齐': {
        msg: '愿你在人生的旅途中，始终保持初心，勇敢前行。',
        src: person5,
    },
    '王雨洁': {
        msg: '永远做自己的太阳让自己充满晴天 许你自由 愿你无忧',
        src: person6,
    },
    '周莹': {
        msg: '笔渡星霜未改色 ，舟过山海自长明',
        src: person7,
    },
    '邓国强': {
        msg: '你好',
        src: person8,
    },
    '施从余': {
        msg: '毕业是短暂的告别，愿我们在更高处重逢。',
        src: person9,
    },
    '宣胜煌': {
        msg: '祝大家过自己想要的生活吧，然后开心最重要',
        src: person10,
    },
    '顾欣彤': {
        msg: '初中生活即将画上句号，但我们的友情永远不会结束。愿你在未来的日子里，继续保持对生活的热爱和对理想的执着。无论遇到什么困难，都要相信自己，勇敢前行。我会永远记得你的好，也期待你未来的精彩！',
        src: img1,
    },
    '戴诗涵': {
        msg: '我们都能拥有我们心中的美好生活！',
        src: person13,
    },
    '夏启焱': {
        msg: 'Happy every day!',
        src: person14,
    },
    '翟仕博': {
        msg: '我爱Ghost，keengan，Koing，加强青水，（随便说几句）希望各位在后面的时间里呢开心，快乐，做最好自己，还有我爱Ghost',
        src: person15,
    },
    '冯煜哲': {
        msg: '还没过过父亲节',
        src: img1,
    },
    '章菲涵': {
        msg: '万语难尽涩于口，祈尔繁芜常盛夏愿此去披荆斩棘，诸事顺利，万事顺遂',
        src: person17,
    },
    '严基瑞': {
        msg: '三年并肩，少年远航。愿携星光，奔赴下一程晴朗。',
        src: img1,  
    },
    '舒湘芙': {
        msg: '阿巴阿巴阿巴',
        src: person19,
    },

})

const handleNext = () => {
    if (messagesRef.value) {
        messagesRef.value.nextMessage()
    }
}
const handlePrev = () => {
    if (messagesRef.value) {
        messagesRef.value.prevMessage()
    }
}
const mainTitle = ref('2025届三年级三班')

const mainPhoto = [
    img3,
    img5,
    img6,
    img50,
    img69,
    img71,
    img72,
    img73,
    img74
]

const memories = [
    {
        year: '2022 初一',
        events: [
            { title: '开学报到，第一次见面', images: [img1, img12] },
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

// const messages = ref([
//     { from: '张明', content: '三年真的很快，愿你前程似锦！' },
//     { from: '李倩', content: '下次见面，希望我们都更优秀~' },
//     { from: '王伟', content: '永远记得你讲笑话的样子，哈哈哈！' },
// ]);
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
    margin-bottom: 20px;

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

.photo-movie-x {
    position: relative;
    width: 100%;
    padding: 150px 0px;
    margin-bottom: 10px;

    .photo-movie {
        position: absolute;
        left: 0px;
        margin-left: -19px;
        top: 0px;
        width: calc(100% + 38px);
        height: 300px;

        .text-bg {
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-60%);

            img {
                width: 100%;
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
    margin-bottom: 30px;

    .header {
        text-align: center;
        margin-bottom: 40px;

        h1 {
            font-size: 36px;
            font-weight: bold;
            color: #4b3f72;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        p {
            font-size: 18px;
            color: #6a5a95;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }
    }


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