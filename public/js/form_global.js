const selectInputs = document.querySelectorAll('.select-input');
const selectBoards = document.querySelectorAll('.selection-board');
const choices = document.querySelectorAll('.selection-board .list-group-item');
const filterInputs = document.querySelectorAll('.filter-input');
const selectScroll = document.querySelectorAll('.selection-scroll');

const postcodeRegex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

let data = {
    'genders': [],
    'ethnicities': [],
    'languages': [],
    'religion': [],
    'schools': []
};

const idKey = {
    'gender': 'genders',
    'ethnicity': 'ethnicities',
    'language': 'languages',
    'religion': 'religions',
    'school': 'schools'
};

window.onload = async () => {
    const res = await axios.get(`/selections`);
    data['genders'] = res.data.genders;
    data['ethnicities'] = res.data.ethnicities;
    data['languages'] = res.data.languages;
    data['religions'] = res.data.religions;
    data['schools'] = res.data.schools;
}

const listListener = (e) => {
    const activeSelect = document.querySelector('.select-active');

    selectScroll.forEach(i => i.classList.add('hide'));

    e.target.parentNode.parentNode.parentNode.classList.add('hide');

    activeSelect.value = e.target.innerHTML.replace(/\W*/, '');

    activeSelect.classList.remove('select-active');

    if (activeInput.classList.contains('filter-input')) activeInput.value = '';

    changeLabel(activeSelect);
}

const defilterResults = (target) => {
    const activeSelect = document.querySelector('.select-active');
    const list = document.querySelector(`#${target.id}-select ul`);

    for (let child = list.children.length - 1; child >= 0; child--) list.children[child].remove();

    for (let item of data[idKey[target.id]]) {
        const li = document.createElement('li');

        li.innerHTML = item;
        li.classList.add('list-group-item');
        li.addEventListener('click', listListener);

        list.append(li);
    }
}

const filterResults = (activeInput) => {
    const inputId = activeInput.parentNode.parentNode.parentNode.id;
    const list = document.querySelector(`#${inputId} ul`);

    for (let child = list.children.length - 1; child >= 0; child--) list.children[child].remove();

    const matches = data[idKey[`${inputId.replace('-select', '')}`]].filter(choice => {
        return choice.toLowerCase().includes(activeInput.value.toLowerCase());
    });


    for (let match of matches) {
        const li = document.createElement('li');

        li.innerHTML = match;
        li.classList.add('list-group-item');
        li.addEventListener('click', listListener);

        list.append(li);
    }

}

selectInputs.forEach(function (input) {
    input.addEventListener('click', function (e) {

        selectScroll.forEach(i => i.classList.remove('hide'));
        allInputs.forEach(i => i.classList.remove('form-active'));
        input.classList.add('select-active');

        for (let board of selectBoards) {
            if (board.id === `${e.target.id}-select`) {
                defilterResults(e.target);
                board.classList.remove('hide');
            }
        }
    });
});

const hideScrollers = () => {
    selectScroll.forEach(i => i.classList.add('hide'));
}

choices.forEach(function (choice) {
    choice.addEventListener('click', function (e) {
        const activeSelect = document.querySelector('.select-active');

        e.target.parentNode.parentNode.parentNode.classList.add('hide');

        activeSelect.value = e.target.innerHTML.replace(/\W*/, '');

        activeSelect.classList.remove('select-active');
    });
});

const daysInMonth = (month, year = new Date().getFullYear()) => {
    return new Date(year, month, 0).getDate();
}

const extendDOB = () => {
    const dobInputs = document.querySelectorAll('.dob-container input');
    const dobActive = document.querySelector('.form-active');
    const day = document.querySelector('#dobd');
    const month = document.querySelector('#dobm');
    const year = document.querySelector('#doby');


    if (dobActive.id === 'dobd' && dobActive.value.length === 1) {
        dobActive.value = `0${dobActive.value}`;
    }
    if (dobActive.id === 'dobm' && dobActive.value.length === 1) {
        dobActive.value = `0${dobActive.value}`;
    }
    if (dobActive.id === 'doby' && dobActive.value.length === 2) {
        if (parseInt(dobActive.value) < 40) dobActive.value = `20${dobActive.value}`;
        else if (parseInt(dobActive.value) >= 40) dobActive.value = `19${dobActive.value}`;
    }


}

const dobHandler = (key) => {
    const dobInputs = document.querySelectorAll('.dob-container input');
    const dobActive = document.querySelector('.form-active');
    const day = document.querySelector('#dobd');
    const month = document.querySelector('#dobm');
    const year = document.querySelector('#doby');

    const inputKey = (key) => key.classList.contains('key') || key.classList.contains('space-bar');

    if (dobActive.id === 'dobd' && dobActive.value.length > 1) {
        if (inputKey) dobActive.value = dobActive.value.slice(0, 2);
        if (inputKey && parseInt(dobActive.value) > 31) dobActive.value = '31';

        dobActive.classList.remove('form-active');
        dobInputs[1].classList.add('form-active');
    }

    if (dobActive.id === 'dobm' && dobActive.value.length > 1) {
        if (inputKey) dobActive.value = dobActive.value.slice(0, 2);
        if (inputKey && parseInt(dobActive.value) > 12) dobActive.value = '12';

        dobActive.classList.remove('form-active');
        dobInputs[2].classList.add('form-active');
    }

    if (dobActive.id === 'doby' && dobActive.value.length > 3) {
        dobActive.classList.remove('form-active');
        keypad.classList.add('hide');
        if (inputKey) dobActive.value = dobActive.value.slice(0, 4);
        if (parseInt(dobd.value) > daysInMonth(parseInt(month.value), parseInt(dobActive.value))) dobd.value = daysInMonth(parseInt(month.value), parseInt(dobActive.value));
    }
}

const getLabel = (active) => {
    for (let label of labels) if (active.id === label.htmlFor) return label;
    return null;
}

const validateInput = (label, valid) => {
    if (valid) {
        label.children[0].classList.remove('text-danger');
        label.children[0].classList.add('text-success');
        label.children[0].innerHTML = '<i class="bi bi-check-circle-fill"></i>';
    }
    if (!valid) {
        label.children[0].classList.remove('text-success');
        label.children[0].classList.add('text-danger');
        label.children[0].innerHTML = '(Required)';
    }
}

const changeLabel = (active) => {
    if (active.id !== 'dobd' && active.id !== 'dobm' && !active.classList.contains('filter-input')) {
        const label = getLabel(active);

        if (active.id !== 'doby') {
            if (active.value && active.id !== 'postcode' && active.id !== 'contactNumber') validateInput(label, true);
            if (active.value && active.id === 'postcode' && postcodeRegex.test(active.value)) {
                validateInput(label, true);
            }
            if (active.value && active.id === 'contactNumber' && active.value.replaceAll(' ','').length === 11) {
                validateInput(label, true);
            }
            if (!active.value && active.id !== 'postcode' && active.id !== 'contactNumber') validateInput(label, false);
            if (active.value && active.id === 'postcode' && !postcodeRegex.test(active.value)) {
                validateInput(label, false);
            }
            if (active.value && active.id === 'contactNumber' && active.value.replaceAll(' ','').length !== 11) {
                validateInput(label, false);
            }
        }

        if (active.id === 'doby') {
            if (active.value && dobd.value && dobd.value) validateInput(label, true) 
            else validateInput(label, false);
        }

    }

}