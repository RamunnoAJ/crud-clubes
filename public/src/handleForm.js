const $form = document.querySelector('#form')
const $inputs = $form.querySelectorAll('input')

$form.addEventListener('submit', handleSubmitForm)
$inputs.forEach(input => {
  if (input.type !== 'file') {
    input.addEventListener('focus', handleFocusInput)
  }
})

function handleFocusInput(e) {
  e.target.value = ''
}

function handleSubmitForm(e) {
  e.preventDefault()

  const formData = new FormData($form)
  postFormData(`teams/update/${formData.get('abbreviation')}`, formData)
}

/*
 * @param {string} route
 * @param {Object} data
 * */
function postFormData(route, data) {
  fetch(`http://localhost:8080/${route}`, {
    method: 'POST',
    body: data,
  })
}
