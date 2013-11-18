notifIt!
=

Description
-
Simple notifications with JQuery

Demo
-
https://dl.dropboxusercontent.com/u/19156616/ficheros/notifIt!-1.1/index.html

Configuration
-
- **type** [String] success, error, warning, info
- **msg** [String]
- **position** [String] Left, center, right [optional]
- **width** [Integer] [optional]
- **height** [Integer] [optional]
- **autohide** [Boolean] [optional]

Example
-
````javascript
notif({
	msg: "<b>Oops!</b> A wild error appeared!",
	type: "error",
	position: "center"
});
````
