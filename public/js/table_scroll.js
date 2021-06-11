const tableUp = document.querySelector('button.table-scroll.up');
const tableDown = document.querySelector('button.table-scroll.down');
const table = document.querySelector('#member-table');

tableUp.addEventListener('click', () => {
    table.scrollBy(0, -500);
})

tableDown.addEventListener('click', () => {
    table.scrollBy(0, 500);
})