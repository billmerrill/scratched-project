/*jslint browser: true, plusplus: true*/

/**
count
page
    count
    item
        text "carrots"
        status "deleted|scratched|normal"

[pc] = "1"
[p0c] = "1"
[p0i0t] = "carrots"
[p0i0s] = "n"

condense page and item indices.

*/

var stored = (function () {
    "use strict";

    var NORMAL = "n",
        SCRATCHED = "s",
        DELETED = "d",

        store = window.localStorage,

        set_item_count = function (page, item_count) {
            store.setItem("p" + page + "c", item_count);
        },
        get_item_count = function (page) {
            return parseInt(store.getItem("p" + page + "c"), 10);
        },
        get_next_item_index = function (page) {
            return get_item_count(page);
        },
        increment_item_count = function (page) {
            var item_count = get_item_count(page);
            item_count++;
            set_item_count(page, item_count);
        },
        decrement_item_count = function (page) {
            var item_count = get_item_count(page);
            item_count--;
            set_item_count(page, item_count);
        },
        set_item = function (page, item_index, text, status) {
            var key_base = "p" + page + "i" + item_index;
            store.setItem(key_base + "t", text);
            store.setItem(key_base + "s", status);
        };


    return {
        add_item: function (page, text) {
            var item_index = get_next_item_index(page);
            set_item(page, item_index, text, NORMAL);
            increment_item_count(page);
        },
        update_item: function (item_id, text, status) {
            store.setItem(item_id + "t", text);
            store.setItem(item_id + "s", status);
        },
        delete_item: function () {
            decrement_item_count(0);
            window.alert('noop');
        },
        get_item: function (page, item) {
            var text = store.getItem("p" + page + "i" + item + "t"),
                status = store.getItem("p" + page + "i" + item + "s");
            return {text: text, status: status};
        },
        get_page: function (page) {
            var list = [],
                count = get_item_count(page),
                i;
            for (i = 0; i < count; i++) {
                list[i] = {'text': store.getItem("p" + page + "i" + i + "t"),
                           'status': store.getItem("p", page + "i" + i + "s")};
            }
            return list;
        },
        get_page_count: function () {
            return parseInt(store.getItem("pc"), 10);
        },
        scratchItem: function (index) {
            store.setItem(index + "s", SCRATCHED);
        },
        deleteItem: function (index) {
            store.setItem(index + "s", DELETED);
        },
        ennormalateItem: function (index) {
            store.setItem(index + "s", NORMAL);
        }
    };

}());