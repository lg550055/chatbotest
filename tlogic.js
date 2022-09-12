// Sample user queries
const qs = [ 
  ["how are you", "how is life", "how are things"],        //0
  ["hi", "hey", "hello", "good morning", "good afternoon"],      //1
  ["what are you doing", "whats going on", "whats up"],      //2
  ["how old are you"],					//3
  ["who are you", "are you human", "are you bot", "are you robot", "are you human or bot"],   //4
];
 
// Sample responses corresponding to triggers
const ans = [
  ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"], //0
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],	//1
  ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"], //2
  ["I am infinite"],					//3
  ["I am just a bot", "I am a bot. What are you?"],	//4   
];
 
// For any other user input
const alts = ["Go on...", "Try again",];

function compare(qs, ans, q) {
  let a
  for (let r = 0; r < qs.length; r++) {
    for (let c = 0; c < qs[r].length; c++) {
      if (qs[r][c] === q) {
        a = ans[r][Math.floor(Math.random() * ans[r].length)];
        return a
      }
    }
  }
  // return alts[1]
  return alts[Math.floor(Math.random() * alts.length)]
}

function addEntry(input, res) {
  const chatBox = document.getElementById("msgs")
  let userDiv = document.createElement("div");
  userDiv.className = "usertext";
  userDiv.innerHTML = `${input}`;
  chatBox.appendChild(userDiv);
 
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.className = "bottext";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  chatBox.appendChild(botDiv);

  setTimeout(() => {
    botText.innerText = `${res}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#input").addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
      let input = e.target.value;
      e.target.value = '';
      let txt = input.toLowerCase().replace(/[^\w\s\d]/gi, '');
      txt = txt.replace(/ a /g," ").replace(/please /g, '').replace(/ please/g, '');
      
      res = compare(qs, ans, txt);

      addEntry(input, res)
    }
  });
});