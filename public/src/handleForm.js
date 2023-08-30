const $form = document.querySelector('#form')
const $inputs = $form.querySelectorAll('input')
const abbreviation = $form.querySelector('#abbreviation').value

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
  const formDataObject = {}

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value
  }

  if (window.location.href.includes('edit')) {
    postFormData(`teams/update/${abbreviation}`, formDataObject)
  } else {
    postFormData(`teams/create/${formData.get('abbreviation')}`, formData)
  }
}

/*
 * @param {string} route
 * @param {Object} data
 * */
function postFormData(route, data) {
  const transformedData = data

  fetch(`http://localhost:8080/${route}`, {
    method: 'POST',
    body: JSON.stringify(transformedData),
  })
}
