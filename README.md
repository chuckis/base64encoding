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