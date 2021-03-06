/*jslint browser: true, plusplus: true*/

/**
    XXX: li.textContent will fail with ie8 and below
 */

var scratched = (function () {
    "use strict";

    var input_page, input_box, the_list, current_item, delete_button,

        /* view */

        empty_list = function () {
            var i;
            for (i = 0; i < the_list.length; i++) {
                the_list.removeChild(the_list.children[0]);
            }
        },

        refresh_list_view = function () {
            var page, i;
            empty_list();
            page = stored.get_page(0);
            for (i = 0; i < page.length; i++) {
                insert_list_item(page[i]['text']);
            }
        },

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
            e.preventDefault();
            current_item = e.target;
            show_input_page();
        },

        delete_item = function () {
            delete_list_item(current_item);
            hide_input_page();
            return false;
        },

        swipe_item_left = function (vent) {
            vent.target.style.textDecoration = "none";
            vent.target.style.fontStyle = "normal";
            vent.target.style.color = "#000";
        },
        swipe_item_right = function (vent) {
            vent.target.style.textDecoration = "line-through";
            vent.target.style.fontStyle = "italic";
            vent.target.style.color = "#888";
        },
        is_able = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };

    return {
        init: function () {
            // required
            if (!is_able()) {
                alert("Web Storage is required.");
            }

            stored.init();
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
            touched.add_swipe_listener(the_list, swipe_item_left, swipe_item_right);

            // start display
            refresh_list_view();
        }
    };
}());
