const $btnReset = document.querySelector('#button-reset')
$btnReset.addEventListener('click', handleReset)

function handleReset(e) {
  e.preventDefault()

  fetch('/reset', {
    method: 'POST',
  }).then(response => {
    if (!response.ok) {
      return response.text().then(data => console.error(data))
    }
  })
}
