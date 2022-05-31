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
import * as i0 from "@angular/core";
import * as i1 from "../GisBase.service";
export class GisMapComponentComponent {
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
                const [MapView, WebMap, LayerList, FeatureLayer, Search, Measurement, Legend] = yield loadModules([
                    "esri/views/MapView", "esri/WebMap",
                    "esri/widgets/LayerList", "esri/layers/FeatureLayer",
                    "esri/widgets/Search", "esri/widgets/Measurement", "esri/widgets/Legend"
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
                    this.legend = new Legend({ view: view, style: { type: "classic", layout: 'stack' }, layerInfos: [{ layer: this.queryFeatureLayer, title: "שכבת חלקות" }] });
                    view.ui.add(this.legend, "bottom-right");
                    this.measurement = new Measurement({ view: view });
                    view.ui.add(this.measurement, "bottom-right");
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
    //switchView(Map: MapConstructor, layerView: any, measurement: any) {
    //  // Clone the viewpoint for the MapView or SceneView
    //  const viewpoint = layerView.viewpoint.clone();
    //  // Get the view type, either 2d or 3d
    //  const type = layerView.type;
    //  // Clear any measurements that had been drawn
    //  this.clearMeasurements(measurement);
    //  // Reset the measurement tools in the div
    //  layerView.container = null;
    //  layerView = null;
    //  // Set the view based on whether it switched to 2D MapView or 3D SceneView
    //  layerView = Map;
    //  layerView.set({
    //    container: "viewDiv",
    //    viewpoint: viewpoint
    //  });
    //}
    //clearMeasurements(measurement: any) {
    //  const distanceButton = document.getElementById('distance');
    //  const areaButton = document.getElementById('area');
    //  this.buttonDistance.classList.remove("active");
    //  this.buttonArea.classList.remove("active");
    //  measurement.clear();
    //}
    distanceMeasurement() {
        this.measurement.activeTool = "distance";
        this.buttonDistance.classList.add("active");
        this.buttonArea.classList.remove("active");
    }
    areaMeasurement() {
        this.measurement.activeTool = "area";
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
        <button  #buttonDistance (click)="distanceMeasurement()" class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  #buttonArea (click)="areaMeasurement()"  class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
        <button  style="display:none" #buttonClear class="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">     </button>
      </div>
  </div>
</div>
  `, isInline: true, styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'GisBase-GisMapComponent',
                    template: `
 
<div class='az' style="width:100%;height: 100% ">
    <div #mapViewNode style="width:100%;height: 100%  ">
   
      <div id="toolbarDiv222" style="position: absolute;margin-left: -50px;" class="e____sri-component esri-widget">
        <button  #buttonLegend (click)="buttonLegendClick()" class="esri-widget--button esri-interactive esri-icon-legend" title="legend Panel">    </button>
        <button  #buttonDistance (click)="distanceMeasurement()" class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  #buttonArea (click)="areaMeasurement()"  class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLHVCQUF1QjtBQUV2QiwyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCxPQUFPLElBQUksTUFBTSwyQkFBMkIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSw4QkFBOEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBZ0NyRCxNQUFNLE9BQU8sd0JBQXdCO0lBNkNuQyxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUEzQ2xELGFBQVEsR0FBRyxlQUFlLENBQUMsdURBQXVELENBQUMsQ0FBQztJQTJDOUIsQ0FBQztJQXhDdkQsSUFBZ0QsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUzSCxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0tBQUUsQ0FBRSxDQUFDO0lBRWpJLElBQXNELFFBQVEsQ0FBQyxPQUFtQixJQUFLLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUUsQ0FBQztJQUc1SSxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJ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QUN2QixPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsICBPdXRwdXQsICBFdmVudEVtaXR0ZXIsICBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbiBcclxuaW1wb3J0IHsgbG9hZE1vZHVsZXMgfSBmcm9tIFwiZXNyaS1sb2FkZXJcIjtcclxuLy9pbXBvcnQgZXNyaSA9IF9fZXNyaTtcclxuXHJcbi8vaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xyXG4vL2ltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG4vL2ltcG9ydCBMYXllckxpc3QgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xheWVyTGlzdFwiO1xyXG5pbXBvcnQgWm9vbSBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvWm9vbVwiO1xyXG5pbXBvcnQgQ29tcGFzcyBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvQ29tcGFzc1wiO1xyXG5pbXBvcnQgU2NhbGVCYXIgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1NjYWxlQmFyXCI7XHJcbmltcG9ydCBCYXNlbWFwR2FsbGVyeSBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvQmFzZW1hcEdhbGxlcnlcIjtcclxuaW1wb3J0IExlZ2VuZCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvTGVnZW5kXCI7XHJcbmltcG9ydCBNZWFzdXJlbWVudCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvTWVhc3VyZW1lbnRcIjtcclxuLy9pbXBvcnQgU2VhcmNoIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9TZWFyY2hcIjtcclxuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcclxuaW1wb3J0IExheWVyVmlldyBmcm9tIFwiQGFyY2dpcy9jb3JlL3ZpZXdzL2xheWVycy9MYXllclZpZXdcIjtcclxuaW1wb3J0IHsgR2lzQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9HaXNCYXNlLnNlcnZpY2UnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnR2lzQmFzZS1HaXNNYXBDb21wb25lbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiBcclxuPGRpdiBjbGFzcz0nYXonIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCUgXCI+XHJcbiAgICA8ZGl2ICNtYXBWaWV3Tm9kZSBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlICBcIj5cclxuICAgXHJcbiAgICAgIDxkaXYgaWQ9XCJ0b29sYmFyRGl2MjIyXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bWFyZ2luLWxlZnQ6IC01MHB4O1wiIGNsYXNzPVwiZV9fX19zcmktY29tcG9uZW50IGVzcmktd2lkZ2V0XCI+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkxlZ2VuZCAoY2xpY2spPVwiYnV0dG9uTGVnZW5kQ2xpY2soKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1sZWdlbmRcIiB0aXRsZT1cImxlZ2VuZCBQYW5lbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uRGlzdGFuY2UgKGNsaWNrKT1cImRpc3RhbmNlTWVhc3VyZW1lbnQoKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWxpbmVcIiB0aXRsZT1cIkRpc3RhbmNlIE1lYXN1cmVtZW50IFRvb2xcIj4gICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkFyZWEgKGNsaWNrKT1cImFyZWFNZWFzdXJlbWVudCgpXCIgIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWFyZWFcIiB0aXRsZT1cIkFyZWEgTWVhc3VyZW1lbnQgVG9vbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICNidXR0b25DbGVhciBjbGFzcz1cImVzcmktd2lkZ2V0LS1idXR0b24gZXNyaS1pbnRlcmFjdGl2ZSBlc3JpLWljb24tdHJhc2hcIiB0aXRsZT1cIkNsZWFyIE1lYXN1cmVtZW50c1wiPiAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWydnaXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ11cclxuLy8gICA8IGRpdiAjbGF5ZXJMaXN0RGl2ID4gPC9kaXY+XHJcblxyXG4vLzwgZGl2ICNiYXNlbWFwR2FsbGVyeURpdiA+IDwvZGl2PlxyXG59KVxyXG4gIFxyXG5leHBvcnQgY2xhc3MgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbGlua1Byb20gPSBsb2FkQ3VzdG9tU3R5bGUoJ2h0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjIzL2VzcmkvdGhlbWVzL2xpZ2h0L21haW4uY3NzJyk7XHJcblxyXG4gIHByaXZhdGUgbWFwVmlld0VsITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtYXBWaWV3Tm9kZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5tYXBWaWV3RWwgPSBjb250ZW50OyB9IH1cclxuICBwcml2YXRlIGxheWVyTGlzdERpdiE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbGF5ZXJMaXN0RGl2JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQyKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5sYXllckxpc3REaXYgPSBjb250ZW50OyB9ICB9XHJcbiAgcHJpdmF0ZSBiYXNlbWFwR2FsbGVyeURpdiE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYmFzZW1hcEdhbGxlcnlEaXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDEoY29udGVudDogRWxlbWVudFJlZikgeyAgaWYgKGNvbnRlbnQpIHsgdGhpcy5iYXNlbWFwR2FsbGVyeURpdiA9IGNvbnRlbnQ7IH0gIH1cclxuXHJcbiAgcHJpdmF0ZSBidXR0b25MZWdlbmQhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25MZWdlbmQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDcoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkxlZ2VuZCA9IGNvbnRlbnQubmF0aXZlRWxlbWVudDsgfSB9XHJcbiAgcHJpdmF0ZSBidXR0b25EaXN0YW5jZSE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkRpc3RhbmNlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQzKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25EaXN0YW5jZSA9IGNvbnRlbnQubmF0aXZlRWxlbWVudDsgfSB9XHJcbiAgcHJpdmF0ZSBidXR0b25BcmVhITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uQXJlYScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50NChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uQXJlYSA9IGNvbnRlbnQubmF0aXZlRWxlbWVudDsgfSB9XHJcbiAgcHJpdmF0ZSBidXR0b25DbGVhciE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkNsZWFyJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ1KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25DbGVhciA9IGNvbnRlbnQubmF0aXZlRWxlbWVudDsgfSB9XHJcbiAgcHJpdmF0ZSBidXR0b25Td2l0Y2ghOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25Td2l0Y2gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDYoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvblN3aXRjaCA9IGNvbnRlbnQubmF0aXZlRWxlbWVudDsgfSB9XHJcblxyXG4gICBcclxuICBwcml2YXRlIGxheWVySGVsa290VmlldyE6IExheWVyVmlld1xyXG4gIHByaXZhdGUgTGF5ZXJMaXN0ITogc3RyaW5nW107XHJcbiAgcHJpdmF0ZSBRdWVyeUxheWVyITogc3RyaW5nO1xyXG4gIHByaXZhdGUgUXVlcnlTdHIhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsZWdlbmQhOiBMZWdlbmQ7XHJcbiAgcHJpdmF0ZSBtZWFzdXJlbWVudCE6IE1lYXN1cmVtZW50O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllckxpc3QodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLkxheWVyTGlzdCA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeUxheWVyKHZhbHVlOiBzdHJpbmcpIHsgICAgXHJcbiAgICB0aGlzLlF1ZXJ5TGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlTdHIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVN0ciA9IHZhbHVlO1xyXG4gIH1cclxuICAgXHJcbiAgcHJpdmF0ZSBxdWVyeUZlYXR1cmVMYXllciEgOiBGZWF0dXJlTGF5ZXIgIFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdpc0Jhc2VTZXJ2aWNlOiBHaXNCYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIFxyXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxpbmtQcm9tO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgW01hcFZpZXcsIFdlYk1hcCwgTGF5ZXJMaXN0LCBGZWF0dXJlTGF5ZXIsXHJcbiAgICAgICAgICAgIFNlYXJjaCwgTWVhc3VyZW1lbnQsIExlZ2VuZF0gPSBhd2FpdCBsb2FkTW9kdWxlcyhbXHJcbiAgICAgICAgXCJlc3JpL3ZpZXdzL01hcFZpZXdcIiwgXCJlc3JpL1dlYk1hcFwiLFxyXG4gICAgICAgIFwiZXNyaS93aWRnZXRzL0xheWVyTGlzdFwiLCAgXCJlc3JpL2xheWVycy9GZWF0dXJlTGF5ZXJcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9TZWFyY2hcIiwgXCJlc3JpL3dpZGdldHMvTWVhc3VyZW1lbnRcIiwgXCJlc3JpL3dpZGdldHMvTGVnZW5kXCJcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBjb25zdCB3ZWJNYXAgPSBuZXcgV2ViTWFwKHtcclxuICAgICAgICBiYXNlbWFwOiBcInRvcG9cIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCB2aWV3ID0gbmV3IE1hcFZpZXcoe1xyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudCxcclxuICAgICAgICBtYXA6IHdlYk1hcFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyAgbGV0IGZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgLy91cmw6IFwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMFwiXHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8va2tscmdtLmtrbC5vcmcuaWwva2tsYWdzL3Jlc3Qvc2VydmljZXMvYWxsTGF5ZXJzRm9yQWdvbC9GZWF0dXJlU2VydmVyLzdcIlxyXG4gICAgLy99KTtcclxuICAgIC8vbGV0IGZlYXRlckxheWVyMSA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xyXG4gICAgLy8gIHVybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlclwiICAgICAgXHJcbiAgICAvL30pO1xyXG5cclxuICAgICAgdGhpcy5MYXllckxpc3QuZm9yRWFjaCgobGF5ZXJTdHIpPT4gICB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICB1cmw6IHRoaXMuZ2lzQmFzZVNlcnZpY2UuYXBpVXJsICtcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9cIisgbGF5ZXJTdHJcclxuICAgICAgICB9KTtcclxuICAgICAgICB3ZWJNYXAuYWRkKGZlYXR1cmVMYXllcik7XHJcbiAgICAgICAgaWYgKGxheWVyU3RyLmluY2x1ZGVzKHRoaXMuUXVlcnlMYXllcikpIHsgdGhpcy5xdWVyeUZlYXR1cmVMYXllciA9IGZlYXR1cmVMYXllciB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgYXdhaXQgdmlldy53aGVuKCgpID0+IHtcclxuICAgICAgICB2YXIgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHZpZXcgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQobGF5ZXJMaXN0LCBcInRvcC1yaWdodFwiKTtcclxuICAgICAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCh7IHZpZXc6IHZpZXd9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHNlYXJjaCwgXCJ0b3AtcmlnaHRcIik7XHJcbiAgICAgICAgdmFyIHpvb20gPSBuZXcgWm9vbSh7ICB2aWV3OiB2aWV3LCAgbGF5b3V0OiBcImhvcml6b250YWxcIiAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZCh6b29tLCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBjb25zdCBjb21wYXNzV2lkZ2V0ID0gbmV3IENvbXBhc3MoeyAgdmlldzogdmlldyAgIH0pO1xyXG4gICAgICAgIHZpZXcudWkuYWRkKGNvbXBhc3NXaWRnZXQsIFwidG9wLWxlZnRcIik7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVCYXIgPSBuZXcgU2NhbGVCYXIoeyB2aWV3OiB2aWV3LCB1bml0OiBcIm1ldHJpY1wiLCBzdHlsZTogXCJydWxlclwiICAgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoc2NhbGVCYXIsIHsgcG9zaXRpb246IFwiYm90dG9tLWxlZnRcIn0pO1xyXG4gICAgICAgIC8vY29uc3QgYmFzZW1hcEdhbGxlcnkgPSBuZXcgQmFzZW1hcEdhbGxlcnkoeyAgdmlldzogdmlldywgICAgY29udGFpbmVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICAgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoYmFzZW1hcEdhbGxlcnksIHsgICBwb3NpdGlvbjogXCJ0b3AtcmlnaHRcIiAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sZWdlbmQgPSBuZXcgTGVnZW5kKHsgdmlldzogdmlldywgc3R5bGU6IHsgdHlwZTogXCJjbGFzc2ljXCIsIGxheW91dDogJ3N0YWNrJyB9LCBsYXllckluZm9zOiBbeyBsYXllcjogdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgdGl0bGU6IFwi16nXm9eR16og15fXnNen15XXqlwiIH1dIH0pO1xyXG4gICAgICAgIHZpZXcudWkuYWRkKHRoaXMubGVnZW5kLCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICB0aGlzLm1lYXN1cmVtZW50ID0gbmV3IE1lYXN1cmVtZW50KHsgdmlldzogdmlldyB9KTtcclxuICAgICAgICB2aWV3LnVpLmFkZCh0aGlzLm1lYXN1cmVtZW50LCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLy8vdGhpcy5idXR0b25Td2l0Y2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5zd2l0Y2hWaWV3KE1hcCwgdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgIG1lYXN1cmVtZW50KTsgfSk7XHJcbiAgICAgICAgLy90aGlzLmJ1dHRvbkRpc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuZGlzdGFuY2VNZWFzdXJlbWVudCggbWVhc3VyZW1lbnQpOyB9KTtcclxuICAgICAgICAvL3RoaXMuYnV0dG9uQXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmFyZWFNZWFzdXJlbWVudChtZWFzdXJlbWVudCk7IH0pO1xyXG4gICAgICAgIC8vdGhpcy5idXR0b25DbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsZWFyTWVhc3VyZW1lbnRzKG1lYXN1cmVtZW50KTsgfSk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19zb3VyY2VzIGVzcmktaW50ZXJhY3RpdmVcIik7XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19wb3dlcmVkLWJ5XCIpOyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50czFbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBheiA9IEVzcmlQd29lckJ5ZWxlbWVudHMxW2ldLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICBpZiAoYXohPW51bGwpIGF6LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIkdVU0hfTlVNPVwiICsgdGhpcy5fZ3VzaCArIFwiIGFuZCBQQVJDRUw9XCIgKyB0aGlzLl9QQVJDRUw7XHJcbiAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LndoZW4oXHJcbiAgICAgICAgLy8gICgpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICAgICAgLy9xdWVyeS53aGVyZSA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAgICAgLy9xdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvL3ZhciBheiA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICAgICAgLy9hei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIC8vICB2aWV3LmhpZ2hsaWdodChyZXN1bHRzKTtcclxuICAgICAgICAgICAgLy99KTsgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgICAgIC8vICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgLy8gICAgICB2aWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgLyogfSk7Ki9cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2aWV3LndoZW5MYXllclZpZXcodGhpcy5xdWVyeUZlYXR1cmVMYXllcikudGhlbigobGF5ZXJWaWV3OiBhbnkgICkgPT4ge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLmNyZWF0ZVF1ZXJ5KCk7XHJcbiAgICAgICAgcXVlcnkud2hlcmUgPSAgdGhpcy5RdWVyeVN0cjtcclxuICAgICAgICBxdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgIHZhciBheiA9IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICBhei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICBsYXllclZpZXcuaGlnaGxpZ2h0KHJlc3VsdHMuZmVhdHVyZXNbMF0pO1xyXG4gICAgICAgICAgdmlldy5nb1RvKHsgZ2VvbWV0cnk6IHJlc3VsdHMuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuZXh0ZW50LmV4cGFuZCgzKSB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3RoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgLy8gIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAvLyAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAvLyAgICAgIHZpZXcuZ29Ubyh7ICBnZW9tZXRyeTogcmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVzcmlMb2FkZXI6IFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfSAgIFxyXG5cclxuICBuZ09uSW5pdCgpICB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYXAoKS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJWaWV3IHJlYWR5XCIpO1xyXG4gICAgfSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgYnV0dG9uTGVnZW5kQ2xpY2soKSB7XHJcbiAgICB0aGlzLmxlZ2VuZC52aXNpYmxlID0gIXRoaXMubGVnZW5kLnZpc2libGU7XHJcbiAgfVxyXG4gIC8vc3dpdGNoVmlldyhNYXA6IE1hcENvbnN0cnVjdG9yLCBsYXllclZpZXc6IGFueSwgbWVhc3VyZW1lbnQ6IGFueSkge1xyXG5cclxuICAvLyAgLy8gQ2xvbmUgdGhlIHZpZXdwb2ludCBmb3IgdGhlIE1hcFZpZXcgb3IgU2NlbmVWaWV3XHJcbiAgLy8gIGNvbnN0IHZpZXdwb2ludCA9IGxheWVyVmlldy52aWV3cG9pbnQuY2xvbmUoKTtcclxuICAvLyAgLy8gR2V0IHRoZSB2aWV3IHR5cGUsIGVpdGhlciAyZCBvciAzZFxyXG4gIC8vICBjb25zdCB0eXBlID0gbGF5ZXJWaWV3LnR5cGU7XHJcblxyXG4gIC8vICAvLyBDbGVhciBhbnkgbWVhc3VyZW1lbnRzIHRoYXQgaGFkIGJlZW4gZHJhd25cclxuICAvLyAgdGhpcy5jbGVhck1lYXN1cmVtZW50cyhtZWFzdXJlbWVudCk7XHJcblxyXG4gIC8vICAvLyBSZXNldCB0aGUgbWVhc3VyZW1lbnQgdG9vbHMgaW4gdGhlIGRpdlxyXG4gIC8vICBsYXllclZpZXcuY29udGFpbmVyID0gbnVsbDtcclxuICAvLyAgbGF5ZXJWaWV3ID0gbnVsbDtcclxuICAvLyAgLy8gU2V0IHRoZSB2aWV3IGJhc2VkIG9uIHdoZXRoZXIgaXQgc3dpdGNoZWQgdG8gMkQgTWFwVmlldyBvciAzRCBTY2VuZVZpZXdcclxuICAvLyAgbGF5ZXJWaWV3ID0gTWFwO1xyXG4gIC8vICBsYXllclZpZXcuc2V0KHtcclxuICAvLyAgICBjb250YWluZXI6IFwidmlld0RpdlwiLFxyXG4gIC8vICAgIHZpZXdwb2ludDogdmlld3BvaW50XHJcbiAgLy8gIH0pO1xyXG4gIC8vfVxyXG4gIC8vY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQ6IGFueSkge1xyXG4gIC8vICBjb25zdCBkaXN0YW5jZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXN0YW5jZScpO1xyXG4gIC8vICBjb25zdCBhcmVhQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEnKTtcclxuICAvLyAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIC8vICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAvLyAgbWVhc3VyZW1lbnQuY2xlYXIoKTtcclxuICAvL31cclxuICBkaXN0YW5jZU1lYXN1cmVtZW50KCAgKSB7XHJcbiAgICB0aGlzLm1lYXN1cmVtZW50LmFjdGl2ZVRvb2wgID0gXCJkaXN0YW5jZVwiOyAgICBcclxuICAgIHRoaXMuYnV0dG9uRGlzdGFuY2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYnV0dG9uQXJlYS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBhcmVhTWVhc3VyZW1lbnQoICkge1xyXG4gICAgdGhpcy5tZWFzdXJlbWVudC5hY3RpdmVUb29sID0gXCJhcmVhXCI7XHJcbiAgICB0aGlzLmJ1dHRvbkRpc3RhbmNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEN1c3RvbVN0eWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+IHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gIGxpbmsuaHJlZiA9IHVybDtcclxuICBjb25zdCBpc1JlYWR5OiBQcm9taXNlPEhUTUxMaW5rRWxlbWVudD4gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4gcmVzb2x2ZShsaW5rKVxyXG4gIH0pXHJcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICByZXR1cm4gaXNSZWFkeVxyXG59XHJcbiJdfQ==