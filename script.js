const startButton = document.getElementById('start-recognition');
const stopButton = document.getElementById('stop-recognition');
const transcription = document.getElementById('transcription');

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
function findWord(sentence, words) {
  for (var i = 0; i < words.length; i++) {
    if (sentence.toLowerCase().indexOf(words[i].toLowerCase()) !== -1) {
      return words[i];
    }
  }
  return null;
}
words = ['home','about','contact'];
recognition.onresult = (event) => {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;
  transcription.textContent = text;
  var text1 =  findWord(text, words);
  if(text1!=null)
  {
    navigate(text1)
  }
  else{
    alert("No such page, Retry");
  }
  
}

recognition.onend = () => {
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.onclick = () => {
  recognition.start();
  startButton.disabled = true;
  stopButton.disabled = false;
}

stopButton.onclick = () => {
  recognition.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
}

function navigate(id) {
  if(id=="home")
  {
    id = "index";
  }
  id = id + ".html";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.href = id;
      } else {
        alert("Couldnot recognize Please try again!");
      }
    }
  }
  xhttp.open("GET", id, true);
xhttp.send();
}