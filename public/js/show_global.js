console.log('SHOW_GLOBAL LOADING..');

const signInButtons = document.querySelectorAll('.signin-btn');
const tableRows = document.querySelectorAll('tr');

for (let button of signInButtons) {
    button.addEventListener('click', async function () {
        console.log('USER CLICKED....');
        try {
            const res = await axios.post('/signin', { id: this.id });
            this.classList.add('hide');
            this.nextElementSibling.classList.remove('hide');
            generateAlert('Successfully Signed In!');
        } catch (err) {
            console.log('ERROR:')
            console.log(err);
        }

    })
}

