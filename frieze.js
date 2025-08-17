document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year-input');
    const generateBtn = document.getElementById('generate-btn');
    const friezeContainer = document.getElementById('frieze-container');

    // Palette de couleurs (doit être identique à celle du calendrier)
    const monthColors = [
        "#ff7f50", "#ff69b4", "#87ceeb", "#98fb98", "#ffa500", "#ffd700", 
        "#adff2f", "#ff6347", "#ba55d3", "#40e0d0", "#ff8c00", "#1e90ff"
    ];

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    generateBtn.addEventListener('click', () => {
        const year = parseInt(yearInput.value);
        if (year) {
            generateFrieze(year);
        }
    });

    function getDayClass(date) {
        const day = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        switch (day) {
            case 1: // Mon
            case 2: // Tue
            case 4: // Thu
            case 5: // Fri
                return 'frieze-workday';
            default: // Wed, Sat, Sun
                return 'frieze-offday';
        }
    }

    function generateFrieze(startYear) {
        friezeContainer.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const monthIndex = (7 + i) % 12;
            const year = (monthIndex < 7) ? startYear + 1 : startYear;

            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
            const monthName = monthNames[monthIndex];
            const monthColor = monthColors[monthIndex];

            let daysProcessed = 0;
                            const daysPerStrip = 10; // Nombre de jours par bande

            while (daysProcessed < daysInMonth) {
                const stripDiv = document.createElement('div');
                stripDiv.className = 'frieze-strip';

                const headerDiv = document.createElement('div');
                headerDiv.className = 'frieze-header';
                headerDiv.style.backgroundColor = monthColor;
                headerDiv.textContent = `${monthName.toUpperCase()} ${year}`;
                stripDiv.appendChild(headerDiv);

                const cellsDiv = document.createElement('div');
                cellsDiv.className = 'frieze-cells';

                const remainingDays = daysInMonth - daysProcessed;
                const daysOnThisStrip = Math.min(daysPerStrip, remainingDays);

                for (let j = 0; j < daysOnThisStrip; j++) {
                    const dayNumber = daysProcessed + 1;
                    const currentDate = new Date(year, monthIndex, dayNumber);
                    
                    const cellDiv = document.createElement('div');
                    cellDiv.className = 'frieze-cell';
                    cellDiv.classList.add(getDayClass(currentDate));
                    cellDiv.style.borderLeft = `2px solid ${monthColor}`;
                    
                    

                    cellsDiv.appendChild(cellDiv);
                    daysProcessed++;
                }
                
                stripDiv.appendChild(cellsDiv);
                friezeContainer.appendChild(stripDiv);
            }
        }
    }

    function setDefaultYear() {
        const today = new Date();
        let defaultStartYear = today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
        yearInput.value = defaultStartYear;
        generateFrieze(defaultStartYear);
    }

    setDefaultYear();
});
