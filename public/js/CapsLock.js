let inputPassword = document.getElementById('password')
      let inputPasswordConfirmar = document.getElementById('passwordConfirmar')
      let capsLock = document.getElementById('capsLock')

      window.onload = function(){
         capsLock.style.display='none'
      }
      
      capsLock.style.fontSize = '18px'
      capsLock.style.paddingBottom = '10px'
      capsLock.style.fontWeight= '900'
      capsLock.style.color = '#ab191f'

      inputPassword.onkeyup = function (e) {
         let caps = e.getModifierState && e.getModifierState('CapsLock');

         if (caps) {
            capsLock.style.display='block'
         }else{
            capsLock.style.display='none'
         }
      }

      inputPasswordConfirmar.onkeyup = function (e) {
         let caps = e.getModifierState && e.getModifierState('CapsLock');

         if (caps) {
            capsLock.style.display='block'
         }else{
            capsLock.style.display='none'
         }
      }
