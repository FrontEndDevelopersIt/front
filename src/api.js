import axios from 'axios'


function postData(url, params, defaultUrl, callback) {
    let msg = '';
    axios.post(url, params).then(response =>{
        console.log(response);
        if(response.status >= 200 && response.status < 300)
        {
          if(response.data.data.token !== null || response.data.data.token !== undefined) {
                localStorage.setItem('JWT', response.data.data.token);
            }
             location.href = defaultUrl;
        }
    }).catch(error =>{
        switch (error.response.status){
            case(401) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(403) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(404) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(422) :

                if (!error.response.data.errors.detail.email) {
                    if (!error.response.data.errors.detail.phone) {
                        if (!(error.response.data.errors.detail.email && error.response.data.errors.detail.phone)) {
                            msg = Translater(error.response.data.errors.detail);
                        } else {
                            msg = Translater(error.response.data.errors.detail.email[0]) + Translater(error.response.data.errors.detail.phone[0]);
                        }
                    } else {
                        msg = Translater(error.response.data.errors.detail.phone[0]);
                    }
                } else {
                    msg = Translater(error.response.data.errors.detail.email[0]);
                }
                console.log(msg, error.response.data.errors.detail.email[0]);
                break;
            case(500) :
                msg = Translater(error.response.data.errors.detail);
                break;
            default:
                msg = 'Something wrong!!!';
        }
        callback(msg);
    });
}

function getData(url, params, callback){
    let msg = '';
    axios.get(url, params).then(response=>{
        switch(response.status) {
            case(200) :
                msg = Translater(response.data.data);
                break;
            case(202) :
                msg = Translater(response.data.data);
                break;
        }
        callback(msg);
        if(response.status >=200 && response.status < 300)
        {
            if(response.data.data.token)
            {
                localStorage.setItem('JWT', response.data.data.token);
            }
        }
    }).catch(error=>{
        switch (error.response.status)
        {
            case(400) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(401) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(404) :
                // location.href = '/error';
                break;
            case(422) :
                msg = Translater(error.response.data.errors.detail);
                break;
            default:
                msg = 'Something wrong';
        }
            callback(msg);
    });
}

/**
 * @return {string}
 */
function PatchData(url, params,defaultUrl, callback){
    let msg = '';
    axios.patch(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = response.data.data;
                break;
        }
        callback(msg);
        if(response.status >=200 && response.status < 300)
        {
            location.href = defaultUrl;
        }
    }).catch(error =>
    {
        switch (error.response.status) {
            case(400) :
                msg = Translater(error.response.data.errors.detail);
                break;
            case(401) :
                msg = Translater(error.response.data.errors.detail);
                break;
            default:
                msg = 'Something wrong';
        }
        callback(msg);

    });
    return msg;
}

/**
 * @return {string}
 */
function DeleteData(url, params, callback) {
    let msg = '';
    axios.delete(url,params).then(response=>
    {
        switch (response.status) {
            case(204) :
                msg = 'Success';
                break;

        }
        callback(msg);
    }).catch(error =>
    {
        switch (error.response.status) {
            case(404) :
                msg = Translater(error.response.data.errors.detail);
                break;
            default:
                msg = 'Something wrong';
        }
        callback(msg);
    });
    return msg;
}

/**
 * @return {string}
 */
function Translater(response) {
    let msg = '';
    switch (response){
        case('The email must be a valid email address.'):
            msg = 'Недействительный email-адрес.';
            break;
        case('Wrong password'):
            msg = 'Неправильный email-адрес или пароль.';
            break;
        case('Wrong email'):
            msg = 'Неправильный email-адрес или пароль.';
            break;
        case('The email has already been taken.'):
            msg = 'Такой email-адрес уже существует.'; console.log(msg);
            break;
        case('The phone has already been taken.'):
            msg = 'Телефон уже сущевствует.';
            break;
        case ('User with such email not found'):
            msg = 'Пользователь с таким email-фдресом не существует.';
            break;
        case ('Password reset link sent.'):
            msg = 'Ссылка для востановления пароля отправлена Вам на почту.';
            break;
        case('Email is invalid.'):
            msg = 'Недействительный email-адрес или ссылка';
            break;
        case('Account was not activated'):
            msg = 'Аккаунт не активирован'; console.log(msg);
            break;
        default: msg = 'Упс... что то пошло не так.'
    }
    return msg;
}

export  default {
    postData,
    getData,
    PatchData,
    DeleteData
}
