import * as i0 from '@angular/core';
import { Injectable, Inject, Component, ViewChild, Input, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { loadModules } from 'esri-loader';
import Zoom from '@arcgis/core/widgets/Zoom';
import Compass from '@arcgis/core/widgets/Compass';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';

class GisBaseService {
    constructor(config) {
        this.config = config;
        this.apiUrl = "";
        this.apiUrl = config.GisApiUrl;
        //this.apiUrl = 'https://kkl-yaaranutgisapi.azurewebsites.net';
    }
}
GisBaseService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisBaseService, deps: [{ token: 'environmentFile' }], target: i0.ɵɵFactoryTarget.Injectable });
GisBaseService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisBaseService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisBaseService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['environmentFile']
                }] }]; } });

class GisMapComponentService {
    constructor() { }
}
GisMapComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GisMapComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class GisMapComponentComponent {
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
GisMapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, deps: [{ token: GisBaseService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: GisBaseService }]; }, propDecorators: { content8: [{
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
function loadCustomStyle(url) {
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

class GisMapComponentModule {
    static forRoot(environment) {
        return {
            ngModule: GisMapComponentModule,
            providers: [GisBaseService, { provide: 'environmentFile', useValue: environment }]
        };
    }
}
GisMapComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GisMapComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentModule, declarations: [GisMapComponentComponent], exports: [GisMapComponentComponent] });
GisMapComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        GisMapComponentComponent
                    ],
                    imports: [],
                    exports: [
                        GisMapComponentComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of gis-map-component
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GisBaseService, GisMapComponentComponent, GisMapComponentModule, GisMapComponentService, loadCustomStyle };
//# sourceMappingURL=gis-map-component.js.map
