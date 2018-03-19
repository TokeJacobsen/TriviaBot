const https = require("https");
const Question = require('./question.js');
const url =
  "https://opentdb.com/api.php?amount=10&category=21&type=multiple";

function getQuestions () {
return new Promise(function(resolve, reject) {

    var questions = [];
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      for (var i = 0; i < 10; i++) {
      let question = body.results[i].question;
      let correctAnswer = body.results[i].correct_answer;
      let incorrectAnswer = body.results[i].incorrect_answers;
      let singleQuestion = new Question(question, correctAnswer, incorrectAnswer);
      questions.push(singleQuestion);
    }
    });
  });
  resolve(questions);
});

};

async function getContent() {

  var shouldBeAnArrayOfQuestions = await getQuestions();
  console.log(shouldBeAnArrayOfQuestions);
}

getContent();
