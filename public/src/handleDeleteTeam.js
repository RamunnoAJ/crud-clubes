const $buttonDelete = document.querySelector('#button-delete')

$buttonDelete.addEventListener('click', handleDelete)

function handleDelete(e) {
  e.preventDefault()

  const id = e.target.dataset.teamId

  fetch(`/teams/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      return response.text().then(data => console.error(data))
    }
    // eslint-disable-next-line no-undef
    Toastify({
      text: 'Team deleted successfully',
      duration: 3000,
      gravity: 'top',
      close: false,
      className:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-900',
    }).showToast()

    document.body.style = 'cursor: wait'

    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  })
}
