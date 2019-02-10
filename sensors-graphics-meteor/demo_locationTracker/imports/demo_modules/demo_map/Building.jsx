export default class Building {
    constructor(name, coords) {
        this.name = name;
        this.coords = coords;
        this.PlotBuildingCoords();
    }
    PlotBuildingCoords() {
        console.log("I'm useful");
        var coords_GBlock = this.coords;
        var poly_GBlock = new google.maps.Polygon({
            paths: coords_GBlock,
            strokeColor: "#00FF00",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "#00FF00",
            fillOpacity: 0.35
        });
        poly_GBlock.setMap(GoogleMaps.maps.map.instance);
        var info_GBlock = new google.maps.InfoWindow({
            content: this.name,
            position: new google.maps.LatLng(-37.788921, 175.317578)
        });
        info_GBlock.open(GoogleMaps.maps.map.instance, null);
        info_GBlock.addListener("closeclick", () => {
            info_GBlock.open(GoogleMaps.maps.map.instance, null);
        });
        var mapLabel = new MapLabel({
            position: new google.maps.LatLng(-37.788921, 175.317578),
            text: "test",
            zIndex: 101
        });
        $(mapLabel.getPanes().mapPane).css("z-index", mapLabel.zIndex);
    }
}