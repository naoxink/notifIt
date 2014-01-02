notifIt!
=

#### Description
Simple notifications with JQuery.

Now you can send notifications of everything you want and when you want, simply and quickly.
Easy to learn and use. Customize with your favorite colors, define the size you want, set the opacity, make a sticky one and much more!

#### Demo
https://dl.dropboxusercontent.com/u/19156616/ficheros/notifIt!-1.1/index.html

#### Configuration
- **type** [String] success, error, warning, info
- **msg** [String]
- **position** [String] Left, center, right [optional]
- **width** [Integer] [optional]
- **height** [Integer] [optional]
- **autohide** [Boolean] [optional]
- **opacity** [Float] [From 0 to 1] [optional]
- **multiline** [Boolean] [optional]
- **fade** [Boolean] [optional]
- **bgcolor** [String] [optional]
- **color** [String] [optional]
- **timeout** [Integer] [optional]

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
