// Camera Y-Axis Only Rotation for Fazbears Pizza - New Dawn
// Allows only horizontal (Y-axis) rotation with limits

document.addEventListener('DOMContentLoaded', function() {
    const camera = document.querySelector('#mainCamera');
    
    let yRotation = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Rotation limits for Y axis (left/right turning)
    const YAW_MIN = -25;   // Maximum left turn
    const YAW_MAX = 25;    // Maximum right turn
    
    // Disable default look controls
    camera.setAttribute('look-controls', 'enabled: false');
    
    // Mouse down - start tracking
    document.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });
    
    // Mouse up - stop tracking
    document.addEventListener('mouseup', function(event) {
        isDragging = false;
    });
    
    // Mouse move - update Y rotation only
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        // Only use X mouse movement for Y axis rotation (horizontal look)
        // Sensitivity factor
        const sensitivity = 0.2;
        const newYRotation = yRotation + (deltaMove.x * sensitivity);
        
        // Clamp rotation within limits - prevents exceeding instead of resetting
        yRotation = Math.max(YAW_MIN, Math.min(YAW_MAX, newYRotation));
        
        // Set camera rotation - only Y axis changes
        camera.setAttribute('rotation', `0 ${yRotation} 0`);
        
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });
    
    console.log('Camera Y-axis only rotation enabled with limits:');
    console.log(`Yaw (left/right): ${YAW_MIN}° to ${YAW_MAX}°`);
});
