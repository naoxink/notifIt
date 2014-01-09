notifIt!
=

#### Description
Simple notifications with JQuery.

Now you can send notifications of everything you want and when you want, simply and quickly.
Easy to learn and use. Customize with your favorite colors, define the size you want, set the opacity, make a sticky one and much more!

#### Demo [here](http://naoxink.hol.es/notifIt)

#### Configuration

Variable name|Type|Posible values|Default
---|---|---|---
type|String|success, error, warning, info|default
msg|String|Message|
position|String|left, center, right|right
width|Integer-String|Number > 0, 'all'|400
height|Integer|Number between 0 and 100|60
autohide|Boolean|true, false|true
opacity|Float|From 0 to 1|1
multiline|Boolean|true, false|false
fade|Boolean|true, false|false
bgcolor|String|HEX color|#444
color|String|HEX color|#EEE
timeout|Integer|Miliseconds|5000



#### Plug
```html
<head>
	<script type="text/javascript" src="js/notifIt.js">
	<link rel="stylesheet" type="text/css" href="css/notifIt.css">
</head>
```

#### & Play
```javascript
notif({
	msg: "<b>Oops!</b> A wild error appeared!",
	type: "error",
	position: "center"
});
```
