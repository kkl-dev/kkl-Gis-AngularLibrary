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
    set content8(content) { if (content) {
        this.divMassage = content;
    } }
    set contentDivMassageText(content) { if (content) {
        this.divMassageText = content;
    } }
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
    set queryResultEmpty(value) {
        this.QueryResultEmpty = value;
    }
    initializeMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.linkProm;
                const divMassage = this.divMassage;
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
                        if (results.features.length > 0) {
                            divMassage.nativeElement.style.display = 'none';
                            layerView.highlight(results.features[0]);
                            view.goTo({ geometry: results.features[0].geometry.extent.expand(3) });
                        }
                        else {
                            divMassage.nativeElement.style.display = '';
                        }
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
            this.divMassageText.nativeElement.innerText = this.QueryResultEmpty;
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
GisMapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GisMapComponentComponent, selector: "GisBase-GisMapComponent", inputs: { layerList: "layerList", queryLayer: "queryLayer", queryStr: "queryStr", queryResultEmpty: "queryResultEmpty" }, viewQueries: [{ propertyName: "content8", first: true, predicate: ["divMassage"], descendants: true, static: true }, { propertyName: "contentDivMassageText", first: true, predicate: ["divMassageText"], descendants: true, static: true }, { propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }, { propertyName: "content2", first: true, predicate: ["layerListDiv"], descendants: true, static: true }, { propertyName: "content1", first: true, predicate: ["basemapGalleryDiv"], descendants: true, static: true }, { propertyName: "content7", first: true, predicate: ["buttonLegend"], descendants: true, static: true }, { propertyName: "content3", first: true, predicate: ["buttonDistance"], descendants: true, static: true }, { propertyName: "content4", first: true, predicate: ["buttonArea"], descendants: true, static: true }, { propertyName: "content5", first: true, predicate: ["buttonClear"], descendants: true, static: true }, { propertyName: "content6", first: true, predicate: ["buttonSwitch"], descendants: true, static: true }], ngImport: i0, template: `
 
<div class='az' style="width:100%;height: 100%;position: relative ">
    <div #mapViewNode style="width:100%;height: 100%;  ">
   
      <div id="toolbarDiv222" style="position: absolute;margin-left: -50px;" class="e____sri-component esri-widget">
        <button  #buttonLegend (click)="buttonLegendClick()" class="esri-widget--button esri-interactive esri-icon-legend" title="legend Panel">    </button>
        <button  #buttonDistance (click)="distanceMeasurement()" class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  #buttonArea (click)="areaMeasurement()"  class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
        <button  style="display:none" #buttonClear class="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">     </button>
      </div>
  </div>
  <div #divMassage style="display:none;position: absolute;top: 25%;left: 0px;width:100%">
    <div #divMassageText style="margin: auto;width: fit-content;background-color:powderblue;padding: 10px" >לא נימצאו פוליגונים מתאימים לחיפוש</div>
  </div>
</div>
  `, isInline: true, styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'GisBase-GisMapComponent',
                    template: `
 
<div class='az' style="width:100%;height: 100%;position: relative ">
    <div #mapViewNode style="width:100%;height: 100%;  ">
   
      <div id="toolbarDiv222" style="position: absolute;margin-left: -50px;" class="e____sri-component esri-widget">
        <button  #buttonLegend (click)="buttonLegendClick()" class="esri-widget--button esri-interactive esri-icon-legend" title="legend Panel">    </button>
        <button  #buttonDistance (click)="distanceMeasurement()" class="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">    </button>
        <button  #buttonArea (click)="areaMeasurement()"  class="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">    </button>
        <button  style="display:none" #buttonClear class="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">     </button>
      </div>
  </div>
  <div #divMassage style="display:none;position: absolute;top: 25%;left: 0px;width:100%">
    <div #divMassageText style="margin: auto;width: fit-content;background-color:powderblue;padding: 10px" >לא נימצאו פוליגונים מתאימים לחיפוש</div>
  </div>
</div>
  `,
                    styleUrls: ['gis-map-component.component.css']
                    //   < div #layerListDiv > </div>
                    //< div #basemapGalleryDiv > </div>
                }]
        }], ctorParameters: function () { return [{ type: i1.GisBaseService }]; }, propDecorators: { content8: [{
                type: ViewChild,
                args: ['divMassage', { static: true }]
            }], contentDivMassageText: [{
                type: ViewChild,
                args: ['divMassageText', { static: true }]
            }], content: [{
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
            }], queryResultEmpty: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLHVCQUF1QjtBQUV2QiwyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCxPQUFPLElBQUksTUFBTSwyQkFBMkIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSw4QkFBOEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBbUNyRCxNQUFNLE9BQU8sd0JBQXdCO0lBd0RuQyxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF0RGxELGFBQVEsR0FBRyxlQUFlLENBQUMsdURBQXVELENBQUMsQ0FBQztJQXNEOUIsQ0FBQztJQW5EdkQsSUFBK0MsUUFBUSxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUU1SCxJQUFtRCxxQkFBcUIsQ0FBQyxPQUFtQixJQUFJLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FBRSxDQUFDLENBQUM7SUFJakosSUFBZ0QsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUzSCxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJ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QkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRUUsUUFBUTtzQkFBdEQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUVPLFFBQVE7c0JBQXZELFNBQVM7dUJBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFTyxRQUFRO3NCQUF4RCxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBWXZDLFNBQVM7c0JBRFosS0FBSztnQkFLRixVQUFVO3NCQURiLEtBQUs7Z0JBS0YsUUFBUTtzQkFEWCxLQUFLO2dCQUtGLGdCQUFnQjtzQkFEbkIsS0FBSzs7QUE0TFIsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFXO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLE1BQU0sT0FBTyxHQUE2QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCAgT3V0cHV0LCAgRXZlbnRFbWl0dGVyLCAgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4gXHJcbmltcG9ydCB7IGxvYWRNb2R1bGVzIH0gZnJvbSBcImVzcmktbG9hZGVyXCI7XHJcbi8vaW1wb3J0IGVzcmkgPSBfX2Vzcmk7XHJcblxyXG4vL2ltcG9ydCBXZWJNYXAgZnJvbSBcIkBhcmNnaXMvY29yZS9XZWJNYXBcIjtcclxuLy9pbXBvcnQgTWFwVmlldyBmcm9tIFwiQGFyY2dpcy9jb3JlL3ZpZXdzL01hcFZpZXdcIjtcclxuLy9pbXBvcnQgTGF5ZXJMaXN0IGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9MYXllckxpc3RcIjtcclxuaW1wb3J0IFpvb20gZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1pvb21cIjtcclxuaW1wb3J0IENvbXBhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0NvbXBhc3NcIjtcclxuaW1wb3J0IFNjYWxlQmFyIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9TY2FsZUJhclwiO1xyXG5pbXBvcnQgQmFzZW1hcEdhbGxlcnkgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0Jhc2VtYXBHYWxsZXJ5XCI7XHJcbmltcG9ydCBMZWdlbmQgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xlZ2VuZFwiO1xyXG5pbXBvcnQgTWVhc3VyZW1lbnQgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL01lYXN1cmVtZW50XCI7XHJcbi8vaW1wb3J0IFNlYXJjaCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvU2VhcmNoXCI7XHJcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvRmVhdHVyZUxheWVyXCI7XHJcbmltcG9ydCBMYXllclZpZXcgZnJvbSBcIkBhcmNnaXMvY29yZS92aWV3cy9sYXllcnMvTGF5ZXJWaWV3XCI7XHJcbmltcG9ydCB7IEdpc0Jhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vR2lzQmFzZS5zZXJ2aWNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ0dpc0Jhc2UtR2lzTWFwQ29tcG9uZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gXHJcbjxkaXYgY2xhc3M9J2F6JyBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO3Bvc2l0aW9uOiByZWxhdGl2ZSBcIj5cclxuICAgIDxkaXYgI21hcFZpZXdOb2RlIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7ICBcIj5cclxuICAgXHJcbiAgICAgIDxkaXYgaWQ9XCJ0b29sYmFyRGl2MjIyXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bWFyZ2luLWxlZnQ6IC01MHB4O1wiIGNsYXNzPVwiZV9fX19zcmktY29tcG9uZW50IGVzcmktd2lkZ2V0XCI+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkxlZ2VuZCAoY2xpY2spPVwiYnV0dG9uTGVnZW5kQ2xpY2soKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1sZWdlbmRcIiB0aXRsZT1cImxlZ2VuZCBQYW5lbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uRGlzdGFuY2UgKGNsaWNrKT1cImRpc3RhbmNlTWVhc3VyZW1lbnQoKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWxpbmVcIiB0aXRsZT1cIkRpc3RhbmNlIE1lYXN1cmVtZW50IFRvb2xcIj4gICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkFyZWEgKGNsaWNrKT1cImFyZWFNZWFzdXJlbWVudCgpXCIgIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWFyZWFcIiB0aXRsZT1cIkFyZWEgTWVhc3VyZW1lbnQgVG9vbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICNidXR0b25DbGVhciBjbGFzcz1cImVzcmktd2lkZ2V0LS1idXR0b24gZXNyaS1pbnRlcmFjdGl2ZSBlc3JpLWljb24tdHJhc2hcIiB0aXRsZT1cIkNsZWFyIE1lYXN1cmVtZW50c1wiPiAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgI2Rpdk1hc3NhZ2Ugc3R5bGU9XCJkaXNwbGF5Om5vbmU7cG9zaXRpb246IGFic29sdXRlO3RvcDogMjUlO2xlZnQ6IDBweDt3aWR0aDoxMDAlXCI+XHJcbiAgICA8ZGl2ICNkaXZNYXNzYWdlVGV4dCBzdHlsZT1cIm1hcmdpbjogYXV0bzt3aWR0aDogZml0LWNvbnRlbnQ7YmFja2dyb3VuZC1jb2xvcjpwb3dkZXJibHVlO3BhZGRpbmc6IDEwcHhcIiA+15zXkCDXoNeZ157XpteQ15Ug16TXldec15nXkteV16DXmdedINee16rXkNeZ157XmdedINec15fXmdek15XXqTwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWydnaXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ11cclxuLy8gICA8IGRpdiAjbGF5ZXJMaXN0RGl2ID4gPC9kaXY+XHJcblxyXG4vLzwgZGl2ICNiYXNlbWFwR2FsbGVyeURpdiA+IDwvZGl2PlxyXG59KVxyXG4gIFxyXG5leHBvcnQgY2xhc3MgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbGlua1Byb20gPSBsb2FkQ3VzdG9tU3R5bGUoJ2h0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjIzL2VzcmkvdGhlbWVzL2xpZ2h0L21haW4uY3NzJyk7XHJcblxyXG4gIHByaXZhdGUgZGl2TWFzc2FnZSE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZGl2TWFzc2FnZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50OChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuZGl2TWFzc2FnZSA9IGNvbnRlbnQ7IH0gfVxyXG4gIHByaXZhdGUgZGl2TWFzc2FnZVRleHQhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2Rpdk1hc3NhZ2VUZXh0JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnREaXZNYXNzYWdlVGV4dChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuZGl2TWFzc2FnZVRleHQgPSBjb250ZW50OyB9IH1cclxuXHJcbiAgXHJcbiAgcHJpdmF0ZSBtYXBWaWV3RWwhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21hcFZpZXdOb2RlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLm1hcFZpZXdFbCA9IGNvbnRlbnQ7IH0gfVxyXG4gIHByaXZhdGUgbGF5ZXJMaXN0RGl2ITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdsYXllckxpc3REaXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDIoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmxheWVyTGlzdERpdiA9IGNvbnRlbnQ7IH0gIH1cclxuICBwcml2YXRlIGJhc2VtYXBHYWxsZXJ5RGl2ITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdiYXNlbWFwR2FsbGVyeURpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50MShjb250ZW50OiBFbGVtZW50UmVmKSB7ICBpZiAoY29udGVudCkgeyB0aGlzLmJhc2VtYXBHYWxsZXJ5RGl2ID0gY29udGVudDsgfSAgfVxyXG5cclxuICBwcml2YXRlIGJ1dHRvbkxlZ2VuZCE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkxlZ2VuZCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Nyhjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uTGVnZW5kID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkRpc3RhbmNlITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uRGlzdGFuY2UnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDMoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkRpc3RhbmNlID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkFyZWEhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25BcmVhJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ0KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25BcmVhID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkNsZWFyITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uQ2xlYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDUoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkNsZWFyID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvblN3aXRjaCE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvblN3aXRjaCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Nihjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uU3dpdGNoID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuXHJcbiAgIFxyXG4gIHByaXZhdGUgbGF5ZXJIZWxrb3RWaWV3ITogTGF5ZXJWaWV3XHJcbiAgcHJpdmF0ZSBMYXllckxpc3QhOiBzdHJpbmdbXTtcclxuICBwcml2YXRlIFF1ZXJ5TGF5ZXIhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBRdWVyeVN0ciE6IHN0cmluZztcclxuICBwcml2YXRlIFF1ZXJ5UmVzdWx0RW1wdHkhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsZWdlbmQhOiBMZWdlbmQ7XHJcbiAgcHJpdmF0ZSBtZWFzdXJlbWVudCE6IE1lYXN1cmVtZW50O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllckxpc3QodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLkxheWVyTGlzdCA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeUxheWVyKHZhbHVlOiBzdHJpbmcpIHsgICAgXHJcbiAgICB0aGlzLlF1ZXJ5TGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlTdHIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVN0ciA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeVJlc3VsdEVtcHR5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuUXVlcnlSZXN1bHRFbXB0eSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBxdWVyeUZlYXR1cmVMYXllciEgOiBGZWF0dXJlTGF5ZXIgIFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdpc0Jhc2VTZXJ2aWNlOiBHaXNCYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIFxyXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxpbmtQcm9tO1xyXG4gICAgICBjb25zdCBkaXZNYXNzYWdlID0gdGhpcy5kaXZNYXNzYWdlO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgW01hcFZpZXcsIFdlYk1hcCwgTGF5ZXJMaXN0LCBGZWF0dXJlTGF5ZXIsXHJcbiAgICAgICAgICAgIFNlYXJjaCwgTWVhc3VyZW1lbnQsIExlZ2VuZF0gPSBhd2FpdCBsb2FkTW9kdWxlcyhbXHJcbiAgICAgICAgXCJlc3JpL3ZpZXdzL01hcFZpZXdcIiwgXCJlc3JpL1dlYk1hcFwiLFxyXG4gICAgICAgIFwiZXNyaS93aWRnZXRzL0xheWVyTGlzdFwiLCAgXCJlc3JpL2xheWVycy9GZWF0dXJlTGF5ZXJcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9TZWFyY2hcIiwgXCJlc3JpL3dpZGdldHMvTWVhc3VyZW1lbnRcIiwgXCJlc3JpL3dpZGdldHMvTGVnZW5kXCJcclxuICAgICAgXSk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCB3ZWJNYXAgPSBuZXcgV2ViTWFwKHtcclxuICAgICAgICBiYXNlbWFwOiBcInRvcG9cIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCB2aWV3ID0gbmV3IE1hcFZpZXcoe1xyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudCxcclxuICAgICAgICBtYXA6IHdlYk1hcFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyAgbGV0IGZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgLy91cmw6IFwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMFwiXHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8va2tscmdtLmtrbC5vcmcuaWwva2tsYWdzL3Jlc3Qvc2VydmljZXMvYWxsTGF5ZXJzRm9yQWdvbC9GZWF0dXJlU2VydmVyLzdcIlxyXG4gICAgLy99KTtcclxuICAgIC8vbGV0IGZlYXRlckxheWVyMSA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xyXG4gICAgLy8gIHVybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlclwiICAgICAgXHJcbiAgICAvL30pO1xyXG5cclxuICAgICAgdGhpcy5MYXllckxpc3QuZm9yRWFjaCgobGF5ZXJTdHIpPT4gICB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICB1cmw6IHRoaXMuZ2lzQmFzZVNlcnZpY2UuYXBpVXJsICtcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9cIisgbGF5ZXJTdHJcclxuICAgICAgICB9KTtcclxuICAgICAgICB3ZWJNYXAuYWRkKGZlYXR1cmVMYXllcik7XHJcbiAgICAgICAgaWYgKGxheWVyU3RyLmluY2x1ZGVzKHRoaXMuUXVlcnlMYXllcikpIHsgdGhpcy5xdWVyeUZlYXR1cmVMYXllciA9IGZlYXR1cmVMYXllciB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgYXdhaXQgdmlldy53aGVuKCgpID0+IHtcclxuICAgICAgICB2YXIgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHZpZXcgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQobGF5ZXJMaXN0LCBcInRvcC1yaWdodFwiKTtcclxuICAgICAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCh7IHZpZXc6IHZpZXd9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHNlYXJjaCwgXCJ0b3AtcmlnaHRcIik7XHJcbiAgICAgICAgdmFyIHpvb20gPSBuZXcgWm9vbSh7ICB2aWV3OiB2aWV3LCAgbGF5b3V0OiBcImhvcml6b250YWxcIiAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZCh6b29tLCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBjb25zdCBjb21wYXNzV2lkZ2V0ID0gbmV3IENvbXBhc3MoeyAgdmlldzogdmlldyAgIH0pO1xyXG4gICAgICAgIHZpZXcudWkuYWRkKGNvbXBhc3NXaWRnZXQsIFwidG9wLWxlZnRcIik7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVCYXIgPSBuZXcgU2NhbGVCYXIoeyB2aWV3OiB2aWV3LCB1bml0OiBcIm1ldHJpY1wiLCBzdHlsZTogXCJydWxlclwiICAgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoc2NhbGVCYXIsIHsgcG9zaXRpb246IFwiYm90dG9tLWxlZnRcIn0pO1xyXG4gICAgICAgIC8vY29uc3QgYmFzZW1hcEdhbGxlcnkgPSBuZXcgQmFzZW1hcEdhbGxlcnkoeyAgdmlldzogdmlldywgICAgY29udGFpbmVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICAgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoYmFzZW1hcEdhbGxlcnksIHsgICBwb3NpdGlvbjogXCJ0b3AtcmlnaHRcIiAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sZWdlbmQgPSBuZXcgTGVnZW5kKHsgdmlldzogdmlldywgc3R5bGU6IHsgdHlwZTogXCJjbGFzc2ljXCIsIGxheW91dDogJ3N0YWNrJyB9LCBsYXllckluZm9zOiBbeyBsYXllcjogdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgdGl0bGU6IFwi16nXm9eR16og15fXnNen15XXqlwiIH1dIH0pO1xyXG4gICAgICAgIHZpZXcudWkuYWRkKHRoaXMubGVnZW5kLCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICB0aGlzLm1lYXN1cmVtZW50ID0gbmV3IE1lYXN1cmVtZW50KHsgdmlldzogdmlldyB9KTtcclxuICAgICAgICB2aWV3LnVpLmFkZCh0aGlzLm1lYXN1cmVtZW50LCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLy8vdGhpcy5idXR0b25Td2l0Y2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5zd2l0Y2hWaWV3KE1hcCwgdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgIG1lYXN1cmVtZW50KTsgfSk7XHJcbiAgICAgICAgLy90aGlzLmJ1dHRvbkRpc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuZGlzdGFuY2VNZWFzdXJlbWVudCggbWVhc3VyZW1lbnQpOyB9KTtcclxuICAgICAgICAvL3RoaXMuYnV0dG9uQXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmFyZWFNZWFzdXJlbWVudChtZWFzdXJlbWVudCk7IH0pO1xyXG4gICAgICAgIC8vdGhpcy5idXR0b25DbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsZWFyTWVhc3VyZW1lbnRzKG1lYXN1cmVtZW50KTsgfSk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19zb3VyY2VzIGVzcmktaW50ZXJhY3RpdmVcIik7XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19wb3dlcmVkLWJ5XCIpOyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50czFbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBheiA9IEVzcmlQd29lckJ5ZWxlbWVudHMxW2ldLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICBpZiAoYXohPW51bGwpIGF6LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIkdVU0hfTlVNPVwiICsgdGhpcy5fZ3VzaCArIFwiIGFuZCBQQVJDRUw9XCIgKyB0aGlzLl9QQVJDRUw7XHJcbiAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LndoZW4oXHJcbiAgICAgICAgLy8gICgpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICAgICAgLy9xdWVyeS53aGVyZSA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAgICAgLy9xdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvL3ZhciBheiA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICAgICAgLy9hei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIC8vICB2aWV3LmhpZ2hsaWdodChyZXN1bHRzKTtcclxuICAgICAgICAgICAgLy99KTsgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgICAgIC8vICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgLy8gICAgICB2aWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgLyogfSk7Ki9cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2aWV3LndoZW5MYXllclZpZXcodGhpcy5xdWVyeUZlYXR1cmVMYXllcikudGhlbigobGF5ZXJWaWV3OiBhbnkgICkgPT4ge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLmNyZWF0ZVF1ZXJ5KCk7XHJcbiAgICAgICAgcXVlcnkud2hlcmUgPSAgdGhpcy5RdWVyeVN0cjtcclxuICAgICAgICBxdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgIHZhciBheiA9IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICBhei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmIChyZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZGl2TWFzc2FnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGxheWVyVmlldy5oaWdobGlnaHQocmVzdWx0cy5mZWF0dXJlc1swXSk7XHJcbiAgICAgICAgICAgIHZpZXcuZ29Ubyh7IGdlb21ldHJ5OiByZXN1bHRzLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmV4dGVudC5leHBhbmQoMykgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGl2TWFzc2FnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3RoaXMucXVlcnlGZWF0dXJlTGF5ZXIucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgLy8gIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAvLyAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAvLyAgICAgIHZpZXcuZ29Ubyh7ICBnZW9tZXRyeTogcmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjYXRjaChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVzcmlMb2FkZXI6IFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfSAgIFxyXG5cclxuICBuZ09uSW5pdCgpICB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYXAoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5kaXZNYXNzYWdlVGV4dC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuUXVlcnlSZXN1bHRFbXB0eTtcclxuICAgICAgY29uc29sZS5sb2coXCJWaWV3IHJlYWR5XCIpO1xyXG4gICAgfSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgYnV0dG9uTGVnZW5kQ2xpY2soKSB7XHJcbiAgICB0aGlzLmxlZ2VuZC52aXNpYmxlID0gIXRoaXMubGVnZW5kLnZpc2libGU7XHJcbiAgfVxyXG4gIC8vc3dpdGNoVmlldyhNYXA6IE1hcENvbnN0cnVjdG9yLCBsYXllclZpZXc6IGFueSwgbWVhc3VyZW1lbnQ6IGFueSkge1xyXG5cclxuICAvLyAgLy8gQ2xvbmUgdGhlIHZpZXdwb2ludCBmb3IgdGhlIE1hcFZpZXcgb3IgU2NlbmVWaWV3XHJcbiAgLy8gIGNvbnN0IHZpZXdwb2ludCA9IGxheWVyVmlldy52aWV3cG9pbnQuY2xvbmUoKTtcclxuICAvLyAgLy8gR2V0IHRoZSB2aWV3IHR5cGUsIGVpdGhlciAyZCBvciAzZFxyXG4gIC8vICBjb25zdCB0eXBlID0gbGF5ZXJWaWV3LnR5cGU7XHJcblxyXG4gIC8vICAvLyBDbGVhciBhbnkgbWVhc3VyZW1lbnRzIHRoYXQgaGFkIGJlZW4gZHJhd25cclxuICAvLyAgdGhpcy5jbGVhck1lYXN1cmVtZW50cyhtZWFzdXJlbWVudCk7XHJcblxyXG4gIC8vICAvLyBSZXNldCB0aGUgbWVhc3VyZW1lbnQgdG9vbHMgaW4gdGhlIGRpdlxyXG4gIC8vICBsYXllclZpZXcuY29udGFpbmVyID0gbnVsbDtcclxuICAvLyAgbGF5ZXJWaWV3ID0gbnVsbDtcclxuICAvLyAgLy8gU2V0IHRoZSB2aWV3IGJhc2VkIG9uIHdoZXRoZXIgaXQgc3dpdGNoZWQgdG8gMkQgTWFwVmlldyBvciAzRCBTY2VuZVZpZXdcclxuICAvLyAgbGF5ZXJWaWV3ID0gTWFwO1xyXG4gIC8vICBsYXllclZpZXcuc2V0KHtcclxuICAvLyAgICBjb250YWluZXI6IFwidmlld0RpdlwiLFxyXG4gIC8vICAgIHZpZXdwb2ludDogdmlld3BvaW50XHJcbiAgLy8gIH0pO1xyXG4gIC8vfVxyXG4gIC8vY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQ6IGFueSkge1xyXG4gIC8vICBjb25zdCBkaXN0YW5jZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXN0YW5jZScpO1xyXG4gIC8vICBjb25zdCBhcmVhQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEnKTtcclxuICAvLyAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIC8vICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAvLyAgbWVhc3VyZW1lbnQuY2xlYXIoKTtcclxuICAvL31cclxuICBkaXN0YW5jZU1lYXN1cmVtZW50KCAgKSB7XHJcbiAgICB0aGlzLm1lYXN1cmVtZW50LmFjdGl2ZVRvb2wgID0gXCJkaXN0YW5jZVwiOyAgICBcclxuICAgIHRoaXMuYnV0dG9uRGlzdGFuY2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYnV0dG9uQXJlYS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBhcmVhTWVhc3VyZW1lbnQoICkge1xyXG4gICAgdGhpcy5tZWFzdXJlbWVudC5hY3RpdmVUb29sID0gXCJhcmVhXCI7XHJcbiAgICB0aGlzLmJ1dHRvbkRpc3RhbmNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEN1c3RvbVN0eWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+IHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gIGxpbmsuaHJlZiA9IHVybDtcclxuICBjb25zdCBpc1JlYWR5OiBQcm9taXNlPEhUTUxMaW5rRWxlbWVudD4gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4gcmVzb2x2ZShsaW5rKVxyXG4gIH0pXHJcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICByZXR1cm4gaXNSZWFkeVxyXG59XHJcbiJdfQ==