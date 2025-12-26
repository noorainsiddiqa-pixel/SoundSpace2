// js/auth.js

// --- GOOGLE LOGIN ---
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      console.log("Logged in as:", user.email);

      // Save / update user document
      db.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // move UI forward (to your spotify connect screen)
      showScreen("spotify");

      // show spotify connect button if you have one
      const spotifyBtn = document.getElementById("spotifyBtn");
      if (spotifyBtn) spotifyBtn.style.display = "block";
    })
    .catch(err => {
      console.error("Google login error:", err);
      alert(err.message);
    });
}

// --- LISTEN FOR LOGIN STATE CHANGES ---
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Session active:", user.email);

    // optional: automatically go to spotify screen
    // comment this out if you don't want auto navigation
    // showScreen("spotify");

    const spotifyBtn = document.getElementById("spotifyBtn");
    if (spotifyBtn) spotifyBtn.style.display = "block";
  } else {
    console.log("No user logged in");
  }
});

// --- OPTIONAL SIGN OUT (if you add a logout button) ---
function logoutUser() {
  auth.signOut().then(() => {
    console.log("User signed out");
    showScreen("landing");
  });
}

// ⚠️ expose functions globally for HTML onclick=""
window.googleLogin = googleLogin;
window.logoutUser = logoutUser;
