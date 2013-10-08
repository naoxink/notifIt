notifIt!
=

Description
-
Simple notifications with JQuery

Definition
-
````javascript
notif(String notif_type, 
      String msg, 
      String position, 
      int width, 
      int height, 
      String click-to-dismiss);
````

Examples
-
````javascript
notif("success", "<b>Success:</b> In 5 seconds i'll be gone");

notif("error", "<b>Oops!</b> A wild error appeared!", "center");

notif("warning", "<b>Warning:</b> Be patient my friend.", "left");

notif("info", "<b>Info: </b>Some info here.", "center", 900, 100);

notif("error", "<b>Error: </b>This error will stay here until you click it.", "center", 500, 60, "click-to-dismiss");
````
Demo
-
https://dl.dropboxusercontent.com/u/19156616/ficheros/notifIt!-1.0/index.html
