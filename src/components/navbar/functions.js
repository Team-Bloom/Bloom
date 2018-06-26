

export const displayForm = (action) => {
  if (action === 'addCollaborator') {
    const formTwo = document.getElementById('save-form');
    if (formTwo.classList.contains('show')) {
      formTwo.classList.remove('show');
    }
    const formOne = document.getElementById('collab-form');
    formOne.classList.add('show');

  } else if (action === 'save') {
    const formOne = document.getElementById('collab-form');
    if (formOne.classList.contains('show')) {
      formOne.classList.remove('show');
    }
    const formTwo = document.getElementById('save-form');
    formTwo.classList.add('show');
  }
}

export const removeForm = () => {
  const formOne = document.getElementById('collab-form');
  const formTwo = document.getElementById('save-form');
  formOne.classList.remove('show');
  formTwo.classList.remove('show');
}

export const checkUnique = (collaborators, collabEmail, userEmail) => {
  return collaborators.filter(person => {
    if ((person.email === collabEmail) && (person.email !== userEmail)) {
    return person
    }
  })
}
