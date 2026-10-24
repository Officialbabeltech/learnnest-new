/* LearnNest complete main.js: subjects, 64 lessons, navigation, search, and Firebase Google sign-in. */
const subjects = {
  "Mathematics": ["Number sense and place value", "Fractions, decimals, and percentages", "Algebra basics", "Shapes and measurement", "Data and graphs", "Introduction to number patterns", "Ratio and proportion", "Perimeter and area"],
  "English Language": ["Parts of speech", "Sentence building", "Reading comprehension", "Vocabulary development", "Writing clearly", "Punctuation and capital letters", "Types of sentences", "Paragraph writing"],
  "Basic Science": ["Living and non-living things", "Matter and materials", "Energy in everyday life", "Our environment", "Scientific observation", "The human senses", "Weather and climate", "Water cycle"],
  "Computer Studies": ["Computer parts and functions", "Using files and folders", "Internet and online safety", "Introduction to coding", "Digital citizenship", "Input and output devices", "Word processing", "Algorithms and instructions"],
  "Social Studies": ["Family and community", "Culture and identity", "Citizenship", "Maps and places", "Working together", "Needs and wants", "Rules and responsibilities", "Resources in the community"],
  "Biology": ["Characteristics of living things", "Cells and their functions", "Plants and animals", "Human body systems", "Habitats and ecosystems", "Nutrition in living things", "Reproduction in plants", "Food chains"],
  "Physics": ["Measurement and units", "Forces and motion", "Forms of energy", "Light and sound", "Simple machines", "Mass and weight", "Electric circuits", "Temperature and heat"],
  "Chemistry": ["States of matter", "Elements and compounds", "Mixtures and separation", "Atoms and molecules", "Chemical changes", "Physical and chemical changes", "Acids and bases", "Separating mixtures"]
};

const descriptions = {
  "Mathematics": "Build confidence with numbers, patterns, and problem-solving.",
  "English Language": "Strengthen reading, writing, grammar, and communication.",
  "Basic Science": "Discover the world through questions and experiments.",
  "Computer Studies": "Learn digital skills and understand the technology around you.",
  "Social Studies": "Understand people, communities, and the world we share.",
  "Biology": "Explore living things, ecosystems, and the human body.",
  "Physics": "Explore forces, energy, motion, and how things work.",
  "Chemistry": "Meet materials, elements, reactions, and everyday chemistry."
};

