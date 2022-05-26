function validator(options){
    formRules={}
    function validate (inputElement, rule){
        var errorMessage
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        var rules = formRules[rule.selector]
        for(var i = 0; i<rules.length;i++){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText=errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText=''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage
    }
    var formElement = document.querySelector(options.form);
    if(formElement){

        formElement.onsubmit=function(e){
            e.preventDefault();
            
            var isFormValid = true

            options.rules.forEach(function(rule){
                const inputElement=formElement.querySelector(rule.selector)
                var isValid = validate(inputElement,rule)
                if(!isValid){
                    return isFormValid =false
                }
                
            })
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formResult = Array.from(enableInputs).reduce(function(values,input){
                        values[input.name] = input.value
                        return values
                    },{})
                    options.onSubmit(formResult)
                }
            }else {
                console.log('false')
            }
        }

        options.rules.forEach(function(rule){
            if(Array.isArray(formRules[rule.selector])){
                formRules[rule.selector].push(rule.test)
            }else{
                formRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                inputElement.onblur=function(){
                    validate(inputElement,rule)
                }
                inputElement.oninput=function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText=''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

validator.isRequired=function(selector){
    return{
        selector: selector,
        test: function(value){
            return  value ? undefined: 'please fill this form' 
        }
    }
}
validator.isEmail=function(selector){
    return{
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Invalid Email'
        }
    }
}


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//Active menu navigation bar 

const menuBtn = $('.navbar__menu-button')
const navBar = $('.navbar')
menuBtn.onclick= function (){
    navBar.classList.add('menu-navbar-active')
}

//Close menu navigation bar

const closeMenuNavBarBtn = $('.close-navbar-btn')
closeMenuNavBarBtn.onclick=function(){
    navBar.classList.remove('menu-navbar-active')
}

const navBodyItems = $$('.menu__navbar-second-items')
const menuContents = $$('.menu__content')

navBodyItems.forEach((navBodyElement,indexNo)=> {
    navBodyElement.onclick = function(){
        const menuContent = menuContents[indexNo]
        $('.menu__navbar-second-items.active-navbar').classList.remove('active-navbar')
        $('.menu__content.menu-active').classList.remove('menu-active')
        navBodyElement.classList.add('active-navbar')
        menuContent.classList.add('menu-active')
    }
})

