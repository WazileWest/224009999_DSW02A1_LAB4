
const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");
const expectedText = document.getElementById("expected");
const actualText = document.getElementById("actual");
const resultContainer = document.getElementById("result");

compareBtn.addEventListener("click", function () {
    resultContainer.innerHTML = "";

    const expected = expectedText.value.trim();
    const actual = actualText.value.trim();

    if (!expected && !actual) {
        const li = document.createElement("li");
        li.textContent = "Please enter text in both areas.";
        resultContainer.appendChild(li);
        return;
    }
    const expectedLines = expected.split("\n");
    const actualLines = actual.split("\n");
    const ol = document.createElement("ol");
    ol.id = "differences";
    let hasDifferences = false;

    if (expectedLines.length !== actualLines.length) {
        const li = document.createElement("li");
        li.textContent = `Line count differs: Expected (${expectedLines.length}) vs Actual (${actualLines.length})`;
        ol.appendChild(li);
        hasDifferences = true;
    }

    const maxLength = Math.max(expectedLines.length, actualLines.length);

    for (let i = 0; i < maxLength; i++) {
        const expLine = expectedLines[i] || "";
        const actLine = actualLines[i] || "";

        if (expLine !== actLine) {
            const li = document.createElement("li");
            li.textContent = `Line ${i + 1}:\nExpected: ${expLine}\nActual:   ${actLine}`;
            ol.appendChild(li);
            hasDifferences = true;
        }
    }
    if (hasDifferences) {
        ol.classList.add("change");
        const message = document.createElement("p");
        message.textContent = "Texts are different";
        message.classList.add("change");

        resultContainer.appendChild(message);
        resultContainer.appendChild(ol);
    } else {
        const li = document.createElement("li");
        li.textContent = "No differences found";

        resultContainer.classList.add("nochange");
        resultContainer.appendChild(li);
    }
});

clearBtn.addEventListener("click", function () {
    expectedText.value = "";
    actualText.value = "";
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("nochange", "change");
});