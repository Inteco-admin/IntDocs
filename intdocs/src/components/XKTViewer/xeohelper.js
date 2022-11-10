import { Viewer, XKTLoaderPlugin } from '@xeokit/xeokit-sdk'

export default function Init(filename) {
  return new Promise((resolve, reject) => {
    const viewer = new Viewer({
      canvasId: "myCanvas"
    });

    const xktLoader = new XKTLoaderPlugin(viewer);
    console.log('viewer crated...')
    const colors = {
      GRAY: [0.721, 0.721, 0.721],
      BLUE: [0.137255, 0.403922, 0.870588],
      ORANGE: [0.976, 0.588, 0.203],
    }


    // viewer.camera.eye = [-3.933, 2.855, 27.018];
    // viewer.camera.look = [4.400, 3.724, 8.899];
    // viewer.camera.up = [-0.018, 0.999, 0.039];

    // viewer.cameraFlight.fitFOV = 15;

    viewer.scene.xrayMaterial.fillAlpha = 0.7;
    viewer.scene.xrayMaterial.fillColor = colors.BLUE;
    viewer.scene.xrayMaterial.edgeAlpha = 0.9;
    viewer.scene.xrayMaterial.edgeColor = colors.BLUE;

    viewer.scene.highlightMaterial.fillAlpha = 0.3;
    viewer.scene.highlightMaterial.edgeColor = colors.BLUE;



    //------------------------------------------------------------------------------------------------------------------
    // Load model and metadata using a XKTLoaderPlugin
    //
    // Use our own map of initial default states for each Entity in the model
    //------------------------------------------------------------------------------------------------------------------

    const myObjectDefaults = {
      IfcRoof: {
        colorize: colors.GRAY,
        priority: 0
      },
      IfcSlab: {
        colorize: colors.GRAY,
        priority: 0
      },
      IfcWall: {
        colorize: colors.GRAY,
        priority: 0
      },
      IfcWallStandardCase: {
        colorize: colors.GRAY,
        priority: 0
      },


      DEFAULT: {
        colorize: colors.GRAY,
        priority: 10
      }
    };

    const model = xktLoader.load({
      id: "myModel",
      src: filename,
      edges: true,
      objectDefaults: myObjectDefaults
    });

    console.log('loaded ...')

    model.on('loaded', () => resolve(viewer))

    //------------------------------------------------------------------------------------------------------------------
    // Click Entities to colorize them
    //------------------------------------------------------------------------------------------------------------------



  })



}