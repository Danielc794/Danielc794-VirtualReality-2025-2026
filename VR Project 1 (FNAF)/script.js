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
            ambientLight.setAttribute('intensity', '0.4');
            directionalLight.setAttribute('intensity', '0.6');
            updateOutputText('Lights Dimmed');
        } else {
            ambientLight.setAttribute('intensity', '0.8');
            directionalLight.setAttribute('intensity', '1.0');
            updateOutputText('Lights Brightened');
        }
        lightsOn = !lightsOn;
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
