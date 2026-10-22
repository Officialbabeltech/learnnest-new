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
