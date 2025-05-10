let answerArea = document.querySelector(".questionArea");
let btn = document.querySelector(".submitBtn");

function getData(que, index) {
  return `
    <div>
      <h2 class="text-xl font-semibold mb-2">Question ${index}</h2>
      <p class="question text-gray-300">${que}</p>
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
  const question = fetch("./aSSETS/jsons/day1.json")
    .then((response) => response.json())
    .then((data) => {
      createDOM(data.questions);
    });
}

// btn.addEventListener("click", () => {
//   let input = document.querySelectorAll("textarea");
//   let ques = document.querySelectorAll(".question");
//   const nodeArrayQue = Array.from(ques);
//   const nodeArray = Array.from(input);
//   let ans = [];
//   let que = [];
//   nodeArray.map((val) => {
//     ans.push(val.value);
//   });
//   nodeArrayQue.map((val) => {
//     que.push(val.innerText);
//   });
//   let content = "";
//   que.forEach((item, index) => {
//     content += item + "\n";
//     content += "Prompt:-\n" + ans[index * 2] + "\n\n";
//     content += "ChatGpt Answer:-\n" + ans[index * 2 + 1] + "\n\n";
//   });
//   console.log(content);
// });

btn.addEventListener("click", () => {
  const input = document.querySelectorAll("textarea");
  const ques = document.querySelectorAll(".question");
  const ans = Array.from(input).map((val) => val.value);
  const que = Array.from(ques).map((val) => val.innerText);

  let content = "";

  que.forEach((item, index) => {
    content += "Day 1 Solutions\n";
    content += `${item}\n`;
    content += `Prompt:-\n${ans[index * 2] || ""}\n\n`;
    content += `ChatGpt Answer:-\n${ans[index * 2 + 1] || ""}\n`;
    content += `\n-----------------------------------------------\n\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "answers.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

fetchData();
