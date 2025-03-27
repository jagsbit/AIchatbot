const prompt = document.querySelector("#prompt");
const submitBtn = document.querySelector("#submit");
const chatContainer = document.querySelector(".chat-container");
const logoutBtn = document.querySelector("#logout-btn");
const model=document.querySelector("#friend-type")
const newchat=document.querySelector("#new-chat-btn");

//console.log(model.value)

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOsbOJFM1Yh1jSCMtPZuQNTmj8zT8Bp6w";

//User message structure
let user = {
    message: null
};

//Generate AI Response
async function generateResponse(aiChatBox) {
    const text = aiChatBox.querySelector(".ai-chat-area");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: user.message }]
                }
            ]
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        //console.log(data)
        const apiResponse = data.candidates[0].content.parts[0].text
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .trim();

        text.innerHTML = apiResponse;
    } catch (error) {
        console.error("Error:", error);
        text.innerHTML = "Failed to get a response. Please try again.";
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    }
}



// Create Chat Box
function createChatBox(html, classes) {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}
let dp=""
// Handle User Message
function handleChatResponse(userMessage) {
  user.message = userMessage;
  if (!userMessage.trim()) return;

  const html = `
          <img src=${dp} alt="" id="userImage" alt="default-user.png" width="8%">
        <div class="user-chat-area">${userMessage}</div>
        
    `;
    prompt.value=""
  const userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });

  setTimeout(() => {
    const html = `
           <img src="robot-assistant.png" alt="" id="aiImage" width="10%">
            <div class="ai-chat-area">
                <img src="loading.webp" alt="Loading..." class="load" width="30px">
            </div>
        `;
    const aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    generateResponse(aiChatBox);
  }, 600);
}

// Event Listeners
prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleChatResponse(prompt.value);
});

submitBtn.addEventListener("click", () => handleChatResponse(prompt.value));

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBipX4Sqvu4A69cLEbVresBoUkV7J7NLIo",
  authDomain: "chatbot-authentication-c31bb.firebaseapp.com",
  projectId: "chatbot-authentication-c31bb",
  storageBucket: "chatbot-authentication-c31bb.firebasestorage.app",
  messagingSenderId: "546757007382",
  appId: "1:546757007382:web:a971228c142e6b69737d37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

 

// Check if user is logged in and fetch profile picture
onAuthStateChanged(auth, (user) => {
  if (user && user.photoURL) {
  

    // Set the profile picture if available
   
  } else {
    dp='default-user.png'
    console.log("No user logged in");
    // Optionally redirect to login page
    // window.location.href = 'register.html';
  }
});
document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth).then(() => {
      // Sign-out successful.
      //alert("Successfully logged out");
      window.location.href = 'index.html'; // Redirect to index page after logout
  }).catch((error) => {
      // Handle errors here
      console.error("Logout Error:", error);
      alert("Failed to log out: " + error.message);
  });
});

newchat.addEventListener('click',()=>{
  const elements1 = document.querySelectorAll('.user-chat-box');
  elements1.forEach(element => element.remove());
  const elements2 = document.querySelectorAll('.ai-chat-box');
  elements2.forEach(element => element.remove());
});


