/*jslint browser: true*/

var touched = (function () {
    "use strict";

    var MIN_SWIPE_LENGTH = 50;
    var swipers, touching,

        start_swipe_watch = function (vent) {
            /* we are now monitoring a swipe in progress.  find the registered item, save the fact we have touched it */
            var idx = -1;
            if (vent.touches.length == 1) {
                // which swiper
                for (idx in swipers) {
                    if (swipers[idx]['element'] == vent.currentTarget) {
                        touching = { element: vent.target, start_x: vent.touches[0].clientX, start_y: vent.touches[0].clientY, swiper: idx};
                        break;
                    }
                }
            }

        },

        end_swipe_watch = function (vent) {
            var horizontal_diff, swipe_left = true;
            if (touching !== null) {
                horizontal_diff = touching['start_x'] - vent.changedTouches[0].clientX;
                if (horizontal_diff > 0) {
                    swipe_left = false;
                }
                console.log("horizontal_difference was " + horizontal_diff);
                if (Math.abs(horizontal_diff) > MIN_SWIPE_LENGTH) {
                    if (swipe_left) {
                        console.log("[TOUCHED]         Swipe left");
                        swipers[touching['swiper']]['left_callback'](vent);
                    } else {
                        swipers[touching['swiper']]['right_callback'](vent);
                        console.log("[TOUCHED]         Swipe right");
                    }
                }
                touching = null;
            }
        };


    return {

        init: function () {
            touching = null;
            swipers = [];
        },


        touch_start: function (vent) {
            console.log("[TOUCHED] START touch");
            start_swipe_watch(vent);
        },

        touch_end: function (vent) {
            console.log("[TOUCHED] END touch");
            end_swipe_watch(vent);
        },

        touch_move: function (vent) {
            console.log("[TOUCHED]   MOVE touch. touch list: " + vent.targetTouches.length);
        },

        touch_cancel: function (vent) {
            console.log("[TOUCHED]   CANCEL touch");
        },

        touch_leave: function (vent) {
            console.log("[TOUCHED]    LEAVE touch");
        },

        add_swipe_listener: function (swipe_element, right_callback, left_callback) {
            console.log("[TOUCHED] Starting monitoring of " + swipe_element.id);
            swipe_element.addEventListener("touchstart", this.touch_start);
            swipe_element.addEventListener("touchend", this.touch_end);
            swipers.push({element: swipe_element, right_callback: right_callback, left_callback: left_callback});
        }

    };
}());