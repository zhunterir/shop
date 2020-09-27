function checkMinLength($pass, len){
    console.log("check");
    if ( $pass.val().length < len){
        $pass.attr("data-err-type", "minLen")
        $pass.next().css("display", "inline").text("رمز عبور باید حداقل 6 حرفی باشد");
        $pass.removeClass("valid-input").addClass("error-input");
        return false;
    }
    else {
        if ($pass.attr("data-err-type")==="minLen"){
            $pass.next().css("display","none");
            $pass.removeClass("error-input").addClass("valid-input")
        }
        return true;
    }
}
function checkMobile($input){ 
    if (!$input.val().startsWith("09") || $input.val().length !==11){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().css("display", "inline").text("شماره موبایل را درست وارد کنید");
        if ($input.prev("label")){
            $input.prev("label").css("color", "red");
        }
        $input.attr("has-error",true);
        return false;
    }
    else{   
        $input.removeClass("error-input").addClass("valid-input");
        if ($input.prev("label")){
            $input.prev("label").css("color", "black");
        }
        $input.next().css("display", "none");
        $input.removeAttr("has-error");
        return true;
    }    
}
function checkValueMissing(arr, $submitBtn){
    for (let $inp of arr){
        if ($inp.val().trim().length==0){
            $submitBtn.attr("disabled", "true");
            return false;
        }
        $submitBtn.removeAttr("disabled");
    }
}
function checkRequiredField($input){
    if ($input.val().trim()===''){
        $input.next().css("display", "inline").text("فیلد الزامی است");
        $input.removeClass("valid-input").addClass("error-input");
        if ($input.prev("label")){
            $input.prev().css("color", "red");
        }
        $input.attr("has-error", true)
        return false;
    }
    else{
        $input.next().css("display", "none");
        if ($input.prev("label")){
            $input.prev().css("color", "black");
        }
        $input.removeClass("error-input");
        $input.removeAttr("has-error")
        return true;
    }
}
function checkAbsLength($input, len){
    if ($input.val().length !== len){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد ملی 10 رقمی وارد کنید").css("display","inline");
        $input.attr("data-err-type", "absLength");
        $input.attr("has-error",true)
        return false;
    }
    else{
        if  ($input.attr("data-err-type")==="absLength"){
            $input.next().css("display", "none");
            $input.removeClass("error-input").addClass("valid-input");
        }
        $input.removeAttr("has-error")
        return true;
    }
}
function checkPostalCode($input){
    if($input.val().indexOf("-")!==-1){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد پستی را بدون خط تیره وارد کنید").css("display","inline"); 
        $input.attr("has-error", true);
        $input.prev("label").css("color", 'red')
        return false;
    }
    else if ($input.val().length !== 10){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد پستی 10 رقمی وارد کنید").css("display","inline");
        if ($input.prev("label")){
            $input.prev().css("color", "red");
        }
        $input.attr("has-error", true)
        return false;
    }
    
    else{
        $input.next().css("display", "none");
        if ($input.prev("label")){
            $input.prev().css("color", "black")
        }
        $input.removeClass("error-input").addClass("valid-input");
        $input.removeAttr("has-error");
        return true;
    }
}
function checkMelli($input){
    if($input.val().indexOf("-")!==-1){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد ملی را بدون خط تیره وارد کنید").css("display","inline");
        $input.prev("label").css("color","red")
        $input.attr("has-error", true);
        return false;
    }
    else if ($input.val().length !== 10){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد ملی 10 رقمی وارد کنید").css("display","inline");
        if ($input.prev("label")){
            $input.prev().css("color", "red");
        }
        $input.attr("has-error", true);
        return false;
    }
    
    else{
      
        $input.next().css("display", "none");
        if ($input.prev("label")){
            $input.prev().css("color", "black")
        }
        $input.removeAttr("has-error")
        $input.removeClass("error-input").addClass("valid-input");
        return true;
    }
}

