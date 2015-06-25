(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        var package = factory(root.b);
        root.notif = package.notif;
        root.notifit_dismiss = package.notifit_dismiss;
    }
}(this, function() {
    function notif(config) {
        // Vars
        if(!window.notifs){
            window.notifs = [];
        }
        var to = null;
        var height = 0;
        var options = {};
        var defaults = {};
        var id = new Date().getTime();
        var index = 0;
        var $ = jQuery;
        
        // METHODS
        this._init = function() {
            defaults = {
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
                clickable: false,
                append: false
            };
        }
        this._setConfig = function(config) {
            $.extend(defaults, config);
            if (typeof defaults.callback !== 'function') {
                defaults.callback = null;
            }
            this._setWidth();
            this._setHeight();
        }
        this._setWidth = function() {
            if (defaults.width > 0) {
                defaults.width = defaults.width;
            } else if (defaults.width === "all") {
                defaults.width = screen.width - 60;
            }
        }
        this._setHeight = function() {
            if (defaults.height > 100 || defaults.height < 0) {
                defaults.height = defaults.height;
            }
        }
        this._build = function() {
            var div = $('<div>', {
                id: 'ui_notifIt_' + id
            });
            var p = $('<p>', {
                html: defaults.msg
            });
            div.append(p);
            if(defaults.append){
                this._move(); // Nope :(
            }else{
                this._remove();
            }
            this._append(div);
            window.notifs.push({
                'id': id,
                'timeout': null
            });
            index = window.notifs.length - 1;
        }
        this._append = function(div){
            $('body').append(div);
        }
        this._remove = function() {
            $("div[id^=ui_notifIt]").remove();
            clearInterval(to);
        }
        this._setCss = function() {
            if (defaults.zindex) {
                $("#ui_notifIt_" + id).css("z-index", defaults.zindex);
            }
            if (defaults.multiline) {
                $("#ui_notifIt_" + id).css("padding", 15);
            } else {
                $("#ui_notifIt_" + id).css("height", defaults.height);
                $("#ui_notifIt_" + id + " p").css("line-height", defaults.height + "px");
            }
            switch (defaults.type) {
                case "error":
                    $("#ui_notifIt_" + id).addClass("error");
                    break;
                case "success":
                    $("#ui_notifIt_" + id).addClass("success");
                    break;
                case "info":
                    $("#ui_notifIt_" + id).addClass("info");
                    break;
                case "warning":
                    $("#ui_notifIt_" + id).addClass("warning");
                    break;
                default:
                    $("#ui_notifIt_" + id).addClass("default");
                    break;
            }
            $("#ui_notifIt_" + id).css("background-color", defaults.bgcolor);
            $("#ui_notifIt_" + id).css("color", defaults.color);
            $("#ui_notifIt_" + id).css("width", defaults.width);
            $("#ui_notifIt_" + id).css("opacity", defaults.opacity);
            switch (defaults.position) {
                case "left":
                    $("#ui_notifIt_" + id).css("left", parseInt(0 - (defaults.width + 10)));
                    $("#ui_notifIt_" + id).css("left", parseInt(0 - (defaults.width * 2)));
                    $("#ui_notifIt_" + id).animate({
                        left: parseInt(10 + defaults.offset)
                    });
                    break;
                case "right":
                    $("#ui_notifIt_" + id).css("right", parseInt(0 - (defaults.width + 10)));
                    $("#ui_notifIt_" + id).css("right", parseInt(0 - (defaults.width * 2)));
                    $("#ui_notifIt_" + id).animate({
                        right: parseInt(10 + defaults.offset)
                    });
                    break;
                case "center":
                    var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
                    $("#ui_notifIt_" + id).css("top", parseInt(0 - (defaults.height + 10)));
                    $("#ui_notifIt_" + id).css("left", mid - parseInt(defaults.width / 2));
                    $("#ui_notifIt_" + id).animate({
                        top: parseInt(10 + defaults.offset)
                    });
                    break;
                case "bottom":
                    var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
                    $("#ui_notifIt_" + id).css("top", 'auto');
                    $("#ui_notifIt_" + id).css("bottom", parseInt(0 - (defaults.height + 10)));
                    $("#ui_notifIt_" + id).css("left", mid - parseInt(defaults.width / 2));
                    $("#ui_notifIt_" + id).animate({
                        bottom: parseInt(10 + defaults.offset)
                    });
                    break;
                default:
                    var mid = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2;
                    $("#ui_notifIt_" + id).css("right", parseInt(0 - (defaults.width + 10)));
                    $("#ui_notifIt_" + id).css("left", mid - parseInt(defaults.width / 2));
                    $("#ui_notifIt_" + id).animate({
                        right: parseInt(10 + defaults.offset)
                    });
                    break;
            }
        }

        this._setEvents = function(){
            if (!defaults.clickable) {
                $("#ui_notifIt_" + id).click(function(e) {
                    e.stopPropagation();
                    notifit_dismiss(index, defaults);
                });
            }
            $('body').on('click', 'div[id^=ui_notifIt] #notifIt_close', function() {
                notifit_dismiss(index, defaults);
            });
            if (defaults.autohide) {
                if (!isNaN(defaults.timeout)) { // Take the timeout if is a number
                    window.notifs[index].timeout = setTimeout(function() {
                        notifit_dismiss(index, defaults);
                    }, defaults.timeout);
                }
            }
        }

        this._move = function(){
            if(window.notifs.length > 0){
                window.notifs.map(function(notif){
                    if(notif.timeout !== null){
                        $('#ui_notifIt_' + notif.id).animate({
                            top: $('#ui_notifIt_' + notif.id).offset().top + defaults.height + 10
                        }, 'fast')
                    }
                })
            }
        }

        this._init();
        this._setConfig(config);
        this._build();
        this._setCss();
        this._setEvents();

    }

    function notifit_dismiss(index, config) {

        clearTimeout(window.notifs[index].timeout);
        window.notifs[index].timeout = null;
        var id = window.notifs[index].id;


        this._removeOne = function(index){
            window.notifs.splice(index, 1)
        }

        if (!config.fade) {
            var animation1 = {},
                animation2 = {};
            switch (config.position) {
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
            $("#ui_notifIt_" + id).animate(animation1, 100, function() {
                $("#ui_notifIt_" + id).animate(animation2, 100, function() {
                    $("#ui_notifIt_" + id).remove();
                    if (config.callback) {
                        return config.callback();
                    }
                });
            });
        } else {
            $("#ui_notifIt_" + id).fadeOut("slow", function() {
                $("#ui_notifIt_" + id).remove();
                if (config.callback) {
                    return config.callback();
                }
            });
        }
    }
    return {
        notif: notif,
        notifit_dismiss: notifit_dismiss
    };
}));
