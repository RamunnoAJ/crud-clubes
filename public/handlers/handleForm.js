const $form = document.querySelector('#form')
$form.addEventListener('submit', e => {
  handleForm(e, 1000)
})

/**
 * @param {Event} e
 * */
function handleForm(e, delay) {
  e.preventDefault()

  let route
  let method
  let text
  if (window.location.href.includes('create')) {
    text = 'Team created successfully'
    method = 'POST'
    route = '/teams/create'
  } else {
    const url = window.location.href.split('/')
    const id = url[url.length - 2]
    text = 'Team updated successfully'
    method = 'PATCH'
    route = `/teams/${id}`
  }

  const errors = handleErrors(e)

  if (errors.length > 0) {
    errors.forEach(error => {
      console.error(error)
    })
    return
  }

  const $fileInput = document.getElementById('image')
  const formData = new FormData($form)
  formData.append('image', $fileInput.files)

  fetch(`${route}`, {
    method,
    body: formData,
  }).then(response => {
    if (!response.ok) {
      return response.text().then(data => console.error(data))
    }

    // eslint-disable-next-line no-undef
    Toastify({
      text,
      duration: 3000,
      gravity: 'top',
      close: false,
      className:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-900 toast',
    }).showToast()

    document.body.style = 'cursor: wait'

    setTimeout(() => {
      window.location.href = `/`
    }, delay)
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
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-900 toast',
    }).showToast()
  })

  return errors
}
