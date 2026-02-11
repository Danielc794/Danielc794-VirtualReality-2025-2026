# Fazbears Pizza - New Dawn VR Map

## Overview
This is a comprehensive A-Frame VR implementation of the **Fazbears Pizza - New Dawn** location from the Five Nights at Freddy's universe.

## File Structure

- **index.html** - Main HTML file with A-Frame scene setup
- **script.js** - Main scene logic and interaction handlers
- **mapConfig.js** - Map configuration with POI, lighting zones, and animatronic positions
- **bonnie.js** - Bonnie animatronic model
- **chica.js** - Chica animatronic model
- **freddy.js** - Freddy animatronic model
- **foxy.js** - Foxy animatronic model
- **camera.js** - Camera control setup
- **computer.js** - Computer/office equipment models
- **fazbears_pizza__new_dawn/** - 3D model assets and textures

## Features

### Visual Elements
- Full 3D GLTF model of Fazbears Pizza New Dawn
- Dynamic lighting system (ambient + directional)
- Realistic materials with PBR textures
- Sky background
- Ground reference plane

### Camera Controls
- **WASD Keys** - Move around the map
- **Mouse** - Look around and rotate view
- **L Key** - Toggle lighting brightness

### Interactive Elements
- Points of Interest (POI) system for map locations
- Information panel with welcome message
- Reticle for VR interactions
- Real-time output text display

## Map Points of Interest

1. **Main Stage** - Performance area with animatronics
2. **Pirate Cove** - Foxy's private area
3. **Main Dining Area** - Central gathering space
4. **Office Area** - Security office with camera systems
5. **Bathrooms** - Customer facilities
6. **Back Room** - Storage and maintenance area

## Animatronics Positions

- **Freddy Fazbear** - Center-left of stage
- **Bonnie the Bunny** - Center of stage
- **Chica the Chicken** - Center-right of stage
- **Foxy the Pirate** - Pirate Cove area

## Configuration

All map settings and points of interest can be modified in `mapConfig.js`:

```javascript
const config = FazbearsPizzaConfig;
const stagePOI = config.getPOIById('stage');
const freddy = config.getAnimatronicById('freddy');
```

## Technical Details

- **A-Frame Version** - 1.7.0
- **Physics** - Gravity enabled (-9.8 m/s²)
- **Default Camera Height** - 1.6 units (eye level)
- **Movement Speed** - 20 units/second

## Browser Compatibility

Works on any modern web browser that supports:
- WebGL
- A-Frame
- WebVR/WebXR (for VR headsets)

## Usage

1. Open `index.html` in a web browser
2. Use WASD keys to navigate the environment
3. Use mouse to look around
4. Interact with the environment using keyboard controls

## Future Enhancements

- Add animatronic behavior and animations
- Implement security camera system
- Add audio ambience and sound effects
- Create interactive mini-games
- Add night vision/flashlight mechanics
- Implement threat detection system
- Add multiplayer support

## Assets Attribution

All 3D models and textures for Fazbears Pizza - New Dawn are included in the `fazbears_pizza__new_dawn/` directory with respective license files.

## Notes

- The map model is loaded from `fazbears_pizza__new_dawn/scene.gltf`
- Physics engine is enabled for realistic interactions
- Camera uses WASD controls for movement
- Fully compatible with VR headsets when viewed in WebXR-compatible browser
