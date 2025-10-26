document.addEventListener("DOMContentLoaded", function () {
  const addRecordForm = document.getElementById("addRecordForm");
  const tableBody = document.querySelector("#recordsTable tbody");

  // Message display area
  const messageBox = document.createElement("p");
  messageBox.id = "messageBox";
  addRecordForm.parentNode.appendChild(messageBox);

  // Handle Add Record
  addRecordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const offense = document.getElementById("offense").value.trim();
    const action = document.getElementById("actionTaken").value.trim();

    if (!name || !offense || !action) {
      showMessage("⚠️ Please fill in all fields before adding a record.", "error");
      return;
    }

    // Create a new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${offense}</td>
      <td>${action}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    // Append the new row
    tableBody.appendChild(newRow);

    // Reset form
    addRecordForm.reset();

    // Show success message
    showMessage(`✅ Student "${name}" has been added successfully!`, "success");
  });

  // Handle Delete (event delegation)
  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      const studentName = row.querySelector("td").textContent;
      row.remove();
      showMessage(`🗑️ Record for "${studentName}" has been deleted.`, "error");
    }
  });

  // Function to show messages
  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.style.fontWeight = "600";
    messageBox.style.transition = "0.3s ease";
    messageBox.style.marginTop = "10px";

    if (type === "success") {
      messageBox.style.color = "#2e7d32"; // green
    } else {
      messageBox.style.color = "#d32f2f"; // red
    }

    clearTimeout(messageBox.timer);
    messageBox.timer = setTimeout(() => {
      messageBox.textContent = "";
    }, 3000);
  }
});

function openSidebar() {
    document.getElementById("adminSidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("adminSidebar").style.width = "0";
}

 function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("clock").textContent = formattedTime;
  }

  setInterval(updateClock, 1000);
  updateClock();