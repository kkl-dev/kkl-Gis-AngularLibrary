import { __awaiter } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { loadModules } from "esri-loader";
//import esri = __esri;
//import WebMap from "@arcgis/core/WebMap";
//import MapView from "@arcgis/core/views/MapView";
//import LayerList from "@arcgis/core/widgets/LayerList";
import Zoom from "@arcgis/core/widgets/Zoom";
import Compass from "@arcgis/core/widgets/Compass";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Legend from "@arcgis/core/widgets/Legend";
import * as i0 from "@angular/core";
import * as i1 from "../GisBase.service";
export class GisMapComponentComponent {
    //public mapView: MapView = new MapView();
    //public featerLayer: FeatureLayer = new FeatureLayer();
    //public featerLayer1: FeatureLayer = new FeatureLayer();
    constructor(gisBaseService) {
        this.gisBaseService = gisBaseService;
        this.linkProm = loadCustomStyle('https://js.arcgis.com/4.23/esri/themes/light/main.css');
    }
    set content(content) { if (content) {
        this.mapViewEl = content;
    } }
    set content2(content) { if (content) {
        this.layerListDiv = content;
    } }
    set content1(content) { if (content) {
        this.basemapGalleryDiv = content;
    } }
    set content7(content) { if (content) {
        this.buttonLegend = content.nativeElement;
    } }
    set content3(content) { if (content) {
        this.buttonDistance = content.nativeElement;
    } }
    set content4(content) { if (content) {
        this.buttonArea = content.nativeElement;
    } }
    set content5(content) { if (content) {
        this.buttonClear = content.nativeElement;
    } }
    set content6(content) { if (content) {
        this.buttonSwitch = content.nativeElement;
    } }
    set layerList(value) {
        this.LayerList = value;
    }
    set queryLayer(value) {
        this.QueryLayer = value;
    }
    set queryStr(value) {
        this.QueryStr = value;
    }
    initializeMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.linkProm;
                const [MapView, WebMap, LayerList, Search, FeatureLayer] = yield loadModules([
                    "esri/views/MapView", "esri/WebMap",
                    "esri/widgets/LayerList", "esri/widgets/Search",
                    "esri/layers/FeatureLayer"
                ]);
                const webMap = new WebMap({
                    basemap: "topo"
                });
                let view = new MapView({
                    container: this.mapViewEl.nativeElement,
                    map: webMap
                });
                //  let featerLayer = new FeatureLayer({
                //  //url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0"
                //  url: "https://kklrgm.kkl.org.il/kklags/rest/services/allLayersForAgol/FeatureServer/7"
                //});
                //let featerLayer1 = new FeatureLayer({
                //  url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer"      
                //});
                this.LayerList.forEach((layerStr) => {
                    const featureLayer = new FeatureLayer({
                        url: this.gisBaseService.apiUrl + "/ArcGIS/rest/services/" + layerStr
                    });
                    webMap.add(featureLayer);
                    if (layerStr.includes(this.QueryLayer)) {
                        this.queryFeatureLayer = featureLayer;
                    }
                });
                yield view.when(() => {
                    var layerList = new LayerList({ view: view });
                    //view.ui.add(layerList, "top-right");
                    var search = new Search({ view: view });
                    //view.ui.add(search, "top-right");
                    var zoom = new Zoom({ view: view, layout: "horizontal" });
                    //view.ui.add(zoom, "bottom-right");
                    const compassWidget = new Compass({ view: view });
                    view.ui.add(compassWidget, "top-left");
                    const scaleBar = new ScaleBar({ view: view, unit: "metric", style: "ruler" });
                    //view.ui.add(scaleBar, { position: "bottom-left"});
                    //const basemapGallery = new BasemapGallery({  view: view,    container: document.createElement("div")    });
                    //view.ui.add(basemapGallery, {   position: "top-right"    });
                    //let legend = new Legend({  view: view   });
                    //view.ui.add(legend, "bottom-right");
                    //var measurement = new Measurement({ view: view });
                    //// Create new instance of the Legend widget
                    this.legend = new Legend({ view: view, style: { type: "classic", layout: 'stack' }, layerInfos: [{ layer: this.queryFeatureLayer, title: "שכבת חלקות" }] });
                    view.ui.add(this.legend, "bottom-right");
                    //view.ui.add(measurement, "bottom-right");
                    ////this.buttonSwitch.addEventListener("click", () => { this.switchView(Map, this.queryFeatureLayer,  measurement); });
                    //this.buttonDistance.addEventListener("click", () => { this.distanceMeasurement( measurement); });
                    //this.buttonArea.addEventListener("click", () => { this.areaMeasurement(measurement); });
                    //this.buttonClear.addEventListener("click", () => { this.clearMeasurements(measurement); });
                    //const EsriPwoerByelements = document.getElementsByClassName("esri-attribution__sources esri-interactive");
                    //for (let i = 0; i < EsriPwoerByelements.length; i++) {
                    //  EsriPwoerByelements[i].setAttribute("style", "display:none");
                    //}
                    const EsriPwoerByelements1 = document.getElementsByClassName("esri-attribution__powered-by");
                    for (let i = 0; i < EsriPwoerByelements1.length; i++) {
                        EsriPwoerByelements1[i].setAttribute("style", "display:none");
                        const az = EsriPwoerByelements1[i].previousElementSibling;
                        if (az != null)
                            az.setAttribute("style", "display:none");
                    }
                    //this.featerLayerHelkot.definitionExpression = "GUSH_NUM=" + this._gush + " and PARCEL=" + this._PARCEL;
                    //this.featerLayerHelkot.when(
                    //  () => {
                    //const query = this.featerLayerHelkot.createQuery();
                    //query.where = "GUSH_NUM=" + this._gush + " and PARCEL=" + this._PARCEL;
                    //query.outSpatialReference = view.spatialReference;
                    //var az = this.featerLayerHelkot.queryFeatures(query)
                    //az.then(function (results) {
                    //  view.highlight(results);
                    //});  
                    //this.featerLayerHelkot.queryExtent(query)
                    //  .then(response => {
                    //    if (response.extent !== null) {
                    //      response.extent.spatialReference = view.spatialReference;
                    //      view.goTo(response.extent.expand(3));
                    //    }
                    //  });
                    /* });*/
                });
                view.whenLayerView(this.queryFeatureLayer).then((layerView) => {
                    const query = this.queryFeatureLayer.createQuery();
                    query.where = this.QueryStr;
                    query.outSpatialReference = view.spatialReference;
                    var az = this.queryFeatureLayer.queryFeatures(query);
                    az.then(function (results) {
                        layerView.highlight(results.features[0]);
                        view.goTo({ geometry: results.features[0].geometry.extent.expand(3) });
                    });
                    //this.queryFeatureLayer.queryExtent(query)
                    //  .then(response => {
                    //    if (response.extent !== null) {
                    //      response.extent.spatialReference = view.spatialReference;
                    //      view.goTo({  geometry: response.extent.expand(3) });
                    //    }
                    //  });
                });
                return view;
            }
            catch (error) {
                console.log("EsriLoader: ", error);
            }
        });
    }
    ngOnInit() {
        this.initializeMap().then(() => {
            console.log("View ready");
        });
    }
    buttonLegendClick() {
        this.legend.visible = !this.legend.visible;
    }
    switchView(Map, layerView, measurement) {
        // Clone the viewpoint for the MapView or SceneView
        const viewpoint = layerView.viewpoint.clone();
        // Get the view type, either 2d or 3d
        const type = layerView.type;
        // Clear any measurements that had been drawn
        this.clearMeasurements(measurement);
        // Reset the measurement tools in the div
        layerView.container = null;
        layerView = null;
        // Set the view based on whether it switched to 2D MapView or 3D SceneView
        layerView = Map;
        layerView.set({
            container: "viewDiv",
            viewpoint: viewpoint
        });
    }
    clearMeasurements(measurement) {
        const distanceButton = document.getElementById('distance');
        const areaButton = document.getElementById('area');
        this.buttonDistance.classList.remove("active");
        this.buttonArea.classList.remove("active");
        measurement.clear();
    }
    distanceMeasurement(measurement) {
        measurement.activeTool = "distance";
        alert(measurement.activeWidget);
        this.buttonDistance.classList.add("active");
        this.buttonArea.classList.remove("active");
    }
    areaMeasurement(measurement) {
        measurement.activeTool = "area";
        this.buttonDistance.classList.remove("active");
        this.buttonArea.classList.add("active");
    }
}
GisMapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, deps: [{ token: i1.GisBaseService }], target: i0.ɵɵFactoryTarget.Component });
GisMapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GisMapComponentComponent, selector: "GisBase-GisMapComponent", inputs: { layerList: "layerList", queryLayer: "queryLayer", queryStr: "queryStr" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }, { propertyName: "content2", first: true, predicate: ["layerListDiv"], descendants: true, static: true }, { propertyName: "content1", first: true, predicate: ["basemapGalleryDiv"], descendants: true, static: true }, { propertyName: "content7", first: true, predicate: ["buttonLegend"], descendants: true, static: true }, { propertyName: "content3", first: true, predicate: ["buttonDistance"], descendants: true, static: true }, { propertyName: "content4", first: true, predicate: ["buttonArea"], descendants: true, static: true }, { propertyName: "content5", first: true, predicate: ["buttonClear"], descendants: true, static: true }, { propertyName: "content6", first: true, predicate: ["buttonSwitch"], descendants: true, static: true }], ngImport: i0, template: `
 
<div class='az' style="width:100%;height: 100% ">
    <div #mapViewNode style="width:100%;height: 100%  ">
   
      <div id="toolbarDiv222" style="position: absolute;margin-left: -50px;" class="e____sri-component esri-widget">
        <button  #buttonLegend (click)="buttonLegendClick()" class="esri-widget--button esri-interactive esri-icon-legend" title="legend Panel">    </button>
        <button  style="display:none" #buttonDistance class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  style="display:none" #buttonArea class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
        <button  style="display:none" #buttonClear class="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">     </button>
      </div>
  </div>
</div>
  `, isInline: true, styles: ["#viewDiv{height:100%;width:100%;margin:0;padding:0}#toolbarDiv{position:relative;top:15px;right:35px;cursor:default;display:flex;flex-direction:row;flex-wrap:nowrap}#infoDiv{position:absolute;top:15px;left:60px}#infoDiv input{border:none;box-shadow:#0000004d 0 1px 2px}.esri-widget--button.active,.esri-widget--button.active:hover,.esri-widget--button.active:focus{cursor:default;background-color:#999696}.esri-widget--button.active path,.esri-widget--button.active:hover path,.esri-widget--button.active:focus path{fill:#e4e4e4}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'GisBase-GisMapComponent',
                    template: `
 
<div class='az' style="width:100%;height: 100% ">
    <div #mapViewNode style="width:100%;height: 100%  ">
   
      <div id="toolbarDiv222" style="position: absolute;margin-left: -50px;" class="e____sri-component esri-widget">
        <button  #buttonLegend (click)="buttonLegendClick()" class="esri-widget--button esri-interactive esri-icon-legend" title="legend Panel">    </button>
        <button  style="display:none" #buttonDistance class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  style="display:none" #buttonArea class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
        <button  style="display:none" #buttonClear class="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">     </button>
      </div>
  </div>
</div>
  `,
                    styleUrls: ['gis-map-component.component.css']
                    //   < div #layerListDiv > </div>
                    //< div #basemapGalleryDiv > </div>
                }]
        }], ctorParameters: function () { return [{ type: i1.GisBaseService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewNode', { static: true }]
            }], content2: [{
                type: ViewChild,
                args: ['layerListDiv', { static: true }]
            }], content1: [{
                type: ViewChild,
                args: ['basemapGalleryDiv', { static: true }]
            }], content7: [{
                type: ViewChild,
                args: ['buttonLegend', { static: true }]
            }], content3: [{
                type: ViewChild,
                args: ['buttonDistance', { static: true }]
            }], content4: [{
                type: ViewChild,
                args: ['buttonArea', { static: true }]
            }], content5: [{
                type: ViewChild,
                args: ['buttonClear', { static: true }]
            }], content6: [{
                type: ViewChild,
                args: ['buttonSwitch', { static: true }]
            }], layerList: [{
                type: Input
            }], queryLayer: [{
                type: Input
            }], queryStr: [{
                type: Input
            }] } });
