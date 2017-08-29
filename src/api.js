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
                msg = error.response.data.errors.detail;
                break;
            case(403) :
                msg = error.response.data.errors.detail;
                break;
            case(404) :
                msg = error.response.data.errors.detail;
                break;
            case(422) :

                if (!error.response.data.errors.detail.email) {
                    if (!error.response.data.errors.detail.phone) {
                        if (!(error.response.data.errors.detail.email && error.response.data.errors.detail.phone)) {
                            msg = error.response.data.errors.detail;
                        } else {
                            msg = error.response.data.errors.detail.email + error.response.data.errors.detail.phone;
                        }
                    } else {
                        msg = error.response.data.errors.detail.phone;
                    }
                } else {
                    msg = error.response.data.errors.detail.email;
                }
                break;
            case(500) :
                msg = error.response.data.errors.detail;
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
                msg = response.data.data;
                break;
            case(202) :
                msg = response.data.data;
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
                msg = error.response.data.errors.detail;
                break;
            case(401) :
                msg = error.response.data.errors.detail;
                break;
            case(404) :
                location.href = '/error';
                break;
            case(422) :
                msg = error.response.data.errors.detail;
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
                msg = error.response.data.errors.detail;
                break;
            case(401) :
                msg = error.response.data.errors.detail;
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
                msg = error.response.data.errors.detail;
                break;
            default:
                msg = 'Something wrong';
        }
        callback(msg);
    });
    return msg;
}

export  default {
    postData,
    getData,
    PatchData,
    DeleteData
}
