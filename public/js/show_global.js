console.log('SHOW_GLOBAL LOADING..');

const signInButtons = document.querySelectorAll('.signin-btn');
const tableRows = document.querySelectorAll('tr');

const deleteRow = function(row) {
    row.remove()
}

for (let button of signInButtons) {
    button.addEventListener('click', async function() {
        console.log('USER CLICKED....');
        try {
            const res = await axios.post('/signin', {id: this.id});
            console.log(this.parentNode.parentNode);
            this.parentNode.parentNode.classList.add('remove');
            this.parentNode.parentNode.style.transform = 'transalteX(-100vw)';
        } catch (err) {
            console.log('ERROR:')
            console.log(err);
        }
        
    })
}

for (let row of tableRows) {
    row.addEventListener('transitionend', function (e) {
        console.log('TRANSITION ENDED!!!!!');
        if (e.target.nodeName === 'TR') this.remove();
    }, true)
}