function checkEmail($email){
    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($email.val())){
        console.log("invalid");
        $email.removeClass("valid-input").addClass("error-input");
        $email.next().css("display", "inline").text("ایمیل را درست وارد کنید");
        return false
    }
    else{
        $email.removeClass("error-input").addClass("valid-input");
        $email.next().css("display", "none");
        return true;
    }
}

function checkPassSame($rePass, $pass){
    if (!($rePass.val()===$pass.val())){
        $rePass.next().css("display", "inline").text("رمز عبور را یکسان وارد کنید.");
        $rePass.removeClass("valid-input").addClass("error-input");
        $rePass.attr("data-err-type", "notSame")
        return false;
    }
    else{
        if ($rePass.attr("data-err-type")==="notSame"){
            $rePass.addClass("valid-input").removeClass("error-input");
            $rePass.next().css("display", "none");
        }
        return true;
    }
}
$("#postalAddressIn").on("focusout", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this));
        $(this).on("input", function(){ checkRequiredField($(this))})
    }
})

$("#addrModalShow").on("click", function(){
    let info  = $($(this).attr("data-target")).find("span.address-info").html();
    let obj = JSON.parse(info);
    for (let field in obj){
        if (field=="ostan" || field=="city"){
            console.log("DWq");
            $(`#editAddrModal select[name=${field}]`).find("option[selected]").removeAttr("selected")
            $(`#editAddrModal select[name=${field}]`).find(`option[value~=${obj[field]}]`).attr("selected",true);
            console.log(obj[field]); 
            // .attr("selected", 'true');
        }
        else{
            $(`#editAddrModal input[name=${field}]`).val(obj[field]);
        }
    }
    console.log(info);
    $("#editAddrModal").modal("show");
});

$("#postalCodeIn").on("focusout",function(){
    console.log("wfqw");
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this)) && checkPostalCode($(this));
        $(this).on("input", function(){ checkRequiredField($(this)) && checkPostalCode($(this))})
    }
})
$("#pelakIn").on("focusout",function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this));
        $(this).on("input", function(){ checkRequiredField($(this))})
    }
})
$("#receiverFirstName").on("focusout", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this));
        $(this).on("input", function(){ checkRequiredField($(this))})
    }
})
$("#receiverLastName").on("focusout", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this));
        $(this).on("input", function(){ checkRequiredField($(this))})
    }
})
$("#receiverMelli").on("focusout", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this)) && checkMelli($(this));
        $(this).on("input", function(){ 
            checkRequiredField($(this)) && checkMelli($(this));
        })
    }
})
$("#receiverMobile").on("focusout", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkRequiredField($(this)) && checkMobile($(this));
        $(this).on("input", function(){ checkRequiredField($(this)) && checkMobile($(this))})
    }
});

$("#addrSubmit").on("click", function(){
    if (!$("#addrSubmit").data("clicked")){
        $("#ostanIn").on("input", function(){
            checkRequiredField($(this))
        })
        $("#cityIn").on("input", function(){
            checkRequiredField($(this));
        })
    }
    if (checkRequiredField($("#ostanIn")) & checkRequiredField($("#cityIn")) & checkRequiredField($("#postalCodeIn")) &
    checkRequiredField($("#postalAddressIn")) & checkRequiredField($("#pelakIn")) & checkRequiredField($("#receiverFirstName"))
    & checkRequiredField($("#receiverLastName")) & checkRequiredField($("#receiverMobile")) & checkRequiredField($("#receiverMelli"))
    & checkMobile($("#receiverMobile")) & checkPostalCode($("#postalCodeIn")) & checkMelli($("#receiverMelli"))){
        console.log('ok');
        $("#editAddrModal").one("hidden.bs.modal", ()=> $("#loadingModal").modal("show"));
        $("#editAddrModal").modal("hide")
        setTimeout( function(){
            $("#loadingModal").modal("hide")
        }, 7000);
    }
    else{
        console.log('false');
    }
});

