// document.getElementById('menu-toggle').addEventListener('click', function() {
//     document.getElementById('sidebar').classList.toggle('active');
// });

// // Close the sidebar if clicked outside
// document.addEventListener('click', function(e) {
//     const sidebar = document.getElementById('sidebar');
//     if (!e.target.matches('#menu-toggle') && !sidebar.contains(e.target)) {
//         sidebar.classList.remove('active');
//     }
// });
// Define data for each page (modify this with your actual data)
const data = [];
for (let i = 1; i <= 25; i++) {
    data.push({
        id: i,
        heading1: `cell ${i}`,
        heading2: `Cell ${i}`,
        heading3: `Cell ${i}`,
        heading4: `Cell ${i}`,
        heading5: `Cell ${i}`,
        heading6: `Cell ${i}`,
        heading7: `Cell ${i}`
    });
}

// Define items per page
const itemsPerPage = 5;

// Initialize pagination for the specific table
initializePagination('myTable', data, itemsPerPage);

function createPaginationControls(totalPages, currentPage) {
    const controls = document.createElement('ul');
    controls.classList.add('pagination');

    // Previous button with left arrow icon
    const previousButton = document.createElement('a');
    previousButton.href = '#';
    previousButton.classList.add('arrow');
    previousButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    previousButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            initializePagination('myTable', data, itemsPerPage, currentPage - 1);
        }
    });
    controls.appendChild(previousButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('a');
        pageButton.textContent = i;
        pageButton.href = '#';
        pageButton.classList.add('page-number');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', (event) => {
            event.preventDefault();
            initializePagination('myTable', data, itemsPerPage, i);
        });
        controls.appendChild(pageButton);
    }

    // Next button with right arrow icon
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.classList.add('arrow');
    nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            initializePagination('myTable', data, itemsPerPage, currentPage + 1);
        }
    });
    controls.appendChild(nextButton);

    return controls;
}

function updateUiWithData(tableId, data, currentPage, itemsPerPage) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    // Add data for current page to the table
    for (let i = startIndex; i < endIndex; i++) {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = data[i].id;
        row.appendChild(idCell);

        for (let j = 1; j <= 8; j++) {
            const headingCell = document.createElement('td');
            headingCell.textContent = data[i][`heading${j}`];
            row.appendChild(headingCell);
        }

        dataContainer.appendChild(row);
    }
}

function initializePagination(tableId, data, itemsPerPage, currentPage = 1) {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Update UI with current page data
    updateUiWithData(tableId, data, currentPage, itemsPerPage);

    // Remove existing pagination controls
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    // Create and add new pagination controls
    const paginationControls = createPaginationControls(totalPages, currentPage);
    paginationContainer.appendChild(paginationControls);
}

