const load = async () => {
    const fetchLayoutConfig = await fetch('/config/layout.json');
    let layoutConfig;

    if (fetchLayoutConfig.ok) {
        layoutConfig = await fetchLayoutConfig.json();
    } else {
        document.body.innerText = "No layout file found!";
        return;
    }

    const fetchSettingsConfig = await fetch('/config/settings.json');
    let settingsConfig;

    if (fetchSettingsConfig.ok) {
        settingsConfig = await fetchSettingsConfig.json();
    } else {
        document.body.innerText = "No settings file found!";
        return;
    }

    if (settingsConfig.title) {
        document.title = settingsConfig.title;
        const title = document.createElement('h1');
        title.innerText = settingsConfig.title;
        document.body.insertBefore(title, document.body.querySelector('script'));
    }

    layoutConfig.containers.forEach((container) => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');
        container.active ? containerDiv.classList.add('active') : null;
        containerDiv.id = container.id;
        document.body.insertBefore(containerDiv, document.body.querySelector('script'));
    });

    layoutConfig.widgets.forEach(async (widget) => {
        const widgetDiv = document.createElement('div');
        widgetDiv.classList.add('widget');
        if (widget.fullsize) {
            widgetDiv.classList.add('widget-full');
        } else if (widget.size == '1-2') {
            widgetDiv.classList.add('widget-2');
        }

        if (widget.title) {
            const title = document.createElement('h1');
            title.innerText = widget.title;
            widgetDiv.appendChild(title);
        }
        widgetDiv.id = widget.id;
        const subDiv = document.createElement('div');
        subDiv.classList.add('widget-content');
        const widgetScript = await import(`./widgets/${widget.type}/main.js`);
        await widgetScript.__initialize__(subDiv);
        widgetDiv.appendChild(subDiv);
        document.getElementById(widget.container).appendChild(widgetDiv);
    });
}

load();