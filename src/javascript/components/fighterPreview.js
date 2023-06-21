import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const imgElement = createFighterImage(fighter);
    const nameElement = createElement({
        tagName: 'div',
        className: 'fighter-preview___name',
        innerText: fighter.name
    });
    const healthElement = createElement({
        tagName: 'div',
        className: 'fighter-preview___health',
        innerText: `Health: ${fighter.health}`
    });

    fighterElement.append(imgElement, nameElement, healthElement);
    return fighterElement;
}

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

    return imgElement;
}
