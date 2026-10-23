const subjects = {
"Mathematics": ["Number sense and place value","Fractions, decimals, and percentages","Algebra basics","Shapes and measurement","Data and graphs"],
"English Language": ["Parts of speech","Sentence building","Reading comprehension","Vocabulary development","Writing clearly"],
"Basic Science": ["Living and non-living things","Matter and materials","Energy in everyday life","Our environment","Scientific observation"],
"Computer Studies": ["Computer parts and functions","Using files and folders","Internet and online safety","Introduction to coding","Digital citizenship"],
"Social Studies": ["Family and community","Culture and identity","Citizenship","Maps and places","Working together"],
"Biology": ["Characteristics of living things","Cells and their functions","Plants and animals","Human body systems","Habitats and ecosystems"],
"Physics": ["Measurement and units","Forces and motion","Forms of energy","Light and sound","Simple machines"],
"Chemistry": ["States of matter","Elements and compounds","Mixtures and separation","Atoms and molecules","Chemical changes"]
};
const descriptions = {
"Mathematics":"Build confidence with numbers, patterns, and problem-solving.",
"English Language":"Strengthen reading, writing, grammar, and communication.",
"Basic Science":"Discover the world through questions and experiments.",
"Computer Studies":"Learn digital skills and understand the technology around you.",
"Social Studies":"Understand people, communities, and the world we share.",
"Biology":"Explore living things, ecosystems, and the human body.",
"Physics":"Explore forces, energy, motion, and how things work.",
"Chemistry":"Meet materials, elements, reactions, and everyday chemistry."
};

const lessons = {
  "Number sense and place value": {
    explanation: "A digit's place tells us its value in a number. Moving one place to the left makes its value ten times greater.",
    example: "In 352, the 3 represents 300, the 5 represents 50, and the 2 represents 2.",
    question: "What is the value of 4 in 4,281?",
    answer: "4,000"
  },
  "Fractions, decimals, and percentages": {
    explanation: "Fractions, decimals, and percentages are different ways of representing parts of a whole.",
    example: "One half is 1/2, 0.5, or 50%.",
    question: "What percentage is equal to 1/4?",
    answer: "25%"
  },
  "Algebra basics": {
    explanation: "Algebra uses letters to represent unknown numbers.",
    example: "If x + 3 = 8, subtract 3 from both sides to get x = 5.",
    question: "If x + 4 = 10, what is x?",
    answer: "6"
  },
  "Shapes and measurement": {
    explanation: "Shapes have properties such as sides, angles, length, and area.",
    example: "The perimeter of a rectangle is the total distance around its four sides.",
    question: "How many sides does a hexagon have?",
    answer: "6"
  },
  "Data and graphs": {
    explanation: "Data is information we collect. Tables and graphs help us organise and understand it.",
    example: "A bar chart compares amounts using bars of different heights.",
    question: "Which graph is useful for comparing amounts in different categories?",
    answer: "A bar chart"
  }
};


const $ = id => document.getElementById(id);
$("year").textContent = new Date().getFullYear();
$("menuToggle").addEventListener("click", () => {
  const open = $("nav").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => {
  $("nav").classList.remove("open"); $("menuToggle").setAttribute("aria-expanded","false");
}));
$("subjectSearch").addEventListener("input", e => {
  const q=e.target.value.trim().toLowerCase(); let count=0;
  document.querySelectorAll(".card").forEach(card => {
    const show=(card.dataset.subject+" "+card.textContent).toLowerCase().includes(q);
    card.hidden=!show;if(show)count++;
  });
  $("noResults").hidden=count>0;
});
function openSubject(name) {
  $("dialogTitle").textContent=name;
  $("dialogDescription").textContent=descriptions[name];
  $("topicList").replaceChildren();
  subjects[name].forEach(topic=>{const row=document.createElement("div");row.className="topic";row.textContent="✦  "+topic;$("topicList").append(row);});
  if($("subjectDialog").showModal) $("subjectDialog").showModal();
}
document.querySelectorAll("[data-open]").forEach(button=>button.addEventListener("click",()=>openSubject(button.dataset.open)));
$("closeDialog").addEventListener("click",()=>$("subjectDialog").close());
$("doneDialog").addEventListener("click",()=>$("subjectDialog").close());
$("subjectDialog").addEventListener("click",e=>{if(e.target===$("subjectDialog"))$("subjectDialog").close();});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});history.replaceState(null,"",a.getAttribute("href"));}
}));

/* LearnNest Firebase Google sign-in */
(() => {
  const authMessage = document.getElementById("authMessage");
  const signInButton = document.getElementById("googleSignIn");
  const signOutButton = document.getElementById("googleSignOut");
  const accountDetails = document.getElementById("accountDetails");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
 const learnerDashboard = document.getElementById("learnerDashboard");
  const dashboardName = document.getElementById("dashboardName");
  // Stop safely if the sign-in section is not present.
  if (!authMessage || !signInButton || !signOutButton ||
      !accountDetails || !userName || !userEmail) return;

  const firebaseConfig = {
    apiKey: "AIzaSyB4zWWaOsVbLlSUXCNTh5AhY5uPBExkNKc",
    authDomain: "learnnest-e4ee7.firebaseapp.com",
    databaseURL: "https://learnnest-e4ee7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "learnnest-e4ee7",
    storageBucket: "learnnest-e4ee7.firebasestorage.app",
    messagingSenderId: "218273655957",
    appId: "1:218273655957:web:c6bb5094f9dd288c1bbf9c",
    measurementId: "G-P4VS8LJ3Y6"
  };

  if (!window.firebase) {
    authMessage.textContent =
      "Sign-in tools could not load. Refresh the page and try again.";
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    signInButton.addEventListener("click", async () => {
      authMessage.textContent = "Opening Google sign-in…";
      signInButton.disabled = true;

      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error("LearnNest sign-in error:", error);
        authMessage.textContent =
          error.code === "auth/popup-closed-by-user"
            ? "Sign-in was cancelled. You can try again."
            : "Sign-in failed. Check your connection and Firebase settings, then try again.";
      } finally {
        signInButton.disabled = false;
      }
    });

    signOutButton.addEventListener("click", async () => {
      try {
        await auth.signOut();
        authMessage.textContent = "You have signed out.";
      } catch (error) {
        console.error("LearnNest sign-out error:", error);
        authMessage.textContent = "Sign-out failed. Please try again.";
      }
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        userName.textContent = user.displayName || "Learner";
        userEmail.textContent = user.email || "";

        if (dashboardName) {
          dashboardName.textContent = user.displayName || "Learner";
        }

        accountDetails.hidden = false;
        signInButton.hidden = true;

        if (learnerDashboard) {
          learnerDashboard.hidden = false;
        }

        authMessage.textContent = "Welcome to LearnNest!";
      } else {
        accountDetails.hidden = true;
        signInButton.hidden = false;

        if (learnerDashboard) {
          learnerDashboard.hidden = true;
        }

        authMessage.textContent = "Sign in with Google to get started.";
      }
    });
    
  } catch (error) {
    console.error("LearnNest Firebase setup error:", error);
    authMessage.textContent =
      "Firebase could not start. Please check the configuration.";
  }
})();
