/*jslint browser: true*/

/**
    XXX: li.textContent will fail with ie8 and below
 */

var scratched = (function () {
    "use strict";

    var input_page, input_box, the_list, current_item, delete_button,

        /* model */

        insert_list_item = function (text) {
            var new_li = document.createElement("li");
            new_li.textContent = text;
            the_list.appendChild(new_li);
        },

        update_list_item = function (text) {
            current_item.textContent = text;
        },

        delete_list_item = function (item) {
            the_list.removeChild(item);
        },

        /* pages */

        show_input_page = function () {
            if (current_item !== null) {
                input_box.value = current_item.innerHTML;
                delete_button.style.display = "block";
            } else {
                delete_button.style.display = "none";
            }
            input_page.style.display = "block";
            input_box.focus();
        },

        hide_input_page = function () {
            input_page.style.display = "none";
            input_box.value = "";
            current_item = null;
        },

        /* user actions */

        cancel_input = function () {
            hide_input_page();
        },

        save_item = function () {
            if (current_item === null) {
                insert_list_item(input_box.value);
            } else {
                update_list_item(input_box.value);
            }
            hide_input_page();
            return false;
        },

        select_item = function (e) {
            current_item = e.target;
            show_input_page();
        },

        delete_item = function () {
            delete_list_item(current_item);
            hide_input_page();
            return false;
        },

        swipe_item_left = function () {
            console.log("[SCRATCHED] WE Swipe <~~~~~~~~~~~~");
        },
        swipe_item_right = function () {
            console.log("[SCRATCHED] WE Swipe ~~~~~~~~~~~~>");
        };

    return {
        init: function () {
            touched.init();

            // elements
            input_page = document.getElementById("input_page");
            input_box = document.getElementById("new_item_text");
            the_list = document.getElementById("scratch_list");
            delete_button = document.getElementById("delete_button");
            current_item = null;

            // events
            document.getElementById("save_button").addEventListener("click", save_item);
            document.getElementById("plus").addEventListener("click", show_input_page);
            document.getElementById("cancel_button").addEventListener("click", cancel_input);
            delete_button.addEventListener("click", delete_item);
            the_list.addEventListener("click", select_item);
            touched.swipe_watch(the_list, swipe_item_left, swipe_item_right);
        }
    };
}());
