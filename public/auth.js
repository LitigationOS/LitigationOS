import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { firebaseConfig, firebaseIsConfigured } from "./firebase-config.js";

const isLoginPage = document.body.dataset.page === "login";
const message = document.getElementById("loginMessage");

function setMessage(text, type = "") {
  if (!message) return;
  message.textContent = text;
  message.className = `message ${type}`;
}

if (!firebaseIsConfigured) {
  if (isLoginPage) {
    setMessage("Google sign-in is almost ready. The site owner must add the Firebase web configuration first.", "error");
  }
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  if (isLoginPage) {
    onAuthStateChanged(auth, (user) => {
      if (user) window.location.replace("/");
    });

    document.getElementById("googleLogin").addEventListener("click", async () => {
      const button = document.getElementById("googleLogin");
      button.disabled = true;
      setMessage("Opening Google sign-in…");
      try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await signInWithPopup(auth, provider);
        window.location.replace("/");
      } catch (error) {
        const readable = error.code === "auth/unauthorized-domain"
          ? "This domain has not been allowed in Firebase yet. Add app.litigationos.in under Firebase Authentication → Settings → Authorized domains."
          : "Google sign-in could not be completed. Please try again.";
        setMessage(readable, "error");
        button.disabled = false;
      }
    });
  } else {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("/login.html");
        return;
      }
      const label = document.getElementById("userLabel");
      if (label) label.textContent = user.displayName || user.email || "Signed in";
      const avatar = document.getElementById("userAvatar");
      if (avatar && user.photoURL) { avatar.src = user.photoURL; avatar.hidden = false; }
      if (avatar) avatar.alt = user.displayName || "User";
    });

    const logout = document.getElementById("logoutButton");
    if (logout) logout.addEventListener("click", () => signOut(auth));
  }
}
