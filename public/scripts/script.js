import renderProjects from "./render-projects.js";
import renderSkills from "./render-skills.js";

function getNavbarHeight() {
  return $("#navbar").outerHeight();
}

function scrollTo($target) {
  $("html, body").animate(
    { scrollTop: $target.offset().top - getNavbarHeight() },
    1000
  );
}

function updateHeadTitle($currentSection) {
  let newHeadTitle = "Marco Santos";
  switch ($currentSection.attr("id")) {
    case "#skills":
      newHeadTitle = "Marco Santos • Skills";
      break;
    case "#life":
      newHeadTitle = "Marco Santos • Life & Career";
      break;
    case "#projects":
      newHeadTitle = "Marco Santos • Projects";
      break;
    case "#contact":
      newHeadTitle = "Marco Santos • Contact";
      break;
  }
  $("title").text(newHeadTitle);
}

function animateChevron($parent, mode) {
  let $chevron = $(`#${$parent.attr("id")}Chevron`);
  $({ deg: mode === "in" ? 0 : 180 }).animate(
    { deg: mode === "in" ? 180 : 360 },
    {
      duration: 400,
      step: now => {
        $chevron.css({ transform: "rotate(" + now + "deg)" });
      }
    }
  );
}

function handleCVDownload() {
  alert("Sorry, this functionality is temporarily unavailable.");
}

function handleContactFormSubmission($form) {
  let $formId = $form.attr("id");
  let sender = $(`#${formId}Name`)
    .val()
    .trim();
  let formData = $form.serialize();

  let $formControls = $(".form-control");
  let $formStatus = $(`#${formId}Status`);
  let $submitBtn = $(`#${formId}SubmitBtn`);

  $submitBtn
    .attr("disabled", true)
    .html(`Sending message... <i class="fas fa-spinner fa-pulse ml-1"></i>`);
  $formControls.attr("disabled", true);

  if (!$formStatus.hasClass("d-none")) {
    $formStatus.animate(
      { opacity: 0 },
      {
        complete: () => {
          $formStatus.addClass("d-none");
          $form.addClass("mb-3");
        }
      }
    );
  }

  $.ajax({
    url: `/contact?${formData}`,
    type: "POST",
    success: res => {
      $formStatus.html(
        `<i class="fas fa-check-circle mr-1"></i> <span class="font-weight-bold mr-2">Success!</span> Thank you, ${sender}! Your e-mail was sent successfully. Marco will answer it shortly.`
      );
      $formControls.val("");
      $(`#${formId}Subject`).val("Work-related");
    },
    error: res => {
      $formStatus.html(
        `<i class="fas fa-times-circle mr-1"></i> <span class="font-weight-bold mr-2">Error.</span> Sorry, ${sender}... There was an error while trying to send your e-mail to Marco from this form. Please send it manually to me@marco.rio.br.`
      );
    },
    complete: () => {
      $form.addClass("mb-3");
      $formStatus.css("opacity", 1).removeClass("d-none");

      $formControls.attr("disabled", false);
      $submitBtn.attr("disabled", false).html(`Send message <i
            class="fas fa-paper-plane ml-1"></i>`);
    }
  });
}

function updateSkillsMenuItems($currentItem) {
  if ($currentItem.hasClass("skills-menu-item-sm")) {
    $(".skills-menu-item-sm").removeClass("active");
    $currentItem.addClass("active");
  } else {
    $(".skills-menu-item")
      .removeClass("btn-secondary btn-primary")
      .addClass("btn-primary");
    $currentItem.removeClass("btn-primary").addClass("btn-secondary");
  }
}

function renderSkillsCategory($skillsMenuItem) {
  let category = $skillsMenuItem
    .attr("id")
    .replace("sMI-", "")
    .replace("SM-", "")
    .replace("-", " ");
  renderSkills(category);
  $("#skillsMenuCurrent").text(category);
}

$(document).ready(() => {
  /*
  Add padding-top to section#meetMarco
  in order to compensate nav height
  */
  $("#meetMarco").css("padding-top", getNavbarHeight());

  /*
  Bind actions of scrolling to target section
  and updating the head's title element according to it
  on the navbar internal links, logo and the CTA button on #meetMarco
  */
  $(".nav-link-inside, .navbar-brand, #meetMarcoCallToAction").click(
    function() {
      event.preventDefault();
      $("#navbarSupportedContent").collapse("hide");
      let targetSection = $($(this).href);
      scrollTo(targetSection);
      updateHeadTitle(targetSection);
    }
  );

  /*
  Bind chevron animations to #lifeCareer.collapse elements
  and to the dropdown under #skills (xs and sm screens only)
  */
  $("#lifeCareer.collapse")
    .on("show.bs.collapse", function() {
      animateChevron($(this), "in");
    })
    .on("hide.bs.collapse", function() {
      animateChevron($(this), "out");
    });
  $("#skillsMenuDropdown")
    .on("show.bs.dropdown", function() {
      animateChevron($(this), "in");
    })
    .on("hide.bs.dropdown", function() {
      animateChevron($(this), "out");
    });

  // Bind the handler for downloading my curriculum to #downloadCVBtn
  $("#downloadCVBtn").click(function() {
    event.preventDefault();
    handleCVDownload();
  });

  // Bind the handler for submitting the #contactForm to it
  $("#contactForm").submit(function() {
    event.preventDefault();
    handleContactFormSubmission($(this));
  });

  /*
  Bind to the menu items under #skills the on-click functions to
  update all other menu items according to the one clicked and
  to render the skills under the category this menu item represents
  */
  $(".skills-menu-item, .skills-menu-item-sm").click(function() {
    event.preventDefault();
    let currItem = $(this);
    updateSkillsMenuItems(currItem);
    renderSkillsCategory(currItem);
  });

  // Render my projects and skills from /data
  renderProjects();
  renderSkills("Programming");
});
