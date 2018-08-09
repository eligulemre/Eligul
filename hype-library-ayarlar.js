// Exit intent kullanımı
hypeExitIntent({
  width: 400,
  background:"#fff",
  html: '<div class="test"> <span>TEST YAZISI</span> </div>',
  css:'.test span {color:#258}'
});


// input mask kullanımı
$('.TestTc').mask('00000000000'); // TC NO
$('.TestTelefon').mask('0(000) 000-0000'); // Telefon
