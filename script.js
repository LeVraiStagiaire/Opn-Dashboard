const load = async () => {
    const fetchLayoutConfig = await fetch('/config/layout.json');
    let layoutConfig;

    if (fetchLayoutConfig.ok) {
        layoutConfig = await fetchLayoutConfig.json();
    } else {
        document.body.innerText = "No layout file found!";
        return;
    }

    if (layoutConfig.settings.title) {
        document.title = layoutConfig.settings.title;
        const title = document.createElement('h1');
        title.innerText = layoutConfig.settings.title;
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
        if (widget.fullsize) {
            widgetDiv.classList.add('widget-full');
        } else {
            widgetDiv.classList.add('widget');
        }
        widgetDiv.id = widget.id;
        const widgetScript = await import(`./widgets/${widget.type}.js`);
        await widgetScript.__initialize__(widgetDiv);
        document.getElementById(widget.container).appendChild(widgetDiv);
    });
}

load();