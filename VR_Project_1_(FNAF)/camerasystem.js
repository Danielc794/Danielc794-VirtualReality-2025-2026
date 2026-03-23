// FNAF-style Security Camera System (camera switching + room placements)
(function() {
  function log(msg) {
    console.log('[CameraSystem] ' + msg);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const mainCamera = document.querySelector('#mainCamera');
    const outputText = document.querySelector('#output');
    const scene = document.querySelector('a-scene');

    if (!mainCamera || !scene) {
      log('Main camera or scene not found. Camera system disabled.');
      return;
    }

    const config = (window.FazbearsPizzaConfig || typeof FazbearsPizzaConfig !== 'undefined' && FazbearsPizzaConfig || {});
    const cameraList = Array.isArray(config.securityCameras) ? config.securityCameras : [];

    if (cameraList.length === 0) {
      log('No security cameras configured in mapConfig.js.');
      return;
    }

    let cameraMode = false;
    let currentCameraIndex = 0;
    let playerRestore = null;

    const cameraHud = document.querySelector('#cameraHud');
    const cameraHudText = document.querySelector('#cameraHudText');
    const cameraModeIndicator = document.querySelector('#cameraModeIndicator');

    log('Camera system initialized');
    log('Camera HUD elements found:', !!cameraHud, !!cameraHudText, !!cameraModeIndicator);

    function updateOutput(value) {
      if (outputText) {
        outputText.setAttribute('value', value);
      }
    }

    function showCameraHud(index) {
      if (!cameraHud || !cameraHudText) {
        log('Camera HUD elements not found!');
        log('cameraHud:', cameraHud);
        log('cameraHudText:', cameraHudText);
        return;
      }
      const total = cameraList.length;
      cameraHudText.setAttribute('value', `CAM ${index + 1} / ${total}`);
      cameraHud.setAttribute('visible', 'true');
      if (cameraModeIndicator) {
        cameraModeIndicator.setAttribute('visible', 'true');
      }
      log(`Camera HUD shown: CAM ${index + 1} / ${total}`);
    }

    function hideCameraHud() {
      if (!cameraHud) return;
      cameraHud.setAttribute('visible', 'false');
      if (cameraModeIndicator) {
        cameraModeIndicator.setAttribute('visible', 'false');
      }
      log('Camera HUD hidden');
    }

    function setCameraPosition(cam) {
      mainCamera.setAttribute('position', `${cam.position.x} ${cam.position.y} ${cam.position.z}`);
      mainCamera.setAttribute('rotation', `${cam.rotation.x} ${cam.rotation.y} ${cam.rotation.z}`);
    }

    function setLookControls(enabled) {
      if (mainCamera.components && mainCamera.components['look-controls']) {
        mainCamera.setAttribute('look-controls', `enabled: ${enabled}; pointerLockEnabled: true`);
      } else {
        mainCamera.setAttribute('look-controls', `enabled: ${enabled}`);
      }
    }

    function showCameraFeed(index) {
      const cam = cameraList[index];
      if (!cam) {
        log(`Camera ${index} not found`);
        return;
      }

      log(`Switching to camera ${index + 1}: ${cam.name} at position ${cam.position.x}, ${cam.position.y}, ${cam.position.z}`);
      setCameraPosition(cam);
      setLookControls(false);
      updateOutput(`CAM ${index + 1}/${cameraList.length}: ${cam.name} (${cam.room}) - SPACE to next, C to exit`);
      showCameraHud(index);
      cameraMode = true;
      currentCameraIndex = index;
      window.CameraSystemActive = true;
    }

    function exitCameraFeed() {
      hideCameraHud();
      if (!playerRestore) {
        // use a safe office fallback
        playerRestore = { position: { x: 0, y: 1.6, z: 2.5 }, rotation: { x: 0, y: 0, z: 0 } };
      }

      mainCamera.setAttribute('position', `${playerRestore.position.x} ${playerRestore.position.y} ${playerRestore.position.z}`);
      mainCamera.setAttribute('rotation', `${playerRestore.rotation.x} ${playerRestore.rotation.y} ${playerRestore.rotation.z}`);
      setLookControls(true);
      updateOutput('Security Cameras OFF - press SPACE to enter camera system');
      cameraMode = false;
      window.CameraSystemActive = false;
    }

    function parseAttrValue(val, fallback) {
      if (!val && val !== 0) {
        return fallback;
      }
      if (typeof val === 'object' && val !== null && 'x' in val && 'y' in val && 'z' in val) {
        return { x: Number(val.x), y: Number(val.y), z: Number(val.z) };
      }
      if (typeof val === 'string') {
        const parts = val.trim().split(/\s+/);
        return { x: Number(parts[0] || 0), y: Number(parts[1] || 0), z: Number(parts[2] || 0) };
      }
      return fallback;
    }

    function parseRotation(val) {
      if (!val && val !== 0) {
        return { x: 0, y: 0, z: 0 };
      }
      if (typeof val === 'object' && val !== null && 'x' in val && 'y' in val && 'z' in val) {
        return { x: Number(val.x), y: Number(val.y), z: Number(val.z) };
      }
      if (typeof val === 'string') {
        const parts = val.trim().split(/\s+/);
        return { x: Number(parts[0] || 0), y: Number(parts[1] || 0), z: Number(parts[2] || 0) };
      }
      return { x: 0, y: 0, z: 0 };
    }

    function toggleNextCamera() {
      if (!cameraMode) {
        const rawPosition = mainCamera.getAttribute('position');
        const rawRotation = mainCamera.getAttribute('rotation');

        playerRestore = {
          position: parseAttrValue(rawPosition, { x: 0, y: 1.6, z: 2.5 }),
          rotation: parseRotation(rawRotation)
        };

        showCameraFeed(0);
      } else {
        currentCameraIndex = (currentCameraIndex + 1) % cameraList.length;
        showCameraFeed(currentCameraIndex);
      }
    }

    window.addEventListener('keydown', function(event) {
      const keyName = (event.key || '').toLowerCase();
      log(`keydown: key=${keyName}, code=${event.code}, cameraMode=${cameraMode}`);
      const isSpace = keyName === ' ' || keyName === 'spacebar' || keyName === 'space' || event.code === 'Space';

      if (isSpace) {
        event.preventDefault();
        log('Spacebar pressed, toggling camera');
        toggleNextCamera();
        return;
      }

      if (keyName === 'c' || event.code === 'KeyC') {
        if (cameraMode) {
          exitCameraFeed();
        }
      }
    });

    function createCameraMarkers() {
      log(`Creating ${cameraList.length} camera markers`);
      cameraList.forEach((cam, index) => {
        const marker = document.createElement('a-box');
        marker.setAttribute('position', `${cam.position.x} ${cam.position.y - 0.4} ${cam.position.z}`);
        marker.setAttribute('width', '0.3');
        marker.setAttribute('height', '0.3');
        marker.setAttribute('depth', '0.3');
        marker.setAttribute('color', '#00ffff');
        marker.setAttribute('opacity', '0.85');
        marker.setAttribute('material', 'shader: flat; color: #00ffff');

        const label = document.createElement('a-text');
        label.setAttribute('value', `${index + 1}: ${cam.name}`);
        label.setAttribute('color', '#ffffff');
        label.setAttribute('position', '0 0.25 0');
        label.setAttribute('scale', '0.5 0.5 0.5');
        marker.appendChild(label);

        scene.appendChild(marker);
      });
    }

    log(`Found ${cameraList.length} security cameras. Use SPACE to cycle and C to exit.`);
    updateOutput('Security cameras ready. Press SPACE to enter camera system');
    // createCameraMarkers(); // Temporarily disabled for debugging
  });
})();
