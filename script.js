// Кодирование изображения в Base64 при загрузке файла
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        encodeImageToBase64(file).then(base64String => {
            // Показать закодированную строку Base64
            document.getElementById('base64Output').value = base64String;

            // Показать предварительный просмотр изображения
            document.getElementById('imagePreview').src = base64String;
        }).catch(error => {
            console.error('Error encoding image:', error);
        });
    }
});

function encodeImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            resolve(base64String);
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        // Читаем файл как Data URL (Base64)
        reader.readAsDataURL(file);
    });
}

// Декодирование строки Base64 и отображение изображения
document.getElementById('decodeButton').addEventListener('click', function() {
    const base64String = document.getElementById('base64Input').value.trim();
    
    if (base64String) {
        try {
            const imageSrc = `data:image/jpeg;base64,${base64String}`;
            document.getElementById('decodedImagePreview').src = imageSrc;
        } catch (error) {
            console.error('Invalid Base64 string');
        }
    } else {
        console.error('No Base64 string provided');
    }
});
