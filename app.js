// INSERISCI LA TUA API KEY GENERATA DA STABILITY AI
const API_KEY = 'sk-lvksMz6DCJcmupcFvYGuxfRdlzUcHwfHbbQJQRds7ZWOuBwd';

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
            samples: 1,
        }),
    };

    try {
        const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', option);
        const data = await response.json();
        console.log(data);

        if (data && data.artifacts) {
    
            while (imageSection.firstChild) {
                imageSection.removeChild(imageSection.firstChild);
            }

            data.artifacts.forEach(imageObject => {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                const imageElement = document.createElement('img');
                imageElement.setAttribute('src', `data:image/png;base64,${imageObject.base64}`);
                imageContainer.append(imageElement);
                imageSection.append(imageContainer);
            });
        } else {
            console.error("La risposta dell'API non contiene dati validi.");
        }
    } catch (error) {
        console.error(error);
    }
};

btn.addEventListener('click', getImages);
