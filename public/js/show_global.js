console.log('SHOW_GLOBAL LOADING..');

const signInButtons = document.querySelectorAll('.signin-btn');
const tableRows = document.querySelectorAll('tr');

const generateAlert = () => {
    const body = document.querySelector('body');
    const alert = document.createElement('DIV');
    alert.classList.add('alert', 'alert-info');
    alert.innerHTML = 'Succesfully Signed In!';
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

for (let button of signInButtons) {
    button.addEventListener('click', async function () {
        console.log('USER CLICKED....');
        try {
            const res = await axios.post('/signin', { id: this.id });
            this.classList.add('hide');
            this.nextElementSibling.classList.remove('hide');
            generateAlert();
        } catch (err) {
            console.log('ERROR:')
            console.log(err);
        }

    })
}

