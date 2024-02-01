const myQuestions = [
    {
      question: "Javascript is _________ language.",
      answers: {
        a: "Programming",
        b: "Application",
        c: "None of These",
        d: "Scripting",
      },
      multi: false,
      correctAnswer: "d",
    },
    {
      question:
        "Which of the following is a valid type of function javascript supports?",
      answers: {
        a: "named function",
        b: "anonymous function",
        c: "both of the above",
        d: "none of the above",
      },
      multi: false,
      correctAnswer: "c",
    },
    {
      question:
        "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
      answers: {
        a: "getIndex()",
        b: "location()",
        c: "indexOf()",
        d: "getLocation()",
      },
      multi: false,
      correctAnswer: "c",
    },
    {
      question: "Which one of the following is valid data type of JavaScript",
      answers: {
        a: "number",
        b: "void",
        c: "boolean",
        d: "nothing",
      },
      multi: false,
      correctAnswer: "c",
    },
  ];
  
  var preview = document.querySelector("#preview");
  var page = document.querySelector('p[id="p"]');
  var multi = document.querySelector('p[id="multi"]');
  multi.style.display = "none";
  var submitButton = document.querySelector("#submit");
  var previosButton = document.querySelector("#previos");
  var nextButton = document.querySelector("#next");
  submitButton.style.display = "none";
  var endButton = document.querySelector("#end");
  endButton.style.display = "none";
  
  nextButton.addEventListener("click", onNextClick);
  previosButton.addEventListener("click", onPreviosClick);
  submitButton.addEventListener("click", onSubmitClick);
  endButton.addEventListener("click", onEndClick);
  var indexQuestion = 0;
  var questionsLength = myQuestions.length;
  var indexAnswer = myQuestions[indexQuestion].answers;
  var arrayChoice = JSON.parse(localStorage.getItem("arrayChoice")) || [];
  
  //display question
  
  var displayquestion = (indexQuestion) => {
    return `<label> Question ${indexQuestion + 1}: ${
      myQuestions[indexQuestion].question
    }</label> </br>
          ${displayanwers(indexQuestion)}
     `;
  };
  var displayanwers = (indexQuestion) => {
    var choicesHTML = "";
    var valueAtChoice = arrayChoice[indexQuestion];
    for (let index in indexAnswer) {
      if (index === valueAtChoice) {
        choicesHTML += `<input type="radio" name="answer" id="${index}" checked > ${index.toUpperCase()}. ${
          indexAnswer[index]
        } </br>`;
      } else {
        choicesHTML += `<input type="radio" name="answer" id="${index}"  > ${index.toUpperCase()}. ${
          indexAnswer[index]
        } </br>`;
      }
    }
  
    return choicesHTML;
  };
  
  var showquestion = (indexQuestion) => {
    preview.innerHTML = `${displayquestion(indexQuestion)}`;
    page.innerHTML = `${indexQuestion + 1} out of ${questionsLength}`;
    var yes =
      myQuestions[indexQuestion].correctAnswer === arrayChoice[indexQuestion];
    yes
      ? (multi.innerHTML = `<i id="correct"> correct <i class="fa-thin fa-check"></i> </i>`)
      : (multi.innerHTML = `<i id="notcorrect">correct answer: ${myQuestions[indexQuestion].correctAnswer}</i>`);
    choice(indexQuestion);
  };
  showquestion(0);
  
  function choice(indexQuestion) {
    var input = document.querySelectorAll("input");
    input.forEach((element, index) => {
      element.addEventListener("change", () => {
        arrayChoice[indexQuestion] = element.id;
        localStorage.setItem("arrayChoice", JSON.stringify(arrayChoice));
      });
    });
  }
  
  //button
  var hasReviewed = JSON.parse(localStorage.getItem("hasReviewed")) || false;
  
  function onNextClick() {
    console.log(hasReviewed, hasReviewed === true);
    if (indexQuestion < myQuestions.length - 1) {
      indexQuestion += 1;
      showquestion(indexQuestion);
      previosButton.style.display = "inline-block";
      if (hasReviewed === true) {
        console.log("a");
        submitButton.style.display = "none";
      }
    } else {
      if (hasReviewed === true) {
        console.log("a");
        submitButton.style.display = "none";
      } else {
        submitButton.style.display = "inline-block";
        nextButton.style.display = "none";
      }
    }
  }
  
  function onPreviosClick() {
    // console.log(indexQuestion)
    if (indexQuestion > 0) {
      preview.style = "none";
      submitButton.style.display = "none";
      nextButton.style.display = "inline-block";
      p.style.display = "flex";
      indexQuestion -= 1;
      showquestion(indexQuestion);
      if (indexQuestion === 0) previosButton.style.display = "none";
    }
  }
  
  function onSubmitClick() {
    console.log(indexQuestion);
    localStorage.setItem("hasReviewed", true);
    hasReviewed = true;
    multi.style.display = "inline-block";
    endButton.style.display = "inline-block";
    preview.style.display = "none";
    p.style.display = "none";
    preview.innerHTML = `<h1> Your score: ${total()} / ${
      myQuestions.length
    } </h1>`;
    Object.assign(preview.style, {
      display: "grid",
      justifyContent: "center",
      alignItems: "flex-start",
    });
  }
  
  function onEndClick() {
    p.style.display = "none";
    multi.style.display = "none";
    endButton.style.display = "none";
    nextButton.style.display = "none";
    previosButton.style.display = "none";
    preview.innerHTML = `<h1> You finished with ${total()} / ${
      myQuestions.length
    } of score </h1>`;
    Object.assign(preview.style, {
      display: "grid",
      justifyContent: "center",
      alignItems: "flex-start",
    });
  }
  
  function total() {
    var score = 0;
    myQuestions.forEach((obj, index) => {
      if (obj.correctAnswer === arrayChoice[index]) {
        score += 1;
      }
    });
    return score;
  }
