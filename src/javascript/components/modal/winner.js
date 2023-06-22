import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    const onModalClose = () => {
        const rootElement = document.getElementById('root');
        rootElement.innerHTML = '';
    };
    const winnerImg = createFighterImage(fighter);
    winnerImg.style.maxHeight = '600px';
    showModal({ title: `${fighter.name} won!`, bodyElement: winnerImg, onClose: onModalClose });
}
