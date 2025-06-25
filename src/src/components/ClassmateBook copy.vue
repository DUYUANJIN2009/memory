<template>
    <section :style="`--n: ${catsArray.length}; --k: ${currentIndex}`">
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
    </section>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    images: {
        type: Object,
        required: true
    }
})

// const cats = {
//     '张三': {
//         msg: 'Panthera tigris',
//         src: '1501705388883-4ed8a543392c',
//         desc: 'tiger in the water'
//     },
// };

function rand(max, min, prc = 2) {
    return +(min + (max - min) * Math.random()).toFixed(prc);
}

const catsArray = Object.entries(props.images).map(([name, { msg, src }]) => ({
    name,
    msg,
    src,
    angle: rand(15, -15)
}));

const currentIndex = ref(0);

function changeIndex(delta) {
    const N = catsArray.length;
    currentIndex.value = (currentIndex.value + delta + N) % N;
}
</script>

<style lang="scss" scoped>
@charset "UTF-8";

/* register these two so they can be transitioned */
/* index of previous top item during the animation
 * after another has been selected */
@property --p {
    syntax: "<number>";
    initial-value: 0;
    inherits: true;
}

/* animated index of top item from previous to current */
@property --v {
    syntax: "<number>";
    initial-value: 0;
    inherits: true;
}

* {
    margin: 0;
}

.controls {
    display: flex;
    justify-content: center;

}

section,
article,
button {
    display: grid;
}

section {
    height: 555px;
    --p: var(--k);
    --abs-p: abs(var(--k) - var(--p));
    --end: clamp(0, var(--abs-p) - 1, 1);
    --dir: calc((1 - 2*var(--end))*sign(var(--k) - var(--p)));
    --fwd: calc(.5*(1 + var(--dir)));
    --v: var(--k);
    --abs-v: abs(var(--v) - var(--p));
    --prg: calc(var(--abs-v)/(1 - var(--end) + var(--end)*(var(--n) - 1)));
    grid-template: repeat(2, max-content) 1fr max-content/max-content 1fr;
    place-self: center;
    color: #f1f5f9;
    font: 1em poppins, sans-serif;
    counter-reset: k calc(1 + var(--k)) n var(--n);
    transition: --p 0s 0.8s, --v 0.8s;
}

section::before {
    grid-area: 1/2;
    width: 3ch;
    text-align: right;
    content: counter(k) "/" counter(n);
}

@supports not (scale: Abs(-2)) {
    section {
        --abs-p: max(var(--k) - var(--p), var(--p) - var(--k));
        --abs-v: max(var(--v) - var(--p), var(--p) - var(--v));
    }
}

@supports not (scale: Sign(-2)) {
    section {
        --dir: clamp(-1, (var(--k) - var(--p))*100000, 1);
    }
}

article {
    display: flex;
    flex-direction: column;
    /* absolute value difference between 
   * currently top item index and current item index */
    --abs-top: abs(var(--k) - var(--i));
    /* not top item if the absoute value difference ≥ 1
   * top if the difference is 0 */
    --not-top: min(1, var(--abs-top));
    /* top flag is the negation */
    --top: calc(1 - var(--not-top));
    /* difference between moving image index which is 
   * previous top item index --p if going backwards, 
   * current top item index --k if going forwards 
   * and current item index --i */
    --val-mov: ((1 - var(--fwd))*var(--p) + var(--fwd)*var(--k) - var(--i));
    --abs-mov: abs(var(--val-mov));
    /* not moving image if the absoute value difference > 1
   * moving image if the difference is 0 */
    --not-mov: min(1, var(--abs-mov));
    /* moving flag is the negation */
    --mov: calc(1 - var(--not-mov));
    grid-area: 1/1/-1/-1;
    /* stack to occupy entire parent grid */
    grid-template: subgrid/subgrid;
    /* and inherit template */
    /* debatable whether z-index is the best way 
   * maybe CSS 3D transforms would be a better idea */
    /* depends on number of items, its own index and top item index */
    z-index: mod(calc(var(--n) - 1 + var(--i) - var(--k)), var(--n));
    /* transition z-index */
    transition: z-index 0.8s cubic-bezier(1, -0.9, 0, 1.9);
    /* this ridiculousness needed for Chrome without flag */
}

@supports not (scale: Abs(-2)) {
    article {
        --abs-top: max(var(--k) - var(--i), var(--i) - var(--k));
        --abs-mov: max(var(--val-mov), -1*var(--val-mov));
    }
}

h2,
em {
    color: #B9773B;
    translate: 0 calc(var(--not-top)*1lh);
    opacity: var(--top);
    transition: 0.4s calc(var(--top)*.5*0.8s);
    transition-property: translate, opacity;
}

h2 {
    grid-area: 2/2;
}

em {
    grid-area: 3/2;
}

img {
    --sin: sin(var(--prg)*.5turn);
    grid-area: 1/1/-1;
    height: 400px;
    width: 300px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.75em;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    outline: 1px dashed #ffffff;
    translate: calc(-150%*var(--mov)*sqrt(var(--sin)));
    scale: 0.87;
    rotate: calc((1 - var(--sin))*var(--a));
}

div {
    /* button wrapper */
    display: flex;
    gap: 2em;
    grid-area: 4/2;
    /* prevent button clicks during animation */
    z-index: calc((1 - min(1, var(--abs-p)))*var(--n));
}

button {
    /* prettify button */
    --sgn: -1;
    --prc: calc(var(--hov, 0)*100%);
    --c: color-mix(in hsl, #818cf8 var(--prc), #52527a);
    border: none;
    width: 1lh;
    aspect-ratio: 1;
    border-radius: 50%;
    background: RGB(from var(--c) r g b/0.2);
    color: color-mix(in hsl, #818cf8 var(--prc), currentcolor);
    font: 900 2em/1.5 sans-serif;
    transition: 0.3s ease-out;
    transition-property: background-color, color;
}

button::before {
    /* arrow, SVG likely better, whatever */
    place-self: center;
    border: solid 2px;
    border-width: 2px 2px 0 0;
    width: 35%;
    aspect-ratio: 1;
    translate: calc(var(--sgn)*-15%);
    rotate: 45deg;
    scale: var(--sgn);
    color: #fff;
    content: "";
}

button[data-inc="1"] {
    --sgn: 1;
}

button:is(:hover, :focus) {
    --hov: 1;
}
</style>