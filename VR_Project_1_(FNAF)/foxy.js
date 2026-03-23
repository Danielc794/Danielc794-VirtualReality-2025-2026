// Foxy animatronic behavior script
// Handles Foxy's movement from Pirate Cove

document.addEventListener('DOMContentLoaded', function() {
    const foxy = document.querySelector('#foxy');
    const leftDoor = document.querySelector('#leftDoor');
    const jumpscareImage = document.querySelector('#foxyJumpscare');
    const xscreamSound = document.querySelector('#xscreamSound');
    
    if (!foxy) {
        console.error('Foxy entity not found');
        return;
    }
    
    let timeAtFinalPosition = 0;
    let jumpscareTriggered = false;
    
    // Check if Foxy is in Pirate Cove position (-10.5, 0.5, -18)
    function isInPirateCove() {
        const position = foxy.getAttribute('position');
        return position && position.x === -10.5 && position.y === 0.5 && position.z === -18;
    }
    
    // Check if Foxy is at attack position (-3.5, 0, -15)
    function isAtAttackPosition() {
        const position = foxy.getAttribute('position');
        return position && position.x === -3.5 && position.z === -15;
    }
    
    // Check if Foxy is at final position (-3.25, 0, -1.25)
    function isAtFinalPosition() {
        const position = foxy.getAttribute('position');
        return position && position.x === -3.25 && position.z === -1.25;
    }
    
    // Get left door y position
    function getLeftDoorY() {
        if (!leftDoor) return null;
        const position = leftDoor.getAttribute('position');
        return position ? position.y : null;
    }
    
    // Trigger jumpscare
    function triggerJumpscare() {
        if (jumpscareTriggered) return;
        jumpscareTriggered = true;
        
        console.log('JUMPSCARE TRIGGERED!');
        if (jumpscareImage) {
            jumpscareImage.setAttribute('visible', 'true');
        }
        if (xscreamSound) {
            xscreamSound.components.sound.playSound();
        }
        
        // Hide jumpscare after 5 seconds
        setTimeout(function() {
            if (jumpscareImage) {
                jumpscareImage.setAttribute('visible', 'false');
            }
            jumpscareTriggered = false;
            timeAtFinalPosition = 0;
        }, 5000);
    }
    
    // Reset Foxy to pirate cove
    function resetFoxyToPirateCove() {
        foxy.setAttribute('position', '-10.5 0.5 -18');
        foxy.setAttribute('rotation', '0 90 0');
        timeAtFinalPosition = 0;
        jumpscareTriggered = false;
        console.log('Foxy reset to Pirate Cove');
    }
    
    // Generate random number between 1 and 90
    function getRandomNumber90() {
        return Math.floor(Math.random() * 90) + 1;
    }
    
    // Generate random number between 1 and 15
    function getRandomNumber15() {
        return Math.floor(Math.random() * 15) + 1;
    }
    
    // Move Foxy to attack position
    function moveToAttackPosition() {
        foxy.setAttribute('position', '-3.5 0 -15');
        foxy.setAttribute('rotation', '0 0 0');
        console.log('Foxy moved to attack position');
    }
    
    // Move Foxy to final position
    function moveToFinalPosition() {
        foxy.setAttribute('position', '-3.25 0 -1.25');
        foxy.setAttribute('rotation', '0 90 0');
        console.log('Foxy moved to final position');
    }
    
    // Main behavior loop - check every second
    setInterval(function() {
        const leftDoorY = getLeftDoorY();
        
        // Check if at final position
        if (isAtFinalPosition()) {
            timeAtFinalPosition++;
            
            // If at final position for >5 seconds and left door is open (y=6), trigger jumpscare
            if (timeAtFinalPosition > 5 && leftDoorY === 6) {
                triggerJumpscare();
            }
        } else {
            timeAtFinalPosition = 0;
        }
        
        // If left door is closed (y=1), reset Foxy to pirate cove
        if (leftDoorY === 1) {
            resetFoxyToPirateCove();
        }
        
        if (isInPirateCove()) {
            const randomNum = getRandomNumber90();
            console.log('Foxy random check (Pirate Cove):', randomNum);
            
            if (randomNum === 40) {
                moveToAttackPosition();
            }
        } else if (isAtAttackPosition()) {
            const randomNum = getRandomNumber15();
            console.log('Foxy random check (Attack Position):', randomNum);
            
            if (randomNum === 5) {
                moveToFinalPosition();
            }
        }
    }, 1000); // Every 1000ms = 1 second
});
