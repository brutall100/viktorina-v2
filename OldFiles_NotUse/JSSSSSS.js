async function displayQuestion(data) {
    const questionElement = document.getElementById("question");
    questionElement.innerText = data.data.question;
  
    const answersElement = document.getElementById("answer");
    answersElement.innerHTML = "";
  
    const dotsElement = document.getElementById("dot-answer");
    dotsElement.innerHTML = "";
  
    // const lengthElement = document.getElementById("dot-answer-length");
    // lengthElement.innerText = data.data.answer.length;
  
    const words = data.data.answer.split(" ");
    const underscore = "_";
  
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        const dotSquareElem = document.createElement('div');
        dotSquareElem.classList.add('dot-answer');
        dotSquareElem.style.backgroundColor = 'green';
        dotSquareElem.innerText = " "
        dotsElement.appendChild(dotSquareElem);
      }
      if (i < words.length - 1) {
        const spaceElem = document.createTextNode("\u00A0");
        dotsElement.appendChild(spaceElem);
      }
    }
  
    await displayLettersWithDelay(answersElement, dotsElement.children, data.data.answer, 800);
  }
  
  async function displayLettersWithDelay(element, childrenCollection, string, delay) {
    for (let i = 0; i < childrenCollection.length && i < string.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      childrenCollection[i].innerText = string[i];
    }
  }