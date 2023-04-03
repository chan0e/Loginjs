window.addEventListener("DOMContentLoaded", function () {
    'use strict'
    const signupform = document.getElementById("signupform")


    /**
     * 아아디, 이름 비밀번호 공백체크
     * password1,password2 일치 여부 체크
     * 
     */
    const validateForm = function (form) {
        if (form['userid'].value.trim() == '') {
            alert("userid empty!");
            form['userid'].focus();
            return false;
        }
        if (form['username'].value.trim() == '') {
            alert("username empty!");
            form['username'].focus();
            return false;
        }

        if (form['userpassword1'].value.trim() == '') {
            alert("userpassword1 empty!");
            form['userpassword1'].focus();
            return false;
        }

        if(form['userpassword1'].value.trim() != form['userpassword2'].value.trim()){
            alert("userpassword incorrect!");
            form['userpassword2'].focus();
            return false;
        }

        
    }

    signupform.addEventListener("submit",  async function (event) {
        event.preventDefault()

        if (validateForm(event.target) == false) {
            return;
        }
    
        const userid = event.target['userid'].value;
        const username = event.target['username'].value;
        const userpassword= event.target['userpassword1'].value;


        /**
         * 아이디 존재여부를 볼수 있었으나 이 존재여부를 가지고 
         * 조건문을 걸어 처리해볼려고했지만 실패함
         * 리턴값을 consol로 찍어보면 response 모든 정보들이 나옴..
         * 이 값을 어떤식으로 변환하는지에 대해 모르겠음
         * 
         * -> 해결함. 어떤식으로 해결된거지에 대한 이유는 정확히 모르겠음.
         */

        let IDC = null
        try {
        
            IDC =  await DuplicatedCheck(userid)
            
            console.log("2",IDC)
            if( IDC.result == true ){
                alert("Id Duplicated!!")
                return;
            }

            alert("you can use the ID!!")
        
        } catch (error) {
            alert(error)
        }
        
        Signup(userid, username, userpassword) 
    })


})


/**
 * 
 * @param {*} userid userid로 아이디 존재여부체크  
 */

async function DuplicatedCheck(userid){
    const url = "http://-/api/users/"+ userid +"/exist"
    
    const data = {
        userId: userid
    }

    const options = {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        
        },
        body: JSON.stringify(data)
    }

    // const IdCheck = await fetch(url,options);

    // if (!IdCheck.ok) {
    //     throw new Error("IdCheack Error");
    // }
    // console.log("1", await IdCheck.json())
    
    // return  IdCheck;

    const IdCheck =  await fetch(url,options).then(response=>{
        if(!response.ok){
            throw new Error('login error');
        }
        return response.json();
    });
    return IdCheck;

}

// DuplicatedCheck("찬영")

/**
 * 
 * @param {*} userid 
 * @param {*} username 
 * @param {*} userpassword1 
 * 
 * signup function
 */
async function Signup(userid,username,userpassword1){
    const url = "http://-/api/users"

    const data = {
        userId: userid,
        userName: username,
        userPassword: userpassword1
    }

    const options = {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const SignCheck = await fetch(url,options);

    if (!SignCheck.ok) {
        throw new Error("SignCheck Error");
    }
    // console.log(SingCheck)
    // return SingCheck.redirected;

}
