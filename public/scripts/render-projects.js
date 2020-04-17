let projects;

function renderProjects() {
  function handleRendering() {
    let html = "";

    projects.forEach((p, idx) => {
      html += `
        <div
          class="d-inline-block projects-showcase-project card ${
            idx === projects.length - 1 ? "mr-3" : "mr-2"
          } position-relative"
          style=""
        >
          <a href="${p.url.main}" target="_blank">
            <img
              class="card-img-top"
              src="/project${idx}-thumbnail.png"
              alt="${p.title}"
            />
          </a>
          <div class="card-body p-3">
            <div class="mb-3">
              <h5 class="card-title mb-1">
                ${p.title}
              </h5>
              <h6 class="card-subtitle text-muted font-italic">
                <small>${p.subtitle}</small>
              </h6>
            </div>
            <div class="psp-description card-text text-left">
              ${p.description}
            </div>
            <div class="mt-4">
              <a href="${p.url.source}" target="_blank" class="mr-2">Source</a>
              <a href="${p.url.user_stories}" target="_blank">User stories</a>
            </div>
          </div>
        </div>
      `;
    });

    $("#projectsShowcaseContent").html(html);

    fixHeights();

    $(".project-tooltip")
      .click(function() {
        event.preventDefault();
        $(this).tooltip("show");
      })
      .hover(
        function() {
          $(this).tooltip("show");
        },
        function() {
          $(this).tooltip("hide");
        }
      );
  }

  if (!projects) {
    $.ajax({
      url: `/api/projects`,
      type: "GET"
    }).then(res => {
      projects = res.reverse();
      handleRendering();
    });
  } else {
    handleRendering();
  }
}

function fixHeights() {
  // Config
  let lineHeight = 24;
  let maxLines = 5;

  let maxHeight = lineHeight * maxLines;
  let minWords = maxLines * 3;

  $(".psp-description").each(function() {
    let $el = $(this);
    let $elHeight = $el.height();
    if ($elHeight > maxHeight) {
      let limiter = minWords - 1;
      let oldText = $el.text();
      let words = oldText.split(" ");
      let newText = words.slice(0, limiter);
      do {
        newText = newText.concat(words.slice(limiter, limiter + 1));
        limiter++;
        $el.text(newText.join(" "));
        $elHeight = $el.height();
      } while ($elHeight < maxHeight);
      $el.html(
        $el.html() +
          `
          ...
          <small>
            <a
              href="#"
              class="project-tooltip"
              data-toggle="tooltip"
              data-placement="auto"
              title="${oldText}"
              >(more)
            </a>
          </small>
          `
      );
    } else {
      while ($elHeight < maxHeight) {
        $el.html($el.html() + "<br>");
        $elHeight = $el.height();
      }
    }
  });
}

export default renderProjects;
