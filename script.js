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

    if (layoutConfig.containers.length > 1) {
        const prevBtn = document.createElement('span');
        prevBtn.id = 'nav-prev';
        prevBtn.className = 'material-symbols-rounded';
        prevBtn.style = 'cursor: pointer; margin-right: 10px;';
        prevBtn.innerText = 'arrow_back';
        prevBtn.onclick = () => changePage(-1);

        const nextBtn = document.createElement('span');
        nextBtn.id = 'nav-next';
        nextBtn.className = 'material-symbols-rounded';
        nextBtn.style = 'cursor: pointer;';
        nextBtn.innerText = 'arrow_forward';
        nextBtn.onclick = () => changePage(1);

        document.body.insertBefore(prevBtn, document.body.querySelector('script'));
        document.body.insertBefore(nextBtn, document.body.querySelector('script'));

        const indicators = document.createElement('div');
        indicators.className = 'indicators';
        layoutConfig.containers.forEach((container) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            container.active ? indicator.classList.add('active') : null;
            indicator.id = `indicator-${container.id}`;
            indicators.appendChild(indicator);
        });
        document.body.insertBefore(indicators, document.body.querySelector('script'));

        let containerIndex = layoutConfig.containers.findIndex(c => c.active) + 1;

        function changePage(direction) {
            const oldIndex = containerIndex;
            const newIndex = oldIndex + direction > layoutConfig.containers.length ? 1 : oldIndex + direction < 1 ? layoutConfig.containers.length : oldIndex + direction;

            const oldPage = document.getElementById(layoutConfig.containers[oldIndex - 1].id);
            const newPage = document.getElementById(layoutConfig.containers[newIndex - 1].id);
            const oldIndicator = document.getElementById(`indicator-${layoutConfig.containers[oldIndex - 1].id}`);
            const newIndicator = document.getElementById(`indicator-${layoutConfig.containers[newIndex - 1].id}`);

            // Retire la classe active (ajoute l'effet de disparition)
            oldPage.classList.remove("active");
            oldIndicator.classList.remove("active");

            setTimeout(() => {
                oldPage.style.display = "none"; // Masquer après la transition
                newPage.style.display = "grid"; // Afficher la nouvelle page
                setTimeout(() => {
                    newPage.classList.add("active"); // Ajoute la classe active après un court délai
                    newIndicator.classList.add("active");
                }, 10);
            }, 800); // Attends 500ms avant de masquer l'ancienne page

            containerIndex = newIndex;
        }
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
        await widgetScript.__initialize__(subDiv, widget.props);
        widgetDiv.appendChild(subDiv);
        document.getElementById(widget.container).appendChild(widgetDiv);
    });
}

load();