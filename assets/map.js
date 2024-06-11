// imports don't work in quarto??
// import * as Cesium from "https://cesium.com/downloads/cesiumjs/releases/1.87.1/Build/Cesium/Cesium.js";

async function makeWidget(elementId) {
    // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjQ5YjhjOS01Y2UyLTRhYWEtOGEzZC1hZDZmZWI0NGQ3MTQiLCJpZCI6MjIxMjE4LCJpYXQiOjE3MTgwMDk5MDB9._pdWlrUxdAtIiuq3PXK8HrRNxcoJa6bOjwWE8cQ3J3Y';
    const viewer = new Cesium.Viewer(elementId, {
        timeline: false,
        animation: false,
        baseLayerPicker: false,
    });
    const scene = viewer.scene;
    scene.globe.depthTestAgainstTerrain = true;

    let worldTerrain;
    try {
        worldTerrain = await Cesium.createWorldTerrainAsync();
        viewer.scene.terrainProvider = worldTerrain;
    } catch (error) {
        window.alert(`There was an error creating world terrain. ${error}`);
    }

    let worldTileset;
    try {
        worldTileset = await Cesium.createGooglePhotorealistic3DTileset();
        viewer.scene.primitives.add(worldTileset);
        scene.globe.show = false;
        worldTileset.show = true;
    } catch (error) {
        console.log(`Error loading Photorealistic 3D Tiles tileset.
      ${error}`);
    }
    // TODO: use open-source tile providers to get rid of warnings.
    // https://gist.github.com/banesullivan/e3cc15a3e2e865d5ab8bae6719733752#file-cesium-viewer-no-token-html

    viewer.dataSources.add(
        Cesium.GeoJsonDataSource.load(
            // consider using simplestyle-spec to style the geojson
            // https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
            
            // Needs to use the raw.githubusercontent.com link to avoid CORS issues per
            // https://stackoverflow.com/a/71359956/5156887
            "https://raw.githubusercontent.com/NickCrews/turnagain-pass-guidebook/main/assets/objects.geojson",
            //   "../../assets/objects.geojson",
          {
            clampToGround: true,
            credit: "",
          }
        )
      );
}