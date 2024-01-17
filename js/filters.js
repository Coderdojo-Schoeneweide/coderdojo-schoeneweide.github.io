let showFilter = false;
let filterArrow;
let filterWorkshop;
let filterBlog;
let resultsBlog;
let results;

let ageFilter = null;
let durationFilter = null;
let readingFilter = null;
let titleFilter = null;
let tagBlogFilters = [];
let tagFilters = [];

document.addEventListener("DOMContentLoaded", () => {
    filterWorkshop = document.querySelector("#filter");
    filterBlog = document.querySelector("#filter-blogs");
    results = document.querySelectorAll("#results li");
    resultsBlog = document.querySelectorAll("#results-blogs li");

    if (filterWorkshop != null) {
        const filterToggle = document.querySelector("#filter-toggle");
        filterArrow = filterToggle.querySelector("span");
        filterToggle.addEventListener("click", toggleFilterWorkshop);

        filterWorkshop.querySelector("#age-filter").addEventListener("change", event => {
            ageFilter = event.target.value !== "" ? event.target.value : null;
            updateFilterWorkshopResults();
        });
        filterWorkshop.querySelector("#duration-filter").addEventListener("change", event => {
            durationFilter = event.target.value !== "" ? event.target.value : null;
            updateFilterWorkshopResults();
        });
        filterWorkshop.querySelectorAll("#tag-filters input")
            .forEach(checkbox => checkbox.addEventListener("change", event => {
                if (event.target.checked)
                    tagFilters.push(event.target.value);
                else
                    tagFilters.splice(tagFilters.indexOf(event.target.value), 1);
                updateFilterWorkshopResults();
            }));
    }

    if (filterBlog != null) {
        const filterToggle = document.querySelector("#filter-toggle");
        filterArrow = filterToggle.querySelector("span");
        filterToggle.addEventListener("click", toggleFilterBlog);

        filterBlog.querySelectorAll("#tag-filters input").forEach(checkbox => checkbox.addEventListener("change", event => {
            if (event.target.checked)
                tagBlogFilters.push(event.target.value);
            else
                tagBlogFilters.splice(tagBlogFilters.indexOf(event.target.value), 1);
            updateFilterBlogResults();
        }));

        filterBlog.querySelector("#title-search-filter").addEventListener("input", event => {
            titleFilter = event.target.value !== "" ? event.target.value : null;
            if (titleFilter != null) {
                titleFilter = titleFilter.toLowerCase();
            }
            updateFilterBlogResults();
        });

        filterBlog.querySelector("#readingTime-filters").addEventListener("change", event => {
            readingFilter = event.target.value !== "" ? event.target.value : null;
            updateFilterBlogResults();
        });
    }
});

function toggleFilterWorkshop(event) {
    event.preventDefault();
    showFilter = !showFilter;
    if (showFilter) {
        filterArrow.innerText = "▾";
        filterWorkshop.classList.add("show");
    } else {
        filterArrow.innerText = "▸";
        filterWorkshop.classList.remove("show");
    }
}

function toggleFilterBlog(event) {
    event.preventDefault();
    showFilter = !showFilter;
    if (showFilter) {
        filterArrow.innerText = "▾";
        filterBlog.classList.add("show");
    } else {
        filterArrow.innerText = "▸";
        filterBlog.classList.remove("show");
    }
}

function updateFilterBlogResults() {
    resultsBlog.forEach(blog => {
        blog.hidden = !((!readingFilter || blog.dataset.readingtime === readingFilter) &&
            (!titleFilter || blog.dataset.title.toLowerCase().includes(titleFilter) === true) &&
            (tagBlogFilters.length === 0 || tagBlogFilters.every(c => blog.dataset.tags.indexOf(c) >= 0)));
    });
}

function updateFilterWorkshopResults() {
    console.log(ageFilter);
    results.forEach(workshop => {
        workshop.hidden = !((!ageFilter || workshop.dataset.age === ageFilter) &&
            (!durationFilter || workshop.dataset.duration === durationFilter) &&
            (tagFilters.length === 0 || tagFilters.every(c => workshop.dataset.tags.indexOf(c) >= 0)));
    });
}