const lessons = {
  "Number sense and place value": {
    explanation: "A digit's place tells us its value. Each place to the left is ten times greater.",
    example: "In 352, 3 means 300, 5 means 50, and 2 means 2.",
    question: "What is the value of 4 in 4,281?",
    answer: "4,000"
  },
  "Fractions, decimals, and percentages": {
    explanation: "Fractions, decimals, and percentages represent parts of a whole.",
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
    explanation: "Shapes have properties such as sides, angles, length, perimeter, and area.",
    example: "A triangle has three sides.",
    question: "How many sides does a hexagon have?",
    answer: "6"
  },
  "Data and graphs": {
    explanation: "Data is information we collect. Tables and graphs help us organise and understand it.",
    example: "A bar chart compares amounts using bars.",
    question: "Which graph is useful for comparing categories?",
    answer: "A bar chart"
  },
  "Introduction to number patterns": {
    explanation: "A number pattern follows a rule, such as adding the same number each time.",
    example: "In 3, 6, 9, 12, each number increases by 3.",
    question: "What comes next: 5, 10, 15, 20, __?",
    answer: "25"
  },
  "Ratio and proportion": {
    explanation: "A ratio compares quantities. Proportion describes when two ratios are equal.",
    example: "The ratio 2:4 is equivalent to 1:2.",
    question: "Simplify the ratio 6:9.",
    answer: "2:3"
  },
  "Perimeter and area": {
    explanation: "Perimeter measures the distance around a shape. Area measures the space inside it.",
    example: "A rectangle 5 cm by 3 cm has an area of 15 cm².",
    question: "What is the perimeter of a square with sides of 4 cm?",
    answer: "16 cm"
  },
  "Parts of speech": {
    explanation: "Parts of speech describe the jobs words do in sentences. Common types include nouns, verbs, adjectives, and adverbs.",
    example: "In 'The quick dog runs,' dog is a noun, quick is an adjective, and runs is a verb.",
    question: "Which part of speech names a person, place, thing, or idea?",
    answer: "A noun"
  },
  "Sentence building": {
    explanation: "A complete sentence usually expresses a complete thought and includes a subject and a predicate.",
    example: "'The children are reading.' The children is the subject; are reading is the predicate.",
    question: "Correct this fragment: 'Because it was raining.'",
    answer: "Example: 'We stayed indoors because it was raining.'"
  },
  "Reading comprehension": {
    explanation: "Reading comprehension means understanding a text, identifying its main idea, and using details as evidence.",
    example: "If a passage explains how plants grow, its main idea may be plant growth.",
    question: "What should you look for to identify a passage's main idea?",
    answer: "The central point repeated or supported by key details"
  },
  "Vocabulary development": {
    explanation: "Vocabulary is the collection of words you understand and use. Context clues can help you infer unfamiliar words.",
    example: "In 'The arid desert was very dry,' arid means dry.",
    question: "What does 'enormous' mean?",
    answer: "Very large"
  },
  "Writing clearly": {
    explanation: "Clear writing organises ideas logically and uses specific words, complete sentences, and punctuation.",
    example: "Instead of 'It was nice,' write 'The sunny park was peaceful.'",
    question: "Name one thing that makes writing easier to understand.",
    answer: "Clear organisation, specific words, or correct punctuation"
  },
  "Living and non-living things": {
    explanation: "Living things carry out life processes such as growing, using energy, and reproducing. Non-living things do not.",
    example: "A seed is living even when it appears inactive; a stone is non-living.",
    question: "Name one life process.",
    answer: "Growth, reproduction, or using energy"
  },
  "Matter and materials": {
    explanation: "Matter is anything that has mass and takes up space. Materials are types of matter used to make objects.",
    example: "A metal spoon and a wooden spoon are made from different materials.",
    question: "What two features describe matter?",
    answer: "It has mass and takes up space"
  },
  "Energy in everyday life": {
    explanation: "Energy makes changes and movement possible. Forms include light, heat, sound, electrical, and chemical energy.",
    example: "A lamp changes electrical energy into light and heat.",
    question: "What energy form does a lamp produce that helps us see?",
    answer: "Light energy"
  },
  "Our environment": {
    explanation: "The environment includes living things and the air, water, and land around them.",
    example: "Planting trees can provide habitats and help protect soil.",
    question: "Give one way to care for the environment.",
    answer: "Reduce waste, recycle, or plant trees"
  },
  "Scientific observation": {
    explanation: "Observation uses senses or tools to gather information. Measurements make observations more precise.",
    example: "A thermometer measures temperature rather than relying only on touch.",
    question: "Which tool measures temperature?",
    answer: "A thermometer"
  },
  "Computer parts and functions": {
    explanation: "Computer hardware includes physical parts such as the monitor, keyboard, mouse, and system unit.",
    example: "A keyboard is used to enter text; a monitor displays information.",
    question: "Which device is commonly used to type text?",
    answer: "A keyboard"
  },
  "Using files and folders": {
    explanation: "Files store information; folders help organise files so they are easier to find.",
    example: "A folder named 'Schoolwork' can contain separate subject documents.",
    question: "Why are folders useful?",
    answer: "They organise files"
  },
  "Internet and online safety": {
    explanation: "Online safety includes protecting private information, using strong passwords, and checking before opening unknown links.",
    example: "Ask a trusted adult before sharing personal information or downloading an unfamiliar file.",
    question: "What should you do with a suspicious link?",
    answer: "Do not open it; check with a trusted adult"
  },
  "Introduction to coding": {
    explanation: "Coding means writing instructions a computer can follow. Programs often use sequence, decisions, and repetition.",
    example: "A sequence might tell a character to move forward, turn, then move again.",
    question: "What is a computer program?",
    answer: "A set of instructions for a computer"
  },
  "Digital citizenship": {
    explanation: "Digital citizenship means using technology respectfully, responsibly, and safely.",
    example: "Ask permission before posting another person's photo.",
    question: "Give one example of respectful online behaviour.",
    answer: "Be polite, protect privacy, or ask permission before sharing"
  },
  "Family and community": {
    explanation: "Families and communities are groups of people who support one another and share responsibilities.",
    example: "Community members may work together to keep a street clean.",
    question: "Name one way to help your community.",
    answer: "Volunteer, keep shared spaces clean, or help neighbours"
  },
  "Culture and identity": {
    explanation: "Culture includes shared language, food, music, traditions, and values. Identity describes aspects of who a person is.",
    example: "A community may celebrate a festival through music and traditional food.",
    question: "Name one example of culture.",
    answer: "Language, food, music, or traditions"
  },
  "Citizenship": {
    explanation: "Citizenship involves rights, responsibilities, and participating positively in a community or country.",
    example: "Following fair rules and helping others are responsible actions.",
    question: "Name one responsibility of a good citizen.",
    answer: "Obey fair laws, respect others, or care for public property"
  },
  "Maps and places": {
    explanation: "Maps represent places and use symbols, labels, and directions to help people navigate.",
    example: "A map key explains what symbols on a map mean.",
    question: "What does a map key explain?",
    answer: "The meaning of map symbols"
  },
  "Working together": {
    explanation: "Cooperation means people share ideas and responsibilities to reach a common goal.",
    example: "A group project works well when everyone has a clear task and listens to others.",
    question: "Name one skill that helps teamwork.",
    answer: "Listening, communication, fairness, or sharing tasks"
  },
  "Characteristics of living things": {
    explanation: "Living things are organised, use energy, respond to their surroundings, grow, and reproduce.",
    example: "A plant grows toward light, showing a response to its environment.",
    question: "Name one characteristic of living things.",
    answer: "Growth, response, reproduction, or use of energy"
  },
  "Cells and their functions": {
    explanation: "Cells are the basic units of life. Some organisms have one cell; others have many specialised cells.",
    example: "Red blood cells carry oxygen around the body.",
    question: "What is the basic unit of life?",
    answer: "The cell"
  },
  "Plants and animals": {
    explanation: "Plants generally make their own food using sunlight. Animals get energy by eating plants or other organisms.",
    example: "A green plant uses light energy in photosynthesis.",
    question: "What process do plants use to make food?",
    answer: "Photosynthesis"
  },
  "Human body systems": {
    explanation: "Body systems work together to keep the body functioning. Examples include the digestive, respiratory, and circulatory systems.",
    example: "The respiratory system helps the body take in oxygen.",
    question: "Which system moves blood around the body?",
    answer: "The circulatory system"
  },
  "Habitats and ecosystems": {
    explanation: "A habitat is where an organism lives. An ecosystem includes living things and their interactions with each other and their environment.",
    example: "A pond ecosystem includes water, plants, insects, fish, and microorganisms.",
    question: "What is a habitat?",
    answer: "The place where an organism lives"
  },
  "Measurement and units": {
    explanation: "Measurement compares a quantity with a standard unit. Length, mass, and time have commonly used units.",
    example: "Length may be measured in metres; time in seconds.",
    question: "What is the SI unit of length?",
    answer: "The metre"
  },
  "Forces and motion": {
    explanation: "A force is a push or pull that can change an object's motion or shape.",
    example: "Kicking a stationary ball applies a force that makes it move.",
    question: "What can a force do to an object's motion?",
    answer: "Change its speed or direction, or start or stop its motion"
  },
  "Forms of energy": {
    explanation: "Energy exists in forms such as kinetic, potential, thermal, chemical, and electrical energy.",
    example: "A raised book has gravitational potential energy.",
    question: "What kind of energy is associated with movement?",
    answer: "Kinetic energy"
  },
  "Light and sound": {
    explanation: "Light travels as waves and can reflect or refract. Sound is produced by vibrations and needs a medium to travel.",
    example: "A vibrating guitar string produces sound.",
    question: "What produces sound?",
    answer: "Vibrations"
  },
  "Simple machines": {
    explanation: "Simple machines make work easier by changing the size or direction of a force. Examples include levers, pulleys, and inclined planes.",
    example: "A ramp is an inclined plane that helps move objects to a higher level.",
    question: "What simple machine is a ramp?",
    answer: "An inclined plane"
  },
  "States of matter": {
    explanation: "The common states of matter are solid, liquid, and gas. They differ in shape, volume, and particle movement.",
    example: "Ice is solid water; liquid water flows; water vapour is a gas.",
    question: "What state of matter has a fixed volume but takes the shape of its container?",
    answer: "Liquid"
  },
  "Elements and compounds": {
    explanation: "An element contains one kind of atom. A compound contains two or more different elements chemically combined.",
    example: "Oxygen is an element; water is a compound made from hydrogen and oxygen.",
    question: "Is water an element or a compound?",
    answer: "A compound"
  },
  "Mixtures and separation": {
    explanation: "A mixture contains substances physically combined. Methods such as filtration and evaporation can separate mixtures.",
    example: "Filtration can separate sand from water.",
    question: "Which method can separate insoluble sand from water?",
    answer: "Filtration"
  },
  "Atoms and molecules": {
    explanation: "Atoms are tiny units of elements. Molecules form when two or more atoms are chemically joined.",
    example: "An oxygen molecule contains two oxygen atoms.",
    question: "How many atoms are in a water molecule, H₂O?",
    answer: "Three"
  },
  "Chemical changes": {
    explanation: "A chemical change forms new substances. Signs may include gas production, colour change, or heat, though context matters.",
    example: "Iron reacting with oxygen and moisture forms rust.",
    question: "Is rusting a chemical or physical change?",
    answer: "A chemical change"
  },
  "Punctuation and capital letters": {
    explanation: "Punctuation marks organise writing and make meaning clear. Capital letters begin sentences and proper nouns.",
    example: "Use a full stop at the end of a statement and a question mark after a question.",
    question: "Which punctuation mark ends a direct question?",
    answer: "A question mark (?)"
  },
  "Types of sentences": {
    explanation: "Sentences can be statements, questions, commands, or exclamations.",
    example: "“Please close the door.” is a command.",
    question: "What type of sentence asks something?",
    answer: "A question"
  },
  "Paragraph writing": {
    explanation: "A paragraph develops one main idea using related supporting sentences.",
    example: "A paragraph about reading can begin with a topic sentence, then give reasons and examples.",
    question: "What does a topic sentence introduce?",
    answer: "The main idea of the paragraph"
  },
  "The human senses": {
    explanation: "The five main senses help us gather information about our surroundings.",
    example: "Eyes help us see, ears help us hear, and skin helps us feel touch.",
    question: "Which sense organ helps us hear?",
    answer: "The ear"
  },
  "Weather and climate": {
    explanation: "Weather describes short-term atmospheric conditions; climate describes long-term patterns.",
    example: "A rainy afternoon is weather; a region’s usual wet and dry seasons are part of its climate.",
    question: "Which describes conditions over many years?",
    answer: "Climate"
  },
  "Water cycle": {
    explanation: "The water cycle moves water through evaporation, condensation, and precipitation.",
    example: "The Sun warms water, vapour rises, cools into clouds, and may fall as rain.",
    question: "What is the process by which liquid water changes into vapour?",
    answer: "Evaporation"
  },
  "Input and output devices": {
    explanation: "Input devices send data to a computer; output devices present information from it.",
    example: "A keyboard is an input device; a monitor is an output device.",
    question: "Is a printer an input or output device?",
    answer: "Output device"
  },
  "Word processing": {
    explanation: "Word-processing software helps create, edit, format, and save text documents.",
    example: "You can use headings and paragraphs to organise a school report.",
    question: "Name one task word-processing software can perform.",
    answer: "Create or edit text documents"
  },
  "Algorithms and instructions": {
    explanation: "An algorithm is a clear sequence of steps for completing a task.",
    example: "A recipe is like an algorithm because it gives steps in order.",
    question: "What should instructions be like to make an algorithm useful?",
    answer: "Clear and in the correct order"
  },
  "Needs and wants": {
    explanation: "Needs are things people require to live; wants are things they would like to have.",
    example: "Food and clean water are needs; a new game may be a want.",
    question: "Is clean drinking water a need or a want?",
    answer: "A need"
  },
  "Rules and responsibilities": {
    explanation: "Rules guide behaviour, while responsibilities are duties people are expected to carry out.",
    example: "Following classroom rules and keeping shared spaces tidy are responsibilities.",
    question: "Why do communities have rules?",
    answer: "To support safety, fairness, and cooperation"
  },
  "Resources in the community": {
    explanation: "Communities use natural, human, and capital resources to meet people’s needs.",
    example: "Rivers are natural resources; teachers are human resources.",
    question: "Which type of resource includes people’s skills and work?",
    answer: "Human resources"
  },
  "Nutrition in living things": {
    explanation: "Living things need nutrients for energy, growth, and repair.",
    example: "Plants make food by photosynthesis, while animals obtain nutrients by eating.",
    question: "What process do green plants use to make food?",
    answer: "Photosynthesis"
  },
  "Reproduction in plants": {
    explanation: "Many flowering plants reproduce through pollination and fertilisation, leading to seed formation.",
    example: "Pollen can be carried from one flower to another by insects or wind.",
    question: "What is the transfer of pollen called?",
    answer: "Pollination"
  },
  "Food chains": {
    explanation: "A food chain shows how energy passes from one organism to another.",
    example: "Grass → grasshopper → frog shows one simple feeding relationship.",
    question: "What is usually the first living level in a food chain?",
    answer: "A producer, such as a green plant"
  },
  "Mass and weight": {
    explanation: "Mass is the amount of matter in an object; weight is the force of gravity on it.",
    example: "Mass is measured in kilograms, while weight is a force measured in newtons.",
    question: "Which is measured in newtons: mass or weight?",
    answer: "Weight"
  },
  "Electric circuits": {
    explanation: "A simple circuit needs a complete conducting path for electric current to flow.",
    example: "A cell, wires, and a bulb can form a simple circuit when connected in a closed loop.",
    question: "What happens when a circuit is open?",
    answer: "Current cannot flow around the complete path"
  },
  "Temperature and heat": {
    explanation: "Temperature measures how hot or cold something is; heat is energy transferred because of a temperature difference.",
    example: "A warm object can transfer energy to a cooler object when they touch.",
    question: "Which one is a measure of how hot something is?",
    answer: "Temperature"
  },
  "Physical and chemical changes": {
    explanation: "A physical change alters form or state without making a new substance; a chemical change forms new substances.",
    example: "Melting ice is physical; iron rusting is chemical.",
    question: "Is melting ice a physical or chemical change?",
    answer: "A physical change"
  },
  "Acids and bases": {
    explanation: "Acids and bases are groups of substances with different properties, which indicators can help identify.",
    example: "Litmus paper is an indicator that changes colour in acidic or basic solutions.",
    question: "What can an indicator help us identify?",
    answer: "Whether a substance is acidic or basic"
  },
  "Separating mixtures": {
    explanation: "Mixtures can be separated using physical methods chosen for their properties.",
    example: "Filtration separates an insoluble solid from a liquid.",
    question: "Which method can separate sand from water?",
    answer: "Filtration"
  }
};

