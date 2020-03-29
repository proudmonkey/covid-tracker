<template>
    <div id="tipsTicker" class="ticker box mt-2">
        <article class="media">
            <span> 
                <b-icon icon="bookmark-check" scale="1.5" variant="info"></b-icon> <span class="media-content">STOP the Spread:</span>
            </span>
            <div class="media-content">
                <transition name="fade" tag="div" mode="out-in">
                    <a class="tips" href="#" v-if="tips[0]" key="0">Stay home.</a>
                    <a class="tips" href="#" v-if="tips[1]" key="1">Social Distancing.</a>
                    <a class="tips" href="#" v-if="tips[2]" key="2">Wash your hands.</a>
                    <a class="tips" href="#" v-if="tips[3]" key="3">Cover your mouth.</a>
                    <a class="tips" href="#" v-if="tips[4]" key="4">Wear facemask.</a>
                    <a class="tips" href="#" v-if="tips[5]" key="5">Avoid close contact.</a>
                    <a class="tips" href="#" v-if="tips[6]" key="6">Clean and disinfect.</a>
                </transition>
            </div>
        </article> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            tickerLocation: 0,
            tips: [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
            ]
        }
    },
    created: function() {
        setInterval(this.updateTicker, 3000);
    },
    methods: {
        updateTicker: function() {
            let removed = this.tips.pop();
            this.tips.unshift(removed);
        }
    }
}
</script>

<style scoped>
.media-content {
  padding-left: 5px;
}

.tips {
  color: #17a2b8;
  font-size:.9em;
  font-weight: 400;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>