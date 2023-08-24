const $form = document.querySelector('#form')
const $inputs = $form.querySelectorAll('input')

$inputs.forEach(input => {
  if (input.type !== 'file') {
    input.addEventListener('focus', handleFocusInput)
  }
})

function handleFocusInput(e) {
  e.target.value = ''
}
