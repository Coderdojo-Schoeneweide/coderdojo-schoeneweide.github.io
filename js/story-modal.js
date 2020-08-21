const cardTouchCounter = new Map();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#teamMemberList>li").forEach(teamCard => {
        cardTouchCounter.set(teamCard, 0);
        setupHoverEvents(teamCard);

        if (teamCard.classList.contains("has-story"))
            addStoryOpenListener(teamCard);
    });

    document.querySelectorAll(".story-container").forEach(modal => addStoryCloseListener(modal));
}, false);

function setupHoverEvents(teamCard) {
    teamCard.addEventListener("mouseenter", () => teamCard.classList.add("hovered"));
    teamCard.addEventListener("mouseleave", () => {
        teamCard.classList.remove("hovered");
        cardTouchCounter.set(teamCard, 0);
    });
}

function addStoryOpenListener(teamCard) {
    teamCard.addEventListener("touchstart", () => {
        cardTouchCounter.set(teamCard, (cardTouchCounter.get(teamCard) + 1) % 2);
    });

    teamCard.addEventListener("click", (event) => {
        event.stopPropagation();
        if (teamCard.classList.contains("hovered") && cardTouchCounter.get(teamCard) == 0)
            showStoryModal(teamCard);
    });
}

function addStoryCloseListener(modal) {
    modal.addEventListener("click", (event) => {
        event.stopPropagation();
        hideStoryModal(modal);
    });
}

function showStoryModal(teamCard) {
    teamCard.querySelector(".story-container").style.display = "block";
}

function hideStoryModal(modal) {
    modal.style.display = "none";
}
