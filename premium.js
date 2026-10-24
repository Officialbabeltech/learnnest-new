/* LearnNest Premium classes — Firebase Realtime Database */
(() => {
  const ADMIN_UID = "G6y0n77CeaRaUVF4F0pY0eCG5Nf1";
  const byId = id => document.getElementById(id);
  const setStatus = (id, message) => { const el = byId(id); if (el) el.textContent = message; };
  const schedule = [
    ["Monday","3:00–3:50 pm","Mathematics"],["Monday","4:00–4:50 pm","English Language"],
    ["Tuesday","3:00–3:50 pm","Basic Science"],["Tuesday","4:00–4:50 pm","Computer Studies"],
    ["Wednesday","3:00–3:50 pm","Biology"],["Wednesday","4:00–4:50 pm","Chemistry"],
    ["Thursday","3:00–3:50 pm","Physics"],["Thursday","4:00–4:50 pm","Government"],
    ["Friday","3:00–3:50 pm","Weekly revision"],["Friday","4:00–4:50 pm","Questions and practice"]
  ];
  const tbody = byId("classSchedule");
  if (tbody) schedule.forEach(([day,time,subject]) => {
    const tr = document.createElement("tr");
    [day,time,subject].forEach(value => { const td=document.createElement("td"); td.textContent=value; tr.append(td); });
    tbody.append(tr);
  });

  if (!window.firebase || !firebase.apps.length) {
    setStatus("premiumAuthStatus","Sign in with Google above to view subscription options.");
    return;
  }
  const auth = firebase.auth();
  const db = firebase.database();
  const requestForm = byId("subscriptionRequestForm");
  const requestBtn = byId("sendSubscriptionRequest");
  const adminPanel = byId("premiumAdminPanel");
  const meetPanel = byId("meetAccessPanel");
  const whatsappLink = "https://wa.me/2349163250794";

  function showSignedOut() {
    setStatus("premiumAuthStatus","Sign in with Google above to request a class subscription.");
    if (requestForm) requestForm.hidden = true;
    if (meetPanel) meetPanel.hidden = true;
    if (adminPanel) adminPanel.hidden = true;
  }

  async function renderUser(user) {
    if (!user) return showSignedOut();
    setStatus("premiumAuthStatus","Signed in as " + (user.email || "your Google account"));
    if (requestForm) requestForm.hidden = false;
    if (adminPanel) adminPanel.hidden = user.uid !== ADMIN_UID;
    const [subSnap, requestSnap] = await Promise.all([
      db.ref("subscriptions/" + user.uid).get(),
      db.ref("subscriptionRequests/" + user.uid).get()
    ]);
    const sub = subSnap.val();
    const active = !!(sub && sub.active === true && Number(sub.expiresAt) > Date.now());
    if (meetPanel) meetPanel.hidden = !active;
    if (active) {
      setStatus("subscriptionStatus","Your subscription is active until " + new Date(Number(sub.expiresAt)).toLocaleDateString());
      const urlSnap = await db.ref("settings/meetUrl").get();
      const url = urlSnap.val();
      const join = byId("joinMeetButton");
      if (join && typeof url === "string" && /^https:\/\/meet\.google\.com\/[a-z0-9-]+$/i.test(url)) {
        join.href = url;
        join.hidden = false;
      } else if (join) {
        join.hidden = true;
        setStatus("meetLinkStatus","Your subscription is active. The class link is being configured by the administrator.");
      }
    } else {
      setStatus("subscriptionStatus",sub && sub.expiresAt ? "Your previous subscription has expired. You can renew below." : (requestSnap.exists ? "Your payment request is awaiting admin review." : "No active subscription yet."));
    }
    if (user.uid === ADMIN_UID) loadAdmin();
  }

  if (requestForm) requestForm.addEventListener("submit", async event => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return setStatus("requestStatus","Please sign in first.");
    const reference = (byId("paymentReference").value || "").trim();
    if (reference.length < 4) return setStatus("requestStatus","Enter the transfer reference or transaction description.");
    requestBtn.disabled = true;
    setStatus("requestStatus","Sending your request…");
    try {
      await db.ref("subscriptionRequests/" + user.uid).set({
        uid:user.uid, email:user.email || "", displayName:user.displayName || "",
        paymentReference:reference, status:"pending", submittedAt:firebase.database.ServerValue.TIMESTAMP
      });
      setStatus("requestStatus","Request submitted. Please send your payment receipt to the LearnNest administrator on WhatsApp for manual verification.");
      window.open(whatsappLink + "?text=" + encodeURIComponent("Hello, I have submitted a LearnNest class subscription request. My registered email is " + (user.email || "") + ". My payment reference is " + reference + ". Please verify my payment."),"_blank","noopener");
    } catch (error) {
      console.error(error);
      setStatus("requestStatus","Could not submit your request. Please check your connection and try again.");
    } finally { requestBtn.disabled = false; }
  });

  async function loadAdmin() {
    const list = byId("pendingRequests");
    if (!list) return;
    list.replaceChildren();
    try {
      const snap = await db.ref("subscriptionRequests").get();
      const requests = snap.val() || {};
      const entries = Object.entries(requests);
      if (!entries.length) { list.textContent = "There are no subscription requests yet."; return; }
      for (const [uid,req] of entries) {
        const activeSnap = await db.ref("subscriptions/" + uid).get();
        const activeSub = activeSnap.val();
        const isActive = activeSub && activeSub.active === true && Number(activeSub.expiresAt) > Date.now();
        const card = document.createElement("article");
        card.className = "request-card";
        const info = document.createElement("p");
        info.textContent = (req.displayName || "Learner") + " · " + (req.email || "No email") + " · Reference: " + (req.paymentReference || "Not supplied") + (isActive ? " · Approved" : " · Pending");
        card.append(info);
        if (!isActive) {
          const approve = document.createElement("button");
          approve.type = "button"; approve.className = "btn"; approve.textContent = "Approve for 30 days";
          approve.addEventListener("click", async () => {
            approve.disabled = true;
            try {
              await db.ref("subscriptions/" + uid).set({active:true, approvedAt:Date.now(), expiresAt:Date.now() + 30*24*60*60*1000});
              await loadAdmin();
              setStatus("adminStatus","Subscription approved for 30 days.");
            } catch (error) {
              console.error(error); approve.disabled = false;
              setStatus("adminStatus","Approval failed. Check database rules and try again.");
            }
          });
          card.append(approve);
        }
        list.append(card);
      }
    } catch (error) {
      console.error(error);
      list.textContent = "Could not load requests. Check the database rules.";
    }
  }

  const saveMeet = byId("saveMeetLink");
  if (saveMeet) saveMeet.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user || user.uid !== ADMIN_UID) return setStatus("adminStatus","Administrator access required.");
    const value = (byId("meetLinkInput").value || "").trim();
    if (!/^https:\/\/meet\.google\.com\/[a-z0-9-]+$/i.test(value)) return setStatus("adminStatus","Enter a valid Google Meet URL.");
    saveMeet.disabled = true;
    try {
      await db.ref("settings/meetUrl").set(value);
      setStatus("adminStatus","Private class link saved. Active subscribers can now access it.");
    } catch (error) {
      console.error(error); setStatus("adminStatus","Could not save the link. Check database rules.");
    } finally { saveMeet.disabled = false; }
  });

  auth.onAuthStateChanged(user => renderUser(user).catch(error => {
    console.error(error);
    setStatus("premiumAuthStatus","Could not load your subscription. Please refresh and try again.");
  }));
})();
        
