'use strict';

const util = require('util');

const xml = require('xml');

/**
 * AlfredItem
 */
class AlfredItem {
  constructor() {
    /**
     * @type {{ item: { [key: '_attr' | 'title' | 'subtitle' | 'arg' | 'icon' | 'options']: any }[] }}
     */
    this.items = [];
  }

  /**
   * Return the items count.
   * @return {number} The items count.
   */
  count() {
    return this.items.length;
  }

  /**
   * Add an item.
   * @param {string} uid The item unique identifier.
   * @param {string} title The item title.
   * @param {string} subtitle The item subtitle.
   * @param {string} icon The item icon.
   * @param {string} [arg] The item argument.
   * @param {{ [key: string]: string | { attr: string, text: string }[] }} [options] The item options.
   */
  addItem(uid, title, subtitle, icon, arg = undefined, options = {}) {
    const item = { item: [{ _attr: { uid } }] };
    const { item: _item } = item;
    const [{ _attr: attr }] = _item;

    _item.push({ title });
    _item.push({ subtitle });
    _item.push({ icon });
    if (arg !== undefined) {
      _item.push({ arg });
    }

    options = options || {};
    for (const key in options) {
      if (!options.hasOwnProperty(key)) continue;
      if (!key.length) continue;

      if (key[0] !== '$') {
        // Normal options: { 'key': 'value' }
        attr[key] = options[key];
      } else {
        // Alter tags: { '$key': [{ attr: 'attr', text: 'text' }, ...] }
        const tagName = key.substr(1);
        const tags = options[key];
        for (const tag of tags) {
          _item.push({
            [tagName]: [{ _attr: tag.attr || {} }, tag.text ],
          });
        }
      }
    }

    this.items.push(item);
  }

  /**
   * Delete an item via item's text.
   * @param {string} key The item's key.
   * @param {string} text The item's text.
   */
  delItemViaText(key, text) {
    this.items = this.items.filter(item => {
      for (const it of item) {
        if (it[key] === text) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Delete an item via item's attribute.
   * @param {string} key The item's key.
   * @param {string} attr The item's attribute.
   */
  delItemViaAttr(key, attr) {
    this.items = this.items.filter(item => {
      const { _attr: attrs } = item[0];
      if (attrs[key] === attr) {
        return false;
      }
      return true;
    });
  }

  /**
   * Delete an item via item's title.
   * @param {string} title The item's title.
   */
  delItemViaTitle(title) {
    this.delItemViaText('title', title);
  }

  /**
   * Delete an item via item's subtitle.
   * @param {string} subtitle The item's subtitle.
   */
  delItemViaSubtitle(subtitle) {
    this.delItemViaText('subtitle', subtitle);
  }

  /**
   * Delete an item via item's arg.
   * @param {string} arg The item's arg.
   */
  delItemViaArg(arg) {
    this.delItemViaText('arg', arg);
  }

  /**
   * Delete an item via item's icon.
   * @param {string} icon The item's icon.
   */
  delItemViaIcon(icon) {
    this.delItemViaText('icon', icon);
  }

  /**
   * Delete an item via item's uid.
   * @param {string} uid The item's uid.
   */
  delItemViaUid(uid) {
    this.delItemViaAttr('uid', uid);
  }

  /**
   * Output the string.
   */
  output() {
    return xml({ items: this.items }, { declaration: true, indent: ' ' });
  }

  toString() {
    return this.output();
  }

  inspect() {
    return this.output();
  }
}

// Compatibility with newer Node.js.
const _inspect = util.inspect || {};
if (_inspect.custom) {
  AlfredItem.prototype[_inspect.custom] = AlfredItem.prototype.output;
}

module.exports = AlfredItem;
