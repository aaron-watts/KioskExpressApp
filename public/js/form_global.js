const selectInputs = document.querySelectorAll('.select-input');
const selectBoards = document.querySelectorAll('.selection-board');
const choices = document.querySelectorAll('.selection-board .list-group-item');
const filterInputs = document.querySelectorAll('.filter-input');

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

    e.target.parentNode.parentNode.parentNode.classList.add('hide');

    activeSelect.value = e.target.innerHTML.replace(/\W*/, '');

    activeSelect.classList.remove('select-active');

    if (activeInput.classList.contains('filter-input')) activeInput.value = '';
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

choices.forEach(function (choice) {
    choice.addEventListener('click', function (e) {
        const activeSelect = document.querySelector('.select-active');

        e.target.parentNode.parentNode.parentNode.classList.add('hide');

        activeSelect.value = e.target.innerHTML.replace(/\W*/, '');

        activeSelect.classList.remove('select-active');
    });
});

const dobHandler = (key) => {
    const dobInputs = document.querySelectorAll('.dob-container input');
    const dobActive = document.querySelector('.form-active');

    const inputKey = (key) => key.classList.contains('key') || key.classList.contains('space-bar');

    if (dobActive.id === 'dobd' && dobActive.value.length > 1) {
        dobActive.classList.remove('form-active');
        dobInputs[1].classList.add('form-active');
        if (inputKey) dobActive.value = dobActive.value.slice(0,2);
    }
    if (dobActive.id === 'dobm' && dobActive.value.length > 1) {
        dobActive.classList.remove('form-active');
        dobInputs[2].classList.add('form-active');
        if (inputKey) dobActive.value = dobActive.value.slice(0,2);
    }
    if (dobActive.id === 'doby' && dobActive.value.length > 3) {
        dobActive.classList.remove('form-active');
        keypad.classList.add('hide');
        if (inputKey) dobActive.value = dobActive.value.slice(0,4);
    }
}

