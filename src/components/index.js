window.addEventListener('resize', () => {
  const fab = document.querySelector('.fabIcon')
  fab.style.bottom = 50 + window.scrollY + 'px'
})
