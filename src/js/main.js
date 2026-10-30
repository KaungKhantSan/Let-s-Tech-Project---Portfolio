let menuIcon = document.querySelector("#menu-icon");
let navBar = document.querySelector(".navBar");

menuIcon.onclick = function () {
  menuIcon.classList.toggle("bx-x");
  navBar.classList.toggle("active");
};

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const messageField = contactForm.querySelector("#contact-message");
  const messageCount = contactForm.querySelector("#message-count");
  const status = contactForm.querySelector("#contact-status");

  let hasSubmitted = false;

  function validateField(field) {
    const value = field.value.trim();
    let error = "";

    if (!value) {
      error = "This field is required.";
    } else if (field.id === "contact-name" && value.length < 2) {
      error = "Name must be at least 2 characters.";
    } else if (field.id === "contact-email" && field.validity.typeMismatch) {
      error = "Enter a valid email address.";
    } else if (field.id === "contact-message" && value.length < 20) {
      error = "Message must be at least 20 characters.";
    } else if (field.id === "contact-message" && value.length > 500) {
      error = "Message must be no more than 500 characters.";
    }

    contactForm.querySelector(`#${field.id}-error`).textContent = error;
    if (error) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
    return error === "";
  }

  messageField.addEventListener("input", () => {
    const length = messageField.value.trim().length;
    messageCount.textContent = `${length} / 500 characters (20 minimum)`;
  });

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      status.textContent = "";
      if (hasSubmitted) validateField(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    hasSubmitted = true;

    const firstInvalid = fields.find((field) => !validateField(field));
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    status.textContent = "Demo only. Your message has not been sent.";
  });
}

const projects = [
  {
    title: "Receipes Website",
    description: "A personal portfolio website built for an HDIT assignment.",
    category: "Websites",
    technologies: ["TailWindCss", "React", "Express", "MongonDB", "NodeJS"],
    image: "/src/assets/Screenshot 2026-10-28 145723.png",
  },
  {
    title: "Coming Soon",
    description: "...",
    category: "Websites",
    technologies: ["..."],
  },
  {
    title: "Currency Converter App",
    description: "User can convert MMK to USD and more.",
    category: "JavaScript Apps",
    technologies: ["React", "TailWindCSS", "JavaScript"],
    image: "/src/assets/Screenshot 2026-10-30 185045.png",
  },
  {
    title: "Coming Soon",
    description: "...",
    category: "JavaScript Apps",
    technologies: ["..."],
  },
];

const projectList = document.querySelector("#projects-list");
const projectResults = document.querySelector("#project-results");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(category) {
  const visibleProjects =
    category === "All"
      ? projects
      : projects.filter((project) => project.category === category);

  const cards = visibleProjects.map((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.title;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.textContent = `Technologies : ${project.technologies.join(", ")}`;

    card.append(image, title, description, technologies);
    return card;
  });

  projectList.replaceChildren(...cards);
  projectResults.textContent = `${visibleProjects.length} projects shown`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute(
        "aria-pressed",
        String(filterButton === button),
      );
    });
    renderProjects(selectedCategory);
  });
});

renderProjects("All");

const themeToggle = document.querySelector("#theme-toggle");
const themeStorageKey = "portfolio-theme";

if (themeToggle) {
  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "Dark theme on" : "Dark theme off";
  }

  let savedTheme;

  try {
    savedTheme = window.localStorage.getItem(themeStorageKey);
  } catch (error) {
    console.log(error, "Something went wrong.");
  }

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch (error) {
      console.log(error, "Something went wrong.");
    }
  });
}
