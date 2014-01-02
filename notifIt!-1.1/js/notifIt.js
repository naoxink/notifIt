

var to, width, height, position, autohide, opacity, time;

function notifit_setDefaultValues(){
    width = 400;
    height = 60;
    position = "right";
    autohide = true;
	msg = "";
	opacity = 1; // Default opacity (Only Chrome, Firefox and Safari)
	multiline = false;
	fade = false;
	bgcolor = "#444";
	color = "#EEE";
	time = 5000;
}
function notif(config){
    
    notifit_setDefaultValues();

    if(config.position){
        if(config.position == "center" ||
            config.position == "left" ||
            config.position == "right"){
            position = config.position; // Take the position
        }
    }
    if(config.width){
        if(config.width > 0){
            width = config.width; // Take the width in pixels
        }else if(config.width === "all"){
			width = screen.width - 60; // Margin difference
		}
    }
	if(config.fade){ fade = config.fade; }
	if(config.multiline){ multiline = config.multiline; }
    if(config.height){
        if(config.height < 100 && config.height > 0){
            height = config.height; // Take the height in pixels
        }
    }
	if(typeof config.autohide !== "undefined")
	    autohide = config.autohide;
    var div = "<div id='ui_notifIt'><p>"+((config.msg) ? config.msg : "")+"</p></div>";
    $("#ui_notifIt").remove();// Preventive remove
    clearInterval(to); // Preventive clearInterval
    $("body").append(div);
	if(multiline){
		$("#ui_notifIt").css("padding", 15);
	}else{
		$("#ui_notifIt").css("height", height);
	    $("#ui_notifIt p").css("line-height", height+"px");
	}
    $("#ui_notifIt").css("width", width);
    switch(position){
        case "center":
            $("#ui_notifIt").css("top", parseInt(0-(height+10)));
            break;
        case "right":
            $("#ui_notifIt").css("right", parseInt(0-(width+10)));
            break;
        case "left":
            $("#ui_notifIt").css("left", parseInt(0-(width+10)));
            break;
        default:
            $("#ui_notifIt").css("right", parseInt(0-(width+10)));
            break;
    }
	if(config.opacity){ $("#ui_notifIt").css("opacity", config.opacity); }
    switch(config.type){
        case "error":
            $("#ui_notifIt").addClass("error");
            break;
        case "success":
            $("#ui_notifIt").addClass("success");
            break;
        case "info":
            $("#ui_notifIt").addClass("info");
            break;
        case "warning":
            $("#ui_notifIt").addClass("warning");
            break;
        default:
            $("#ui_notifIt").addClass("default");
            break;
    }
	// Override color if given
	if(config.bgcolor){
		$("#ui_notifIt").css("background-color", config.bgcolor);
	}
	if(config.color){
		$("#ui_notifIt").css("color", config.color);
	}
    switch(position){
        case "left":
            $("#ui_notifIt").css("left", parseInt(0-(width*2)));
            break;
        case "right":
            $("#ui_notifIt").css("right", parseInt(0-(width*2)));
            break;
        case "center":
            var mid = window.innerWidth / 2;
            $("#ui_notifIt").css("left", mid-parseInt(width/2));
            break;
        default:
            var mid = window.innerWidth / 2;
            $("#ui_notifIt").css("left", mid-parseInt(width/2));
            break;
    }
    switch(position){
        case "center":
            $("#ui_notifIt").animate({top: 10});
            break;
        case "right":
            $("#ui_notifIt").animate({right: 10});
            break;
        case "left":
            $("#ui_notifIt").animate({left: 10});
            break;
        default:
            $("#ui_notifIt").animate({right: 10});
            break;
    }
    $("#ui_notifIt").click(function(){
        notifit_dismiss();
    });
    if(autohide){
    	if(config.timeout){
    		if(!isNaN(config.timeout)){
    			time = config.timeout;
    		}
    	}
        to = setTimeout(function(){notifit_dismiss();},time);
	}
}

function notifit_dismiss(){
    clearInterval(to);
	if(!fade){
		if(position == "center"){
		    $("#ui_notifIt").animate({
		        top: parseInt(height-(height/2))
		    }, 100, function(){
		        $("#ui_notifIt").animate({
		            top: parseInt(0-(height*2))
		        }, 100, function(){
		            $("#ui_notifIt").remove();
		            });
		    });
		}else if(position == "right"){
		    $("#ui_notifIt").animate({
		        right: parseFloat(width-(width*0.9))
		    }, 100, function(){
		        $("#ui_notifIt").animate({
		            right: parseInt(0-(width*2))
		        }, 100, function(){
		            $("#ui_notifIt").remove();
		            });
		    });
		}else if(position == "left"){
		    $("#ui_notifIt").animate({
		        left: parseFloat(width-(width*0.9))
		    }, 100, function(){
		        $("#ui_notifIt").animate({
		            left: parseInt(0-(width*2))
		        }, 100, function(){
		            $("#ui_notifIt").remove();
		            });
		    });
		}
	}else{
		$("#ui_notifIt").fadeOut("slow", function(){
			$("#ui_notifIt").remove();
		});
	}
    notifit_setDefaultValues();
}