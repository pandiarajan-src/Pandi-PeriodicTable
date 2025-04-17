// script.js for Pandi's Chemistry App

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Generate periodic table
    generatePeriodicTable();
    
    // Add click event listeners to all elements
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        element.addEventListener('click', function() {
            const elementData = {
                number: this.getAttribute('data-number'),
                symbol: this.getAttribute('data-symbol'),
                name: this.getAttribute('data-name'),
                mass: this.getAttribute('data-mass'),
                category: this.getAttribute('data-category'),
                group: this.getAttribute('data-group'),
                period: this.getAttribute('data-period'),
                block: this.getAttribute('data-block'),
                electronConfig: this.getAttribute('data-electron-config'),
                description: this.getAttribute('data-description')
            };
            
            displayElementDetails(elementData);
        });
    });
});

function generatePeriodicTable() {
    const periodicTableContainer = document.querySelector('.periodic-table');
    
    // Create a grid with empty cells
    let grid = [];
    for (let i = 0; i < 10; i++) {
        grid[i] = [];
        for (let j = 0; j < 18; j++) {
            grid[i][j] = null;
        }
    }
    
    // Place elements in the grid
    periodicTableData.forEach(element => {
        const period = parseInt(element.period);
        const group = parseInt(element.group);
        
        // Special case for lanthanides and actinides
        if ((element.number >= 57 && element.number <= 71) || 
            (element.number >= 89 && element.number <= 103)) {
            return; // Will be handled separately
        }
        
        grid[period - 1][group - 1] = element;
    });
    
    // Add lanthanides and actinides placeholders in periods 6 and 7
    if (grid[5][2] === null) {
        grid[5][2] = { symbol: "La-Lu", name: "Lanthanides", number: "57-71", category: "lanthanide" };
    }
    
    if (grid[6][2] === null) {
        grid[6][2] = { symbol: "Ac-Lr", name: "Actinides", number: "89-103", category: "actinide" };
    }
    
    // Generate HTML for the grid
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 18; j++) {
            const element = grid[i][j];
            
            if (element) {
                const elementDiv = document.createElement('div');
                elementDiv.className = `element ${element.category}`;
                elementDiv.style.gridRow = i + 1;
                elementDiv.style.gridColumn = j + 1;
                
                elementDiv.innerHTML = `
                    <div class="atomic-number">${element.number}</div>
                    <div class="symbol">${element.symbol}</div>
                    <div class="name">${element.name}</div>
                    <div class="mass">${element.mass}</div>
                `;
                
                // Add data attributes for element details
                elementDiv.setAttribute('data-number', element.number);
                elementDiv.setAttribute('data-symbol', element.symbol);
                elementDiv.setAttribute('data-name', element.name);
                elementDiv.setAttribute('data-mass', element.mass);
                elementDiv.setAttribute('data-category', element.category);
                elementDiv.setAttribute('data-group', element.group || '');
                elementDiv.setAttribute('data-period', element.period || '');
                elementDiv.setAttribute('data-block', element.block || '');
                elementDiv.setAttribute('data-electron-config', element.electronConfig || '');
                elementDiv.setAttribute('data-description', element.description || '');
                
                periodicTableContainer.appendChild(elementDiv);
            } else if (!(i === 0 && j > 1 && j < 17) && 
                      !(i === 1 && j > 1 && j < 12) && 
                      !(i === 2 && j > 1 && j < 12)) {
                // Add empty cell for spacing (except where elements should be)
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'element-empty';
                emptyDiv.style.gridRow = i + 1;
                emptyDiv.style.gridColumn = j + 1;
                periodicTableContainer.appendChild(emptyDiv);
            }
        }
    }
    
    // Add lanthanides series (period 8, columns 3-17)
    const lanthanides = periodicTableData.filter(e => e.number >= 57 && e.number <= 71);
    lanthanides.forEach((element, index) => {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${element.category}`;
        elementDiv.style.gridRow = 8;
        elementDiv.style.gridColumn = index + 3;
        
        elementDiv.innerHTML = `
            <div class="atomic-number">${element.number}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
            <div class="mass">${element.mass}</div>
        `;
        
        // Add data attributes for element details
        elementDiv.setAttribute('data-number', element.number);
        elementDiv.setAttribute('data-symbol', element.symbol);
        elementDiv.setAttribute('data-name', element.name);
        elementDiv.setAttribute('data-mass', element.mass);
        elementDiv.setAttribute('data-category', element.category);
        elementDiv.setAttribute('data-group', element.group || '');
        elementDiv.setAttribute('data-period', element.period || '');
        elementDiv.setAttribute('data-block', element.block || '');
        elementDiv.setAttribute('data-electron-config', element.electronConfig || '');
        elementDiv.setAttribute('data-description', element.description || '');
        
        periodicTableContainer.appendChild(elementDiv);
    });
    
    // Add actinides series (period 9, columns 3-17)
    const actinides = periodicTableData.filter(e => e.number >= 89 && e.number <= 103);
    actinides.forEach((element, index) => {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${element.category}`;
        elementDiv.style.gridRow = 9;
        elementDiv.style.gridColumn = index + 3;
        
        elementDiv.innerHTML = `
            <div class="atomic-number">${element.number}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
            <div class="mass">${element.mass}</div>
        `;
        
        // Add data attributes for element details
        elementDiv.setAttribute('data-number', element.number);
        elementDiv.setAttribute('data-symbol', element.symbol);
        elementDiv.setAttribute('data-name', element.name);
        elementDiv.setAttribute('data-mass', element.mass);
        elementDiv.setAttribute('data-category', element.category);
        elementDiv.setAttribute('data-group', element.group || '');
        elementDiv.setAttribute('data-period', element.period || '');
        elementDiv.setAttribute('data-block', element.block || '');
        elementDiv.setAttribute('data-electron-config', element.electronConfig || '');
        elementDiv.setAttribute('data-description', element.description || '');
        
        periodicTableContainer.appendChild(elementDiv);
    });
    
    // Add legend
    const legendDiv = document.createElement('div');
    legendDiv.className = 'element-legend';
    // Legend content removed as per request
    legendDiv.innerHTML = '';
    periodicTableContainer.appendChild(legendDiv);
}

function displayElementDetails(element) {
    const elementInfo = document.getElementById('element-info');
    
    // Format category name for display
    const categoryName = formatCategoryName(element.category);
    
    // Create HTML content for element details
    const content = `
        <h3>${element.name} (${element.symbol})</h3>
        <p><strong>Atomic Number:</strong> ${element.number}</p>
        <p><strong>Atomic Mass:</strong> ${element.mass}</p>
        <p><strong>Category:</strong> ${categoryName}</p>
        <p><strong>Group:</strong> ${element.group}</p>
        <p><strong>Period:</strong> ${element.period}</p>
        <p><strong>Block:</strong> ${element.block}</p>
        <p><strong>Electron Configuration:</strong> ${element.electronConfig}</p>
        <p><strong>Description:</strong> ${element.description}</p>
    `;
    
    elementInfo.innerHTML = content;
}

function formatCategoryName(category) {
    if (!category) return 'Unknown';
    
    // Convert hyphenated category to title case
    return category.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
