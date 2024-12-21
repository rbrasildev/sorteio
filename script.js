document.getElementById('fileInput').addEventListener('change', function () {
    const label = document.getElementById('label');
    const file = this.files[0];

    if (file) {
        label.innerHTML = `Arquivo selecionado: ${file.name}`;
    } else {
        label.innerHTML = 'Por favor, selecione um arquivo CSV.';
    }
});

document.getElementById('drawButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const quantityInput = document.getElementById('quantityInput');
    const resultList = document.getElementById('resultList');
    const teste = document.getElementById('teste');

    if (!fileInput.files.length) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const csvContent = e.target.result;
        const names = csvContent.split(/\r?\n/).filter(name => name.trim() !== '');
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 1) {
            alert('Por favor, insira uma quantidade válida.');
            return;
        }

        if (quantity > names.length) {
            alert('A quantidade solicitada excede o número de nomes disponíveis.');
            return;
        }

        const selectedNames = [];

        while (selectedNames.length < quantity) {
            const randomIndex = Math.floor(Math.random() * names.length);
            const name = names[randomIndex];

          
            if (!selectedNames.includes(name)) {
                selectedNames.push(name);
            }
        }

   
        let countdown = 3;
        resultList.innerHTML = `<li class="flex items-center justify-center fixed left-0 rigth-0 bottom-0 top-0 dark:text-green-300 text-[200px] animate-ping delay-400 dark:text-gray-300 p-4 rounded-xl w-full block"> ${countdown}</li>`;

        const countdownInterval = setInterval(() => {
            countdown -= 1;
            if (countdown > 0) {
                resultList.innerHTML = `<li class="flex items-center justify-center fixed left-0 rigth-0 bottom-0 top-0 dark:text-green-300 text-[200px] animate-ping dark:text-gray-300 p-4 rounded-xl w-full block"> ${countdown}</li>`;
            } else {
                clearInterval(countdownInterval);

               
                resultList.innerHTML = selectedNames
                    .map(name => `<li class=" text-3xl dark:text-gray-300 p-4 rounded-xl w-full block">${name}</li>`)
                    .join('');
            }
        }, 1000);
        setTimeout(() => {
            resultList.innerHTML = "";
        }, 10000)
    };

    reader.readAsText(file);
});
