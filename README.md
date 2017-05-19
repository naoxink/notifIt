notifIt!
=

Simple notifications with JQuery.

Now you can send notifications of everything you want and when you want, simply and quickly.
Easy to learn and use. Customize with your favorite colors, define the size you want, set the opacity, make a sticky one and much more!

#### Give it a try! [Demo](http://naoxink.hol.es/notifIt)

#### Structure
```
 notifIt
 ├── css
 │   └── notifIt.css
 │   └── notifIt.min.css
 ├── demo.html
 ├── dev
 │   └── notifIt.js
 └── js
     ├── notifIt.js
     └── notifIt.min.js
```

#### Plug
```html
<head>
	<script type='text/javascript' src='js/notifIt.js'></script>
	<link rel='stylesheet' type='text/css' href='css/notifIt.css'>
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

## `notif()`

#### Configuration

Variable name|Type|Posible values|Default
---|---|---|---
type|`String`|success, error, warning, info|default
msg|`String`|Message|
position|`String`|left, center, right, bottom|right
width|`Integer`-`String`|Number > 0, 'all'|400
height|`Integer`|Number between 0 and 100|60
autohide|`Boolean`|true, false|true
opacity|`Float`|From 0 to 1|1
multiline|`Boolean`|true, false|false
fade|`Boolean`|true, false|false
bgcolor|`String`|HEX color|#444
color|`String`|HEX color|#EEE
timeout|`Integer`|Miliseconds|5000
zindex|`Integer`|The z-index of the notification|null (ignored)
offset|`Integer`|The offset in pixels from the edge of the screen|0
callback|`Function`|Function|null (ignored),
clickable|`Boolean`|true, false|false
append (dev)|`Boolean`|true, false|false


## `notif_confirm()`
### Description
Now you can ask 'yes' or 'no' easy as --
```javascript
var myCallback = function(choice){
    if(choice){
        notif({
            'type': 'success',
            'msg': 'Yeah!',
            'position': 'center'
        })
    }else{
        notif({
            'type': 'error',
            'msg': ':(',
            'position': 'center'
        })
    }
}

notif_confirm({
	'textaccept': 'Let\'s go!',
	'textcancel': 'I\'ll think about it',
	'message': 'Shall we?',
	'callback': myCallback
})
```

#### Configuration

Variable name|Type|Default|Optional
---|---|---|---
textaccept|`String`|Accept|Yes
textcancel|`String`|Cancel|Yes
message|`String`|Is that what you want to do?|Yes
callback|`Function`|null|Yes
fulllscreen|`Boolean`|false|Yes

#### Response
Function returns `true` or `false`
If callback is passed, it recieves a param `true` or `false`


## `notif_prompt()`
### Description
Ask whatever you want quick and easy
```javascript
var myCallback = function(input_value){
    if(input_value){
        notif({
            'type': 'success',
            'msg': input_value,
            'position': 'center'
        })
    }else{
        notif({
            'type': 'error',
            'msg': 'Empty or cancelled',
            'position': 'center'
        })
    }
}

notif_confirm({
	'textaccept': 'That\'s it!',
	'textcancel': 'I don\'t have a pet :(',
	'message': 'What\'s your pet\'s name?',
	'callback': myCallback
})
```

#### Configuration

Variable name|Type|Default|Optional
---|---|---|---
textaccept|`String`|Accept|Yes
textcancel|`String`|Cancel|Yes
default_value|`String`||Yes
message|`String`|Tell me something|Yes
callback|`Function`|null|Yes
fulllscreen|`Boolean`|false|Yes

#### Response
If callback is passed, it recieves a param with the input value (if accepted) or `false` (if cancelled)


# More things :)
- [bgfader](https://github.com/naoxink/bgfader)
- [Sublime text color scheme](https://github.com/naoxink/nxk-sublime-color-scheme)
- [asdText](https://github.com/naoxink/asdText)
- [View more](https://github.com/naoxink?tab=repositories)
