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
        return false;
    }
    else{   
        $input.removeClass("error-input").addClass("valid-input");
        $input.next().css("display", "none");
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
function checkAbsLength($input, len){
    if ($input.val().length !== len){
        $input.removeClass("valid-input").addClass("error-input");
        $input.next().text("کد ملی 10 رقمی وارد کنید").css("display","inline");
        $input.attr("data-err-type", "absLength");
        return false;
    }
    else{
        if  ($input.attr("data-err-type")==="absLength"){
            $input.next().css("display", "none");
            $input.removeClass("error-input").addClass("valid-input");
        }
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
$("#rePassIn").on("change", function(){
    if (!$(this).data("changed")){
        checkPassSame($(this), $("#newPassIn"));
        checkMinLength($(this), 6);
        $(this).on("input", ()=>{
            checkPassSame($(this), $("#newPassIn"));
            checkMinLength($(this), 6); 
        });
        $("#newPassIn").on("input", function(){checkPassSame($("#rePassIn"), $(this))}); 
        $(this).data("changed", true);
    }
    
});

$("#passSubmit").on("click", ()=>{
    let $newPass = $("#newPassIn");
    let $rePass = $("#rePassIn");
    if (checkPassSame($rePass, $newPass) & checkMinLength($newPass,6) & checkMinLength($rePass,6)){
        console.log("ready");
        $("#editPasswordModal").one("hidden.bs.modal", function(){
            $("#loadingModal").modal({backdrop:"static"});
        })
        $("#editPasswordModal").modal("hide");
        let timer = setTimeout(function(){
            $("#loadingModal").modal("hide");
        }, 6000)
        return true;
    }
    else{
        return false;
    }
});
$("#nameSubmit").on("click", ()=>{
        console.log("ready");
    $("#editNameModal").one("hidden.bs.modal", function(){
        $("#loadingModal").modal({backdrop:"static"});
    })
    $("#editNameModal").modal("hide");
    let timer = setTimeout(function(){
        $("#loadingModal").modal("hide");
    }, 6000)
    return true;
});

$("#mobileSubmit").on("click", ()=>{
    
    if (checkMobile($("#mobileIn"))){
        console.log("ready");
        $("#editMobileModal").one("hidden.bs.modal", function(){
            $("#loadingModal").modal({backdrop:"static"});
        })
        $("#editMobileModal").modal("hide");
        let timer = setTimeout(function(){
            $("#loadingModal").modal("hide");
        }, 6000)
        return true;
    }
    else{
        return false;
    }
});
$("#emailSubmit").on("click", function(){
    if (checkEmail($("#emailIn"))){
        console.log("ok");
        $("#editEmailModal").one("hidden.bs.modal", function(){
            $("#loadingModal").modal({backdrop:"static"});
        });
        $("#editEmailModal").modal("hide");
        let timer = setTimeout(function(){
            $("#loadingModal").modal("hide");
        }, 6000)
    }
})
$("#melliSubmit").on("click", function(){
    if (checkAbsLength($("#melliIn"), 10)){
        console.log("ok");
        $("#editMelliModal").one("hidden.bs.modal", function(){
            $("#loadingModal").modal({backdrop:"static"});
        });
        $("#editMelliModal").modal("hide");
        let timer = setTimeout(function(){
            $("#loadingModal").modal("hide");
        }, 6000)
    }
})
$("#newPassIn").on("change", function(){
    if (! $(this).data("minCheckActivated")){
        checkMinLength($(this), 6);
        console.log($(this).data("minCheckActivated"));
        $(this).on("input",()=> checkMinLength($(this), 6));
        $(this).data("minCheckActivated", true);
    }
});

$("#melliIn").on("change", function(){
    if (!$(this).data("changed")){
        checkAbsLength($(this), 10);
        $(this).data("changed", true);
        $(this).on("input", function(){checkAbsLength($(this), 10)});
    }
})

$("#mobileIn").on("change", function(){
    if (!$(this).data("changed")){
        $(this).data("changed", true);
        checkMobile($(this));
        $(this).on("input", function(){checkMobile($(this))});
    }
})
$("#nameIn").on("input", function(){
    if ($(this).val().length !==0){
        $("#nameSubmit").removeAttr("disabled");
    }
    else{
        $("#nameSubmit").attr("disabled", "true");
    }
})

$("#emailIn").on("change", function(){
    if (! $(this).data("changed")){
        $(this).data("changed", true);
        checkEmail($(this));
        $(this).on("input", function(){
           checkEmail($(this));
        })
    }
})

$("#mobileIn").on("input", function(){
    checkValueMissing([$(this)], $("#mobileSubmit"));
})
$("#emailIn").on("input", function(){
    checkValueMissing([$(this)], $("#emailSubmit"));
})

$("#melliIn").on("input", function(){
    checkValueMissing([$(this)], $("#melliSubmit"));
})
$("#currentPassIn").on("input", function(){
    checkValueMissing([$(this), $("#rePassIn"), $("#newPassIn")], $("#passSubmit"));
});
$("#rePassIn").on("input", function(){
    checkValueMissing([$(this), $("#currentPassIn"), $("#newPassIn")], $("#passSubmit"));
});
$("#newPassIn").on("input", function(){
    checkValueMissing([$(this), $("#rePassIn"), $("#currentPassIn")], $("#passSubmit"));
});


