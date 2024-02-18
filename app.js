// INSERISCI LA TUA API KEY GENERATA DA STABILITY AI
const API_KEY = '';

const btn = document.getElementById('btnGenerate');
const inputText = document.getElementById('input');
const imageSection = document.getElementById('imageSection');


const getImages = async () => {
    const option = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text: inputText.value, 
                }
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 2,
        }),
    };

    try {
        const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', option);
        const data = await response.json();
        console.log(data);

        if (data && data.artifacts) {
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = ''; // Cancella il contenuto precedente

            data.artifacts.forEach(imageObject => {
                const imageColumn = document.createElement('div');
                imageColumn.classList.add('col');

                const imageElement = document.createElement('img');
                imageElement.classList.add('img-fluid');
                imageElement.setAttribute('src', `data:image/png;base64,${imageObject.base64}`);

                const imageCard = document.createElement('div');
                imageCard.classList.add('card');
                imageCard.appendChild(imageElement);

                const imageCardBody = document.createElement('div');
                imageCardBody.classList.add('card-body');
                const imageCardText = document.createElement('p');
                imageCardText.classList.add('card-text');
                imageCardText.textContent = imageObject.text_prompt;
                imageCardBody.appendChild(imageCardText);
                imageCard.appendChild(imageCardBody);

                imageColumn.appendChild(imageCard);
                imageContainer.appendChild(imageColumn);
            });
        } else {
            console.error("La risposta dell'API non contiene dati validi.");
        }
    } catch (error) {
        console.error(error);
    }
};

btn.addEventListener('click', getImages);
