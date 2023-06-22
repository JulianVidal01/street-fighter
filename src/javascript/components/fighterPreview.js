import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });
    imgElement.style.maxHeight = '300px';
    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    if (!fighter) return fighterElement;
    const { name, health, attack, defense } = fighter;

    const fighterInfo = Object.entries({ name, health, attack, defense }).map(item => {
        const element = createElement({
            tagName: 'p',
            className: 'fighter-info_text'
        });
        element.textContent = `${item[0]}: ${item[1]}`;
        return element;
    });

    const fighterImage = createFighterImage(fighter);
    fighterElement.append(fighterImage, ...fighterInfo);

    return fighterElement;
}
