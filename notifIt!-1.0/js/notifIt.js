

var to, width, height, position, autodismiss;

function setDefaultValues(){
    // Default size
    width = 400;
    height = 60;
    
    // Default position
    position = "right";
    // Default dismiss
    autodismiss = "auto-dismiss";
}
function notif(type, msg){
    
    setDefaultValues();
    
    if(arguments[2]){
        if(arguments[2] == "center" ||
            arguments[2] == "left" ||
            arguments[2] == "right"){
            position = arguments[2]; // Take the position
        }
    }
    if(arguments[3]){
        if(arguments[3] > 0){
            width = arguments[3]; // Take the width
        }
    }
    if(arguments[4]){
        if(arguments[4] < 100 && arguments[4] > 0){
            height = arguments[4]; // Take the height
        }
    }
    if(arguments[5])
        autodismiss = arguments[5];
    
    var div = "<div id='ui_notifIt'><p>"+msg+"</p></div>";
    
    $("#ui_notifIt").remove(); // Preventive remove
    clearInterval(to); // Preventive clearInterval
    $("body").append(div);
    $("#ui_notifIt").css("height", height);
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
    
    
    switch(type){
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
    $("#ui_notifIt p").css("line-height", height+"px");

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
        dismiss();
    });

    if(autodismiss == "auto-dismiss")
        to = setTimeout(function(){dismiss();},5000);
    
}

function dismiss(){
    clearInterval(to);
    if(position == "center"){
        $("#ui_notifIt").animate({
            top: parseInt(height-(height/2))
        }, 100, function(){
            $("#ui_notifIt").animate({
                top: parseInt(0-(height*2))
            }, 100, function(){
                ("#ui_notifIt").remove();
                });
        });
    }else if(position == "right"){
        $("#ui_notifIt").animate({
            right: parseFloat(width-(width*0.9))
        }, 100, function(){
            $("#ui_notifIt").animate({
                right: parseInt(0-(width*2))
            }, 100, function(){
                ("#ui_notifIt").remove();
                });
        });
    }else if(position == "left"){
        $("#ui_notifIt").animate({
            left: parseFloat(width-(width*0.9))
        }, 100, function(){
            $("#ui_notifIt").animate({
                left: parseInt(0-(width*2))
            }, 100, function(){
                ("#ui_notifIt").remove();
                });
        });
    }
    setDefaultValues();
}