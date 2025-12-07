const storyCatalog = [
  {
    id: "hermanos-laiwi",
    title: "Los Hermanos Laiwi",
    province: "Angaraes"
  },
  {
    id: "laguna-choclococha",
    title: "La Laguna de Choclococha",
    province: "Castrovirreyna"
  },
  {
    id: "mina-santa-barbara",
    title: "La Mina de Santa Bárbara",
    province: "Huancavelica"
  }
];

const FAVORITES_KEY = "hvk_favorite_stories";
const LAST_SUBMISSION_KEY = "hvk_last_submission";

/**
 * Load favorite story IDs from localStorage.
 * @returns {string[]} An array of story IDs.
 */
function loadFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Save favorite story IDs to localStorage.
 * @param {string[]} favorites
 */
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Given a story ID, return its metadata object from the catalog.
 * @param {string} id
 * @returns {object | undefined}
 */
function getStoryById(id) {
  return storyCatalog.find((story) => story.id === id);
}

/* ------------------------------
   Navigation toggle
------------------------------ */

function setupNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!navToggle || !navList) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ------------------------------
   Favorites feature
------------------------------ */

function setupFavorites() {
  const buttons = document.querySelectorAll(".favorite-button");
  if (!buttons.length) return;

  let favorites = loadFavorites();

  // Update button appearance based on stored favorites
  buttons.forEach((button) => {
    const storyId = button.dataset.storyId || button.closest("[data-story-id]")?.dataset.storyId;
    if (!storyId) return;

    if (favorites.includes(storyId)) {
      button.classList.add("is-favorite");
    }

    button.addEventListener("click", () => {
      toggleFavorite(storyId, button, favorites);
      // Refresh favorites panel if present
      renderFavoritesList(favorites);
    });
  });

  // Initial render of favorites list if on stories page
  renderFavoritesList(favorites);
}

/**
 * Toggle a story in the favorites list.
 * Uses conditional branching and array methods (includes, filter, push).
 */
function toggleFavorite(storyId, button, favorites) {
  const isAlreadyFavorite = favorites.includes(storyId);

  if (isAlreadyFavorite) {
    // Remove from favorites
    favorites = favorites.filter((id) => id !== storyId);
    button.classList.remove("is-favorite");
  } else {
    favorites.push(storyId);
    button.classList.add("is-favorite");
  }

  saveFavorites(favorites);
}

/**
 * Render the favorites list into the #favorites-list element (if present).
 */
function renderFavoritesList(favorites = loadFavorites()) {
  const listElement = document.getElementById("favorites-list");
  if (!listElement) return;

  listElement.innerHTML = "";

  if (!favorites.length) {
    listElement.innerHTML = "<li>No favorites yet. Click ☆ Add to favorites on a story.</li>";
    return;
  }

  // Map favorite IDs to objects using the catalog
  const favoriteObjects = favorites
    .map((id) => getStoryById(id))
    .filter((story) => story !== undefined);

  favoriteObjects.forEach((story) => {
    const item = document.createElement("li");
    item.textContent = `${story.title} (${story.province})`;
    listElement.appendChild(item);
  });
}

/* ------------------------------
   Form handling (share.html)
------------------------------ */

function setupStoryForm() {
  const form = document.getElementById("story-form");
  const statusElement = document.getElementById("form-status");

  if (!form || !statusElement) return;

  // If there is a last submission in localStorage, we can show a small note
  const lastSubmission = localStorage.getItem(LAST_SUBMISSION_KEY);
  if (lastSubmission) {
    try {
      const submission = JSON.parse(lastSubmission);
      statusElement.textContent = `Last time you submitted "${submission.storyTitle}" from ${submission.province}.`;
    } catch {
      // ignore JSON errors
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather values in an object (JavaScript object requirement)
    const submission = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      role: form.role.value,
      storyTitle: form["story-title"].value.trim(),
      province: form.province.value.trim(),
      storyType: form["story-type"].value,
      storyText: form["story-text"].value.trim(),
      permission: form.permission.checked
    };

    // Basic conditional validation (JS conditional branching)
    if (!submission.name || !submission.email || !submission.storyTitle || !submission.storyText || !submission.permission) {
      statusElement.textContent = "Please complete all required fields and confirm permission.";
      statusElement.classList.remove("success");
      statusElement.classList.add("error");
      return;
    }

    // Save to localStorage so we can refer to it later
    localStorage.setItem(LAST_SUBMISSION_KEY, JSON.stringify(submission));

    // Show confirmation message using template literals
    statusElement.textContent = `Thank you, ${submission.name}! Your story "${submission.storyTitle}" from ${submission.province} has been received for review.`;
    statusElement.classList.remove("error");
    statusElement.classList.add("success");

    // Optionally reset the form
    form.reset();
  });
}

/* ------------------------------
   Misc: current year in footer
------------------------------ */

function setCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ------------------------------
   DOMContentLoaded: initialize
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupNavigation();
  setupFavorites();
  setupStoryForm();
});
