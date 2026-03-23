// Fazbears Pizza - New Dawn Map Configuration
// This file defines the layout, points of interest, and interactive elements

const FazbearsPizzaConfig = {
    // Map Information
    mapName: "Fazbears Pizza - New Dawn",
    version: "1.0",
    
    // Camera/Player Settings
    playerSettings: {
        startPosition: { x: 0, y: 1.6, z: 5 },
        speed: 20,
        height: 1.6
    },
    
    // Points of Interest (POI)
    pointsOfInterest: [
        {
            id: "stage",
            name: "Main Stage",
            description: "Performance stage with animatronics",
            position: { x: 0, y: 0, z: -30 },
            radius: 5
        },
        {
            id: "pirateCove",
            name: "Pirate Cove",
            description: "Foxy's private area",
            position: { x: -8, y: 0, z: 0 },
            radius: 4
        },
        {
            id: "diningArea",
            name: "Main Dining Area",
            description: "Central gathering area",
            position: { x: 0, y: 0, z: 0 },
            radius: 8
        },
        {
            id: "officeArea",
            name: "Office Area",
            description: "Security office with cameras",
            position: { x: 8, y: 0, z: 6 },
            radius: 3
        },
        {
            id: "bathrooms",
            name: "Bathrooms",
            description: "Customer facilities",
            position: { x: 5, y: 0, z: 24 },
            radius: 2
        },
        {
            id: "backRoom",
            name: "Back Room",
            description: "Storage and maintenance",
            position: { x: -6, y: 0, z: 24 },
            radius: 4
        }
    ],
    
    // Lighting Zones
    lightingZones: [
        {
            id: "mainLighting",
            type: "ambient",
            intensity: 0.6,
            color: "#ffffff"
        },
        {
            id: "stageLighting",
            type: "directional",
            intensity: 0.8,
            position: { x: 5, y: 10, z: 7 }
        }
    ],
    
    // Audio zones (for future implementation)
    audioZones: [
        {
            id: "ambientAudio",
            type: "ambient",
            loop: true,
            volume: 0.3
        }
    ],
    
    // Animatronic Positions
    animatronics: [
        {
            id: "freddy",
            name: "Freddy Fazbear",
            position: { x: -2, y: 0, z: -10 },
            model: "freddy.js"
        },
        {
            id: "bonnie",
            name: "Bonnie the Bunny",
            position: { x: 0, y: 0, z: -10 },
            model: "bonnie.js"
        },
        {
            id: "chica",
            name: "Chica the Chicken",
            position: { x: 2, y: 0, z: -10 },
            model: "chica.js"
        },
        {
            id: "foxy",
            name: "Foxy the Pirate",
            position: { x: -8, y: 0, z: 0 },
            model: "foxy.js"
        }
    ],
    
    // Interactive Objects
    interactiveObjects: [
        {
            id: "stage",
            name: "Stage",
            description: "Main performance stage",
            type: "area",
            interact: "Look at animatronics"
        },
        {
            id: "securityCamera",
            name: "Security Camera",
            description: "Monitor room cameras",
            type: "device",
            interact: "View camera feeds"
        },
        {
            id: "exitSign",
            name: "Emergency Exit",
            description: "Emergency exit door",
            type: "object",
            interact: "Open door"
        }
    ],
    
    // Scene Configuration
    sceneConfig: {
        skyColor: "#87CEEB",
        fogNear: 1,
        fogFar: 100,
        gravity: -9.8,
        physics: true
    },
    
    // Security Cameras (FNAF 1 map positions, adjusted for proper room direction)
    securityCameras: [
        // CAM 1: Stage (top left, facing stage)
        { id: 'c1-stage', name: 'CAM 1 - Show Stage', position: { x: -4, y: 4, z: -31.5 }, rotation: { x: -20, y: -80, z: 0 }, room: 'Stage' },
        // CAM 2: Dining (top left of dining area, facing towards center of dining)
        { id: 'c2-dining', name: 'CAM 2 - Dining Area', position: { x: -5, y: 4, z: -29.5 }, rotation: { x: -10, y: -150, z: 0 }, room: 'Dining Area' },
        // CAM 3: Pirate Cove
        { id: 'c3-pirate-cove', name: 'CAM 3 - pirate-cove', position: { x: -5.5, y: 4, z: -19 }, rotation: { x: -25, y: 100, z: 0 }, room: 'Pirate Cove' },
        // CAM 4: West Hall (looking down left hallway)
        { id: 'c4-west-hall', name: 'CAM 4 - West Hall', position: { x: -2.5, y: 3.7, z: -4.5 }, rotation: { x: -25, y: 15, z: 0 }, room: 'West hall' },
        // CAM 5: left door
        { id: 'c5-left-door', name: 'CAM 5 - Left Door', position: { x: -4.5, y: 3.5, z: -3.5 }, rotation: { x: -30, y: -150, z: 0 }, room: 'West door' },
        // CAM 6: Pantry/Backroom (top right, facing backroom)
        { id: 'c6-backroom', name: 'CAM 6 - Backroom', position: { x: -5.6, y: 3.5, z: -6.7 }, rotation: { x: -32, y: 60, z: 0 }, room: 'Back Room' },
        // CAM 7: East Hall (looking down right hallway)
        { id: 'c7-east-hall', name: 'CAM 7 - East Hall', position: { x: 2.5, y: 3.7, z: -4.5 }, rotation: { x: -25, y: -15, z: 0 }, room: 'East hall' },
        // CAM 8: right door
        { id: 'c8-right-door', name: 'CAM 8 - Right Door', position: { x: 2.5, y: 3.5, z: -2.5 }, rotation: { x: -40, y: -180, z: 0 }, room: 'East door' },
        // CAM 8: bathrooms (top right, facing bathrooms)
        { id: 'c8-bathrooms', name: 'CAM 8 - Bathrooms', position: { x: 11, y: 3.5, z: -25 }, rotation: { x: -20, y: -160, z: 0 }, room: 'Bathrooms' }
    ],

    // Helper function to get POI by ID
    getPOIById: function(id) {
        return this.pointsOfInterest.find(poi => poi.id === id);
    },
    
    // Helper function to get animatronic by ID
    getAnimatronicById: function(id) {
        return this.animatronics.find(anim => anim.id === id);
    }
};

// Expose configuration on window for inline script usage
if (typeof window !== 'undefined') {
    window.FazbearsPizzaConfig = FazbearsPizzaConfig;
}

// Export for use in other scripts (Node/CommonJS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FazbearsPizzaConfig;
}