const $ = id => document.getElementById(id);

if ($("year")) $("year").textContent = new Date().getFullYear();

const menuToggle = $("menuToggle");
const nav = $("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

/* Search subject cards only, not account/dashboard cards. */
if ($("subjectSearch")) {
  $("subjectSearch").addEventListener("input", event => {
    const query = event.target.value.trim().toLowerCase();
    let visibleCount = 0;
    document.querySelectorAll(".card[data-subject]").forEach(card => {
      const show = ((card.dataset.subject || "") + " " + card.textContent).toLowerCase().includes(query);
      card.hidden = !show;
      if (show) visibleCount++;
    });
    if ($("noResults")) $("noResults").hidden = visibleCount > 0;
  });
}

function openSubject(name) {
  const dialog = $("subjectDialog");
  const topicList = $("topicList");
  if (!dialog || !topicList || !subjects[name]) {
    console.error("LearnNest could not open subject:", name);
    return;
  }
  $("dialogTitle").textContent = name;
  $("dialogDescription").textContent = descriptions[name] || "";
  topicList.replaceChildren();
  topicList.hidden = false;
  if ($("lessonContent")) $("lessonContent").hidden = true;
  if ($("topicNote")) $("topicNote").hidden = false;
  if ($("doneDialog")) $("doneDialog").hidden = false;

  subjects[name].forEach(topic => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "topic";
    button.textContent = "✦  " + topic;
    button.addEventListener("click", () => openLesson(topic));
    topicList.append(button);
  });

  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function openLesson(topic) {
  const lessonContent = $("lessonContent");
  const topicList = $("topicList");
  const lessonTitle = $("lessonTitle");
  const lessonExplanation = $("lessonExplanation");
  const lessonExample = $("lessonExample");
  const lessonQuestion = $("lessonQuestion");
  const lessonAnswer = $("lessonAnswer");
  const showAnswer = $("showAnswer");

  if (!lessonContent || !topicList || !lessonTitle || !lessonExplanation ||
      !lessonExample || !lessonQuestion || !lessonAnswer || !showAnswer) {
    console.error("Lesson HTML elements are missing. Check index.html.");
    return;
  }

  const lesson = lessons[topic];
  lessonTitle.textContent = topic;
  if (lesson) {
    lessonExplanation.textContent = lesson.explanation;
    lessonExample.textContent = lesson.example;
    lessonQuestion.textContent = lesson.question;
    lessonAnswer.textContent = "Answer: " + lesson.answer;
    showAnswer.hidden = false;
  } else {
    lessonExplanation.textContent = "This lesson is coming soon. Please explore another topic for now.";
    lessonExample.textContent = "";
    lessonQuestion.textContent = "";
    lessonAnswer.textContent = "";
    showAnswer.hidden = true;
  }
  lessonAnswer.hidden = true;
  topicList.hidden = true;
  if ($("topicNote")) $("topicNote").hidden = true;
  lessonContent.hidden = false;
  if ($("doneDialog")) $("doneDialog").hidden = true;
}

if ($("showAnswer")) $("showAnswer").addEventListener("click", () => {
  if ($("lessonAnswer")) $("lessonAnswer").hidden = false;
});

if ($("backToTopics")) $("backToTopics").addEventListener("click", () => {
  if ($("lessonContent")) $("lessonContent").hidden = true;
  if ($("topicList")) $("topicList").hidden = false;
  if ($("topicNote")) $("topicNote").hidden = false;
  if ($("doneDialog")) $("doneDialog").hidden = false;
});

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => openSubject(button.dataset.open));
});

