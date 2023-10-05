const $form = document.querySelector('#form')
$form.addEventListener('submit', e => {
  handleCreateTeam(e)
})

/**
 * @param {Event} e
 * */
function handleCreateTeam(e) {
  e.preventDefault()
  const errors = handleErrors(e)

  if (errors.length > 0) {
    errors.forEach(error => {
      console.error(error)
    })
    return
  }

  const abbreviation = $form.abbreviation.value
  const $fileInput = document.getElementById('image')
  const formData = new FormData($form)
  formData.append('image', $fileInput.files)

  fetch('/teams/create', {
    method: 'POST',
    body: formData,
  }).then(response => {
    if (!response.ok) {
      return response.text().then(data => console.error(data))
    }

    document.body.style = 'cursor: wait'

    setTimeout(() => {
      window.location.href = `/teams/${abbreviation}`
    }, 1500)
  })
}

function handleErrors(e) {
  e.preventDefault()

  const errors = []

  const $name = $form.name.value
  const $abbreviation = $form.abbreviation.value
  const $country = $form.country.value
  const $image = $form.image.value
  const $address = $form.address.value
  const $email = $form.email.value

  if (!$name) {
    errors.push('Name is required')
  }

  if (!$abbreviation) {
    errors.push('Abbreviation is required')
  }

  if (!$country) {
    errors.push('Country is required')
  }

  if (window.location.href.includes('create')) {
    if (!$image) {
      errors.push('Image is required')
    }
  }

  if (!$address) {
    errors.push('Address is required')
  }

  if (!$email) {
    errors.push('Email is required')
  }

  errors.forEach(error => {
    // eslint-disable-next-line no-undef
    Toastify({
      text: error,
      duration: 3000,
      close: false,
      gravity: 'top',
      className:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-900',
    }).showToast()
  })

  return errors
}
