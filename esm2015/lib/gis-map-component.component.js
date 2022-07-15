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
                const [MapView, WebMap, LayerList, FeatureLayer, Search, Measurement, Legend, Point, SpatialReference] = yield loadModules([
                    "esri/views/MapView", "esri/WebMap",
                    "esri/widgets/LayerList", "esri/layers/FeatureLayer",
                    "esri/widgets/Search", "esri/widgets/Measurement", "esri/widgets/Legend",
                    "esri/geometry/Point", "esri/geometry/SpatialReference"
                ]);
                const webMap = new WebMap({
                    basemap: "topo"
                });
                let view = new MapView({
                    container: this.mapViewEl.nativeElement,
                    map: webMap
                });
                view.center = [31.744037, 35.049995];
                //  let featerLayer = new FeatureLayer({
                //  //url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0"
                //  url: "https://kklrgm.kkl.org.il/kklags/rest/services/allLayersForAgol/FeatureServer/7"
                //});
                //let featerLayer1 = new FeatureLayer({
                //  url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer"      
                //});
                this.LayerList.forEach((layerStr) => {
                    const featureLayer = new FeatureLayer({
                        url: this.gisBaseService.apiUrl + "/ArcGIS/rest/services/" + layerStr,
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
                    //view.ui.add(this.legend, "bottom-right");
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
                            /*view.goTo({ geometry: results.features[0].geometry.extent.expand(3) });*/
                            //var p: Point;
                            //p = results.features[0].geometry as Point;
                            //p.spatialReference = new SpatialReference({ wkid: 3857 });
                            //view.spatialReference = new SpatialReference({ wkid: 3857 });
                            //view.goTo({
                            //  /*target: [35.049995, 31.744037]*/
                            //  /*target: [222000, 630000]*/
                            //  /*target: p*/
                            //  target: [3926637.1977999993, 3860628.0922000031]
                            //})
                            view.when(function () {
                                view.goTo({
                                    target: results.features[0],
                                    zoom: 20
                                });
                            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLHVCQUF1QjtBQUV2QiwyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCxPQUFPLElBQUksTUFBTSwyQkFBMkIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSw4QkFBOEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBcUNyRCxNQUFNLE9BQU8sd0JBQXdCO0lBd0RuQyxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF0RGxELGFBQVEsR0FBRyxlQUFlLENBQUMsdURBQXVELENBQUMsQ0FBQztJQXNEOUIsQ0FBQztJQW5EdkQsSUFBK0MsUUFBUSxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUU1SCxJQUFtRCxxQkFBcUIsQ0FBQyxPQUFtQixJQUFJLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FBRSxDQUFDLENBQUM7SUFJakosSUFBZ0QsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUzSCxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0tBQUUsQ0FBRSxDQUFDO0lBRWpJLElBQXNELFFBQVEsQ0FBQyxPQUFtQixJQUFLLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUUsQ0FBQztJQUc1SSxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUFFLENBQUMsQ0FBQztJQUU5SSxJQUFtRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUFFLENBQUMsQ0FBQztJQUVsSixJQUErQyxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUxSSxJQUFnRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUFFLENBQUMsQ0FBQztJQUU1SSxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUFFLENBQUMsQ0FBQztJQVc5SSxJQUNJLFNBQVMsQ0FBQyxLQUFlO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUNJLFVBQVUsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUNJLGdCQUFnQixDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBT0ssYUFBYTs7WUFDakIsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBRW5DLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQzdDLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUMzQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxNQUFNLFdBQVcsQ0FBQztvQkFDN0Msb0JBQW9CLEVBQUUsYUFBYTtvQkFDbkMsd0JBQXdCLEVBQUcsMEJBQTBCO29CQUNuRCxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSxxQkFBcUI7b0JBQ3hFLHFCQUFxQixFQUFFLGdDQUFnQztpQkFDMUQsQ0FBQyxDQUFDO2dCQUVILE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO29CQUN4QixPQUFPLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFDO2dCQUVILElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDO29CQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhO29CQUN2QyxHQUFHLEVBQUUsTUFBTTtpQkFDWixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdkMsd0NBQXdDO2dCQUN4QywyR0FBMkc7Z0JBQzNHLDBGQUEwRjtnQkFDMUYsS0FBSztnQkFDTCx1Q0FBdUM7Z0JBQ3ZDLDZHQUE2RztnQkFDN0csS0FBSztnQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBQyxFQUFFO29CQUNqQyxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQzt3QkFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLHdCQUF3QixHQUFHLFFBQVE7cUJBRXRFLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUE7cUJBQUU7Z0JBQ25GLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ25CLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRyxDQUFDLENBQUM7b0JBQy9DLHNDQUFzQztvQkFDdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDdkMsbUNBQW1DO29CQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFHLElBQUksRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFLFlBQVksRUFBRyxDQUFDLENBQUM7b0JBQzdELG9DQUFvQztvQkFDcEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRyxJQUFJLEVBQUUsSUFBSSxFQUFJLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFLLENBQUMsQ0FBQztvQkFDakYsb0RBQW9EO29CQUNwRCw2R0FBNkc7b0JBQzdHLDhEQUE4RDtvQkFFOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUosMkNBQTJDO29CQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ25ELElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBRTlDLHVIQUF1SDtvQkFDdkgsbUdBQW1HO29CQUNuRywwRkFBMEY7b0JBQzFGLDZGQUE2RjtvQkFFN0YsNEdBQTRHO29CQUM1Ryx3REFBd0Q7b0JBQ3hELGlFQUFpRTtvQkFDakUsR0FBRztvQkFDSCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO29CQUM3RixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwRCxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUM5RCxNQUFNLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDMUQsSUFBSSxFQUFFLElBQUUsSUFBSTs0QkFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztxQkFDeEQ7b0JBRUQseUdBQXlHO29CQUN6Ryw4QkFBOEI7b0JBQzlCLFdBQVc7b0JBQ1AscURBQXFEO29CQUNyRCx5RUFBeUU7b0JBQ3pFLG9EQUFvRDtvQkFDcEQsc0RBQXNEO29CQUN0RCw4QkFBOEI7b0JBQzlCLDRCQUE0QjtvQkFDNUIsT0FBTztvQkFDUCwyQ0FBMkM7b0JBQzNDLHVCQUF1QjtvQkFDdkIscUNBQXFDO29CQUNyQyxpRUFBaUU7b0JBQ2pFLDZDQUE2QztvQkFFN0MsT0FBTztvQkFDUCxPQUFPO29CQUNWLFFBQVE7Z0JBQ1gsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFjLEVBQUksRUFBRTtvQkFLbkUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuRCxLQUFLLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxtQkFBbUIsR0FBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7b0JBQ25ELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ3BELEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPO3dCQUV2QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDL0IsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs0QkFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLDJFQUEyRTs0QkFDM0UsZUFBZTs0QkFDZiw0Q0FBNEM7NEJBQzVDLDREQUE0RDs0QkFDNUQsK0RBQStEOzRCQUMvRCxhQUFhOzRCQUNiLHNDQUFzQzs0QkFDdEMsZ0NBQWdDOzRCQUNoQyxpQkFBaUI7NEJBQ2pCLG9EQUFvRDs0QkFDcEQsSUFBSTs0QkFDSixJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7b0NBQ1IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUMzQixJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7NkJBQ0k7NEJBQ0gsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt5QkFDN0M7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsMkNBQTJDO29CQUMzQyx1QkFBdUI7b0JBQ3ZCLHFDQUFxQztvQkFDckMsaUVBQWlFO29CQUNqRSw0REFBNEQ7b0JBQzVELE9BQU87b0JBQ1AsT0FBTztnQkFDVCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTSxLQUFLLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDO0tBQUE7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0MsQ0FBQztJQUNELHFFQUFxRTtJQUVyRSx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELHlDQUF5QztJQUN6QyxnQ0FBZ0M7SUFFaEMsaURBQWlEO0lBQ2pELHdDQUF3QztJQUV4Qyw2Q0FBNkM7SUFDN0MsK0JBQStCO0lBQy9CLHFCQUFxQjtJQUNyQiw4RUFBOEU7SUFDOUUsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxHQUFHO0lBQ0gsdUNBQXVDO0lBQ3ZDLCtEQUErRDtJQUMvRCx1REFBdUQ7SUFDdkQsbURBQW1EO0lBQ25ELCtDQUErQztJQUMvQyx3QkFBd0I7SUFDeEIsR0FBRztJQUNILG1CQUFtQjtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBSSxVQUFVLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O3NIQTVQVSx3QkFBd0I7MEdBQXhCLHdCQUF3QixpdkNBdkJ6Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDs0RkFPVSx3QkFBd0I7a0JBekJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztvQkFDaEQsaUNBQWlDO29CQUVqQyxtQ0FBbUM7aUJBQ2xDO3FHQU9nRCxRQUFRO3NCQUF0RCxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRVUscUJBQXFCO3NCQUF2RSxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFJRyxPQUFPO3NCQUF0RCxTQUFTO3VCQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRU8sUUFBUTtzQkFBeEQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUVXLFFBQVE7c0JBQTdELFNBQVM7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUdDLFFBQVE7c0JBQXhELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFUSxRQUFRO3NCQUExRCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFRSxRQUFRO3NCQUF0RCxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRU8sUUFBUTtzQkFBdkQsU0FBUzt1QkFBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUVPLFFBQVE7c0JBQXhELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFZdkMsU0FBUztzQkFEWixLQUFLO2dCQUtGLFVBQVU7c0JBRGIsS0FBSztnQkFLRixRQUFRO3NCQURYLEtBQUs7Z0JBS0YsZ0JBQWdCO3NCQURuQixLQUFLOztBQStNUixNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQVc7SUFDekMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDaEIsTUFBTSxPQUFPLEdBQTZCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsICBPdXRwdXQsICBFdmVudEVtaXR0ZXIsICBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbiBcclxuaW1wb3J0IHsgbG9hZE1vZHVsZXMgfSBmcm9tIFwiZXNyaS1sb2FkZXJcIjtcclxuLy9pbXBvcnQgZXNyaSA9IF9fZXNyaTtcclxuXHJcbi8vaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xyXG4vL2ltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG4vL2ltcG9ydCBMYXllckxpc3QgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xheWVyTGlzdFwiO1xyXG5pbXBvcnQgWm9vbSBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvWm9vbVwiO1xyXG5pbXBvcnQgQ29tcGFzcyBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvQ29tcGFzc1wiO1xyXG5pbXBvcnQgU2NhbGVCYXIgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1NjYWxlQmFyXCI7XHJcbmltcG9ydCBCYXNlbWFwR2FsbGVyeSBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvQmFzZW1hcEdhbGxlcnlcIjtcclxuaW1wb3J0IExlZ2VuZCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvTGVnZW5kXCI7XHJcbmltcG9ydCBNZWFzdXJlbWVudCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvTWVhc3VyZW1lbnRcIjtcclxuLy9pbXBvcnQgU2VhcmNoIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9TZWFyY2hcIjtcclxuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tIFwiQGFyY2dpcy9jb3JlL2xheWVycy9GZWF0dXJlTGF5ZXJcIjtcclxuaW1wb3J0IExheWVyVmlldyBmcm9tIFwiQGFyY2dpcy9jb3JlL3ZpZXdzL2xheWVycy9MYXllclZpZXdcIjtcclxuaW1wb3J0IHsgR2lzQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9HaXNCYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgUG9pbnQgZnJvbSBcIkBhcmNnaXMvY29yZS9nZW9tZXRyeS9Qb2ludFwiO1xyXG5pbXBvcnQgR2VvbWV0cnkgZnJvbSBcIkBhcmNnaXMvY29yZS9nZW9tZXRyeS9HZW9tZXRyeVwiO1xyXG5pbXBvcnQgU3BhdGlhbFJlZmVyZW5jZSBmcm9tIFwiQGFyY2dpcy9jb3JlL2dlb21ldHJ5L1NwYXRpYWxSZWZlcmVuY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnR2lzQmFzZS1HaXNNYXBDb21wb25lbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiBcclxuPGRpdiBjbGFzcz0nYXonIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7cG9zaXRpb246IHJlbGF0aXZlIFwiPlxyXG4gICAgPGRpdiAjbWFwVmlld05vZGUgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDogMTAwJTsgIFwiPlxyXG4gICBcclxuICAgICAgPGRpdiBpZD1cInRvb2xiYXJEaXYyMjJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTttYXJnaW4tbGVmdDogLTUwcHg7XCIgY2xhc3M9XCJlX19fX3NyaS1jb21wb25lbnQgZXNyaS13aWRnZXRcIj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uTGVnZW5kIChjbGljayk9XCJidXR0b25MZWdlbmRDbGljaygpXCIgY2xhc3M9XCJlc3JpLXdpZGdldC0tYnV0dG9uIGVzcmktaW50ZXJhY3RpdmUgZXNyaS1pY29uLWxlZ2VuZFwiIHRpdGxlPVwibGVnZW5kIFBhbmVsXCI+ICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gICNidXR0b25EaXN0YW5jZSAoY2xpY2spPVwiZGlzdGFuY2VNZWFzdXJlbWVudCgpXCIgY2xhc3M9XCJlc3JpLXdpZGdldC0tYnV0dG9uIGVzcmktaW50ZXJhY3RpdmUgZXNyaS1pY29uLW1lYXN1cmUtbGluZVwiIHRpdGxlPVwiRGlzdGFuY2UgTWVhc3VyZW1lbnQgVG9vbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uQXJlYSAoY2xpY2spPVwiYXJlYU1lYXN1cmVtZW50KClcIiAgY2xhc3M9XCJlc3JpLXdpZGdldC0tYnV0dG9uIGVzcmktaW50ZXJhY3RpdmUgZXNyaS1pY29uLW1lYXN1cmUtYXJlYVwiIHRpdGxlPVwiQXJlYSBNZWFzdXJlbWVudCBUb29sXCI+ICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gIHN0eWxlPVwiZGlzcGxheTpub25lXCIgI2J1dHRvbkNsZWFyIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi10cmFzaFwiIHRpdGxlPVwiQ2xlYXIgTWVhc3VyZW1lbnRzXCI+ICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAjZGl2TWFzc2FnZSBzdHlsZT1cImRpc3BsYXk6bm9uZTtwb3NpdGlvbjogYWJzb2x1dGU7dG9wOiAyNSU7bGVmdDogMHB4O3dpZHRoOjEwMCVcIj5cclxuICAgIDxkaXYgI2Rpdk1hc3NhZ2VUZXh0IHN0eWxlPVwibWFyZ2luOiBhdXRvO3dpZHRoOiBmaXQtY29udGVudDtiYWNrZ3JvdW5kLWNvbG9yOnBvd2RlcmJsdWU7cGFkZGluZzogMTBweFwiID7XnNeQINeg15nXntem15DXlSDXpNeV15zXmdeS15XXoNeZ150g157XqteQ15nXnteZ150g15zXl9eZ16TXldepPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJ2dpcy1tYXAtY29tcG9uZW50LmNvbXBvbmVudC5jc3MnXVxyXG4vLyAgIDwgZGl2ICNsYXllckxpc3REaXYgPiA8L2Rpdj5cclxuXHJcbi8vPCBkaXYgI2Jhc2VtYXBHYWxsZXJ5RGl2ID4gPC9kaXY+XHJcbn0pXHJcbiAgXHJcbmV4cG9ydCBjbGFzcyBHaXNNYXBDb21wb25lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBsaW5rUHJvbSA9IGxvYWRDdXN0b21TdHlsZSgnaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMjMvZXNyaS90aGVtZXMvbGlnaHQvbWFpbi5jc3MnKTtcclxuXHJcbiAgcHJpdmF0ZSBkaXZNYXNzYWdlITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdkaXZNYXNzYWdlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ4KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5kaXZNYXNzYWdlID0gY29udGVudDsgfSB9XHJcbiAgcHJpdmF0ZSBkaXZNYXNzYWdlVGV4dCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZGl2TWFzc2FnZVRleHQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudERpdk1hc3NhZ2VUZXh0KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5kaXZNYXNzYWdlVGV4dCA9IGNvbnRlbnQ7IH0gfVxyXG5cclxuICBcclxuICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFwVmlld05vZGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfSB9XHJcbiAgcHJpdmF0ZSBsYXllckxpc3REaXYhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2xheWVyTGlzdERpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Mihjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMubGF5ZXJMaXN0RGl2ID0gY29udGVudDsgfSAgfVxyXG4gIHByaXZhdGUgYmFzZW1hcEdhbGxlcnlEaXYhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2Jhc2VtYXBHYWxsZXJ5RGl2JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQxKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgIGlmIChjb250ZW50KSB7IHRoaXMuYmFzZW1hcEdhbGxlcnlEaXYgPSBjb250ZW50OyB9ICB9XHJcblxyXG4gIHByaXZhdGUgYnV0dG9uTGVnZW5kITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uTGVnZW5kJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ3KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25MZWdlbmQgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uRGlzdGFuY2UhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25EaXN0YW5jZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Myhjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uRGlzdGFuY2UgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uQXJlYSE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkFyZWEnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDQoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkFyZWEgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uQ2xlYXIhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25DbGVhcicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50NShjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uQ2xlYXIgPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG4gIHByaXZhdGUgYnV0dG9uU3dpdGNoITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uU3dpdGNoJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ2KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25Td2l0Y2ggPSBjb250ZW50Lm5hdGl2ZUVsZW1lbnQ7IH0gfVxyXG5cclxuICAgXHJcbiAgcHJpdmF0ZSBsYXllckhlbGtvdFZpZXchOiBMYXllclZpZXdcclxuICBwcml2YXRlIExheWVyTGlzdCE6IHN0cmluZ1tdO1xyXG4gIHByaXZhdGUgUXVlcnlMYXllciE6IHN0cmluZztcclxuICBwcml2YXRlIFF1ZXJ5U3RyITogc3RyaW5nO1xyXG4gIHByaXZhdGUgUXVlcnlSZXN1bHRFbXB0eSE6IHN0cmluZztcclxuICBwcml2YXRlIGxlZ2VuZCE6IExlZ2VuZDtcclxuICBwcml2YXRlIG1lYXN1cmVtZW50ITogTWVhc3VyZW1lbnQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGxheWVyTGlzdCh2YWx1ZTogc3RyaW5nW10pIHtcclxuICAgIHRoaXMuTGF5ZXJMaXN0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHF1ZXJ5TGF5ZXIodmFsdWU6IHN0cmluZykgeyAgICBcclxuICAgIHRoaXMuUXVlcnlMYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeVN0cih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLlF1ZXJ5U3RyID0gdmFsdWU7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHF1ZXJ5UmVzdWx0RW1wdHkodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVJlc3VsdEVtcHR5ID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHF1ZXJ5RmVhdHVyZUxheWVyISA6IEZlYXR1cmVMYXllciAgXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2lzQmFzZVNlcnZpY2U6IEdpc0Jhc2VTZXJ2aWNlKSB7IH1cclxuXHJcbiAgXHJcbiAgYXN5bmMgaW5pdGlhbGl6ZU1hcCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubGlua1Byb207XHJcbiAgICAgIGNvbnN0IGRpdk1hc3NhZ2UgPSB0aGlzLmRpdk1hc3NhZ2U7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBbTWFwVmlldywgV2ViTWFwLCBMYXllckxpc3QsIEZlYXR1cmVMYXllcixcclxuICAgICAgICBTZWFyY2gsIE1lYXN1cmVtZW50LCBMZWdlbmQsXHJcbiAgICAgICAgUG9pbnQsIFNwYXRpYWxSZWZlcmVuY2VdID0gYXdhaXQgbG9hZE1vZHVsZXMoW1xyXG4gICAgICAgIFwiZXNyaS92aWV3cy9NYXBWaWV3XCIsIFwiZXNyaS9XZWJNYXBcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9MYXllckxpc3RcIiwgIFwiZXNyaS9sYXllcnMvRmVhdHVyZUxheWVyXCIsXHJcbiAgICAgICAgICBcImVzcmkvd2lkZ2V0cy9TZWFyY2hcIiwgXCJlc3JpL3dpZGdldHMvTWVhc3VyZW1lbnRcIiwgXCJlc3JpL3dpZGdldHMvTGVnZW5kXCIsXHJcbiAgICAgICAgICBcImVzcmkvZ2VvbWV0cnkvUG9pbnRcIiwgXCJlc3JpL2dlb21ldHJ5L1NwYXRpYWxSZWZlcmVuY2VcIlxyXG4gICAgICBdKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgICAgIGJhc2VtYXA6IFwidG9wb1wiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IHZpZXcgPSBuZXcgTWFwVmlldyh7XHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcFZpZXdFbC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIG1hcDogd2ViTWFwXHJcbiAgICAgIH0pO1xyXG4gICAgICB2aWV3LmNlbnRlciA9IFszMS43NDQwMzcsIDM1LjA0OTk5NV07XHJcbiAgICAvLyAgbGV0IGZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgLy91cmw6IFwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMFwiXHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8va2tscmdtLmtrbC5vcmcuaWwva2tsYWdzL3Jlc3Qvc2VydmljZXMvYWxsTGF5ZXJzRm9yQWdvbC9GZWF0dXJlU2VydmVyLzdcIlxyXG4gICAgLy99KTtcclxuICAgIC8vbGV0IGZlYXRlckxheWVyMSA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xyXG4gICAgLy8gIHVybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlclwiICAgICAgXHJcbiAgICAvL30pO1xyXG5cclxuICAgICAgdGhpcy5MYXllckxpc3QuZm9yRWFjaCgobGF5ZXJTdHIpPT4gICB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICB1cmw6IHRoaXMuZ2lzQmFzZVNlcnZpY2UuYXBpVXJsICsgXCIvQXJjR0lTL3Jlc3Qvc2VydmljZXMvXCIgKyBsYXllclN0cixcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYk1hcC5hZGQoZmVhdHVyZUxheWVyKTtcclxuICAgICAgICBpZiAobGF5ZXJTdHIuaW5jbHVkZXModGhpcy5RdWVyeUxheWVyKSkgeyB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyID0gZmVhdHVyZUxheWVyIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBhd2FpdCB2aWV3LndoZW4oKCkgPT4ge1xyXG4gICAgICAgIHZhciBsYXllckxpc3QgPSBuZXcgTGF5ZXJMaXN0KHsgdmlldzogdmlldyAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChsYXllckxpc3QsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKHsgdmlldzogdmlld30pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoc2VhcmNoLCBcInRvcC1yaWdodFwiKTtcclxuICAgICAgICB2YXIgem9vbSA9IG5ldyBab29tKHsgIHZpZXc6IHZpZXcsICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiICB9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHpvb20sIFwiYm90dG9tLXJpZ2h0XCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBhc3NXaWRnZXQgPSBuZXcgQ29tcGFzcyh7ICB2aWV3OiB2aWV3ICAgfSk7XHJcbiAgICAgICAgdmlldy51aS5hZGQoY29tcGFzc1dpZGdldCwgXCJ0b3AtbGVmdFwiKTtcclxuICAgICAgICBjb25zdCBzY2FsZUJhciA9IG5ldyBTY2FsZUJhcih7IHZpZXc6IHZpZXcsIHVuaXQ6IFwibWV0cmljXCIsIHN0eWxlOiBcInJ1bGVyXCIgICAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChzY2FsZUJhciwgeyBwb3NpdGlvbjogXCJib3R0b20tbGVmdFwifSk7XHJcbiAgICAgICAgLy9jb25zdCBiYXNlbWFwR2FsbGVyeSA9IG5ldyBCYXNlbWFwR2FsbGVyeSh7ICB2aWV3OiB2aWV3LCAgICBjb250YWluZXI6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgICAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChiYXNlbWFwR2FsbGVyeSwgeyAgIHBvc2l0aW9uOiBcInRvcC1yaWdodFwiICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmxlZ2VuZCA9IG5ldyBMZWdlbmQoeyB2aWV3OiB2aWV3LCBzdHlsZTogeyB0eXBlOiBcImNsYXNzaWNcIiwgbGF5b3V0OiAnc3RhY2snIH0sIGxheWVySW5mb3M6IFt7IGxheWVyOiB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLCB0aXRsZTogXCLXqdeb15HXqiDXl9ec16fXldeqXCIgfV0gfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZCh0aGlzLmxlZ2VuZCwgXCJib3R0b20tcmlnaHRcIik7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlbWVudCA9IG5ldyBNZWFzdXJlbWVudCh7IHZpZXc6IHZpZXcgfSk7XHJcbiAgICAgICAgdmlldy51aS5hZGQodGhpcy5tZWFzdXJlbWVudCwgXCJib3R0b20tcmlnaHRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vL3RoaXMuYnV0dG9uU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuc3dpdGNoVmlldyhNYXAsIHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIsICBtZWFzdXJlbWVudCk7IH0pO1xyXG4gICAgICAgIC8vdGhpcy5idXR0b25EaXN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmRpc3RhbmNlTWVhc3VyZW1lbnQoIG1lYXN1cmVtZW50KTsgfSk7XHJcbiAgICAgICAgLy90aGlzLmJ1dHRvbkFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5hcmVhTWVhc3VyZW1lbnQobWVhc3VyZW1lbnQpOyB9KTtcclxuICAgICAgICAvL3RoaXMuYnV0dG9uQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5jbGVhck1lYXN1cmVtZW50cyhtZWFzdXJlbWVudCk7IH0pO1xyXG5cclxuICAgICAgICAvL2NvbnN0IEVzcmlQd29lckJ5ZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS1hdHRyaWJ1dGlvbl9fc291cmNlcyBlc3JpLWludGVyYWN0aXZlXCIpO1xyXG4gICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gIEVzcmlQd29lckJ5ZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgY29uc3QgRXNyaVB3b2VyQnllbGVtZW50czEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXNyaS1hdHRyaWJ1dGlvbl9fcG93ZXJlZC1ieVwiKTsgICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXNyaVB3b2VyQnllbGVtZW50czEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIEVzcmlQd29lckJ5ZWxlbWVudHMxW2ldLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgICAgY29uc3QgYXogPSBFc3JpUHdvZXJCeWVsZW1lbnRzMVtpXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgaWYgKGF6IT1udWxsKSBhei5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LmRlZmluaXRpb25FeHByZXNzaW9uID0gXCJHVVNIX05VTT1cIiArIHRoaXMuX2d1c2ggKyBcIiBhbmQgUEFSQ0VMPVwiICsgdGhpcy5fUEFSQ0VMO1xyXG4gICAgICAgIC8vdGhpcy5mZWF0ZXJMYXllckhlbGtvdC53aGVuKFxyXG4gICAgICAgIC8vICAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc3QgcXVlcnkgPSB0aGlzLmZlYXRlckxheWVySGVsa290LmNyZWF0ZVF1ZXJ5KCk7XHJcbiAgICAgICAgICAgIC8vcXVlcnkud2hlcmUgPSBcIkdVU0hfTlVNPVwiICsgdGhpcy5fZ3VzaCArIFwiIGFuZCBQQVJDRUw9XCIgKyB0aGlzLl9QQVJDRUw7XHJcbiAgICAgICAgICAgIC8vcXVlcnkub3V0U3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgLy92YXIgYXogPSB0aGlzLmZlYXRlckxheWVySGVsa290LnF1ZXJ5RmVhdHVyZXMocXVlcnkpXHJcbiAgICAgICAgICAgIC8vYXoudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICAvLyAgdmlldy5oaWdobGlnaHQocmVzdWx0cyk7XHJcbiAgICAgICAgICAgIC8vfSk7ICBcclxuICAgICAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LnF1ZXJ5RXh0ZW50KHF1ZXJ5KVxyXG4gICAgICAgICAgICAvLyAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBpZiAocmVzcG9uc2UuZXh0ZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgcmVzcG9uc2UuZXh0ZW50LnNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgdmlldy5nb1RvKHJlc3BvbnNlLmV4dGVudC5leHBhbmQoMykpO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgfSk7XHJcbiAgICAgICAgIC8qIH0pOyovXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmlldy53aGVuTGF5ZXJWaWV3KHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIpLnRoZW4oKGxheWVyVmlldzogYW55ICApID0+IHtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5jcmVhdGVRdWVyeSgpO1xyXG4gICAgICAgIHF1ZXJ5LndoZXJlID0gIHRoaXMuUXVlcnlTdHI7XHJcbiAgICAgICAgcXVlcnkub3V0U3BhdGlhbFJlZmVyZW5jZSA9ICB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgdmFyIGF6ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICAgIGF6LnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKHJlc3VsdHMuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBkaXZNYXNzYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgbGF5ZXJWaWV3LmhpZ2hsaWdodChyZXN1bHRzLmZlYXR1cmVzWzBdKTtcclxuICAgICAgICAgICAgLyp2aWV3LmdvVG8oeyBnZW9tZXRyeTogcmVzdWx0cy5mZWF0dXJlc1swXS5nZW9tZXRyeS5leHRlbnQuZXhwYW5kKDMpIH0pOyovXHJcbiAgICAgICAgICAgIC8vdmFyIHA6IFBvaW50O1xyXG4gICAgICAgICAgICAvL3AgPSByZXN1bHRzLmZlYXR1cmVzWzBdLmdlb21ldHJ5IGFzIFBvaW50O1xyXG4gICAgICAgICAgICAvL3Auc3BhdGlhbFJlZmVyZW5jZSA9IG5ldyBTcGF0aWFsUmVmZXJlbmNlKHsgd2tpZDogMzg1NyB9KTtcclxuICAgICAgICAgICAgLy92aWV3LnNwYXRpYWxSZWZlcmVuY2UgPSBuZXcgU3BhdGlhbFJlZmVyZW5jZSh7IHdraWQ6IDM4NTcgfSk7XHJcbiAgICAgICAgICAgIC8vdmlldy5nb1RvKHtcclxuICAgICAgICAgICAgLy8gIC8qdGFyZ2V0OiBbMzUuMDQ5OTk1LCAzMS43NDQwMzddKi9cclxuICAgICAgICAgICAgLy8gIC8qdGFyZ2V0OiBbMjIyMDAwLCA2MzAwMDBdKi9cclxuICAgICAgICAgICAgLy8gIC8qdGFyZ2V0OiBwKi9cclxuICAgICAgICAgICAgLy8gIHRhcmdldDogWzM5MjY2MzcuMTk3Nzk5OTk5MywgMzg2MDYyOC4wOTIyMDAwMDMxXVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIHZpZXcud2hlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmlldy5nb1RvKHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogcmVzdWx0cy5mZWF0dXJlc1swXSwgLy8gR3JhcGhpYyBvYmplY3RcclxuICAgICAgICAgICAgICAgIHpvb206IDIwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRpdk1hc3NhZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy90aGlzLnF1ZXJ5RmVhdHVyZUxheWVyLnF1ZXJ5RXh0ZW50KHF1ZXJ5KVxyXG4gICAgICAgIC8vICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgLy8gICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgcmVzcG9uc2UuZXh0ZW50LnNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgLy8gICAgICB2aWV3LmdvVG8oeyAgZ2VvbWV0cnk6IHJlc3BvbnNlLmV4dGVudC5leHBhbmQoMykgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFc3JpTG9hZGVyOiBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH0gICBcclxuXHJcbiAgbmdPbkluaXQoKSAge1xyXG4gICAgdGhpcy5pbml0aWFsaXplTWFwKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuZGl2TWFzc2FnZVRleHQubmF0aXZlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLlF1ZXJ5UmVzdWx0RW1wdHk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVmlldyByZWFkeVwiKTtcclxuICAgIH0pOyAgICBcclxuICB9XHJcblxyXG4gIGJ1dHRvbkxlZ2VuZENsaWNrKCkge1xyXG4gICAgdGhpcy5sZWdlbmQudmlzaWJsZSA9ICF0aGlzLmxlZ2VuZC52aXNpYmxlO1xyXG4gIH1cclxuICAvL3N3aXRjaFZpZXcoTWFwOiBNYXBDb25zdHJ1Y3RvciwgbGF5ZXJWaWV3OiBhbnksIG1lYXN1cmVtZW50OiBhbnkpIHtcclxuXHJcbiAgLy8gIC8vIENsb25lIHRoZSB2aWV3cG9pbnQgZm9yIHRoZSBNYXBWaWV3IG9yIFNjZW5lVmlld1xyXG4gIC8vICBjb25zdCB2aWV3cG9pbnQgPSBsYXllclZpZXcudmlld3BvaW50LmNsb25lKCk7XHJcbiAgLy8gIC8vIEdldCB0aGUgdmlldyB0eXBlLCBlaXRoZXIgMmQgb3IgM2RcclxuICAvLyAgY29uc3QgdHlwZSA9IGxheWVyVmlldy50eXBlO1xyXG5cclxuICAvLyAgLy8gQ2xlYXIgYW55IG1lYXN1cmVtZW50cyB0aGF0IGhhZCBiZWVuIGRyYXduXHJcbiAgLy8gIHRoaXMuY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQpO1xyXG5cclxuICAvLyAgLy8gUmVzZXQgdGhlIG1lYXN1cmVtZW50IHRvb2xzIGluIHRoZSBkaXZcclxuICAvLyAgbGF5ZXJWaWV3LmNvbnRhaW5lciA9IG51bGw7XHJcbiAgLy8gIGxheWVyVmlldyA9IG51bGw7XHJcbiAgLy8gIC8vIFNldCB0aGUgdmlldyBiYXNlZCBvbiB3aGV0aGVyIGl0IHN3aXRjaGVkIHRvIDJEIE1hcFZpZXcgb3IgM0QgU2NlbmVWaWV3XHJcbiAgLy8gIGxheWVyVmlldyA9IE1hcDtcclxuICAvLyAgbGF5ZXJWaWV3LnNldCh7XHJcbiAgLy8gICAgY29udGFpbmVyOiBcInZpZXdEaXZcIixcclxuICAvLyAgICB2aWV3cG9pbnQ6IHZpZXdwb2ludFxyXG4gIC8vICB9KTtcclxuICAvL31cclxuICAvL2NsZWFyTWVhc3VyZW1lbnRzKG1lYXN1cmVtZW50OiBhbnkpIHtcclxuICAvLyAgY29uc3QgZGlzdGFuY2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzdGFuY2UnKTtcclxuICAvLyAgY29uc3QgYXJlYUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcmVhJyk7XHJcbiAgLy8gIHRoaXMuYnV0dG9uRGlzdGFuY2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAvLyAgdGhpcy5idXR0b25BcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgLy8gIG1lYXN1cmVtZW50LmNsZWFyKCk7XHJcbiAgLy99XHJcbiAgZGlzdGFuY2VNZWFzdXJlbWVudCggICkge1xyXG4gICAgdGhpcy5tZWFzdXJlbWVudC5hY3RpdmVUb29sICA9IFwiZGlzdGFuY2VcIjsgICAgXHJcbiAgICB0aGlzLmJ1dHRvbkRpc3RhbmNlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9XHJcbiAgYXJlYU1lYXN1cmVtZW50KCApIHtcclxuICAgIHRoaXMubWVhc3VyZW1lbnQuYWN0aXZlVG9vbCA9IFwiYXJlYVwiO1xyXG4gICAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5idXR0b25BcmVhLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDdXN0b21TdHlsZSh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTExpbmtFbGVtZW50PiB7XHJcbiAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICBsaW5rLmhyZWYgPSB1cmw7XHJcbiAgY29uc3QgaXNSZWFkeTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICBsaW5rLm9ubG9hZCA9ICgpID0+IHJlc29sdmUobGluaylcclxuICB9KVxyXG4gIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgcmV0dXJuIGlzUmVhZHlcclxufVxyXG4iXX0=