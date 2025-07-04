import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style/pallet.css';
// app.jsx – Rituals of the Scrolls: Sigilographic Digitalis
// This file serves as the entry point for the React application, setting up routing and importing necessary components.
// It includes the main application structure and initializes the scrolls opening ritual.
// Import necessary libraries and components

import React from "react";
import ScrollViewer from "./components/ScrollViewer";
import ScrollsOpening from "./components/ScrollsOpening";
import "./styles.css"; // Import your CSS styles
import MarkdownPage from "./components/MarkdownPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScrollsOpening />} />
        <Route path="/scrolls/:filename" element={<MarkdownPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// scroll.js – Ritual Animation Handler for Sigilographic Digitalis

document.addEventListener("DOMContentLoaded", () => {
  animateOnboarding();
  bindRituals();
});

function animateOnboarding() {
  console.log("✨ Initiation sequence begun");
  document.body.classList.add("onboarding-init");
}

function bindRituals() {
  const scrollLinks = document.querySelectorAll(".scroll a");
  scrollLinks.forEach(link => {
    link.addEventListener("mouseover", () => triggerRitual("hover"));
    link.addEventListener("click", (e) => {
      triggerRitual("click");
      // Optional: prevent default to animate first
      // e.preventDefault();
      // setTimeout(() => { window.location = link.href; }, 300);
    });
  });

  window.addEventListener("scroll", () => {
    triggerRitual("scroll");
  });
}

function triggerRitual(type) {
  switch (type) {
    case "hover":
      document.body.style.cursor = "pointer";
      auraPulse();
      break;
    case "click":
      ritualActivation();
      break;
    case "scroll":
      glyphReveal();
      break;
    default:
      console.log(`Unknown ritual: ${type}`);
  }
}

function auraPulse() {
  const sigil = document.querySelector(".sigil");
  if (sigil) {
    sigil.style.transition = "box-shadow 0.3s ease";
    sigil.style.boxShadow = "0 0 12px #00ffff, 0 0 24px #B026FF";
    setTimeout(() => {
      sigil.style.boxShadow = "none";
    }, 400);
  }
}

function ritualActivation() {
  const body = document.body;
  body.classList.add("ritual-activated");
  setTimeout(() => body.classList.remove("ritual-activated"), 600);
}

function glyphReveal() {
  const scrolls = document.querySelectorAll(".scroll");
  scrolls.forEach((el, i) => {
    el.style.transition = "opacity 1s ease, transform 1s ease";
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
  });
  console.log("✨ Glyphs revealed in scroll");
}

// Expand with commitBlessing(), veilLifting(), etc. as needed
