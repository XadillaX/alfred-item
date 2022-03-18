# Alfred Item

Wrapper for alfred workflow item in Node.js.

## Installation

```sh
$ npm install --save alfred-item
```

## Usage

First you should require this package:

```javascript
var AlfredItem = require('alfred-item');
```

Then you should `new` an item:

```javascript
var item = new AlfredItem();
```

You may add an item into it:

```javascript
item.addItem(uid, title, subtitle, arg, icon, arg, options);
```

> `uid` is the `uid` attribute of item.
>
> `arg` is optional which indicates `arg` field in output.
>
> `options` is also optional which contains several key-value pairs live as attributes in item.
>
> For an example, when options is like:
>
> ```javascript
> { autocomplete: '' }
> ```
>
> The result will be like:
>
> ```xml
> <item uid="..." autocomplete="">
>   <title>...</title>
>   <subtitle>...</subtitle>
>   <arg>...</arg>
>   <icon>...</icon>
> </item>
> ```

You may delete an item via uid:

```javascript
item.delItemViaUid(uid);
```

And you may get the XML string:

```javascript
var xml = item.output();
console.log(xml);
console.log(item);
```

## All APIs

```javascript
addItem(uid, title, subtitle, icon[, arg[, options]]);
delItemViaText(key, text);
delItemViaAttr(key, attr);
delItemViaTitle(title);
delItemViaSubtitle(subtitle);
delItemViaArg(arg);
delItemViaIcon(icon);
delItemViaUid(uid);
output();
```

## Contribute

You're welcome to make pull requests!
