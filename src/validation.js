
    function requiredField(value){
        return value !== '';
    }

    function validateEmail(email) {
        let emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRE.test(email);
    }

    function checkPasswordLength(value, sum, total) {
        let length = value.length;
        let display;
        let msg = '';
        sum = (total - length);
        switch (sum) {
            case 0:
                display = '';
                break;
            case 1:
                display = 'Продолжайте печатать - нужно еще ' + sum + ' символов.';
                break;
            default:
                display = 'Продолжайте печатать - нужно еще ' + sum + ' символов';
        }
        if (length >= total) {
            msg = '';
        } else {
            msg = display;
        }
        return msg;
    }

    function checkPasswordsMatch(password, password2) {
        if (password.length > 5 && password2.length > 5) {
            return password2 !== password;
        }
    }

//---------------check email------------------------------------------------------------------------
    /**
     * @return {string}
     */
    function CheckEmail(email) {
        let emailMsg = '';
        if (!requiredField(email)) {
            emailMsg = 'Поле обязательно';
        } else {
            if (!validateEmail(email)) {
                emailMsg = 'Продолжайте печатать ... ожидается действительный email-адрес'
            } else {
                emailMsg = '';
            }
        }
        return emailMsg;
    }
//----------------check password(authorization)--------------------------------------------------------
    /**
     * @return {string}
     */
    function CheckPswd(password) {
        let passwordMsg = '';
        if (requiredField(password)){
            passwordMsg = checkPasswordLength(password,0,6);
        }else{
            passwordMsg = 'Поле обязательно';
        }
        return passwordMsg;
    }

    function testPhone(phone) {
        let phoneRE = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        return phoneRE.test(phone);
    }
 export default {
     requiredField,
     checkPasswordsMatch,
     CheckEmail,
     CheckPswd,
     testPhone
 }