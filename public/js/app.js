console.log('app.js LOADING NOW!');

//const people = document.querySelectorAll('ul > button');
const allInputs = document.querySelectorAll('input')
const textInputs = document.querySelectorAll('.text-input');
const numberInputs = document.querySelectorAll('.number-input');
const keyboardButtons = document.querySelectorAll('.keyboard button, .keypad button');
const keyboardTextInputs = document.querySelectorAll('.key');
const keyboard = document.querySelector('section.keyboard');
const keypad = document.querySelector('section.keypad');
const shiftKeys = document.querySelectorAll('.shift-key');
const labels = document.querySelectorAll('label');
const dobd = document.querySelector('#dobd');
const dobm = document.querySelector('#dobm');

let activeInput = document.querySelector('.form-active');

let shift = true;
let caps = false;

const htmlScroll = document.querySelector('html');

const generateAlert = (message) => {
    const body = document.querySelector('body');
    const alert = document.createElement('DIV');
    alert.classList.add('alert', 'alert-info');
    alert.innerHTML = message;
    alert.addEventListener('transitionend', function (e) {
        console.log('TRANSITION ENDED!!!!!');
        this.remove();
    }, true)
    body.append(alert);
    setTimeout(() => {
        const lastAlert = document.querySelector('div.alert:last-of-type');
        //lastAlert.remove();
        lastAlert.style.transform = 'translateX(-100vw)';
    }, 2500)
}

const setKeyboard = (casing) => {
    console.log(`Changing to ${casing}`);
    if (casing === 'upper') {
        keyboardTextInputs.forEach(key => {
            key.innerHTML = key.innerHTML.toUpperCase();
        });
    }
    if (casing === 'lower') {
        keyboardTextInputs.forEach(key => {
            key.innerHTML = key.innerHTML.toLowerCase();
        });
    }
}

// Keyboard/keypad button controls
keyboardButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const getIndex = () => {
            for (let i in allInputs) if (allInputs[i].id === activeInput.id) return parseInt(i);
            return -1;
        }

        if (this.classList.contains('key')) activeInput.value += this.innerHTML;
        if (this.classList.contains('space-bar')) activeInput.value += ' ';

        if (this.id === 'backspace') activeInput.value = activeInput.value.slice(0, activeInput.value.length - 1);

        try {
            changeLabel(activeInput);
        } catch (e) {
            console.log(e);
        }

        if (activeInput.classList.contains('filter-input')) filterResults(activeInput);
        /* if (activeInput.id === 'dobd' || activeInput.id === 'dobm') {
            console.log('2 digits max!');
            if (activeInput.value.length > 1)
        } */
        if (activeInput.id.includes('dob')) dobHandler(this);

        if (!caps) {
            shift = false;
            setKeyboard('lower');
            shiftKeys.forEach(key => key.classList.remove('highlight-key'));
        }

        if ((this.id === 'shift1' || this.id === 'shift2') && !caps) {
            shift = false;
            setKeyboard('lower');
            shiftKeys.forEach(key => key.classList.remove('highlight-key'));
        }

        if ((this.id === 'shift1' || this.id === 'shift2') && !caps) {
            shift = true;
            setKeyboard('upper');
            shiftKeys.forEach(key => key.classList.add('highlight-key'));
        }

        if (this.id === 'caps' && caps) {
            caps = false;
            setKeyboard('lower');
            this.classList.remove('highlight-key')
        }
        else if (this.id === 'caps' && !caps) {
            caps = true;
            setKeyboard('upper');
            this.classList.add('highlight-key')
        }

        if (this.id === 'return') {
            const inputIndex = getIndex();

            if (activeInput.id.includes('dob')) extendDOB();

            if (inputIndex === 16) return;

            if (inputIndex >= 0 && activeInput.id !== 'diet') {
                activeInput.classList.remove('form-active');
                allInputs[inputIndex + 1].classList.add('form-active');

                if (!allInputs[inputIndex + 1].classList.contains('text-input')) keyboard.classList.add('hide');
                if (!allInputs[inputIndex + 1].classList.contains('number-input')) keypad.classList.add('hide');
            }
            if (activeInput.id === 'diet') {
                activeInput.classList.remove('form-active');
                keyboard.classList.add('hide');
                keypad.classList.add('hide');
            }
        }

        button.blur();
    })
})


// hide keyboard/keypad
document.addEventListener('click', function (e) {

    if (e.target.nodeName === 'INPUT') e.target.classList.add('form-active');
    if (e.target.classList.contains('text-input')) keyboard.classList.remove('hide');
    if (e.target.classList.contains('number-input')) keypad.classList.remove('hide');
    
    activeInput = document.querySelector('.form-active');
    if (activeInput) activeInput.scrollIntoView({ behaviour: 'smooth', block: 'center' });

    const targetIsKeyboard = () => {
        if (!e.target.classList.contains('text-input')
            && !e.target.classList.contains('keyboard-row')
            && !e.target.parentNode.classList.contains('keyboard-row')
            && !e.target.classList.contains('bi')) {
            return false;
        }
        return true;
    }


    const targetIsKeypad = () => {
        if (!e.target.classList.contains('number-input')
            && !e.target.classList.contains('keypad-row')
            && !e.target.parentNode.classList.contains('keypad-row')) {
            return false;
        }
        return true;
    }

    if (!targetIsKeyboard()) keyboard.classList.add('hide');
    if (!targetIsKeypad()) keypad.classList.add('hide');
})

// show keyboard for txt inputs
textInputs.forEach(input => {
    console.log('textInput Changes');
    input.addEventListener('click', (e) => {
        if (extendDOB) extendDOB();
        //console.log('Is shouldn\'t be here');
        if (activeInput.classList.contains('filter-input')) activeInput.value = '';
        allInputs.forEach(i => i.classList.remove('form-active'));
        console.log('OPENING KEYBOARD!!')
        input.classList.add('form-active');
        keyboard.classList.remove('hide');
    });
});

// show keypad for num inputs
numberInputs.forEach(input => {
    console.log('numInput Changes');
    input.addEventListener('click', () => {
        if (extendDOB) extendDOB();
        allInputs.forEach(i => i.classList.remove('form-active'));
        input.classList.add('form-active');
        keypad.classList.remove('hide');
    });
});



