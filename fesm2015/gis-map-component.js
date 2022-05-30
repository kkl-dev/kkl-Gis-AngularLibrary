import * as i0 from '@angular/core';
import { Injectable, Inject, Component, ViewChild, Input, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { loadModules } from 'esri-loader';
import Zoom from '@arcgis/core/widgets/Zoom';

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
    //public mapView: MapView = new MapView();
    //public featerLayer: FeatureLayer = new FeatureLayer();
    //public featerLayer1: FeatureLayer = new FeatureLayer();
    constructor(gisBaseService) {
        this.gisBaseService = gisBaseService;
        this.linkProm = loadCustomStyle('https://js.arcgis.com/4.2/esri/themes/dark/main.css');
    }
    set content(content) {
        if (content) {
            this.mapViewEl = content;
        }
    }
    set content2(content) {
        if (content) {
            this.layerListDiv = content;
        }
    }
    set content1(content) {
        if (content) {
            this.basemapGalleryDiv = content;
        }
    }
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
                    //this.layerHelkotView = layerView;
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
        //const webMap = new WebMap({
        //  basemap: "topo"
        //});
        //webMap.add(this.featerLayer);
        //webMap.add(this.featerLayer1);
        //mapView = new MapView({
        //  map: webMap,
        //  container: this.mapViewEl.nativeElement
        //});
        //let layerList = new LayerList({ view: this.mapView });
        //this.mapView.ui.add(layerList, { position: "top-left" });
        //this.mapView.when(() => {
        //  let layerList = new LayerList({ view: this.mapView, container: this.layerListDiv.nativeElement  });
        //  this.mapView.ui.add(layerList, { position: "top-left" });
        //  const search = new Search({ view: this.mapView, container: this.basemapGalleryDiv.nativeElement });
        //  this.mapView.ui.add(search, "top-right");
        //});
    }
}
GisMapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, deps: [{ token: GisBaseService }], target: i0.ɵɵFactoryTarget.Component });
GisMapComponentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GisMapComponentComponent, selector: "GisBase-GisMapComponent", inputs: { layerList: "layerList", queryLayer: "queryLayer", queryStr: "queryStr" }, viewQueries: [{ propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }, { propertyName: "content2", first: true, predicate: ["layerListDiv"], descendants: true, static: true }, { propertyName: "content1", first: true, predicate: ["basemapGalleryDiv"], descendants: true, static: true }], ngImport: i0, template: `
 
<div class='az' style="width:100%;height: 100% ">
    
 
    <div #mapViewNode style="width:80%;height: 80%;margin: auto;padding:50px;margin: 50px "></div>
  
</div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'GisBase-GisMapComponent',
                    template: `
 
<div class='az' style="width:100%;height: 100% ">
    
 
    <div #mapViewNode style="width:80%;height: 80%;margin: auto;padding:50px;margin: 50px "></div>
  
</div>
  `,
                    //   < div #layerListDiv > </div>
                    //< div #basemapGalleryDiv > </div>
                }]
        }], ctorParameters: function () { return [{ type: GisBaseService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['mapViewNode', { static: true }]
            }], content2: [{
                type: ViewChild,
                args: ['layerListDiv', { static: true }]
            }], content1: [{
                type: ViewChild,
                args: ['basemapGalleryDiv', { static: true }]
            }], layerList: [{
                type: Input
            }], queryLayer: [{
                type: Input
            }], queryStr: [{
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
