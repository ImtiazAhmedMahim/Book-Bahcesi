let jsonData = [];
const itemsPerPage = 99;
let currentPage = 1;
let searchInputValue = ""; // Track search input value

async function fetchData() {
  try {
    const response = await fetch("/src/allBooks.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    jsonData = await response.json();
    displayData();
  } catch (error) {
    console.error(error);
  }
}

function displayData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentData = jsonData;
  if (searchInputValue) {
    // Filter data if search input is not empty
    currentData = jsonData.filter((item) =>
      item.Description.toLowerCase().includes(searchInputValue.toLowerCase())
    );
  }
  const currentPageData = currentData.slice(startIndex, endIndex);
  let out = "";
  currentPageData.forEach((item) => {
    out += `
    <div class=" grid grid-cols-[7rem_1fr] md:grid-cols-[13rem_1fr]  hover:bg-gray-50
      border-b transition duration-300 individual-books border-r border-l gap-2">
      <img
        src=${item.Image}
        alt="No thumbnail"
        class="h-40 w-32"
      />
      <div class=" md:py-4 md:px-6 text-sm md:text-xl font-medium author mt-4 mb-2">
        <p class="book-title text-left">
        ${item.Description}
        </p>
        <div class="md:mt-5 mt-3">
          <a
            href=${item.Download}
            class="bg-blue-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md inline-block cursor-pointer download-btn"
          >
            Download
          </a>
        </div>
      </div>
  </div>`;
    const allBooks = document.querySelector(".all-books");
    const inBook = document.querySelector(".individual-book");
    allBooks.innerHTML = out;
    window.scrollTo(0, 0);
  });
}

// Display data according to search input
function filterData() {
  const navSearch = document.querySelector("#navbar-search");
  if (!navSearch.classList.contains("hidden")) {
    searchInputValue = document.querySelector(".searchBar").value;
  } else {
    searchInputValue = document.getElementById("search-navbar").value;
    // Trim whitespace
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentData = jsonData;
  if (searchInputValue) {
    // Filter data if search input is not empty
    currentData = jsonData.filter((item) =>
      item.Description.toLowerCase().includes(searchInputValue.toLowerCase())
    );
    let out = "";
    currentData.forEach((item) => {
      out += `
    <div class=" grid grid-cols-[7rem_1fr] md:grid-cols-[13rem_1fr]  hover:bg-gray-50
      border-b transition duration-300 individual-books border-r border-l gap-2">
      <img
        src=${item.Image}
        alt="No thumbnail"
        class="h-40 w-32"
      />
      <div class=" md:py-4 md:px-6 text-sm md:text-xl font-medium author mt-4 mb-2">
        <p class="book-title text-left">
        ${item.Description}
        </p>
        <div class="md:mt-5 mt-3">
          <a
            href=${item.Download}
            class="bg-blue-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md inline-block cursor-pointer download-btn"
          >
            Download
          </a>
        </div>
      </div>
    </div>`;
      const allBooks = document.querySelector(".all-books");
      const inBook = document.querySelector(".individual-book");
      allBooks.innerHTML = out;
      window.scrollTo(0, 0);
    });
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
  } else {
    displayData();
    document.getElementById("nextBtn").style.display = "";
    document.getElementById("prevBtn").style.display = "";
  }
}
document
  .getElementById("prevBtn")
  .addEventListener("click", function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      displayData();
      document.getElementById("nextBtn").style.display = "";
      document.querySelector(".last").innerHTML = "";
    } else if (currentPage <= 1) {
      document.getElementById("prevBtn").style.display = "none";
    }
  });
document
  .getElementById("nextBtn")
  .addEventListener("click", function goToNextPage() {
    const maxPage = Math.ceil(jsonData.length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      displayData();
      document.getElementById("prevBtn").style.display = "";
    } else if (currentPage === maxPage) {
      document.getElementById("nextBtn").style.display = "none";
      document.querySelector(".last").innerHTML = "You have reached the end";
      document.querySelector(".last").scrollIntoView({ behavior: "smooth" });
    }
  });

// Fetch data when the page loads
fetchData();
// search functionality
document.getElementById("search-navbar").addEventListener("input", filterData);
// mobile search functionality
document.querySelector(".searchBar").addEventListener("input", filterData);
