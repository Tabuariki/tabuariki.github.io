const apiUrl = 'https://tekitinari.vercel.app';

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const response = await fetch(`${apiUrl}/search?query=${query}`);
    const words = await response.json();
    displayResults(words);
});

function displayResults(words) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (words.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    const list = document.createElement('ul');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        listItem.addEventListener('click', () => fetchDefinition(word));
        list.appendChild(listItem);
    });

    resultsDiv.appendChild(list);
}

async function fetchDefinition(word) {
    const response = await fetch(`${apiUrl}/definition/${word}`);
    const definitions = await response.json();
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `<h2>${word}</h2>`;
    definitions.forEach(def => {
        const defParagraph = document.createElement('p');
        defParagraph.textContent = def;
        resultsDiv.appendChild(defParagraph);
    });
}