if ($("closeDialog") && $("subjectDialog")) $("closeDialog").addEventListener("click", () => $("subjectDialog").close());
if ($("doneDialog") && $("subjectDialog")) $("doneDialog").addEventListener("click", () => $("subjectDialog").close());
if ($("subjectDialog")) $("subjectDialog").addEventListener("click", event => {
  if (event.target === $("subjectDialog")) $("subjectDialog").close();
});

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
  const selector = link.getAttribute("href");
  if (!selector || selector === "#") return;
  const target = document.querySelector(selector);
  if (target) {
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", selector);
  }
}));

/* Firebase Google sign-in and learner dashboard */
(() => {
  const authMessage = $("authMessage");
  const signInButton = $("googleSignIn");
  const signOutButton = $("googleSignOut");
  const accountDetails = $("accountDetails");
  const userName = $("userName");
  const userEmail = $("userEmail");
  const learnerDashboard = $("learnerDashboard");
  const dashboardName = $("dashboardName");

  if (!authMessage || !signInButton || !signOutButton || !accountDetails || !userName || !userEmail) return;

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
    authMessage.textContent = "Sign-in tools could not load. Refresh the page and try again.";
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    signInButton.addEventListener("click", async () => {
      authMessage.textContent = "Opening Google sign-in…";
      signInButton.disabled = true;
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error("LearnNest sign-in error:", error);
        authMessage.textContent = error.code === "auth/popup-closed-by-user"
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
        if (dashboardName) dashboardName.textContent = user.displayName || "Learner";
        accountDetails.hidden = false;
        signInButton.hidden = true;
        if (learnerDashboard) learnerDashboard.hidden = false;
        authMessage.textContent = "Welcome to LearnNest!";
      } else {
        accountDetails.hidden = true;
        signInButton.hidden = false;
        if (learnerDashboard) learnerDashboard.hidden = true;
        authMessage.textContent = "Sign in with Google to get started.";
      }
    });
  } catch (error) {
    console.error("LearnNest Firebase setup error:", error);
    authMessage.textContent = "Firebase could not start. Please check the configuration.";
  }
})();
