export const __initialize__ = (widgetElem, props) => {

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/widgets/clock/style.css';
    document.head.appendChild(stylesheet);

    if (props.display === 'digital') {
        digitalClock(widgetElem);
    } else {
        analogClock(widgetElem);
    }
}

const analogClock = (widgetElem) => {
    const clockDiv = document.createElement('div');
    const hourHand = document.createElement('div');
    const minuteHand = document.createElement('div');
    const secondHand = document.createElement('div');
    const centralDot = document.createElement('div');

    clockDiv.classList.add('analog-clock');
    hourHand.classList.add('hours-hand');
    minuteHand.classList.add('minutes-hand');
    secondHand.classList.add('seconds-hand');
    centralDot.classList.add('central-dot');

    clockDiv.id = 'clock';
    hourHand.id = 'hour-hand';
    minuteHand.id = 'minute-hand';
    secondHand.id = 'second-hand';

    setInterval(() => {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        let hrPosition = (hours * 360 / 12) + ((minutes * 360 / 60) / 12 + 90);
        let minPosition = (minutes * 360 / 60) + ((seconds * 360 / 60) / 60 + 90);
        let secPosition = seconds * 360 / 60 + 90;

        hourHand.style.transform = `rotate(${hrPosition}deg)`;
        minuteHand.style.transform = `rotate(${minPosition}deg)`;
        secondHand.style.transform = `rotate(${secPosition}deg)`;
    }, 1000)

    clockDiv.appendChild(hourHand);
    clockDiv.appendChild(minuteHand);
    clockDiv.appendChild(secondHand);
    clockDiv.appendChild(centralDot);

    widgetElem.appendChild(clockDiv);
}

const digitalClock = (widgetElem) => {
    const clockDiv = document.createElement('div');
    const timeSpan = document.createElement('span');
    const dateSpan = document.createElement('span');

    clockDiv.classList.add('digital-clock');
    timeSpan.classList.add('time');
    dateSpan.classList.add('date');
    clockDiv.id = 'digital-clock';
    timeSpan.id = 'time';
    dateSpan.id = 'date';
    timeSpan.innerText = '00:00:00';
    dateSpan.innerText = 'Loading...';

    clockDiv.appendChild(timeSpan);
    clockDiv.appendChild(dateSpan);
    widgetElem.appendChild(clockDiv);
    updateTimeAndDate(timeSpan, dateSpan);
    setInterval(() => {
        updateTimeAndDate(timeSpan, dateSpan);
    }, 1000);
}

const updateTimeAndDate = (timeSpan, dateSpan) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    // Blink separators each second (visible on even seconds, hidden on odd)
    const showSeparator = now.getSeconds() % 2 === 0;
    const sep = showSeparator ? ':' : '&nbsp;';

    // Use innerHTML so we can replace separators without affecting text nodes
    timeSpan.innerHTML = `${hours}${sep}${minutes}${sep}${seconds}`;
    dateSpan.innerText = `${day}/${month}/${year}`;
}