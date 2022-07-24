import { __awaiter } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { loadModules } from "esri-loader";
import Zoom from "@arcgis/core/widgets/Zoom";
import Compass from "@arcgis/core/widgets/Compass";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import * as i0 from "@angular/core";
import * as i1 from "../GisBase.service";
export class GisMapComponentComponent {
    constructor(gisBaseService) {
        this.gisBaseService = gisBaseService;
        this.linkProm = loadCustomStyle('https://js.arcgis.com/4.23/esri/themes/light/main.css');
        this.FeatureHighlights = [];
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
        this.MakeQuery();
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
                this.view = new MapView({
                    container: this.mapViewEl.nativeElement,
                    map: webMap
                });
                //this.view.center = [31.744037, 35.049995];
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
                yield this.view.when(() => {
                    var layerList = new LayerList({ view: this.view });
                    //view.ui.add(layerList, "top-right");
                    var search = new Search({ view: this.view });
                    //view.ui.add(search, "top-right");
                    var zoom = new Zoom({ view: this.view, layout: "horizontal" });
                    //view.ui.add(zoom, "bottom-right");
                    const compassWidget = new Compass({ view: this.view });
                    this.view.ui.add(compassWidget, "top-left");
                    const scaleBar = new ScaleBar({ view: this.view, unit: "metric", style: "ruler" });
                    //view.ui.add(scaleBar, { position: "bottom-left"});
                    //const basemapGallery = new BasemapGallery({  view: view,    container: document.createElement("div")    });
                    //view.ui.add(basemapGallery, {   position: "top-right"    });
                    this.legend = new Legend({ view: this.view, style: { type: "classic", layout: 'stack' }, layerInfos: [{ layer: this.queryFeatureLayer, title: "שכבת חלקות" }] });
                    //view.ui.add(this.legend, "bottom-right");
                    this.measurement = new Measurement({ view: this.view });
                    this.view.ui.add(this.measurement, "bottom-right");
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
                this.view.whenLayerView(this.queryFeatureLayer).then((layerView) => {
                    this.layerView = layerView;
                    this.MakeQuery();
                    //this.queryFeatureLayer.queryExtent(query)
                    //  .then(response => {
                    //    if (response.extent !== null) {
                    //      response.extent.spatialReference = view.spatialReference;
                    //      view.goTo({  geometry: response.extent.expand(3) });
                    //    }
                    //  });
                });
                return this.view;
            }
            catch (error) {
                console.log("EsriLoader: ", error);
                return null;
            }
        });
    }
    ngOnInit() {
        this.initializeMap().then(() => {
            this.divMassageText.nativeElement.innerText = this.QueryResultEmpty;
            console.log("View ready");
        });
    }
    MakeQuery() {
        const view = this.view;
        const layerView = this.layerView;
        const divMassage = this.divMassage;
        let FeatureHighlights = this.FeatureHighlights;
        if (this.queryFeatureLayer !== undefined) {
            if (FeatureHighlights.length > 0) {
                FeatureHighlights.forEach(function (highlight) {
                    highlight.remove();
                });
                FeatureHighlights = [];
            }
            const query = this.queryFeatureLayer.createQuery();
            query.where = this.QueryStr;
            query.outSpatialReference = this.view.spatialReference;
            var az = this.queryFeatureLayer.queryFeatures(query);
            az.then(function (results) {
                if (results.features.length > 0) {
                    divMassage.nativeElement.style.display = 'none';
                    let FeatureHighlights1 = layerView.highlight(results.features[0]);
                    FeatureHighlights.push(FeatureHighlights1);
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
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUTFDLE9BQU8sSUFBSSxNQUFNLDJCQUEyQixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLDhCQUE4QixDQUFDO0FBQ25ELE9BQU8sUUFBUSxNQUFNLCtCQUErQixDQUFDOzs7QUFxQ3JELE1BQU0sT0FBTyx3QkFBd0I7SUE0RG5DLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTFEbEQsYUFBUSxHQUFHLGVBQWUsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBd0RwRixzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFFK0IsQ0FBQztJQXZEdkQsSUFBK0MsUUFBUSxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUU1SCxJQUFtRCxxQkFBcUIsQ0FBQyxPQUFtQixJQUFJLElBQUksT0FBTyxFQUFFO1FBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FBRSxDQUFDLENBQUM7SUFJakosSUFBZ0QsT0FBTyxDQUFDLE9BQW1CLElBQUksSUFBSSxPQUFPLEVBQUU7UUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUFFLENBQUMsQ0FBQztJQUUzSCxJQUFpRCxRQUFRLENBQUMsT0FBbUIsSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUFFLElBQUks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SSxFQUFFO2dCQUVFLFFBQVE7c0JBQXRELFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFTyxRQUFRO3NCQUF2RCxTQUFTO3VCQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRU8sUUFBUTtzQkFBeEQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQVl2QyxTQUFTO3NCQURaLEtBQUs7Z0JBS0YsVUFBVTtzQkFEYixLQUFLO2dCQUtGLFFBQVE7c0JBRFgsS0FBSztnQkFNRixnQkFBZ0I7c0JBRG5CLEtBQUs7O0FBZ09SLE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBVztJQUN6QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztJQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNoQixNQUFNLE9BQU8sR0FBNkIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgIE91dHB1dCwgIEV2ZW50RW1pdHRlciwgIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuIFxyXG5pbXBvcnQgeyBsb2FkTW9kdWxlcyB9IGZyb20gXCJlc3JpLWxvYWRlclwiO1xyXG4vL2ltcG9ydCBlc3JpID0gX19lc3JpO1xyXG5cclxuLy9pbXBvcnQgV2ViTWFwIGZyb20gXCJAYXJjZ2lzL2NvcmUvV2ViTWFwXCI7XHJcbmltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG4vL2ltcG9ydCBMYXllckxpc3QgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xheWVyTGlzdFwiO1xyXG5pbXBvcnQgSGFuZGxlcyBmcm9tIFwiQGFyY2dpcy9jb3JlL2NvcmUvSGFuZGxlc1wiO1xyXG5cclxuaW1wb3J0IFpvb20gZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1pvb21cIjtcclxuaW1wb3J0IENvbXBhc3MgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0NvbXBhc3NcIjtcclxuaW1wb3J0IFNjYWxlQmFyIGZyb20gXCJAYXJjZ2lzL2NvcmUvd2lkZ2V0cy9TY2FsZUJhclwiO1xyXG5pbXBvcnQgQmFzZW1hcEdhbGxlcnkgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0Jhc2VtYXBHYWxsZXJ5XCI7XHJcbmltcG9ydCBMZWdlbmQgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xlZ2VuZFwiO1xyXG5pbXBvcnQgTWVhc3VyZW1lbnQgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL01lYXN1cmVtZW50XCI7XHJcbi8vaW1wb3J0IFNlYXJjaCBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvU2VhcmNoXCI7XHJcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSBcIkBhcmNnaXMvY29yZS9sYXllcnMvRmVhdHVyZUxheWVyXCI7XHJcbmltcG9ydCBMYXllclZpZXcgZnJvbSBcIkBhcmNnaXMvY29yZS92aWV3cy9sYXllcnMvTGF5ZXJWaWV3XCI7XHJcbmltcG9ydCB7IEdpc0Jhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vR2lzQmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IFBvaW50IGZyb20gXCJAYXJjZ2lzL2NvcmUvZ2VvbWV0cnkvUG9pbnRcIjtcclxuaW1wb3J0IEdlb21ldHJ5IGZyb20gXCJAYXJjZ2lzL2NvcmUvZ2VvbWV0cnkvR2VvbWV0cnlcIjtcclxuaW1wb3J0IFNwYXRpYWxSZWZlcmVuY2UgZnJvbSBcIkBhcmNnaXMvY29yZS9nZW9tZXRyeS9TcGF0aWFsUmVmZXJlbmNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ0dpc0Jhc2UtR2lzTWFwQ29tcG9uZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gXHJcbjxkaXYgY2xhc3M9J2F6JyBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO3Bvc2l0aW9uOiByZWxhdGl2ZSBcIj5cclxuICAgIDxkaXYgI21hcFZpZXdOb2RlIHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7ICBcIj5cclxuICAgXHJcbiAgICAgIDxkaXYgaWQ9XCJ0b29sYmFyRGl2MjIyXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bWFyZ2luLWxlZnQ6IC01MHB4O1wiIGNsYXNzPVwiZV9fX19zcmktY29tcG9uZW50IGVzcmktd2lkZ2V0XCI+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkxlZ2VuZCAoY2xpY2spPVwiYnV0dG9uTGVnZW5kQ2xpY2soKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1sZWdlbmRcIiB0aXRsZT1cImxlZ2VuZCBQYW5lbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICAjYnV0dG9uRGlzdGFuY2UgKGNsaWNrKT1cImRpc3RhbmNlTWVhc3VyZW1lbnQoKVwiIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWxpbmVcIiB0aXRsZT1cIkRpc3RhbmNlIE1lYXN1cmVtZW50IFRvb2xcIj4gICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgI2J1dHRvbkFyZWEgKGNsaWNrKT1cImFyZWFNZWFzdXJlbWVudCgpXCIgIGNsYXNzPVwiZXNyaS13aWRnZXQtLWJ1dHRvbiBlc3JpLWludGVyYWN0aXZlIGVzcmktaWNvbi1tZWFzdXJlLWFyZWFcIiB0aXRsZT1cIkFyZWEgTWVhc3VyZW1lbnQgVG9vbFwiPiAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICNidXR0b25DbGVhciBjbGFzcz1cImVzcmktd2lkZ2V0LS1idXR0b24gZXNyaS1pbnRlcmFjdGl2ZSBlc3JpLWljb24tdHJhc2hcIiB0aXRsZT1cIkNsZWFyIE1lYXN1cmVtZW50c1wiPiAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgI2Rpdk1hc3NhZ2Ugc3R5bGU9XCJkaXNwbGF5Om5vbmU7cG9zaXRpb246IGFic29sdXRlO3RvcDogMjUlO2xlZnQ6IDBweDt3aWR0aDoxMDAlXCI+XHJcbiAgICA8ZGl2ICNkaXZNYXNzYWdlVGV4dCBzdHlsZT1cIm1hcmdpbjogYXV0bzt3aWR0aDogZml0LWNvbnRlbnQ7YmFja2dyb3VuZC1jb2xvcjpwb3dkZXJibHVlO3BhZGRpbmc6IDEwcHhcIiA+15zXkCDXoNeZ157XpteQ15Ug16TXldec15nXkteV16DXmdedINee16rXkNeZ157XmdedINec15fXmdek15XXqTwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWydnaXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ11cclxuLy8gICA8IGRpdiAjbGF5ZXJMaXN0RGl2ID4gPC9kaXY+XHJcblxyXG4vLzwgZGl2ICNiYXNlbWFwR2FsbGVyeURpdiA+IDwvZGl2PlxyXG59KVxyXG4gIFxyXG5leHBvcnQgY2xhc3MgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbGlua1Byb20gPSBsb2FkQ3VzdG9tU3R5bGUoJ2h0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjIzL2VzcmkvdGhlbWVzL2xpZ2h0L21haW4uY3NzJyk7XHJcblxyXG4gIHByaXZhdGUgZGl2TWFzc2FnZSE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZGl2TWFzc2FnZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50OChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuZGl2TWFzc2FnZSA9IGNvbnRlbnQ7IH0gfVxyXG4gIHByaXZhdGUgZGl2TWFzc2FnZVRleHQhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2Rpdk1hc3NhZ2VUZXh0JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnREaXZNYXNzYWdlVGV4dChjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuZGl2TWFzc2FnZVRleHQgPSBjb250ZW50OyB9IH1cclxuXHJcbiAgXHJcbiAgcHJpdmF0ZSBtYXBWaWV3RWwhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21hcFZpZXdOb2RlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLm1hcFZpZXdFbCA9IGNvbnRlbnQ7IH0gfVxyXG4gIHByaXZhdGUgbGF5ZXJMaXN0RGl2ITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdsYXllckxpc3REaXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDIoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmxheWVyTGlzdERpdiA9IGNvbnRlbnQ7IH0gIH1cclxuICBwcml2YXRlIGJhc2VtYXBHYWxsZXJ5RGl2ITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdiYXNlbWFwR2FsbGVyeURpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50MShjb250ZW50OiBFbGVtZW50UmVmKSB7ICBpZiAoY29udGVudCkgeyB0aGlzLmJhc2VtYXBHYWxsZXJ5RGl2ID0gY29udGVudDsgfSAgfVxyXG5cclxuICBwcml2YXRlIGJ1dHRvbkxlZ2VuZCE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbkxlZ2VuZCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Nyhjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uTGVnZW5kID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkRpc3RhbmNlITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uRGlzdGFuY2UnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDMoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkRpc3RhbmNlID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkFyZWEhOiBIVE1MRWxlbWVudDtcclxuICBAVmlld0NoaWxkKCdidXR0b25BcmVhJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQ0KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHsgaWYgKGNvbnRlbnQpIHsgdGhpcy5idXR0b25BcmVhID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvbkNsZWFyITogSFRNTEVsZW1lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnYnV0dG9uQ2xlYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDUoY29udGVudDogRWxlbWVudFJlZikgeyBpZiAoY29udGVudCkgeyB0aGlzLmJ1dHRvbkNsZWFyID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuICBwcml2YXRlIGJ1dHRvblN3aXRjaCE6IEhUTUxFbGVtZW50O1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvblN3aXRjaCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Nihjb250ZW50OiBFbGVtZW50UmVmKSB7IGlmIChjb250ZW50KSB7IHRoaXMuYnV0dG9uU3dpdGNoID0gY29udGVudC5uYXRpdmVFbGVtZW50OyB9IH1cclxuXHJcbiAgIFxyXG4gIHByaXZhdGUgbGF5ZXJIZWxrb3RWaWV3ITogTGF5ZXJWaWV3XHJcbiAgcHJpdmF0ZSBMYXllckxpc3QhOiBzdHJpbmdbXTtcclxuICBwcml2YXRlIFF1ZXJ5TGF5ZXIhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBRdWVyeVN0ciE6IHN0cmluZztcclxuICBwcml2YXRlIFF1ZXJ5UmVzdWx0RW1wdHkhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsZWdlbmQhOiBMZWdlbmQ7XHJcbiAgcHJpdmF0ZSBtZWFzdXJlbWVudCE6IE1lYXN1cmVtZW50O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllckxpc3QodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLkxheWVyTGlzdCA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeUxheWVyKHZhbHVlOiBzdHJpbmcpIHsgICAgXHJcbiAgICB0aGlzLlF1ZXJ5TGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlTdHIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVN0ciA9IHZhbHVlO1xyXG4gICAgdGhpcy5NYWtlUXVlcnkoKTtcclxuICB9ICAgIFxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHF1ZXJ5UmVzdWx0RW1wdHkodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVJlc3VsdEVtcHR5ID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHF1ZXJ5RmVhdHVyZUxheWVyISA6IEZlYXR1cmVMYXllciAgXHJcbiAgcHJpdmF0ZSB2aWV3ITogTWFwVmlldztcclxuICBwcml2YXRlIGxheWVyVmlldzogYW55O1xyXG4gIEZlYXR1cmVIaWdobGlnaHRzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2lzQmFzZVNlcnZpY2U6IEdpc0Jhc2VTZXJ2aWNlKSB7IH1cclxuXHJcbiAgXHJcbiAgYXN5bmMgaW5pdGlhbGl6ZU1hcCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubGlua1Byb207XHJcbiAgICAgIGNvbnN0IGRpdk1hc3NhZ2UgPSB0aGlzLmRpdk1hc3NhZ2U7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBbTWFwVmlldywgV2ViTWFwLCBMYXllckxpc3QsIEZlYXR1cmVMYXllcixcclxuICAgICAgICBTZWFyY2gsIE1lYXN1cmVtZW50LCBMZWdlbmQsXHJcbiAgICAgICAgUG9pbnQsIFNwYXRpYWxSZWZlcmVuY2VdID0gYXdhaXQgbG9hZE1vZHVsZXMoW1xyXG4gICAgICAgIFwiZXNyaS92aWV3cy9NYXBWaWV3XCIsIFwiZXNyaS9XZWJNYXBcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9MYXllckxpc3RcIiwgIFwiZXNyaS9sYXllcnMvRmVhdHVyZUxheWVyXCIsXHJcbiAgICAgICAgICBcImVzcmkvd2lkZ2V0cy9TZWFyY2hcIiwgXCJlc3JpL3dpZGdldHMvTWVhc3VyZW1lbnRcIiwgXCJlc3JpL3dpZGdldHMvTGVnZW5kXCIsXHJcbiAgICAgICAgICBcImVzcmkvZ2VvbWV0cnkvUG9pbnRcIiwgXCJlc3JpL2dlb21ldHJ5L1NwYXRpYWxSZWZlcmVuY2VcIlxyXG4gICAgICBdKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgICAgIGJhc2VtYXA6IFwidG9wb1wiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy52aWV3ID0gbmV3IE1hcFZpZXcoe1xyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudCxcclxuICAgICAgICBtYXA6IHdlYk1hcFxyXG4gICAgICB9KTtcclxuICAgICAgLy90aGlzLnZpZXcuY2VudGVyID0gWzMxLjc0NDAzNywgMzUuMDQ5OTk1XTtcclxuICAgIC8vICBsZXQgZmVhdGVyTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgIC8vICAvL3VybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlci8wXCJcclxuICAgIC8vICB1cmw6IFwiaHR0cHM6Ly9ra2xyZ20ua2tsLm9yZy5pbC9ra2xhZ3MvcmVzdC9zZXJ2aWNlcy9hbGxMYXllcnNGb3JBZ29sL0ZlYXR1cmVTZXJ2ZXIvN1wiXHJcbiAgICAvL30pO1xyXG4gICAgLy9sZXQgZmVhdGVyTGF5ZXIxID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8vc2VydmljZXMyLmFyY2dpcy5jb20vdXROTnJtWGI0SVpPTFhYcy9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9KTkZJTEZvcmVzdC9GZWF0dXJlU2VydmVyXCIgICAgICBcclxuICAgIC8vfSk7XHJcblxyXG4gICAgICB0aGlzLkxheWVyTGlzdC5mb3JFYWNoKChsYXllclN0cik9PiAgIHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgICAgICAgIHVybDogdGhpcy5naXNCYXNlU2VydmljZS5hcGlVcmwgKyBcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9cIiArIGxheWVyU3RyLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2ViTWFwLmFkZChmZWF0dXJlTGF5ZXIpO1xyXG4gICAgICAgIGlmIChsYXllclN0ci5pbmNsdWRlcyh0aGlzLlF1ZXJ5TGF5ZXIpKSB7IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIgPSBmZWF0dXJlTGF5ZXIgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIGF3YWl0IHRoaXMudmlldy53aGVuKCgpID0+IHtcclxuICAgICAgICB2YXIgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHRoaXMudmlldyAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChsYXllckxpc3QsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKHsgdmlldzogdGhpcy52aWV3fSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChzZWFyY2gsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgICAgIHZhciB6b29tID0gbmV3IFpvb20oeyB2aWV3OiB0aGlzLnZpZXcsICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiICB9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHpvb20sIFwiYm90dG9tLXJpZ2h0XCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBhc3NXaWRnZXQgPSBuZXcgQ29tcGFzcyh7IHZpZXc6IHRoaXMudmlldyAgIH0pO1xyXG4gICAgICAgIHRoaXMudmlldy51aS5hZGQoY29tcGFzc1dpZGdldCwgXCJ0b3AtbGVmdFwiKTtcclxuICAgICAgICBjb25zdCBzY2FsZUJhciA9IG5ldyBTY2FsZUJhcih7IHZpZXc6IHRoaXMudmlldywgdW5pdDogXCJtZXRyaWNcIiwgc3R5bGU6IFwicnVsZXJcIiAgICB9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHNjYWxlQmFyLCB7IHBvc2l0aW9uOiBcImJvdHRvbS1sZWZ0XCJ9KTtcclxuICAgICAgICAvL2NvbnN0IGJhc2VtYXBHYWxsZXJ5ID0gbmV3IEJhc2VtYXBHYWxsZXJ5KHsgIHZpZXc6IHZpZXcsICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSAgICB9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKGJhc2VtYXBHYWxsZXJ5LCB7ICAgcG9zaXRpb246IFwidG9wLXJpZ2h0XCIgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMubGVnZW5kID0gbmV3IExlZ2VuZCh7IHZpZXc6IHRoaXMudmlldywgc3R5bGU6IHsgdHlwZTogXCJjbGFzc2ljXCIsIGxheW91dDogJ3N0YWNrJyB9LCBsYXllckluZm9zOiBbeyBsYXllcjogdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgdGl0bGU6IFwi16nXm9eR16og15fXnNen15XXqlwiIH1dIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQodGhpcy5sZWdlbmQsIFwiYm90dG9tLXJpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMubWVhc3VyZW1lbnQgPSBuZXcgTWVhc3VyZW1lbnQoeyB2aWV3OiB0aGlzLnZpZXcgfSk7XHJcbiAgICAgICAgdGhpcy52aWV3LnVpLmFkZCh0aGlzLm1lYXN1cmVtZW50LCBcImJvdHRvbS1yaWdodFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLy8vdGhpcy5idXR0b25Td2l0Y2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5zd2l0Y2hWaWV3KE1hcCwgdGhpcy5xdWVyeUZlYXR1cmVMYXllciwgIG1lYXN1cmVtZW50KTsgfSk7XHJcbiAgICAgICAgLy90aGlzLmJ1dHRvbkRpc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuZGlzdGFuY2VNZWFzdXJlbWVudCggbWVhc3VyZW1lbnQpOyB9KTtcclxuICAgICAgICAvL3RoaXMuYnV0dG9uQXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmFyZWFNZWFzdXJlbWVudChtZWFzdXJlbWVudCk7IH0pO1xyXG4gICAgICAgIC8vdGhpcy5idXR0b25DbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNsZWFyTWVhc3VyZW1lbnRzKG1lYXN1cmVtZW50KTsgfSk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgRXNyaVB3b2VyQnllbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19zb3VyY2VzIGVzcmktaW50ZXJhY3RpdmVcIik7XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgRXNyaVB3b2VyQnllbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICBjb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlc3JpLWF0dHJpYnV0aW9uX19wb3dlcmVkLWJ5XCIpOyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFc3JpUHdvZXJCeWVsZW1lbnRzMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgRXNyaVB3b2VyQnllbGVtZW50czFbaV0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBheiA9IEVzcmlQd29lckJ5ZWxlbWVudHMxW2ldLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICBpZiAoYXohPW51bGwpIGF6LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuZGVmaW5pdGlvbkV4cHJlc3Npb24gPSBcIkdVU0hfTlVNPVwiICsgdGhpcy5fZ3VzaCArIFwiIGFuZCBQQVJDRUw9XCIgKyB0aGlzLl9QQVJDRUw7XHJcbiAgICAgICAgLy90aGlzLmZlYXRlckxheWVySGVsa290LndoZW4oXHJcbiAgICAgICAgLy8gICgpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zdCBxdWVyeSA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICAgICAgLy9xdWVyeS53aGVyZSA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAgICAgLy9xdWVyeS5vdXRTcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvL3ZhciBheiA9IHRoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlGZWF0dXJlcyhxdWVyeSlcclxuICAgICAgICAgICAgLy9hei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIC8vICB2aWV3LmhpZ2hsaWdodChyZXN1bHRzKTtcclxuICAgICAgICAgICAgLy99KTsgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3QucXVlcnlFeHRlbnQocXVlcnkpXHJcbiAgICAgICAgICAgIC8vICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICByZXNwb25zZS5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSA9IHZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgLy8gICAgICB2aWV3LmdvVG8ocmVzcG9uc2UuZXh0ZW50LmV4cGFuZCgzKSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICAgLyogfSk7Ki9cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnZpZXcud2hlbkxheWVyVmlldyh0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyKS50aGVuKChsYXllclZpZXc6IGFueSAgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sYXllclZpZXcgPSBsYXllclZpZXc7XHJcbiAgICAgICAgdGhpcy5NYWtlUXVlcnkoKVxyXG4gICAgICAgIC8vdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUV4dGVudChxdWVyeSlcclxuICAgICAgICAvLyAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgIC8vICAgICAgdmlldy5nb1RvKHsgIGdlb21ldHJ5OiByZXNwb25zZS5leHRlbnQuZXhwYW5kKDMpIH0pO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy52aWV3O1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFc3JpTG9hZGVyOiBcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9ICAgXHJcblxyXG4gIG5nT25Jbml0KCkgIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1hcCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmRpdk1hc3NhZ2VUZXh0Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5RdWVyeVJlc3VsdEVtcHR5O1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlZpZXcgcmVhZHlcIik7XHJcbiAgICB9KTsgICAgXHJcbiAgfVxyXG4gIE1ha2VRdWVyeSgpIHtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZpZXc7XHJcbiAgICBjb25zdCBsYXllclZpZXcgPSB0aGlzLmxheWVyVmlldztcclxuICAgIGNvbnN0IGRpdk1hc3NhZ2UgPSB0aGlzLmRpdk1hc3NhZ2U7XHJcbiAgICBsZXQgRmVhdHVyZUhpZ2hsaWdodHMgPSB0aGlzLkZlYXR1cmVIaWdobGlnaHRzO1xyXG5cclxuICAgIGlmICh0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKEZlYXR1cmVIaWdobGlnaHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBGZWF0dXJlSGlnaGxpZ2h0cy5mb3JFYWNoKGZ1bmN0aW9uIChoaWdobGlnaHQ6IEhhbmRsZXMpIHtcclxuICAgICAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBGZWF0dXJlSGlnaGxpZ2h0cyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5jcmVhdGVRdWVyeSgpO1xyXG4gICAgICBxdWVyeS53aGVyZSA9IHRoaXMuUXVlcnlTdHI7XHJcbiAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB0aGlzLnZpZXcuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgICAgdmFyIGF6ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICBhei50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGRpdk1hc3NhZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgbGV0IEZlYXR1cmVIaWdobGlnaHRzMSA9IGxheWVyVmlldy5oaWdobGlnaHQocmVzdWx0cy5mZWF0dXJlc1swXSkgYXMgbmV2ZXI7XHJcbiAgICAgICAgICBGZWF0dXJlSGlnaGxpZ2h0cy5wdXNoKEZlYXR1cmVIaWdobGlnaHRzMSk7XHJcbiAgICAgICAgICAvKnZpZXcuZ29Ubyh7IGdlb21ldHJ5OiByZXN1bHRzLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmV4dGVudC5leHBhbmQoMykgfSk7Ki9cclxuICAgICAgICAgIC8vdmFyIHA6IFBvaW50O1xyXG4gICAgICAgICAgLy9wID0gcmVzdWx0cy5mZWF0dXJlc1swXS5nZW9tZXRyeSBhcyBQb2ludDtcclxuICAgICAgICAgIC8vcC5zcGF0aWFsUmVmZXJlbmNlID0gbmV3IFNwYXRpYWxSZWZlcmVuY2UoeyB3a2lkOiAzODU3IH0pO1xyXG4gICAgICAgICAgLy92aWV3LnNwYXRpYWxSZWZlcmVuY2UgPSBuZXcgU3BhdGlhbFJlZmVyZW5jZSh7IHdraWQ6IDM4NTcgfSk7XHJcbiAgICAgICAgICAvL3ZpZXcuZ29Ubyh7XHJcbiAgICAgICAgICAvLyAgLyp0YXJnZXQ6IFszNS4wNDk5OTUsIDMxLjc0NDAzN10qL1xyXG4gICAgICAgICAgLy8gIC8qdGFyZ2V0OiBbMjIyMDAwLCA2MzAwMDBdKi9cclxuICAgICAgICAgIC8vICAvKnRhcmdldDogcCovXHJcbiAgICAgICAgICAvLyAgdGFyZ2V0OiBbMzkyNjYzNy4xOTc3OTk5OTkzLCAzODYwNjI4LjA5MjIwMDAwMzFdXHJcbiAgICAgICAgICAvL30pXHJcbiAgICAgICAgICB2aWV3LndoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2aWV3LmdvVG8oe1xyXG4gICAgICAgICAgICAgIHRhcmdldDogcmVzdWx0cy5mZWF0dXJlc1swXSwgLy8gR3JhcGhpYyBvYmplY3RcclxuICAgICAgICAgICAgICB6b29tOiAyMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRpdk1hc3NhZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgYnV0dG9uTGVnZW5kQ2xpY2soKSB7XHJcbiAgICB0aGlzLmxlZ2VuZC52aXNpYmxlID0gIXRoaXMubGVnZW5kLnZpc2libGU7XHJcbiAgfVxyXG4gIC8vc3dpdGNoVmlldyhNYXA6IE1hcENvbnN0cnVjdG9yLCBsYXllclZpZXc6IGFueSwgbWVhc3VyZW1lbnQ6IGFueSkge1xyXG5cclxuICAvLyAgLy8gQ2xvbmUgdGhlIHZpZXdwb2ludCBmb3IgdGhlIE1hcFZpZXcgb3IgU2NlbmVWaWV3XHJcbiAgLy8gIGNvbnN0IHZpZXdwb2ludCA9IGxheWVyVmlldy52aWV3cG9pbnQuY2xvbmUoKTtcclxuICAvLyAgLy8gR2V0IHRoZSB2aWV3IHR5cGUsIGVpdGhlciAyZCBvciAzZFxyXG4gIC8vICBjb25zdCB0eXBlID0gbGF5ZXJWaWV3LnR5cGU7XHJcblxyXG4gIC8vICAvLyBDbGVhciBhbnkgbWVhc3VyZW1lbnRzIHRoYXQgaGFkIGJlZW4gZHJhd25cclxuICAvLyAgdGhpcy5jbGVhck1lYXN1cmVtZW50cyhtZWFzdXJlbWVudCk7XHJcblxyXG4gIC8vICAvLyBSZXNldCB0aGUgbWVhc3VyZW1lbnQgdG9vbHMgaW4gdGhlIGRpdlxyXG4gIC8vICBsYXllclZpZXcuY29udGFpbmVyID0gbnVsbDtcclxuICAvLyAgbGF5ZXJWaWV3ID0gbnVsbDtcclxuICAvLyAgLy8gU2V0IHRoZSB2aWV3IGJhc2VkIG9uIHdoZXRoZXIgaXQgc3dpdGNoZWQgdG8gMkQgTWFwVmlldyBvciAzRCBTY2VuZVZpZXdcclxuICAvLyAgbGF5ZXJWaWV3ID0gTWFwO1xyXG4gIC8vICBsYXllclZpZXcuc2V0KHtcclxuICAvLyAgICBjb250YWluZXI6IFwidmlld0RpdlwiLFxyXG4gIC8vICAgIHZpZXdwb2ludDogdmlld3BvaW50XHJcbiAgLy8gIH0pO1xyXG4gIC8vfVxyXG4gIC8vY2xlYXJNZWFzdXJlbWVudHMobWVhc3VyZW1lbnQ6IGFueSkge1xyXG4gIC8vICBjb25zdCBkaXN0YW5jZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXN0YW5jZScpO1xyXG4gIC8vICBjb25zdCBhcmVhQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWEnKTtcclxuICAvLyAgdGhpcy5idXR0b25EaXN0YW5jZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIC8vICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAvLyAgbWVhc3VyZW1lbnQuY2xlYXIoKTtcclxuICAvL31cclxuICBkaXN0YW5jZU1lYXN1cmVtZW50KCAgKSB7XHJcbiAgICB0aGlzLm1lYXN1cmVtZW50LmFjdGl2ZVRvb2wgID0gXCJkaXN0YW5jZVwiOyAgICBcclxuICAgIHRoaXMuYnV0dG9uRGlzdGFuY2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYnV0dG9uQXJlYS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBhcmVhTWVhc3VyZW1lbnQoICkge1xyXG4gICAgdGhpcy5tZWFzdXJlbWVudC5hY3RpdmVUb29sID0gXCJhcmVhXCI7XHJcbiAgICB0aGlzLmJ1dHRvbkRpc3RhbmNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmJ1dHRvbkFyZWEuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEN1c3RvbVN0eWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+IHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gIGxpbmsuaHJlZiA9IHVybDtcclxuICBjb25zdCBpc1JlYWR5OiBQcm9taXNlPEhUTUxMaW5rRWxlbWVudD4gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4gcmVzb2x2ZShsaW5rKVxyXG4gIH0pXHJcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICByZXR1cm4gaXNSZWFkeVxyXG59XHJcbiJdfQ==