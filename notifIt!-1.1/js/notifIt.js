/*
 * notifIt! by @naoxink
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        var package = factory(root.b);
        root.notif = package.notif;
        root.notifit_dismiss = package.notifit_dismiss;
    }
}(this, function () {
    
function notif(config) {
    var to = null;
    var defaults = {
        type: "info",
        width: 400,
        height: 60,
        position: "right",
        autohide: 1,
        msg: "This is my default message",
        opacity: 1,
        multiline: 0,
        fade: 0,
        bgcolor: "",
        color: "",
        timeout: 5000,
        zindex: null,
        offset: 0,
		callback: null,
		clickable: false
    };
    jQuery.extend(defaults, config);

	if(typeof defaults.callback !== 'function'){
		defaults.callback = null;
	}
    
    position = defaults.position;

    if (defaults.width > 0) {
        defaults.width = defaults.width;
    } else if (defaults.width === "all") {
        defaults.width = screen.width - 60;
    }

    if (defaults.height < 100 && defaults.height > 0) {
        height = defaults.height;
    }

    var div = "<div id='ui_notifIt'><p>" + defaults.msg + "</p></div>";
    jQuery("#ui_notifIt").remove();
    clearInterval(to);
    jQuery("body").append(div);

    if ( defaults.zindex ) {
        jQuery("#ui_notifIt").css("z-index", defaults.zindex);
    }

    if (defaults.multiline) {
        jQuery("#ui_notifIt").css("padding", 15);
    } else {
        jQuery("#ui_notifIt").css("height", height);
        jQuery("#ui_notifIt p").css("line-height", height + "px");
    }

    jQuery("#ui_notifIt").css("width", defaults.width);

    jQuery("#ui_notifIt").css("opacity", defaults.opacity);

    switch (defaults.type) {
        case "error":
            jQuery("#ui_notifIt").addClass("error");
            break;
        case "success":
            jQuery("#ui_notifIt").addClass("success");
            break;
        case "info":
            jQuery("#ui_notifIt").addClass("info");
            break;
        case "warning":
            jQuery("#ui_notifIt").addClass("warning");
            break;
        default:
            jQuery("#ui_notifIt").addClass("default");
            break;
    }

    jQuery("#ui_notifIt").css("background-color", defaults.bgcolor);
    
    jQuery("#ui_notifIt").css("color", defaults.color);
    
    switch (defaults.position) {
        case "left":
            jQuery("#ui_notifIt").css("left", parseInt(0 - (defaults.width + 10)));
            jQuery("#ui_notifIt").css("left", parseInt(0 - (defaults.width * 2)));
            jQuery("#ui_notifIt").animate({left: parseInt(10 + defaults.offset)});
            break;
        case "right":
            jQuery("#ui_notifIt").css("right", parseInt(0 - (defaults.width + 10)));
            jQuery("#ui_notifIt").css("right", parseInt(0 - (defaults.width * 2)));
            jQuery("#ui_notifIt").animate({right: parseInt(10 + defaults.offset)});
            break;
        case "center":
            var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
            jQuery("#ui_notifIt").css("top", parseInt(0 - (defaults.height + 10)));
            jQuery("#ui_notifIt").css("left", mid - parseInt(defaults.width / 2));
            jQuery("#ui_notifIt").animate({top: parseInt(10 + defaults.offset)});
            break;
        case "bottom":
            var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
            jQuery("#ui_notifIt").css("top", 'auto');
            jQuery("#ui_notifIt").css("bottom", parseInt(0 - (defaults.height + 10)));
            jQuery("#ui_notifIt").css("left", mid - parseInt(defaults.width / 2));
            jQuery("#ui_notifIt").animate({bottom: parseInt(10 + defaults.offset)});
            break;
        default:
            var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
            jQuery("#ui_notifIt").css("right", parseInt(0 - (defaults.width + 10)));
            jQuery("#ui_notifIt").css("left", mid - parseInt(defaults.width / 2));
            jQuery("#ui_notifIt").animate({right: parseInt(10 + defaults.offset)});
            break;
    }
    
	if(!defaults.clickable){
		jQuery("#ui_notifIt").click(function(e) {
		    e.stopPropagation();
		    notifit_dismiss(to, defaults);
		});
	}

	jQuery('body').on('click', '#ui_notifIt #notifIt_close', function() {
	    notifit_dismiss(to, defaults);
	});

    if (defaults.autohide) {
            if (!isNaN(defaults.timeout)) { // Take the timeout if is a number
                to = setTimeout(function() {
                   notifit_dismiss(to, defaults);
                }, defaults.timeout);
            }
        
    }
}

function notifit_dismiss(to, config) {
    clearInterval(to);

    if (!config.fade) {
		var animation1 = {},
			animation2 = {};
        switch(config.position){
            case "center":
				animation1 = {
                    top: parseInt(config.height - (config.height / 2))
                };
				animation2 = {
                    top: parseInt(0 - (config.height * 2))
                };
            break;
            case "bottom":
				animation1 = {
                    bottom: parseInt(config.height - (config.height / 2))
                };
				animation2 = {
                    bottom: parseInt(0 - (config.height * 2))
                };
            break;
            case "right":
				animation1 = {
                    right: parseFloat(config.width - (config.width * 0.9))
                };
				animation2 = {
                    right: parseInt(0 - (config.width * 2))
                };
            break;
            case "left":
				animation1 = {
                    left: parseFloat(config.width - (config.width * 0.9))
                };
				animation2 = {
                    left: parseInt(0 - (config.width * 2))
                };
            break;
        }
		// Execute animations		
        jQuery("#ui_notifIt").animate(animation1, 100, function() {
            jQuery("#ui_notifIt").animate(animation2, 100, function() {
                jQuery("#ui_notifIt").remove();
				if(config.callback){
					config.callback();
				}
            });
        });
    } else {
        jQuery("#ui_notifIt").fadeOut("slow", function() {
            jQuery("#ui_notifIt").remove();
			if(config.callback){
				config.callback();
			}
        });
    }
}

return {
    notif: notif,
    notifit_dismiss: notifit_dismiss
};

}));