export function loadCustomStyle(url) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    const isReady = new Promise(resolve => {
        link.onload = () => resolve(link);
    });
    head.appendChild(link);
    return isReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLHVCQUF1QjtBQUV2QiwyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCxPQUFPLElBQUksTUFBTSwyQkFBMkIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSw4QkFBOEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUVyRCxPQUFPLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQzs7O0FBOEJqRCxNQUFNLE9BQU8sd0JBQXdCO0lBMkNuQywwQ0FBMEM7SUFDMUMsd0RBQXdEO0lBQ3hELHlEQUF5RDtJQUV6RCxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUE3Q2xELGFBQVEsR0FBRyxlQUFlLENBQUMsdURBQXVELENBQUMsQ0FBQztJQTZDOUIsQ0FBQztJQTFDdkQsSUFBZ0QsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUzSCxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0tBQUUsQ0FBRSxDQUFDO0lBRWpJLElBQXNELFFBQVEsQ0FBQyxPQUFtQixJQUFLLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFD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QUs7O0FBMkxSLE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBVztJQUN6QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztJQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNoQixNQUFNLE9BQU8sR0FBNkIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgIE91dHB1dCwgIEV2ZW50RW1pdHRlciwgIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuIFxyXG5pbXBvcnQgeyBsb2FkTW9kdWxlcyB9IGZyb20gXCJlc3JpLWxvYWRlclwiO1xyXG4vL2ltcG9ydCBlc3JpID0gX19lc3JpO1xyXG5cclxuLy9pbXBvcnQgV2ViTWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvV2ViTWFwXCI7XHJcbi8vaW1wb3J0IE1hcFZpZXcgZnJvbSBcIkBhcmNnaXMvY29yZS92aWV3cy9NYXBWaWV3XCI7XHJcbi8vaW1wb3J0IExheWVyTGlzdCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvTGF5ZXJMaXN0XCI7XHJcbmltcG9ydCBab29tIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9ab29tXCI7XHJcbmltcG9ydCBDb21wYXNzIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9Db21wYXNzXCI7XHJcbmltcG9ydCBTY2FsZUJhciBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvU2NhbGVCYXJcIjtcclxuaW1wb3J0IEJhc2VtYXBHYWxsZXJ5IGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9CYXNlbWFwR2FsbGVyeVwiO1xyXG5pbXBvcnQgTGVnZW5kIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9MZWdlbmRcIjtcclxuaW1wb3J0IE1lYXN1cmVtZW50IGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9NZWFzdXJlbWVudFwiO1xyXG4vL2ltcG9ydCBTZWFyY2ggZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1NlYXJjaFwiO1xyXG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllclwiO1xyXG5pbXBvcnQgTGF5ZXJWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvbGF5ZXJzL0xheWVyVmlld1wiO1xyXG5pbXBvcnQgeyBHaXNCYXNlU2VydmljZSB9IGZyb20gJy4uL0dpc0Jhc2Uuc2VydmljZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdHaXNCYXNlLUdpc01hcENvbXBvbmVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuIFxyXG48ZGl2IGNsYXNzPSdheicgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDogMTAwJSBcIj5cclxuICAgIDxkaXYgI21hcFZpZXdOb2RlIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCUgIFwiPlxyXG4gICBcclxuICAgICAgPGRpdiBpZD1cInRvb2xiYXJEaXYyMjJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTttYXJnaW4tbGVmdDogLTUwcHg7XCIgY2xhc3M9XCJlX19fX3NyaS1jb21wb25lbnQgZXNyaS13aWRnZXRcIj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uTGVnZW5kIChjbGljayk9XCJidXR0b25MZWdlbmRDbGljaygpXCIgY2xhc3M9XCJlc3JpLXdpZGdldC0tYnV0dG9uIGVzcmktaW50ZXJhY3RpdmUgZXNyaS1pY29uLWxlZ2VuZFwiIHRpdGxlPVwibGVnZW5kIFBhbmVsXCI+ICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gIHN0eWxlPVwiZGlzcGxheTpub25lXCIgI2J1dHRvbkRpc3RhbmNlIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWxpbmVcIiB0aXRsZT1cIkRpc3RhbmNlIE1lYXN1cmVtZW50IFRvb2xcIj4gICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiAjYnV0dG9uQXJlYSBjbGFzcz1cImVzcmktd2lkZ2V0LS1idXR0b24gZXNyaS1pbnRlcmFjdGl2ZSBlc3JpLWljb24tbWVhc3VyZS1hcmVhXCIgdGl0bGU9XCJBcmVhIE1lYXN1cmVtZW50IFRvb2xcIj4gICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiAjYnV0dG9uQ2xlYXIgY2xhc3M9XCJlc3JpLXdpZGdldC0tYnV0dG9uIGVzcmktaW50ZXJhY3RpdmUgZXNyaS1pY29uLXRyYXNoXCIgdGl0bGU9XCJDbGVhciBNZWFzdXJlbWVudHNcIj4gICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmNzcyddXHJcbi8vICAgPCBkaXYgI2xheWVyTGlzdERpdiA+IDwvZGl2PlxyXG5cclxuLy88IGRpdiAjYmFzZW1hcEdhbGxlcnlEaXYgPiA8L2Rpdj5cclxufSlcclxuICBcclxuZXhwb3J0IGNsYXNzIEdpc01hcENvbXBvbmVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGxpbmtQcm9tID0gbG9hZEN1c3RvbVN0eWxlKCdodHRwczovL2pzLmFyY2dpcy5jb20vNC4yMy9lc3JpL3RoZW1lcy9saWdodC9tYWluLmNzcycpO1xyXG5cclxuICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFwVmlld05vZGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfSB9XHJcbiAgcHJpdmF0ZSBsYXllckxpc3REaXYhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2xheWVyTGlzdERpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Mihjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMubGF5ZXJMaXN0RGl2ID0gY29udGVudDsgfSAgfVxyXG4gIHByaXZhdGUgYmFzZW1hcEdhbGxlcnlEaXYhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2Jhc2VtYXBHYWxsZXJ5RGl2JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQxKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgIGlmIChjb250ZW50KSB7IHRoaXMuYmFzZW1hcEdhbGxlcnlEaXYgPSBjb250ZW50OyB9ICB9XHJcblxyXG4gIHByaXZhdGUgYnV0dG9uTGVnZW5kITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uTGVnZW5kJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ3KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25MZWdlbmQgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uRGlzdGFuY2UhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25EaXN0YW5jZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Myhjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uRGlzdGFuY2UgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uQXJlYSE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkFyZWEnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDQoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkFyZWEgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uQ2xlYXIhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25DbGVhcicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50NShjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uQ2xlYXIgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uU3dpdGNoITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uU3dpdGNoJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ2KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25Td2l0Y2ggPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG5cclxuICAgXHJcbiAgcHJpdmF0ZSBsYXllckhlbGtvdFZpZXchOiBMYXllclZpZXdcclxuICBwcml2YXRlIExheWVyTGlzdCE6IHN0cmluZ1tdO1xyXG4gIHByaXZhdGUgUXVlcnlMYXllciE6IHN0cmluZztcclxuICBwcml2YXRlIFF1ZXJ5U3RyITogc3RyaW5nO1xyXG4gIHByaXZhdGUgbGVnZW5kITogTGVnZW5kO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllckxpc3QodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLkxheWVyTGlzdCA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeUxheWVyKHZhbHVlOiBzdHJpbmcpIHsgICAgXHJcbiAgICB0aGlzLlF1ZXJ5TGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlTdHIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVN0ciA9IHZhbHVlO1xyXG4gIH1cclxuICAgXHJcbiAgcHJpdmF0ZSBxdWVyeUZlYXR1cmVMYXllciEgOiBGZWF0dXJlTGF5ZXJcclxuICAvL3B1YmxpYyBtYXBWaWV3OiBNYXBWaWV3ID0gbmV3IE1hcFZpZXcoKTtcclxuICAvL3B1YmxpYyBmZWF0ZXJMYXllcjogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xyXG4gIC8vcHVibGljIGZlYXRlckxheWVyMTogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdpc0Jhc2VTZXJ2aWNlOiBHaXNCYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIFxyXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxpbmtQcm9tO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgW01hcFZpZXcsIFdlYk1hcCwgTGF5ZXJMaXN0LCBTZWFyY2ggICwgRmVhdHVyZUxheWVyXSA9IGF3YWl0IGxvYWRNb2R1bGVzKFsgICAgICAgIFxyXG4gICAgICAgIFwiZXNyaS92aWV3cy9NYXBWaWV3XCIsIFwiZXNyaS9XZWJNYXBcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9MYXllckxpc3RcIiwgXCJlc3JpL3dpZGdldHMvU2VhcmNoXCIsXHJcbiAgICAgICAgXCJlc3JpL2xheWVycy9GZWF0dXJlTGF5ZXJcIlxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgICAgIGJhc2VtYXA6IFwidG9wb1wiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IHZpZXcgPSBuZXcgTWFwVmlldyh7XHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcFZpZXdFbC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIG1hcDogd2ViTWFwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vICBsZXQgZmVhdGVyTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgIC8vICAvL3VybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlci8wXCJcclxuICAgIC8vICB1cmw6IFwiaHR0cHM6Ly9ra2xyZ20ua2tsLm9yZy5pbC9ra2xhZ3MvcmVzdC9zZXJ2aWNlcy9hbGxMYXllcnNGb3JBZ29sL0ZlYXR1cmVTZXJ2ZXIvN1wiXHJcbiAgICAvL30pO1xyXG4gICAgLy9sZXQgZmVhdGVyTGF5ZXIxID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8vc2VydmljZXMyLmFyY2dpcy5jb20vdXROTnJtWGI0SVpPTFhYcy9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9KTkZJTEZvcmVzdC9GZWF0dXJlU2VydmVyXCIgICAgICBcclxuICAgIC8vfSk7XHJcblxyXG4gICAgICB0aGlzLkxheWVyTGlzdC5mb3JFYWNoKChsYXllclN0cik9PiAgIHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgICAgICAgIHVybDogdGhpcy5naXNCYXNlU2VydmljZS5hcGlVcmwgK1wiL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1wiKyBsYXllclN0clxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYk1hcC5hZGQoZmVhdHVyZUxheWVyKTtcclxuICAgICAgICBpZiAobGF5ZXJTdHIuaW5jbHVkZXModGhpcy5RdWVyeUxheWVyKSkgeyB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyID0gZmVhdHVyZUxheWVyIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBhd2FpdCB2aWV3LndoZW4oKCkgPT4ge1xyXG4gICAgICAgIHZhciBsYXllckxpc3QgPSBuZXcgTGF5ZXJMaXN0KHsgdmlldzogdmlldyAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChsYXllckxpc3QsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKHsgdmlldzogdmlld30pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoc2VhcmNoLCBcInRvcC1yaWdodFwiKTtcclxuICAgICAgICB2YXIgem9vbSA9IG5ldyBab29tKHsgIHZpZXc6IHZpZXcsICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiICB9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHpvb20sIFwiYm90dG9tLXJpZ2h0XCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBhc3NXaWRnZXQgPSBuZXcgQ29tcGFzcyh7ICB2aWV3OiB2aWV3ICAgfSk7XHJcbiAgICAgICAgdmlldy51aS5hZGQoY29tcGFzc1dpZGdldCwgXCJ0b3AtbGVmdFwiKTtcclxuICAgICAgICBjb25zdCBzY2FsZUJhciA9IG5ldyBTY2FsZUJhcih7IHZpZXc6IHZpZXcsIHVuaXQ6IFwibWV0cmljXCIsIHN0eWxlOiBcInJ1bGVyXCIgICAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChzY2FsZUJhciwgeyBwb3NpdGlvbjogXCJib3R0b20tbGVmdFwifSk7XHJcbiAgICAgICAgLy9jb25zdCBiYXNlbWFwR2FsbGVyeSA9IG5ldyBCYXNlbWFwR2FsbGVyeSh7ICB2aWV3OiB2aWV3LCAgICBjb250YWluZXI6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgICAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChiYXNlbWFwR2FsbGVyeSwgeyAgIHBvc2l0aW9uOiBcInRvcC1yaWdodFwiICAgIH0pO1xyXG4gICAgICAgIC8vbGV0IGxlZ2VuZCA9IG5ldyBMZWdlbmQoeyAgdmlldzogdmlldyAgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQobGVnZW5kLCBcImJvdHRvbS1yaWdodFwiKTtcclxuXHJcbiAgICAgICAgLy92YXIgbWVhc3VyZW1lbnQgPSBuZXcgTWVhc3VyZW1lbnQoeyB2aWV3OiB2aWV3IH0pO1xyXG5cclxuICAgICAgICAvLy8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgdGhlIExlZ2VuZCB3aWRnZXRcclxuICAgICAgICB0aGlzLmxlZ2VuZCA9IG5ldyBMZWdlbmQoeyB2aWV3OiB2aWV3LCBzdHlsZTogeyB0eXBlOiBcImNsYXNzaWNcIiwgbGF5b3V0OiAnc3RhY2snIH0sIGxheWVySW5mb3M6IFt7IGxheWVyOiB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLCB0aXRsZTogXCLXqdeb15HXqiDXl9ec16fXldeqXCIgfV0gfSk7XHJcbiAgICAgICAgdmlldy51aS5hZGQodGhpcy5sZWdlbmQsIFwiYm90dG9tLXJpZ2h0XCIpO1xyXG5cclxuICAgICAgICAvL3ZpZXcudWkuYWRkKG1lYXN1cmVtZW50LCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLy8vdGhpcy5idXR0b25Td2l0Y2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5zd2l0Y2hWaWV3KE1hcCwgdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgIG1lYXN1cmVtZW50KTsgfSk7XHJcbiAgICAgICAgLy90aGlzLmJ1dHRvbkRpc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuZGlzdGFuY2VNZWFzdXJlbWVudCggbWVhc3VyZW1lbnQpOyB9KTtcclxuICAgICAgICAvL3RoaXMuYnV0dG9uQXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmFyZWFNZWFzdXJlbWVudChtZWFzdXJlbWVudCk7IH0pO1xyXG4gICAgICAgIC8vdGhpcy5idXR0b25DbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsZWFyTWVhc3VyZW1lbnRzKG1lYXN1cmVtZW50KTsgfSk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19zb3VyY2VzIGVzcmktaW50ZXJhY3RpdmVcIik7XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19wb3dlcmVkLWJ5XCIpOyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50czFbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBheiA9IEVzcmlQd29lckJ5ZWxlbWVudHMxW2ldLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICBpZiAoYXohPW51bGwpIGF6LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIkdVU0hfTlVNPVwiICsgdGhpcy5fZ3VzaCArIFwiIGFuZCBQQVJDRUw9XCIgKyB0aGlzLl9QQVJDRUw7XHJcbiAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LndoZW4oXHJcbiAgICAgICAgLy8gICgpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICAgICAgLy9xdWVyeS53aGVyZSA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAgICAgLy9xdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvL3ZhciBheiA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICAgICAgLy9hei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIC8vICB2aWV3LmhpZ2hsaWdodChyZXN1bHRzKTtcclxuICAgICAgICAgICAgLy99KTsgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgICAgIC8vICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgLy8gICAgICB2aWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgLyogfSk7Ki9cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2aWV3LndoZW5MYXllclZpZXcodGhpcy5xdWVyeUZlYXR1cmVMYXllcikudGhlbigobGF5ZXJWaWV3OiBhbnkgICkgPT4ge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLmNyZWF0ZVF1ZXJ5KCk7XHJcbiAgICAgICAgcXVlcnkud2hlcmUgPSAgdGhpcy5RdWVyeVN0cjtcclxuICAgICAgICBxdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgIHZhciBheiA9IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICBhei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICBsYXllclZpZXcuaGlnaGxpZ2h0KHJlc3VsdHMuZmVhdHVyZXNbMF0pO1xyXG4gICAgICAgICAgdmlldy5nb1RvKHsgZ2VvbWV0cnk6IHJlc3VsdHMuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuZXh0ZW50LmV4cGFuZCgzKSB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3RoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgLy8gIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAvLyAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAvLyAgICAgIHZpZXcuZ29Ubyh7ICBnZW9tZXRyeTogcmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVzcmlMb2FkZXI6IFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfSAgIFxyXG5cclxuICBuZ09uSW5pdCgpICB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYXAoKS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJWaWV3IHJlYWR5XCIpO1xyXG4gICAgfSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgYnV0dG9uTGVnZW5kQ2xpY2soKSB7XHJcbiAgICB0aGlzLmxlZ2VuZC52aXNpYmxlID0gIXRoaXMubGVnZW5kLnZpc2libGU7XHJcbiAgfVxyXG4gIHN3aXRjaFZpZXcoTWFwOiBNYXBDb25zdHJ1Y3RvciwgbGF5ZXJWaWV3OiBhbnksIG1lYXN1cmVtZW50OiBhbnkpIHtcclxuXHJcbiAgICAvLyBDbG9uZSB0aGUgdmlld3BvaW50IGZvciB0aGUgTWFwVmlldyBvciBTY2VuZVZpZXdcclxuICAgIGNvbnN0IHZpZXdwb2ludCA9IGxheWVyVmlldy52aWV3cG9pbnQuY2xvbmUoKTtcclxuICAgIC8vIEdldCB0aGUgdmlldyB0eXBlLCBlaXRoZXIgMmQgb3IgM2RcclxuICAgIGNvbnN0IHR5cGUgPSBsYXllclZpZXcudHlwZTtcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgbWVhc3VyZW1lbnRzIHRoYXQgaGFkIGJlZW4gZHJhd25cclxuICAgIHRoaXMuY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQpO1xyXG5cclxuICAgIC8vIFJlc2V0IHRoZSBtZWFzdXJlbWVudCB0b29scyBpbiB0aGUgZGl2XHJcbiAgICBsYXllclZpZXcuY29udGFpbmVyID0gbnVsbDtcclxuICAgIGxheWVyVmlldyA9IG51bGw7XHJcbiAgICAvLyBTZXQgdGhlIHZpZXcgYmFzZWQgb24gd2hldGhlciBpdCBzd2l0Y2hlZCB0byAyRCBNYXBWaWV3IG9yIDNEIFNjZW5lVmlld1xyXG4gICAgbGF5ZXJWaWV3ID0gTWFwO1xyXG4gICAgbGF5ZXJWaWV3LnNldCh7XHJcbiAgICAgIGNvbnRhaW5lcjogXCJ2aWV3RGl2XCIsXHJcbiAgICAgIHZpZXdwb2ludDogdmlld3BvaW50XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQ6IGFueSkge1xyXG4gICAgY29uc3QgZGlzdGFuY2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzdGFuY2UnKTtcclxuICAgIGNvbnN0IGFyZWFCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJlYScpO1xyXG4gICAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5idXR0b25BcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICBtZWFzdXJlbWVudC5jbGVhcigpO1xyXG4gIH1cclxuICBkaXN0YW5jZU1lYXN1cmVtZW50KCAgbWVhc3VyZW1lbnQ6IGFueSkge1xyXG4gICAgbWVhc3VyZW1lbnQuYWN0aXZlVG9vbCAgPSBcImRpc3RhbmNlXCI7XHJcbiAgICBhbGVydChtZWFzdXJlbWVudC5hY3RpdmVXaWRnZXQpO1xyXG4gICAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5idXR0b25BcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG4gIGFyZWFNZWFzdXJlbWVudChtZWFzdXJlbWVudDogYW55KSB7XHJcbiAgICBtZWFzdXJlbWVudC5hY3RpdmVUb29sID0gXCJhcmVhXCI7XHJcbiAgICB0aGlzLmJ1dHRvbkRpc3RhbmNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEN1c3RvbVN0eWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+IHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gIGxpbmsuaHJlZiA9IHVybDtcclxuICBjb25zdCBpc1JlYWR5OiBQcm9taXNlPEhUTUxMaW5rRWxlbWVudD4gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4gcmVzb2x2ZShsaW5rKVxyXG4gIH0pXHJcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICByZXR1cm4gaXNSZWFkeVxyXG59XHJcbiJdfQ==