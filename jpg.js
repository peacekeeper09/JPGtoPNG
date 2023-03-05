const imageFileInput = document.getElementById('image-file');
const convertBtn = document.getElementById('convert-btn');
const outputDiv = document.getElementById('output');
const downloadLink = document.getElementById('download-link');

convertBtn.addEventListener('click', () => {
  const file = imageFileInput.files[0];
  
  if (!file) {
    outputDiv.textContent = 'Please select a file to convert.';
    return;
  }
  
  if (file.type !== 'image/jpeg') {
    outputDiv.textContent = 'Invalid file type. Please select a JPG image.';
    return;
  }
  
  const reader = new FileReader();
  
  reader.onload = () => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const pngImg = document.createElement('img');
        pngImg.src = url;
        outputDiv.innerHTML = '';
        outputDiv.classList.remove('hidden');
        outputDiv.appendChild(pngImg);
        downloadLink.href = url;
        downloadLink.classList.remove('hidden');
      }, 'image/png', 1);
    };
    
    img.src = reader.result;
  };
  
  reader.readAsDataURL(file);
});
