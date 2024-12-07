<template>
    <transition name="fade">
        <div class="popup">
            <ul v-for="item in items" class="rule">
                <li class="message mb-2">{{ $t(item.text) }}</li>
            </ul>
        </div>
    </transition>
</template>

<script>
import '@/styles/common.css';

export default {
    data() {
        return {
            
        }
    },

    props:{
        items: {
            type: Array,
            required: false
        }
    },
}
</script>

<style>
.popup {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
    width: auto;
    margin-top: -25px;
    opacity: 0;
    transform: translateY(-30px);
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.rule {
  list-style-type: none;
}
</style>