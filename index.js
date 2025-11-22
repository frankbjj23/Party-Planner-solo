const state = {
  parties: [],
};

const getParties = async () => {
  const response = await fetch(
    `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2510-FTB-CT-WEB-PT/events`
  );
  const retrievedPartyInfo = await response.json();
  state.parties = retrievedPartyInfo;
  console.log(state.parties);
};

const renderParties = () => {
  const main = document.querySelector(`main`);
  const section = document.createElement(`section`);
  const div = document.createElement(`div`);
  div.id = `party-names`;
  const detailsDiv = document.createElement(`div`);
  section.id = "subtitles";
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
  h2Upcoming.append(div);
  h2PartyDetails.append(detailsDiv);
  section.append(h2Upcoming);
  section.append(h2PartyDetails);
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
    });
  });
};

const init = async () => {
  await getParties();
  renderParties();
};

init();
