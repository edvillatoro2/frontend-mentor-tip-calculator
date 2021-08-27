const bill = document.getElementById('input-bill');
const tipBtn = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('custom-tip');
const people = document.getElementById('input-people');
const errorMsg = document.querySelector('.error');
const results = document.querySelectorAll('.amount');
const resetBtn = document.querySelector('.reset')

bill.addEventListener('input', setBillValue);
tipBtn.forEach(btn => {
    btn.addEventListener('click', tipClick);
})

tipCustom.addEventListener('input', setValue);
people.addEventListener('input', peopleAmount);
resetBtn.addEventListener('click', reset);

let billValue = 0.0;
let tipValue = 0.15; // default for 15%
let peopleNumber = 1;

function validFloat(e) {
    const num = /^[0-9]*\.?[0-9]*$/;
    return e.match(num);
}

function validInt(e) {
    const num = /^[0-9]*$/;
    return e.match(num);
}

function setBillValue() {
    if(!validFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value);
    
    calculateTip();
}

function tipClick(e) {
    tipBtn.forEach(btn => {
        btn.classList.remove('active')

        if(e.target.innerHTML === btn.innerHTML) {
            btn.classList.add('active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    })

    tipCustom.value = '';
    calculateTip();
}

function setValue() {
    if(!validInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value/100);

    //remove active class
    tipBtn.forEach(btn => {
        btn.classList.remove('active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
}

function peopleAmount() {
    if(!validInt(people.value)) {
        people.value = people.value.substring(0, tipCustom.value.length-1)
    }

    peopleNumber = parseFloat(people.value);

    if(peopleNumber < 1) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(function() {
            errorMsg.classList.remove('show-error-msg');
        }, 4000);
    }
    calculateTip();
}

function calculateTip() {
    if(people.value >=1) {
        let tipAmount = billValue * tipValue / peopleNumber;
        let total = billValue * (tipValue + 1) /peopleNumber
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    bill.value = '0.0';
    setBillValue();

    tipBtn[2].click();

    people.value = '1'
    peopleAmount();
}

// console.log(tipBtn[0].innerHTML);