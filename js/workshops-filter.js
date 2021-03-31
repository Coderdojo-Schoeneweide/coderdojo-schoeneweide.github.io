let showFilter = false;
let filterArrow;
let filter;
let results;

let ageFilter = null;
let durationFilter = null;
let tagFilters = [];

document.addEventListener("DOMContentLoaded", () => {
    filter = document.querySelector("#filter");
    results = document.querySelectorAll("#results li");

    const filterToggle = document.querySelector("#filter-toggle");
    filterArrow = filterToggle.querySelector("span");
    filterToggle.addEventListener("click", toggleFilter);

    filter.querySelector("#age-filter").addEventListener("change", event => {
        ageFilter = event.target.value !== "" ? event.target.value : null;
        updateFilterResults();
    });
    filter.querySelector("#duration-filter").addEventListener("change", event => {
        durationFilter = event.target.value !== "" ? event.target.value : null;
        updateFilterResults();
    });
    filter.querySelectorAll("#tag-filters input")
        .forEach(checkbox => checkbox.addEventListener("change", event => {
            if (event.target.checked)
                tagFilters.push(event.target.value);
            else
                tagFilters.splice(tagFilters.indexOf(event.target.value), 1);
            updateFilterResults();
        }));
});

function toggleFilter(event) {
    event.preventDefault();
    showFilter = !showFilter;
    console.log(showFilter);
    if (showFilter) {
        filterArrow.innerText = "▾";
        filter.classList.add("show");
    } else {
        filterArrow.innerText = "▸";
        filter.classList.remove("show");
    }
}

function updateFilterResults() {
    results.forEach(workshop => {
        workshop.hidden = !((!ageFilter || workshop.dataset.age === ageFilter) &&
            (!durationFilter || workshop.dataset.duration === durationFilter) &&
            (tagFilters.length === 0 || tagFilters.every(c => workshop.dataset.tags.indexOf(c) >= 0)));
    });
}
