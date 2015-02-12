/**
 * XadillaX created at 2015-02-12 13:10:03
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
var xml = require("xml");

var AlfredItem = function() {
    this.items = [];
};

AlfredItem.prototype.addItem = function(uid, title, subtitle, icon, options) {
    var item = {
        item: [
            { _attr: { uid: uid } }
        ]
    };

    var attr = item.item[0]._attr;
    var _item = item.item;
    _item.push({ title: title });
    _item.push({ subtitle: subtitle });
    _item.push({ icon: icon });

    options = options || {};
    for(var key in options) {
        if(!options.hasOwnProperty(key)) continue;
        attr[key] = options[key];
    }

    this.items.push(item);
};

AlfredItem.prototype.delItemViaText = function(key, text) {
    this.items = this.items.reduce(function(res, item) {
        for(var i = 1; i < item.length; i++) {
            var it = item[i];
            if(it[key] === text) {
                return res;
            }
        }

        res.push(item);
        return res;
    }, []);
};

AlfredItem.prototype.delItemViaAttr = function(key, attr) {
    this.items = this.items.reduce(function(res, item) {
        var attrs = item[0]._attr;
        if(!attrs) return res.push(item), res;
        if(attrs[key] === attr) {
            return res;
        }

        res.push(item);
        return res;
    }, []);
};

AlfredItem.prototype.delItemViaTitle = function(title) {
    this.delItemViaText("title", title);
};

AlfredItem.prototype.delItemViaSubtitle = function(subtitle) {
    this.delItemViaSubtitle("subtitle", subtitle);
};

AlfredItem.prototype.delItemViaIcon = function(icon) {
    this.delItemViaIcon("icon", icon);
};

AlfredItem.prototype.delItemViaUid = function(uid) {
    this.delItemViaAttr("uid", uid);
};

AlfredItem.prototype.output = function() {
    return xml({ items: this.items }, { declaration: true });
};

AlfredItem.prototype.inspect = AlfredItem.prototype.output;

module.exports = AlfredItem;

