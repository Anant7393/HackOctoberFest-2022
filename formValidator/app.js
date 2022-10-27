const form= document.querySelector('form');
const username= document.querySelector('#username');
const email= document.querySelector('#email');
const password= document.querySelector('#password');
const confirmPassword= document.querySelector('#confirm-password');

function showErr(input,message){
    const formControl= input.parentElement;
    formControl.className='form-control error';
    const small = formControl. querySelector('small');
    small.innerText=  message;
}

function showSucc(input){    
    const formControl= input.parentElement;
    formControl.className='form-control success';

}
function checkEmail(input){
      const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;
if (re.test(input.value.trim())){
    showSucc(input);
}else{
 showErr(input,"Email is not valid")
}
}


   function checkRequired (inputArr){

    inputArr.forEach(function(input){
        if(input.value.trim()===''){showErr(input,`${getFieldname(input)} is required`)}else{
            showSucc(input)}
    });
   }
 function getFieldname(input){
     return input.id.charAt(0).toUpperCase()+input.id.slice(1);
 }

 function checkLength(input,min,max){
     if(input.value.length< min){showErr(input,`${getFieldname(input)} must be at least ${min} characters`)}
     else if(input.value.length>max){showErr(input,`${getFieldname(input)} must be less than ${max} characters`)}
     else{ showSucc(input)}

     }
 

function checkPasswordMatch(input1,input2){
    if(input1.value!==input2.value){
        showErr(input2,'Passwords do not match')
    }
}
 
form.addEventListener('submit',function(evt){
    evt.preventDefault();
    checkRequired([username,email,password,confirmPassword]);

    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password,confirmPassword);
})

