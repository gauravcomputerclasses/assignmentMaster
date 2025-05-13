let answerArea = document.querySelector(".questionArea");
let btn = document.querySelector(".submitBtn");

const firebaseConfig = {
  apiKey: "AIzaSyCEtIRc51sh8YQestqcrRSmNQSFvwGPR7I",
  authDomain: "quizdata-38c98.firebaseapp.com",
  projectId: "quizdata-38c98",
  storageBucket: "quizdata-38c98.firebasestorage.app",
  messagingSenderId: "955426247901",
  appId: "1:955426247901:web:583e9beaaa358970683734",
};

function getData(que, index) {
  return `
    <div>
      <h2 class="text-xl font-semibold mb-2">Question ${index}</h2>
      <p class="question text-gray-300 text-xl">${que}</p>
    </div>
    <div>
      <label for="q${index}a1" class="block text-gray-400 mb-1">Answer Box 1</label>
      <textarea id="q${index}a1" rows="1" placeholder = 'Enter Prompt Here'
          class="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>
    <div>
      <label for="q${index}a2" class="block text-gray-400 mb-1">Answer Box 2</label>
      <textarea id="q${index}a2" rows="6" placeholder = 'Enter output given by ChatGpt...'
          class="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>
  `;
}

function createDOM(arr) {
  const mapped = arr.map((que, index) => getData(que, index + 1));
  answerArea.innerHTML = mapped.join("");
}

function fetchData() {
  const question = fetch("./aSSETS/jsons/day2.json")
    .then((response) => response.json())
    .then((data) => {
      createDOM(data.questions);
    });
}

function sendResult(name, content) {
  const db = firebase.firestore();

  db.collection("masterAiAssignment")
    .add({
      name: name,
      content: content,
      day: "day2",
      timestamp: new Date(),
    })
    .then(() => {
      console.log("Data saved!");
    })
    .catch((error) => {
      console.log("Error saving data: ", error);
    });
}

btn.addEventListener("click", () => {
  const input = document.querySelectorAll("textarea");
  const ques = document.querySelectorAll(".question");
  const ans = Array.from(input).map((val) => val.value);
  const que = Array.from(ques).map((val) => val.innerText);

  let content = "";

  que.forEach((item, index) => {
    content += "Day 2 Solutions\n";
    content += `${item}\n`;
    content += `Prompt:-\n${ans[index * 2] || ""}\n\n`;
    content += `ChatGpt Answer:-\n${ans[index * 2 + 1] || ""}\n`;
    content += `\n-----------------------------------------------\n\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "day2.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  sendResult(name, content);
});
firebase.initializeApp(firebaseConfig);
fetchData();
