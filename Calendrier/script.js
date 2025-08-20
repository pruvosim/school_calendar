document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year-input');
    const generateBtn = document.getElementById('generate-btn');
    const calendarContainer = document.getElementById('calendar-container');

    // Palette de couleurs vives pour chaque mois
    const monthColors = [
        "#ff7f50", // Jan (Coral)
        "#ff69b4", // Feb (HotPink)
        "#87ceeb", // Mar (SkyBlue)
        "#98fb98", // Apr (PaleGreen)
        "#ffa500", // May (Orange)
        "#ffd700", // Jun (Gold)
        "#adff2f", // Jul (GreenYellow)
        "#ff6347", // Aug (Tomato)
        "#ba55d3", // Sep (MediumOrchid)
        "#40e0d0", // Oct (Turquoise)
        "#ff8c00", // Nov (DarkOrange)
        "#1e90ff"  // Dec (DodgerBlue)
    ];

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayNames = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

    generateBtn.addEventListener('click', () => {
        const year = parseInt(yearInput.value);
        if (year) {
            generateCalendar(year);
        }
    });

    function getDayName(date) {
        const dayIndex = (date.getDay() + 6) % 7;
        return dayNames[dayIndex];
    }

    function getDayClass(date) {
        const dayIndex = (date.getDay() + 6) % 7;
        switch (dayIndex) {
            case 0: case 1: case 3: case 4:
                return 'day-work';
            case 2:
                return 'day-wednesday';
            case 5: case 6:
                return 'day-weekend';
            default:
                return '';
        }
    }

    function generateCalendar(startYear) {
        calendarContainer.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            // Start with August (month index 7) and loop for 12 months
            const monthIndex = (7 + i) % 12;
            // Year is startYear for Aug-Dec, and startYear + 1 for Jan-Jul
            const year = (monthIndex < 7) ? startYear + 1 : startYear;

            const monthDiv = document.createElement('div');
            monthDiv.className = 'month-container';
            monthDiv.style.backgroundColor = monthColors[monthIndex];

            const daysContainer = document.createElement('div');
            daysContainer.className = 'days-grid';

            const firstDayOfMonth = new Date(year, monthIndex, 1);
            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
            let startDay = (firstDayOfMonth.getDay() + 6) % 7;

            

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(year, monthIndex, day);
                const dayCell = document.createElement('div');
                dayCell.className = 'day-cell';

                const dayNameDiv = document.createElement('div');
                dayNameDiv.className = 'day-name';
                dayNameDiv.textContent = getDayName(currentDate);

                const dayNumberDiv = document.createElement('div');
                dayNumberDiv.className = 'day-number';
                dayNumberDiv.classList.add(getDayClass(currentDate));
                dayNumberDiv.textContent = day;

                const monthYearDiv = document.createElement('div');
                monthYearDiv.className = 'month-year';
                monthYearDiv.textContent = `${monthNames[monthIndex].toUpperCase()} ${year}`;

                dayCell.appendChild(dayNameDiv);
                dayCell.appendChild(dayNumberDiv);
                dayCell.appendChild(monthYearDiv);
                daysContainer.appendChild(dayCell);
            }

            monthDiv.appendChild(daysContainer);
            calendarContainer.appendChild(monthDiv);
        }
    }

    // Set default to the current school year
    function setDefaultYear() {
        const today = new Date();
        // If we are before August (Jan-Jul), the school year started last year
        let defaultStartYear = today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
        yearInput.value = defaultStartYear;
        generateCalendar(defaultStartYear);
    }

    setDefaultYear();
});
