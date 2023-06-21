import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const fightDuration = 10000; // 10 seconds
        const maxCriticalStrikeInterval = 10000; // 10 seconds

        let isBlocked = false;
        let isCriticalStrikeEnabled = true;

        const processKeydown = (event) => {
            const { code } = event;
            const firstFighterKeys = controls.PlayerOne;
            const secondFighterKeys = controls.PlayerTwo;

            if (code === firstFighterKeys.Block && !isBlocked) {
                isBlocked = true;
            } else if (code === secondFighterKeys.Block && !isBlocked) {
                isBlocked = true;
            } else if (code === firstFighterKeys.CriticalHit && isCriticalStrikeEnabled) {
                isCriticalStrikeEnabled = false;
                attack(secondFighter, firstFighter, true);
                setTimeout(() => {
                    isCriticalStrikeEnabled = true;
                }, maxCriticalStrikeInterval);
            } else if (code === secondFighterKeys.CriticalHit && isCriticalStrikeEnabled) {
                isCriticalStrikeEnabled = false;
                attack(firstFighter, secondFighter, true);
                setTimeout(() => {
                    isCriticalStrikeEnabled = true;
                }, maxCriticalStrikeInterval);
            } else if (code === firstFighterKeys.Hit && !isBlocked) {
                attack(secondFighter, firstFighter, false);
            } else if (code === secondFighterKeys.Hit && !isBlocked) {
                attack(firstFighter, secondFighter, false);
            }
        };

        const attack = (attacker, defender, isCriticalHit) => {
            const damage = getDamage(attacker, defender, isCriticalHit);
            defender.health -= damage;
            if (defender.health <= 0) {
                resolve(attacker);
            }
        };

        setTimeout(() => {
            resolve(firstFighter.health > secondFighter.health ? firstFighter : secondFighter);
        }, fightDuration);

        document.addEventListener('keydown', processKeydown);
    });
}

export function getDamage(attacker, defender, isCriticalHit) {
    const attackerPower = isCriticalHit ? getHitPower(attacker) * 2 : getHitPower(attacker);
    const defenderBlockPower = getBlockPower(defender);

    const damage = Math.max(attackerPower - defenderBlockPower, 0);
    return damage;
}

export function getHitPower(fighter) {
    const { attack, defense, criticalHitChance } = fighter;
    const randomMultiplier = getRandomNumber(1, 2);

    const power = attack * criticalHitChance * randomMultiplier;
    return power;
}

export function getBlockPower(fighter) {
    const { defense, dodgeChance } = fighter;
    const randomMultiplier = getRandomNumber(1, 2);

    const power = defense * dodgeChance * randomMultiplier;
    return power;
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
