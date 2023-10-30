const nameButton = document.querySelector('button[data-target="name"]');
const genderButton = document.querySelector('button[data-target="gender"]');
const emailButton = document.querySelector('button[data-target="email"]');
const levelButton = document.querySelector('button[data-target="level"]');
const paragraph1 = document.querySelector('.content-response p:nth-of-type(1)');
const paragraph2 = document.querySelector('.content-response p:nth-of-type(2)');
const contentResponseDiv = document.querySelector('.content-response');

// Function to create a button element
function createButton(label, onClickHandler) {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', onClickHandler);
  return button;
}

// Function to update the content of the paragraphs
function updateContent(paragraph1Text, paragraph2Text) {
  paragraph1.textContent = paragraph1Text;
  paragraph2.textContent = paragraph2Text;
}

// Function to create a new button when a button is clicked
function createNewButton(buttonLabel, buttonAction) {
  // Clear existing buttons
  const existingButtons = contentResponseDiv.querySelectorAll('button');
  for (const button of existingButtons) {
    contentResponseDiv.removeChild(button);
  }
  
  const newButton = createButton(buttonLabel, buttonAction);
  contentResponseDiv.appendChild(newButton);
}

nameButton.addEventListener('click', () => {
  updateContent('Keisti vardą', 'Additional name info');
  createNewButton('New Name Button', () => {
    alert('New Name Button clicked!');
  });
});

genderButton.addEventListener('click', () => {
  updateContent('Keisti lytį', 'Additional gender info');
  createNewButton('New Gender Button', () => {
    alert('New Gender Button clicked!');
  });
});

emailButton.addEventListener('click', () => {
  updateContent('Keisti el. paštą', 'Additional email info');
  createNewButton('New Email Button', () => {
    alert('New Email Button clicked!');
  });
});

levelButton.addEventListener('click', () => {
  updateContent('Keisti lygį', 'Additional level info');
  createNewButton('New Level Button', () => {
    alert('New Level Button clicked!');
  });
});
