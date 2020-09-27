$("#repassword").on('input', function(){
    let pass =$('#password').val();
    if (pass !== $(this).val()){
        this.setCustomValidity('تکرار رمز عبور را یکسان وارد کنید.')
    }
    else if (! this.validity.valid){
        return ;
    }
    else{
        this.setCustomValidity('')
    }
})