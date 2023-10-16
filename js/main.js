let alphabetGroups = []; // Array for string groups of words

function groupWords() {
    const inputField = document.getElementById("inputField");
    const inputValue = inputField.value.toLowerCase(); // Convert to lowercase to be case sensitive

    if (!inputValue.match(/^[а-яёa-zA-Z]+$/)) {
        alert("Please, write only russian or english letters. Or check that there are no spaces");
        return;
    }

    const firstLetter = inputValue[0];
    let group = alphabetGroups.find(item => item.letter === firstLetter);

    if (!group) {
        group = { letter: firstLetter, words: [] };
        alphabetGroups.push(group);
    }

    if (group.words.includes(inputValue)) {
        alert(`Letters '${inputValue}' already exists in the group for the letter '${firstLetter}'.`);
    } else {
        group.words.push(inputValue);
    }

    alphabetGroups.sort((a, b) => a.letter.localeCompare(b.letter)); // Sort groups by letter
    updateOutput();
    updateTotalCount();
    inputField.value = ""; // Clearing the input field
}

function updateOutput() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    for (const group of alphabetGroups) {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group");
        const groupHeader = document.createElement("h2");
        groupHeader.textContent = `LETTER WORD '${group.letter}':`;
        groupDiv.appendChild(groupHeader);

        for (const word of group.words) {
            const wordDiv = document.createElement("div");
            wordDiv.textContent = word;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "-";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => deleteWord(group, word));

            wordDiv.appendChild(deleteButton);
            groupDiv.appendChild(wordDiv);  
        }

        outputDiv.appendChild(groupDiv);
    }
}

function updateTotalCount() {
    const totalCount = document.getElementById("totalCount");
    const totalWords = alphabetGroups.reduce((acc, group) => acc + group.words.length, 0);
    totalCount.textContent = `TOTAL WORDS: ${totalWords}`;
}

function deleteWord(group, word) {
    const index = group.words.indexOf(word);
    if (index !== -1) {
        group.words.splice(index, 1);
        updateOutput();
        updateTotalCount();
    }
}

function downloadTextFile() {
    const content = generateTextFileContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word_groups.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateTextFileContent() {
    let content = "";
    for (const group of alphabetGroups) {
        content += `LETTER WORD '${group.letter}':\n${group.words.join(", ")}\n\n`;
    }
    content += `TOTAL WORDS: ${alphabetGroups.reduce((acc, group) => acc + group.words.length, 0)}`;
    return content;
}

AOS.init();