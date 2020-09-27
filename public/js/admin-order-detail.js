$("#changeDeliveryStatBtn").on("focusout",function(){
    setTimeout(()=> $("#statsToolsWrap").css("display", "none"), 100)   
});
$("#changeDeliveryStatBtn").on("click", function (){
    console.log('feewwe');
    $("#statsToolsIn").trigger('focus');
    $("#statsToolsWrap").css("display", 'block');
});

window.addEventListener("load", function(){
    setTimeout(function(){
        $("#message").css("display", "none");
    }, 5000)
})
