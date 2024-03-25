// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector("form");
//     form.addEventListener("submit", async (event) => {
//       event.preventDefault();
//       const formData = new FormData(form);
//       try {
//         const response = await fetch("/search", {
//           method: "POST",
//           body: formData
//         });
//         if (response.ok) {
//           const data = await response.json();
//           // Update DOM with the received data
//           displayResult(data);
//         } else {
//           console.error('Error:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     });
  
//     function displayResult(data) {
//       // Replace this with your logic to display the result on the page
//       console.log(data);
//     }
//   });
  

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const searchTypeSelect = document.getElementById("searchType");
  const searchInput = document.getElementById("searchInput");

  // Submit event listener for the form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("/search", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        // Update DOM with the received data
        displayResult(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Change event listener for the search type select
  searchTypeSelect.addEventListener("change", () => {
    const selectedSearchType = searchTypeSelect.value;
    switch (selectedSearchType) {
      case "city":
        searchInput.placeholder = "Enter City Name";
        break;
      case "country":
        searchInput.placeholder = "Enter Country Name";
        break;
      case "language":
        searchInput.placeholder = "Enter Language";
        break;
      default:
        searchInput.placeholder = "Enter Search Term";
        break;
    }
  });

  function displayResult(data) {
    // Replace this with your logic to display the result on the page
    console.log(data);
  }
});

  