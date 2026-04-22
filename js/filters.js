let results;
let section_blogs;

/**
 * Definitions for all possible filters
 * @type {Record<string, {value: any, selector: string, type: string, check: (value: any) => boolean}>}
 */
const filters = {
    age: {
        value: "",
        selector: "#age-filter",
        type: "select",
        check: (value) => filters.age.value.length === 0 || value.toLowerCase() === filters.age.value
    },
    duration: {
        value: "",
        selector: "#duration-filter",
        type: "select",
        check: (value) => filters.duration.value.length === 0 || value.toLowerCase() === filters.duration.value
    },
    readingTime: {
        value: "",
        selector: "#reading-time-filter",
        type: "select",
        check: (value) => filters.readingTime.value.length === 0 || value.toLowerCase() === filters.readingTime.value
    },
    title: {
        value: "",
        selector: "#title-search-filter",
        type: "input",
        check: (value) => filters.title.value.length === 0 || value.toLowerCase().includes(filters.title.value)
    },
    tag: {
        value: [],
        selector: "#tag-filters input",
        type: "checkbox",
        check: (value) => filters.tag.value.length === 0 || filters.tag.value.every(x => value.includes(x))
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const filterSection = document.querySelector("#filter");
    // Abort this script if there are no filters on this page
    if (!filterSection) return;


    section_blogs = document.querySelector("#all-posts");
    results = document.querySelectorAll("#results #result-item");

    const filterToggle = document.querySelector("#filter-toggle");
    const filterArrow = filterToggle.querySelector("span");

    filterToggle.addEventListener("click", toggleFilter(filterSection, filterArrow));

    for (const filter in filters) {
        addEventListenerToFilter(filterSection, filters[filter]);
    }
});

function toggleFilter(filterSection, filterArrow) {
    let showFilter = false;

    return (event) => {
        event.preventDefault();
        showFilter = !showFilter;
        if (showFilter) {
            filterArrow.innerText = "▾";
            filterSection.classList.add("show");
        } else {
            filterArrow.innerText = "▸";
            filterSection.classList.remove("show");
        }
    }
}

/**
 * Add change event listener to a filter element on the current list page
 * @param {HTMLElement} filterSection The HTML element containing all the filters
 * @param {{value: any[], selector: string, type: string}} filter The filter object
 */
function addEventListenerToFilter(filterSection, filter) {
    switch (filter.type) {
        case "checkbox":
            filterSection.querySelectorAll(filter.selector)
                .forEach(checkbox => checkbox.addEventListener("change", (e) => checkboxFilterChange(e, filter)));
            break;
        case "input":
            filterSection.querySelector(filter.selector)?.addEventListener("input", (e) => filterChange(e, filter));
            break;
        default:
            filterSection.querySelector(filter.selector)?.addEventListener("change", (e) => filterChange(e, filter));
            break;
    }
}

function checkboxFilterChange(event, filter) {
    if (event.target.checked)
        filter.value.push(event.target.value);
    else
        filter.value.splice(filter.value.indexOf(event.target.value), 1);
    updateFilterResults();
}

function filterChange(event, filter) {
    filter.value = event.target.value.toLowerCase();
    updateFilterResults();
}

function updateFilterResults() {
    if (section_blogs != null) {
        results.forEach(blog => {
            blog.hidden = !(
                filters.readingTime.check(blog.dataset.readingtime) &&
                filters.title.check(blog.dataset.title) &&
                filters.tag.check(blog.dataset.tags)
            );
        });
    } else {
        results.forEach(workshop => {
            workshop.hidden = !(
                filters.age.check(workshop.dataset.age.toLowerCase()) &&
                filters.duration.check(workshop.dataset.duration) &&
                filters.tag.check(workshop.dataset.tags)
            );
        });
    }
}
