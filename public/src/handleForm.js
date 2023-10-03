const $form = document.querySelector('#form')
$form.addEventListener('submit', handleCreateTeam)

/**
 * @param {Event} e
 * */
function handleCreateTeam(e) {
  e.preventDefault()

  const $fileInput = document.getElementById('image')
  const formData = new FormData($form)
  formData.append('image', $fileInput.files)

  fetch('/teams/create', {
    method: 'POST',
    body: formData,
  }).catch(error => {
    console.error(error)
  })
}
