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
            position: { x: 0, y: 0, z: -10 },
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
            position: { x: 8, y: 0, z: 2 },
            radius: 3
        },
        {
            id: "bathrooms",
            name: "Bathrooms",
            description: "Customer facilities",
            position: { x: 5, y: 0, z: 8 },
            radius: 2
        },
        {
            id: "backRoom",
            name: "Back Room",
            description: "Storage and maintenance",
            position: { x: -6, y: 0, z: 8 },
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
    
    // Helper function to get POI by ID
    getPOIById: function(id) {
        return this.pointsOfInterest.find(poi => poi.id === id);
    },
    
    // Helper function to get animatronic by ID
    getAnimatronicById: function(id) {
        return this.animatronics.find(anim => anim.id === id);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FazbearsPizzaConfig;
}
