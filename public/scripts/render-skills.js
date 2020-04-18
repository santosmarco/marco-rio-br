let skills;

function renderSkills(category) {
  function handleRendering(category) {
    let html = "";

    skills[category].forEach((subcategory, subcategoryIdx, subcategories) => {
      html += `
        <div class="row mb-1">
          <div class="col">
            <h6 class="mb-2">${subcategory[0]}</h6>
          </div>
        </div>
        <div class="row justify-content-between mb-4">
      `;

      subcategory[1].forEach((skill, skillIdx, skills) => {
        html += `
          <div class="col-12 col-md-6 ${
            subcategoryIdx == subcategories.length - 1 &&
            skillIdx == skills.length - 1
              ? ""
              : "mb-1"
          } ${skillIdx % 2 === 0 ? "pr-md-5" : "pl-md-5"}">
            <div class="d-flex align-items-baseline justify-content-between">
              <div style="max-width:30%;">${skill[0]}
              </div>
              <div
                class="bg-dark rounded-pill"
                style="width:70%;height:0.8em;"
              >
                <div 
                  class="bg-success rounded-pill"
                  style="height:0.8em;width:${skill[1] * 100}%;"
                >
                </div>
              </div>
            </div>
          </div>
        `;
      });

      html += "</div>";
    });

    $("#skillsContent").html(html);
  }

  if (!skills) {
    $.ajax({
      url: `/api/skills`,
      type: "GET",
    }).then((res) => {
      skills = res;
      handleRendering(category);
    });
  } else {
    handleRendering(category);
  }
}

export default renderSkills;
