/*jslint browser: true*/

/**
    XXX: li.textContent will fail with ie8 and below
 */

var scratched = (function () {
    "use strict";

    var input_page, input_box, the_list, current_item,

        /* model */

        insert_list_item = function (text) {
            var new_li = document.createElement("li");
            new_li.textContent = text;
            the_list.appendChild(new_li);
        },

        update_list_item = function (text) {
            current_item.textContent = text;
        },

        /* pages */

        show_input_page = function () {
            if (current_item !== null) {
                input_box.value = current_item.innerHTML;
            }
            input_page.style.display = "block";
            input_box.focus();
        },

        hide_input_page = function () {
            input_page.style.display = "none";
        },

        /* user actions */

        cancel_input = function () {
            input_box.value = "";
            current_item = null;
            hide_input_page();
        },

        save_item = function () {
            if (current_item === null) {
                insert_list_item(input_box.value);
            } else {
                update_list_item(input_box.value);
            }
            input_box.value = "";
            current_item = null;
            hide_input_page();
            return false;
        },

        select_item = function (e) {
            current_item = e.target;
            show_input_page();
        };

    return {
        init: function () {
            // elements
            input_page = document.getElementById("input_page");
            input_box = document.getElementById("new_item_text");
            the_list = document.getElementById("scratch_list");
            current_item = null;

            // events
            document.getElementById("save_button").addEventListener("click", save_item);
            document.getElementById("plus").addEventListener("click", show_input_page);
            document.getElementById("cancel_button").addEventListener("click", cancel_input);
            the_list.addEventListener("click", select_item);

        }
    };
}());
