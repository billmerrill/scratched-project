/*jslint browser: true*/

var scratched = (function () {
    "use strict";

    var input_page, input_box, the_list,

        /* model */

        insert_list_item = function (text) {
            the_list.innerHTML += "<li>" + text + "</li>";
        },

        /* pages */

        show_input_page = function () {
            input_page.style.display = "block";
            input_box.focus();
        },

        hide_input_page = function () {
            input_page.style.display = "none";
        },

        /* user actions */

        cancel_input = function () {
            input_box.value = "";
            hide_input_page();
        },

        save_item = function () {
            insert_list_item(input_box.value);
            input_box.value = "";
            hide_input_page();
            return false;
        };

    return {
        init: function () {
            // elements
            input_page = document.getElementById("input_page");
            input_box = document.getElementById("new_item_text");
            the_list = document.getElementById("scratch_list");

            // events
            document.getElementById("save_button").addEventListener("click", save_item);
            document.getElementById("plus").addEventListener("click", show_input_page);
            document.getElementById("cancel_button").addEventListener("click", cancel_input);
        }
    };
}());