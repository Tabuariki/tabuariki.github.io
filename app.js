const apiUrl = 'https://tabuariki.github.io';

// Letters for which buttons will be created
const letters = ['A', 'B', 'E', 'I', 'K', 'M', 'N', 'O', 'R', 'T', 'U', 'V', 'W'];

document.addEventListener('DOMContentLoaded', () => {
    // Create letter buttons
    const letterButtonsDiv = document.getElementById('letterButtons');
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => fetchWordsByLetter(letter));
        letterButtonsDiv.appendChild(button);
    });

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', async () => {
        const query = document.getElementById('searchInput').value;
        if (!query) return;
        const response = await fetch(`${apiUrl}/search?query=${query}`);
        const words = await response.json();
        displayResults(words);
    });

    // Back button functionality
    document.getElementById('backButton').addEventListener('click', () => {
        document.getElementById('resultsPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    });
});

async function fetchWordsByLetter(letter) {
    const response = await fetch(`${apiUrl}/words/${letter}`);
    const words = await response.json();
    displayResults(words);
}

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

    // Switch to results page
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('resultsPage').style.display = 'block';
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
