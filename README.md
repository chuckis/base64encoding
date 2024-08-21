Вот пример, как можно реализовать кодирование изображения в Base64 на JavaScript и создать HTML-страницу с формой для загрузки файла и окном для просмотра результата кодирования:

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Base64 Image Encoder</title>
</head>
<body>
    <h1>Base64 Image Encoder</h1>
    <input type="file" id="fileInput" accept="image/*">
    <div>
        <h2>Encoded Base64 String:</h2>
        <textarea id="base64Output" rows="10" cols="50" readonly></textarea>
    </div>
    <div>
        <h2>Image Preview:</h2>
        <img id="imagePreview" alt="Image Preview" style="max-width: 500px;">
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
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
```

### Как это работает:
1. **HTML**:
   - Создается элемент `<input type="file">` для загрузки изображений.
   - Добавляются два элемента `<textarea>` и `<img>` для отображения закодированной строки Base64 и предварительного просмотра изображения соответственно.
   
2. **JavaScript**:
   - При выборе файла, функция `encodeImageToBase64` считывает файл и преобразует его в строку Base64.
   - Затем эта строка отображается в `<textarea>`, а также используется для установки источника изображения в элемент `<img>` для предварительного просмотра.

Поместите оба файла в одну директорию и откройте `index.html` в браузере. Вы сможете загрузить изображение, увидеть его предварительный просмотр и закодированную строку Base64.

Вот обновленная версия HTML-страницы с функцией декодирования Base64 строки и возможностью ввода строки для декодирования и отображения изображения.

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Base64 Image Encoder/Decoder</title>
</head>
<body>
    <h1>Base64 Image Encoder/Decoder</h1>

    <!-- Форма для загрузки файла и кодирования изображения -->
    <h2>Encode Image to Base64</h2>
    <input type="file" id="fileInput" accept="image/*">
    <div>
        <h3>Encoded Base64 String:</h3>
        <textarea id="base64Output" rows="10" cols="50" readonly></textarea>
    </div>
    <div>
        <h3>Image Preview:</h3>
        <img id="imagePreview" alt="Image Preview" style="max-width: 500px;">
    </div>

    <!-- Форма для декодирования Base64 строки в изображение -->
    <h2>Decode Base64 to Image</h2>
    <textarea id="base64Input" rows="10" cols="50" placeholder="Paste Base64 string here"></textarea>
    <br>
    <button id="decodeButton">Decode Base64 String</button>
    <div>
        <h3>Decoded Image Preview:</h3>
        <img id="decodedImagePreview" alt="Decoded Image Preview" style="max-width: 500px;">
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
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
```

### Что изменилось:
1. **Новая форма для декодирования Base64 строки**:
   - Добавлено текстовое поле `<textarea>` для ввода строки Base64.
   - Кнопка "Декодировать строку" запускает процесс декодирования строки и отображает результат в `<img>` для предварительного просмотра изображения.
   
2. **Функция декодирования**:
   - При нажатии кнопки считывается строка Base64 из текстового поля.
   - Строка преобразуется в URL-формат изображения (используя шаблон `data:image/jpeg;base64,...`), и изображение отображается в предварительном просмотре.

Теперь вы можете закодировать изображение в строку Base64 и декодировать любую строку обратно в изображение, введя её в форму.