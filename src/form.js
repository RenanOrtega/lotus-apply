document.getElementById('formRegister').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const checkedDays = Array.from(document.querySelectorAll('input[name="days[]"]:checked'))
        .map(checkbox => checkbox.value);

    const checkedHours = Array.from(document.querySelectorAll('input[name="hours[]"]:checked'))
    .map(checkbox => checkbox.value);
        
    const data = {
        name: formData.get('name'),
        nick: formData.get('nick'),
        email: formData.get('email'),
        position: formData.get('position'),
        elo: formData.get('elo'),
        days: checkedDays,
        hours: checkedHours
    }

    await fetch('http://localhost:3000/form',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {

        if (!response.ok) {
            const err = await response.json();
            throw err;
        }

        return response.json();
    })
    .then(() => {
        toastr.success('Formulário enviado com sucesso!');
    })
    .catch(error => {
        if (error.message === 'Já existe um cadastro com esse nick.') {
            toastr.error('Já existe um cadastro com esse nick.');
            return;
        } 

        toastr.error('Erro ao enviar o formulário.');
    });

});