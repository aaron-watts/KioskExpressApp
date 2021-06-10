const scrollUp = document.querySelector('button.main-scroll.up');
const scrollDown = document.querySelector('button.main-scroll.down');
const selectUp = document.querySelector('button.selection-scroll.up');;
const selectDown = document.querySelector('button.selection-scroll.down');;

scrollUp.addEventListener('click', () => {
    const activeInput = document.querySelector('.form-active');
    if (activeInput) activeInput.classList.remove('form-active');
    window.scrollBy(0, -500);
})

scrollDown.addEventListener('click', () => {
    const activeInput = document.querySelector('.form-active');
    if (activeInput) activeInput.classList.remove('form-active');
    window.scrollBy(0, 500);
})

selectUp.addEventListener('click', () => {
    const getActiveciveSelect = () => {
        for (let input of selectInputs) if (!input.classList.contains('hide')) return input;
    }
    const selectInputs = document.querySelectorAll('.selection-board');
    const activeSelect = getActiveciveSelect();

    activeSelect.children[1].scrollBy(0, -300);
})

selectDown.addEventListener('click', () => {
    const getActiveciveSelect = () => {
        for (let input of selectInputs) if (!input.classList.contains('hide')) return input;
    }
    const selectInputs = document.querySelectorAll('.selection-board');
    const activeSelect = getActiveciveSelect();

    activeSelect.children[1].scrollBy(0, 300);
})
