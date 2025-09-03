export const __initialize__ = (widgetElem, props) => {

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/widgets/clock/style.css';
    document.head.appendChild(stylesheet);

    const clockDiv = document.createElement('div');
    const hourHand = document.createElement('div');
    const minuteHand = document.createElement('div');
    const secondHand = document.createElement('div');

    clockDiv.classList.add('clock');
    hourHand.classList.add('hours-hand');
    minuteHand.classList.add('minutes-hand');
    secondHand.classList.add('seconds-hand');

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

    widgetElem.appendChild(clockDiv);
}