$(document).ready(function(){
    $('#click').click(()=>{
        $('emailvalidation').hide();
        $('usernamevalidation').hide();
        $("#box").fadeIn();
        $("#box").fadeIn("slow");
        $("#box").fadeIn(5000);
        $('#box').toggle();
    })

    var username_error=true;
    var email_validation_error=true;

    $('#username').keyup(function(){
        username_validation();
    });

    function username_validation(){
        var username_val = $('#username').val();
        if(username_val.length==""){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('username cannot be empty');
            $('#usernamevalidation').css('color', 'red');
            $('#usernamevalidation').css('font-weight', 'bold');
            username_error=true;
        }
        else{
            $('#usernamevalidation').hide()
        }

        if(username_val.length < 3 || username_val.length > 10){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('invalid username');
            $('#usernamevalidation').css('color', 'red');
            $('#usernamevalidation').css('font-weight', 'bold');
            username_error=true;
        }
        else{
            $('#usernamevalidation').hide()
            username_error=false;
        }
    }

    $('#email').keyup(function(){
        email_validation();
    });

    function email_validation(){
        var email_val = $('#email').val();
        var emailregex = new RegExp("^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/");
        var emailregexo = new RegExp("^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,3}\.[a-zA-Z]{1,3}$");  

        if(email_val.length==""){
            $('#emailvalidation').show();
            $('#emailvalidation').html('Email cannot be empty');
            $('#emailvalidation').css('color','red');
            $('#emailvalidation').css('font-weight', 'bold');
            email_validation_error=true;
        }
        else{
            $('#emailvalidation').hide();
        }
        if(emailregex.test(email_val) || emailregexo.test(email_val)){
            $('#emailvalidation').hide()
            email_validation_error=false;
        }
        else{
            $('#emailvalidation').show();
            $('#emailvalidation').html('Invlid Email');
            $('#emailvalidation').css('color', 'red');
            $('#emailvalidation').css('font-weight', 'bold');
            email_validation_error=true;
        }
    }

    $('#submission').click(()=>{
        username_validation()
        email_validation()
        if(username_error || email_validation_error) return false
        else $('#box').hide();
    })

    $('.close').on('click', function(){
        $("#box").fadeOut();
        $("#box").fadeOut("slow");
        $("#box").fadeOut(5000);
        $('#box').removeClass('show');
        $('usernamevalidation').hide();
        $('emailvalidation').hide();
    });
});