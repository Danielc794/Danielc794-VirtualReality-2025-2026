// Fazbears Pizza - New Dawn Main Script
// This script handles scene initialization, camera controls, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Fazbears Pizza - New Dawn Scene');
    
    const scene = document.querySelector('a-scene');
    const camera = document.querySelector('#mainCamera');
    const outputText = document.querySelector('#output');
    const mapModel = document.querySelector('#map');
    
    // Key state tracking
    const keysPressed = {};
    let LightLeftRemoved = false;
    let LightRightRemoved = false;
    let DoorsVisible = true;
    let usageCount = 1;
    let leftUsageRecorded = false;
    let rightUsageRecorded = false;
    let leftDoorUsageRecorded = false;
    let rightDoorUsageRecorded = false;
    let cameraUsageRecorded = false;
    const usageDisplay = document.querySelector('#usageDisplay');
    const powerDisplay = document.querySelector('#powerDisplay');
    let powerValue = 1600;
    const maxPower = 1600;

    function updateUsageDisplay() {
        if (usageDisplay) {
            usageDisplay.setAttribute('value', `USAGE: ${usageCount}`);
        }
    }

    function updatePowerDisplay() {
        if (powerDisplay) {
            const percent = Math.max(0, Math.round((powerValue / maxPower) * 100));
            powerDisplay.setAttribute('value', `POWER: ${percent}%`);
        }
    }
    
    // Scene Setup
    function initializeScene() {
        console.log('Scene loaded and ready');
        
        // Wait for the scene to be fully loaded
        scene.addEventListener('loaded', function() {
            console.log('A-Frame scene fully loaded');
            updateOutputText('Scene Loaded - Welcome to Fazbears Pizza!');
        });
    }
    
    // Update display text
    function updateOutputText(message) {
        if (outputText) {
            outputText.setAttribute('value', message);
        }
    }

    // Time display logic
    const timeDisplay = document.querySelector('#timeDisplay');
    let currentHour = 0; // 0 = 12 AM

    function formatHour(hour24) {
        const period = hour24 < 12 ? 'AM' : 'PM';
        let hour12 = hour24 % 12;
        if (hour12 === 0) hour12 = 12;
        return `${hour12} ${period}`;
    }

    function updateTimeDisplay() {
        if (timeDisplay) {
            timeDisplay.setAttribute('value', `TIME: ${formatHour(currentHour)}`);
        }
    }

    let timeIntervalId = null;

    function advanceHour() {
        currentHour = (currentHour + 1) % 24;
        updateTimeDisplay();

        // Stop at 6 AM (06:00)
        if (currentHour === 6) {
            if (timeIntervalId !== null) {
                clearInterval(timeIntervalId);
                timeIntervalId = null;
                updateOutputText('Time stopped at 6 AM');
            }
        }
    }

    // Initialize time at 12 AM
    updateTimeDisplay();
    updatePowerDisplay();
    timeIntervalId = setInterval(advanceHour, 60000); // every 60 seconds

    // Map interaction handler
    mapModel.addEventListener('click', function() {
        console.log('Map clicked');
        updateOutputText('Exploring Fazbears Pizza - New Dawn');
    });
    
    // Keyboard controls for additional features
    document.addEventListener('keydown', function(event) {
        keysPressed[event.key.toLowerCase()] = true;
        
        switch(event.key.toLowerCase()) {
            case 'l':
                // Toggle lighting
                toggleLighting();
                break;
            case 'e':
                // Toggle doors
                toggleDoors();
                break;
        }
    });
    
    document.addEventListener('keyup', function(event) {
        keysPressed[event.key.toLowerCase()] = false;
        
        // When Q is released, restore door opacity
        if (event.key.toLowerCase() === 'q') {
            restoreLightLeft();
            restoreLightRight();
        }
    });
    
    // Light opacity handler
    function removeLightLeft() {
        const light = document.querySelector('#leftLight');
        if (light) {
            const material = light.getAttribute('material');
            material.opacity = 0;
            light.setAttribute('material', material);
            LightLeftRemoved = true;
            updateOutputText('Left Light Faded!');
        }
    }

    // Right light opacity handler
    function removeLightRight() {
        const light = document.querySelector('#rightLight');
        if (light) {
            const material = light.getAttribute('material');
            material.opacity = 0;
            light.setAttribute('material', material);
            LightRightRemoved = true;
            updateOutputText('Right Light Faded!');
        }
    }

    // Restore left light opacity
    function restoreLightLeft() {
        const light = document.querySelector('#leftLight');
        if (light) {
            const material = light.getAttribute('material');
            material.opacity = 1;
            light.setAttribute('material', material);
            LightLeftRemoved = false;
            updateOutputText('Left Light Restored!');
        }
    }
    
    // Restore right light opacity
    function restoreLightRight() {
        const light = document.querySelector('#rightLight');
        if (light) {
            const material = light.getAttribute('material');
            material.opacity = 1;
            light.setAttribute('material', material);
            LightRightRemoved = false;
            updateOutputText('Right Light Restored!');
        }
    }
    
    // Lighting control
    let lightsOn = true;
    function toggleLighting() {
        const ambientLight = document.querySelector('a-light[type="ambient"]');
        const directionalLight = document.querySelector('a-light[type="directional"]');
        
        if (lightsOn) {
            ambientLight.setAttribute('intensity', '0.1');
            directionalLight.setAttribute('intensity', '0.3');
            updateOutputText('Lights Dimmed');
        } else {
            ambientLight.setAttribute('intensity', '0.4');
            directionalLight.setAttribute('intensity', '0.6');
            updateOutputText('Lights Brightened');
        }
        lightsOn = !lightsOn;
    }    
    // Door toggle control (one door at a time based on camera yaw)
    let leftDoorDown = false;
    let rightDoorDown = false;

    function setDoorPosition(door, down) {
        if (!door) return;
        if (down) {
            door.setAttribute('position', `${door.getAttribute('position').x} 1 ${door.getAttribute('position').z}`);
        } else {
            door.setAttribute('position', `${door.getAttribute('position').x} 6 ${door.getAttribute('position').z}`);
        }
    }

    function toggleDoors() {
        const leftDoor = document.querySelector('#leftDoor');
        const rightDoor = document.querySelector('#rightDoor');
        const cameraRotation = camera.getAttribute('rotation');
        const cameraYAngle = cameraRotation ? cameraRotation.y : 0;

        if (!leftDoor || !rightDoor) return;

        // Determine active door based on camera angle
        if (cameraYAngle > 15) {
            // Looking left: toggle left door only
            leftDoorDown = !leftDoorDown;
            setDoorPosition(leftDoor, leftDoorDown);
            updateOutputText(leftDoorDown ? 'Left Door Closed' : 'Left Door Opened');
        } else if (cameraYAngle < -15) {
            // Looking right: toggle right door only
            rightDoorDown = !rightDoorDown;
            setDoorPosition(rightDoor, rightDoorDown);
            updateOutputText(rightDoorDown ? 'Right Door Closed' : 'Right Door Opened');
        } else {
            updateOutputText('Facing center: move camera left or right to choose a door');
        }
    }    
    // Animation loop for real-time updates
    function animationLoop() {
        // Get camera rotation (Y angle is yaw)
        const cameraRotation = camera.getAttribute('rotation');
        const cameraYAngle = cameraRotation ? cameraRotation.y : 0;
        
        // Check if Q is being held down and camera angle conditions
        if (keysPressed['q']) {
            // Left lights: Q held and camera Y angle < -15
            if (cameraYAngle > 15 && !LightLeftRemoved) {
                removeLightLeft();
            }
            
            // Right lights: Q held and camera Y angle > 15
            if (cameraYAngle < -15 && !LightRightRemoved) {
                removeLightRight();
            }
        }
        
        // Add any continuous updates here
        requestAnimationFrame(animationLoop);
    }
    
    // Initialize usage tracking every second
    setInterval(function() {
        const leftDoor = document.querySelector('#leftDoor');
        const rightDoor = document.querySelector('#rightDoor');
        const leftDoorY = leftDoor ? leftDoor.getAttribute('position').y : null;
        const rightDoorY = rightDoor ? rightDoor.getAttribute('position').y : null;

        // Left light on -> decrement once
        if (!LightLeftRemoved && leftUsageRecorded) {
            usageCount = Math.max(1, usageCount - 1);
            leftUsageRecorded = false;
        }
        // Right light on -> decrement once
        if (!LightRightRemoved && rightUsageRecorded) {
            usageCount = Math.max(1, usageCount - 1);
            rightUsageRecorded = false;
        }

        // Left door raised (y=6) -> decrement once
        if (leftDoorY === 6 && leftDoorUsageRecorded) {
            usageCount = Math.max(1, usageCount - 1);
            leftDoorUsageRecorded = false;
        }
        // Right door raised (y=6) -> decrement once
        if (rightDoorY === 6 && rightDoorUsageRecorded) {
            usageCount = Math.max(1, usageCount - 1);
            rightDoorUsageRecorded = false;
        }

        // Left light off -> increment once
        if (LightLeftRemoved && !leftUsageRecorded) {
            usageCount += 1;
            leftUsageRecorded = true;
        }
        // Right light off -> increment once
        if (LightRightRemoved && !rightUsageRecorded) {
            usageCount += 1;
            rightUsageRecorded = true;
        }

        // Left door closed (y=1) -> increment once
        if (leftDoorY === 1 && !leftDoorUsageRecorded) {
            usageCount += 1;
            leftDoorUsageRecorded = true;
        }
        // Right door closed (y=1) -> increment once
        if (rightDoorY === 1 && !rightDoorUsageRecorded) {
            usageCount += 1;
            rightDoorUsageRecorded = true;
        }

        // Camera off -> decrement once
        if (!window.CameraSystemActive && cameraUsageRecorded) {
            usageCount = Math.max(1, usageCount - 1);
            cameraUsageRecorded = false;
        }
        // Camera on -> increment once
        if (window.CameraSystemActive && !cameraUsageRecorded) {
            usageCount += 1;
            cameraUsageRecorded = true;
        }

        updateUsageDisplay();
    }, 1000);

    // Drain power by usageCount every 0.5 seconds
    setInterval(function() {
        powerValue = Math.max(0, powerValue - usageCount);
        updatePowerDisplay();
    }, 500);

    // Initialize everything
    initializeScene();
    animationLoop();
    
});

// Raycaster for interaction detection (for VR or pointer interactions)
function setupInteractionDetection() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.addEventListener('click', function(event) {
            console.log('Scene clicked at:', event.clientX, event.clientY);
        });
    }
}

// Call interaction setup after scene loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupInteractionDetection, 1000);
});
