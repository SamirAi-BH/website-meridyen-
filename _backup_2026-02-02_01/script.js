document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('/header.html')
    .then(res => res.text())
    .then(data => {
      if (document.getElementById('site-header')) {
        document.getElementById('site-header').innerHTML = data;
      }
    })
    .catch(err => console.error('Header load error:', err));

  // Load footer
  fetch('/footer.html')
    .then(res => res.text())
    .then(data => {
      if (document.getElementById('site-footer')) {
        document.getElementById('site-footer').innerHTML = data;
      }
    })
    .catch(err => console.error('Footer load error:', err));

  // Floating WhatsApp button
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/905428470198?text=Meridyen%20Terapi%20-%20Randevu%20al%C4%B1%C5%9Fmak%20istiyorum';
  whatsappBtn.target = '_blank';
  whatsappBtn.className = 'fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full';
  whatsappBtn.setAttribute('aria-label', 'WhatsApp');
  whatsappBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.86 11.86 0 0012.47 0C5.74.001-.111 5.831.001 12.465c0 2.76.966 5.297 2.579 7.322L2.024 22.248l6.057-1.588c1.938.545 4.082.835 6.389.835 6.725 0 12.47-5.469 12.47-12.247 0-6.776-5.745-12.246-12.47-12.246z"/>
    </svg>
  `;
  document.body.appendChild(whatsappBtn);
});
