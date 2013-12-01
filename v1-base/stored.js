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
        init: function () {
            if (store.getItem("pc") === null) {
                store.clear();
                store.setItem("pc", "1");
                store.setItem("p0c", "0");

                this.add_item(0, "Scratch List");
                this.add_item(0, "Swipe right to scratch out");
                this.add_item(0, "Swipe left to undo that");
                this.add_item(0, "Tap to edit or delete");
                this.add_item(0, "Big + button to add items");
                this.add_item(0, "Your list on your phone not the server!");

            }
        },
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

var stored_test = (function () {
    "use strict";

    var setup = function () {
        localStorage.clear();
        stored.init();
        stored.add_item(0, "First");
        stored.add_item(0, "Second");
        stored.scratchItem("p0i1");
    };


    return {
        assert: function (outcome, description) {
            var li = document.createElement('li');
            li.className = outcome ? 'pass' : 'fail';
            li.appendChild(document.createTextNode(description));
            document.getElementById("output").appendChild(li);
        },

        run: function () {
            setup();
            this.assert(localStorage.length === 12, "Setup and inserts are correct");
            this.assert(localStorage.p0c === "5", "Item count is correct");
            this.assert(localStorage.p0i1s === "s", "Scratched worked");
            console.log("[TEST] Length: " + localStorage.length);
        }
    };
}());
