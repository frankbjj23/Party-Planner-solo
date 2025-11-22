const state = {
  parties: [],
};

const getParties = async () => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-FTB-CT-WEB-PT/events`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch parties: ${response.status}`);
    }

    const retrievedPartyInfo = await response.json();
    state.parties = retrievedPartyInfo;
    console.log(state.parties);
  } catch (err) {
    console.error(`Error in getParties:`, err);
    throw err;
  }
};

const renderParties = () => {
  const main = document.querySelector(`main`);
  const section = document.createElement(`section`);
  section.id = "subtitles";
  const div = document.createElement(`div`);
  div.id = `party-names`;
  const detailsDiv = document.createElement(`div`);
  detailsDiv.id = `details-div`;
  detailsDiv.textContent = `Select a party to see its details.`;
  const leftColumnDiv = document.createElement(`div`);
  leftColumnDiv.id = `left-column-div`;
  const rightColumnDiv = document.createElement(`div`);
  rightColumnDiv.id = `right-column-div`;
  deleteButton = document.createElement(`button`);
  deleteButton.textContent = `DELETE`;
  deleteButton.id = `delete-button`;
  deleteButton.style.display = `none`;
  const h1 = document.createElement(`h1`);
  h1.textContent = `Party Planner`;
  main.append(h1);
  const h2Upcoming = document.createElement(`h2`);
  h2Upcoming.textContent = `Upcoming Parties`;
  h2Upcoming.id = `upcoming-parties`;
  const h2PartyDetails = document.createElement(`h2`);
  h2PartyDetails.id = `party-details`;
  h2PartyDetails.textContent = `Party Details`;
  h2Upcoming.classList.add("section-title");
  h2PartyDetails.classList.add("section-title");
  leftColumnDiv.append(h2Upcoming, div);
  rightColumnDiv.append(h2PartyDetails, detailsDiv, deleteButton);
  section.append(leftColumnDiv, rightColumnDiv);
  main.append(section);

  const partyPtags = state.parties.data.map((partyName) => {
    return `<p class="party-item">${partyName.name}</p>`;
  });
  div.innerHTML = partyPtags.join(``);
  const pElements = div.querySelectorAll(`.party-item`);

  pElements.forEach((p, index) => {
    p.addEventListener(`click`, () => {
      const party = state.parties.data[index];

      detailsDiv.innerHTML = `
      <h3>${party.name}</h3>
      <p id="date">${new Date(party.date).toLocaleString()}</p>
      <p id="location">${party.location}</p>
      <p id="description">${party.description}</p>
      `;

      detailsDiv.append(deleteButton);
      deleteButton.style.display = `block`;
    });
  });
};

const init = async () => {
  try {
    await getParties();
    renderParties();
  } catch (err) {
    console.error(`ERror starting app:`, err);
    const main = document.querySelector(`main`);
    main.innerHTML = `
    <p>Sorry, something went wrong loading the parties. Please try again later.</p>
    `;
  }
};

init();
