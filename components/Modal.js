import { useState} from "react";

export default function Modal() {
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
  // For any other query
  const alts = ["Go on...", "Try again",];

  function compare(qs, ans, q) {
    for (let r = 0; r < qs.length; r++) {
      for (let c = 0; c < qs[r].length; c++) {
        if (qs[r][c] === q) {
          return ans[r][Math.floor(Math.random() * ans[r].length)];
        }
      }
    }
    return alts[Math.floor(Math.random() * alts.length)]
  }

  const [chat, setChat] = useState([])

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      let input = e.target.value;
      e.target.value = '';
      let txt = input.toLowerCase().replace(/[^\w\s\d]/gi, '');
      txt = txt.replace(/ a /g," ").replace(/please /g, '').replace(/ please/g, '');
      
      let res = compare(qs, ans, txt);
      let cur = [[input, 'Typing...'],];
      setChat([...chat, ...cur]);
      
      setTimeout(() => {
        let cur = [[input, res],];
        setChat([...chat, ...cur]);
        },1500);
    }
  }

  return (
    <div id="chat">
      <h4>Hi, how can I help you?</h4>
      <div id="msgs">
        {chat.map((pair,i) => 
          <div key={i}>
            <h5>{pair[0]}</h5>
            <h6>{pair[1]}</h6>
          </div>
        )}
      </div>
      <input id="input" onKeyDown={handleEnter} placeholder="Type here..." autoFocus />
    </div>
  );
}

// autoFocus={true} autocomplete="off"