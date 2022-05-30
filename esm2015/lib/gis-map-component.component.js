import { __awaiter } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { loadModules } from "esri-loader";
//import esri = __esri;
//import WebMap from "@arcgis/core/WebMap";
//import MapView from "@arcgis/core/views/MapView";
//import LayerList from "@arcgis/core/widgets/LayerList";
import Zoom from "@arcgis/core/widgets/Zoom";
import * as i0 from "@angular/core";
import * as i1 from "../GisBase.service";
export class GisMapComponentComponent {
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
GisMapComponentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: GisMapComponentComponent, deps: [{ token: i1.GisBaseService }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.GisBaseService }]; }, propDecorators: { content: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLHVCQUF1QjtBQUV2QiwyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELHlEQUF5RDtBQUN6RCxPQUFPLElBQUksTUFBTSwyQkFBMkIsQ0FBQzs7O0FBdUI3QyxNQUFNLE9BQU8sd0JBQXdCO0lBcUNuQywwQ0FBMEM7SUFDMUMsd0RBQXdEO0lBQ3hELHlEQUF5RDtJQUV6RCxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2Q2xELGFBQVEsR0FBRyxlQUFlLENBQUMscURBQXFELENBQUMsQ0FBQztJQXVDNUIsQ0FBQztJQXBDdkQsSUFBZ0QsT0FBTyxDQUFDLE9BQW1CO1FBQ3pFLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FBRTtJQUM1QyxDQUFDO0lBRUQsSUFBaUQsUUFBUSxDQUFDLE9BQW1CO1FBQzNFLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7U0FBRTtJQUMvQyxDQUFDO0lBRUQsSUFBc0QsUUFBUSxDQUFDLE9BQW1CO1FBQ2hGLElBQUksT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQztTQUFFO0lBQ3BELENBQUM7SUFRRCxJQUNJLFNBQVMsQ0FBQyxLQUFlO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxD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QUFDLEdBQVc7SUFDekMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDaEIsTUFBTSxPQUFPLEdBQTZCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsICBPdXRwdXQsICBFdmVudEVtaXR0ZXIsICBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbiBcclxuaW1wb3J0IHsgbG9hZE1vZHVsZXMgfSBmcm9tIFwiZXNyaS1sb2FkZXJcIjtcclxuLy9pbXBvcnQgZXNyaSA9IF9fZXNyaTtcclxuXHJcbi8vaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xyXG4vL2ltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG4vL2ltcG9ydCBMYXllckxpc3QgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xheWVyTGlzdFwiO1xyXG5pbXBvcnQgWm9vbSBmcm9tIFwiQGFyY2dpcy9jb3JlL3dpZGdldHMvWm9vbVwiO1xyXG4vL2ltcG9ydCBTZWFyY2ggZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1NlYXJjaFwiO1xyXG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllclwiO1xyXG5pbXBvcnQgTGF5ZXJWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvbGF5ZXJzL0xheWVyVmlld1wiO1xyXG5pbXBvcnQgeyBHaXNCYXNlU2VydmljZSB9IGZyb20gJy4uL0dpc0Jhc2Uuc2VydmljZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdHaXNCYXNlLUdpc01hcENvbXBvbmVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuIFxyXG48ZGl2IGNsYXNzPSdheicgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDogMTAwJSBcIj5cclxuICAgIFxyXG4gXHJcbiAgICA8ZGl2ICNtYXBWaWV3Tm9kZSBzdHlsZT1cIndpZHRoOjgwJTtoZWlnaHQ6IDgwJTttYXJnaW46IGF1dG87cGFkZGluZzo1MHB4O21hcmdpbjogNTBweCBcIj48L2Rpdj5cclxuICBcclxuPC9kaXY+XHJcbiAgYCxcclxuLy8gICA8IGRpdiAjbGF5ZXJMaXN0RGl2ID4gPC9kaXY+XHJcblxyXG4vLzwgZGl2ICNiYXNlbWFwR2FsbGVyeURpdiA+IDwvZGl2PlxyXG59KVxyXG4gIFxyXG5leHBvcnQgY2xhc3MgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbGlua1Byb20gPSBsb2FkQ3VzdG9tU3R5bGUoJ2h0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjIvZXNyaS90aGVtZXMvZGFyay9tYWluLmNzcycpO1xyXG5cclxuICBwcml2YXRlIG1hcFZpZXdFbCE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFwVmlld05vZGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudChjb250ZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udGVudCkgeyB0aGlzLm1hcFZpZXdFbCA9IGNvbnRlbnQ7IH1cclxuICB9XHJcbiAgcHJpdmF0ZSBsYXllckxpc3REaXYhOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2xheWVyTGlzdERpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50Mihjb250ZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udGVudCkgeyB0aGlzLmxheWVyTGlzdERpdiA9IGNvbnRlbnQ7IH1cclxuICB9XHJcbiAgcHJpdmF0ZSBiYXNlbWFwR2FsbGVyeURpdiE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYmFzZW1hcEdhbGxlcnlEaXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgY29udGVudDEoY29udGVudDogRWxlbWVudFJlZikge1xyXG4gICAgaWYgKGNvbnRlbnQpIHsgdGhpcy5iYXNlbWFwR2FsbGVyeURpdiA9IGNvbnRlbnQ7IH1cclxuICB9XHJcblxyXG4gICBcclxuICBwcml2YXRlIGxheWVySGVsa290VmlldyE6IExheWVyVmlld1xyXG4gIHByaXZhdGUgTGF5ZXJMaXN0ITogc3RyaW5nW107XHJcbiAgcHJpdmF0ZSBRdWVyeUxheWVyITogc3RyaW5nO1xyXG4gIHByaXZhdGUgUXVlcnlTdHIhOiBzdHJpbmc7XHJcbiAgXHJcbiAgQElucHV0KClcclxuICBzZXQgbGF5ZXJMaXN0KHZhbHVlOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5MYXllckxpc3QgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlMYXllcih2YWx1ZTogc3RyaW5nKSB7ICAgIFxyXG4gICAgdGhpcy5RdWVyeUxheWVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHF1ZXJ5U3RyKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuUXVlcnlTdHIgPSB2YWx1ZTtcclxuICB9XHJcbiAgIFxyXG4gIHByaXZhdGUgcXVlcnlGZWF0dXJlTGF5ZXIhIDogRmVhdHVyZUxheWVyXHJcbiAgLy9wdWJsaWMgbWFwVmlldzogTWFwVmlldyA9IG5ldyBNYXBWaWV3KCk7XHJcbiAgLy9wdWJsaWMgZmVhdGVyTGF5ZXI6IEZlYXR1cmVMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoKTtcclxuICAvL3B1YmxpYyBmZWF0ZXJMYXllcjE6IEZlYXR1cmVMYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnaXNCYXNlU2VydmljZTogR2lzQmFzZVNlcnZpY2UpIHsgfVxyXG5cclxuICBcclxuICBhc3luYyBpbml0aWFsaXplTWFwKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgdGhpcy5saW5rUHJvbTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IFtNYXBWaWV3LCBXZWJNYXAsIExheWVyTGlzdCwgU2VhcmNoICAsIEZlYXR1cmVMYXllcl0gPSBhd2FpdCBsb2FkTW9kdWxlcyhbICAgICAgICBcclxuICAgICAgICBcImVzcmkvdmlld3MvTWFwVmlld1wiLCBcImVzcmkvV2ViTWFwXCIsXHJcbiAgICAgICAgXCJlc3JpL3dpZGdldHMvTGF5ZXJMaXN0XCIsIFwiZXNyaS93aWRnZXRzL1NlYXJjaFwiLFxyXG4gICAgICAgIFwiZXNyaS9sYXllcnMvRmVhdHVyZUxheWVyXCJcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBjb25zdCB3ZWJNYXAgPSBuZXcgV2ViTWFwKHtcclxuICAgICAgICBiYXNlbWFwOiBcInRvcG9cIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCB2aWV3ID0gbmV3IE1hcFZpZXcoe1xyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBWaWV3RWwubmF0aXZlRWxlbWVudCxcclxuICAgICAgICBtYXA6IHdlYk1hcFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyAgbGV0IGZlYXRlckxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgLy91cmw6IFwiaHR0cHM6Ly9zZXJ2aWNlczIuYXJjZ2lzLmNvbS91dE5Ocm1YYjRJWk9MWFhzL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0pORklMRm9yZXN0L0ZlYXR1cmVTZXJ2ZXIvMFwiXHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8va2tscmdtLmtrbC5vcmcuaWwva2tsYWdzL3Jlc3Qvc2VydmljZXMvYWxsTGF5ZXJzRm9yQWdvbC9GZWF0dXJlU2VydmVyLzdcIlxyXG4gICAgLy99KTtcclxuICAgIC8vbGV0IGZlYXRlckxheWVyMSA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xyXG4gICAgLy8gIHVybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlclwiICAgICAgXHJcbiAgICAvL30pO1xyXG5cclxuICAgICAgdGhpcy5MYXllckxpc3QuZm9yRWFjaCgobGF5ZXJTdHIpPT4gICB7XHJcbiAgICAgICAgY29uc3QgZmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAgICAgICB1cmw6IHRoaXMuZ2lzQmFzZVNlcnZpY2UuYXBpVXJsICtcIi9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9cIisgbGF5ZXJTdHJcclxuICAgICAgICB9KTtcclxuICAgICAgICB3ZWJNYXAuYWRkKGZlYXR1cmVMYXllcik7XHJcbiAgICAgICAgaWYgKGxheWVyU3RyLmluY2x1ZGVzKHRoaXMuUXVlcnlMYXllcikpIHsgdGhpcy5xdWVyeUZlYXR1cmVMYXllciA9IGZlYXR1cmVMYXllciB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgYXdhaXQgdmlldy53aGVuKCgpID0+IHtcclxuICAgICAgICB2YXIgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHZpZXcgIH0pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQobGF5ZXJMaXN0LCBcInRvcC1yaWdodFwiKTtcclxuICAgICAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCh7IHZpZXc6IHZpZXd9KTtcclxuICAgICAgICAvL3ZpZXcudWkuYWRkKHNlYXJjaCwgXCJ0b3AtcmlnaHRcIik7XHJcbiAgICAgICAgdmFyIHpvb20gPSBuZXcgWm9vbSh7ICB2aWV3OiB2aWV3LCAgbGF5b3V0OiBcImhvcml6b250YWxcIiAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZCh6b29tLCBcImJvdHRvbS1yaWdodFwiKTtcclxuXHJcbiAgICAgICAgLy9jb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktYXR0cmlidXRpb25fX3NvdXJjZXMgZXNyaS1pbnRlcmFjdGl2ZVwiKTtcclxuICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgRXNyaVB3b2VyQnllbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICBFc3JpUHdvZXJCeWVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIGNvbnN0IEVzcmlQd29lckJ5ZWxlbWVudHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktYXR0cmlidXRpb25fX3Bvd2VyZWQtYnlcIik7ICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBFc3JpUHdvZXJCeWVsZW1lbnRzMVtpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAgIGNvbnN0IGF6ID0gRXNyaVB3b2VyQnllbGVtZW50czFbaV0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgIGlmIChheiE9bnVsbCkgYXouc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3Qud2hlbihcclxuICAgICAgICAvLyAgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnN0IHF1ZXJ5ID0gdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5jcmVhdGVRdWVyeSgpO1xyXG4gICAgICAgICAgICAvL3F1ZXJ5LndoZXJlID0gXCJHVVNIX05VTT1cIiArIHRoaXMuX2d1c2ggKyBcIiBhbmQgUEFSQ0VMPVwiICsgdGhpcy5fUEFSQ0VMO1xyXG4gICAgICAgICAgICAvL3F1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgICAgIC8vdmFyIGF6ID0gdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICAgICAgICAvL2F6LnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgLy8gIHZpZXcuaGlnaGxpZ2h0KHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAvL30pOyAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5xdWVyeUV4dGVudChxdWVyeSlcclxuICAgICAgICAgICAgLy8gIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvLyAgICAgIHZpZXcuZ29UbyhyZXNwb25zZS5leHRlbnQuZXhwYW5kKDMpKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gIH0pO1xyXG4gICAgICAgICAvKiB9KTsqL1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHZpZXcud2hlbkxheWVyVmlldyh0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyKS50aGVuKChsYXllclZpZXc6IGFueSAgKSA9PiB7XHJcbiAgICAgICAgLy90aGlzLmxheWVySGVsa290VmlldyA9IGxheWVyVmlldztcclxuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICBxdWVyeS53aGVyZSA9ICB0aGlzLlF1ZXJ5U3RyO1xyXG4gICAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgdmFyIGF6ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICAgIGF6LnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgICAgICAgIGxheWVyVmlldy5oaWdobGlnaHQocmVzdWx0cy5mZWF0dXJlc1swXSk7XHJcbiAgICAgICAgICB2aWV3LmdvVG8oeyBnZW9tZXRyeTogcmVzdWx0cy5mZWF0dXJlc1swXS5nZW9tZXRyeS5leHRlbnQuZXhwYW5kKDMpIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUV4dGVudChxdWVyeSlcclxuICAgICAgICAvLyAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIC8vICAgIGlmIChyZXNwb25zZS5leHRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgIC8vICAgICAgdmlldy5nb1RvKHsgIGdlb21ldHJ5OiByZXNwb25zZS5leHRlbnQuZXhwYW5kKDMpIH0pO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXNyaUxvYWRlcjogXCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9ICAgXHJcblxyXG4gIG5nT25Jbml0KCkgIHtcclxuICAgIFxyXG4gICAgdGhpcy5pbml0aWFsaXplTWFwKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVmlldyByZWFkeVwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL2NvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgLy8gIGJhc2VtYXA6IFwidG9wb1wiXHJcbiAgICAvL30pO1xyXG4gICAgLy93ZWJNYXAuYWRkKHRoaXMuZmVhdGVyTGF5ZXIpO1xyXG4gICAgLy93ZWJNYXAuYWRkKHRoaXMuZmVhdGVyTGF5ZXIxKTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL21hcFZpZXcgPSBuZXcgTWFwVmlldyh7XHJcbiAgICAvLyAgbWFwOiB3ZWJNYXAsXHJcbiAgICAvLyAgY29udGFpbmVyOiB0aGlzLm1hcFZpZXdFbC5uYXRpdmVFbGVtZW50XHJcbiAgICAvL30pO1xyXG5cclxuICAgIFxyXG4gICAgLy9sZXQgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHRoaXMubWFwVmlldyB9KTtcclxuICAgIC8vdGhpcy5tYXBWaWV3LnVpLmFkZChsYXllckxpc3QsIHsgcG9zaXRpb246IFwidG9wLWxlZnRcIiB9KTtcclxuXHJcbiAgICAvL3RoaXMubWFwVmlldy53aGVuKCgpID0+IHtcclxuICAgIC8vICBsZXQgbGF5ZXJMaXN0ID0gbmV3IExheWVyTGlzdCh7IHZpZXc6IHRoaXMubWFwVmlldywgY29udGFpbmVyOiB0aGlzLmxheWVyTGlzdERpdi5uYXRpdmVFbGVtZW50ICB9KTtcclxuICAgIC8vICB0aGlzLm1hcFZpZXcudWkuYWRkKGxheWVyTGlzdCwgeyBwb3NpdGlvbjogXCJ0b3AtbGVmdFwiIH0pO1xyXG4gICAgLy8gIGNvbnN0IHNlYXJjaCA9IG5ldyBTZWFyY2goeyB2aWV3OiB0aGlzLm1hcFZpZXcsIGNvbnRhaW5lcjogdGhpcy5iYXNlbWFwR2FsbGVyeURpdi5uYXRpdmVFbGVtZW50IH0pO1xyXG4gICAgLy8gIHRoaXMubWFwVmlldy51aS5hZGQoc2VhcmNoLCBcInRvcC1yaWdodFwiKTtcclxuICAgICBcclxuXHJcblxyXG4gICAgICBcclxuICAgIC8vfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDdXN0b21TdHlsZSh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTExpbmtFbGVtZW50PiB7XHJcbiAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICBsaW5rLmhyZWYgPSB1cmw7XHJcbiAgY29uc3QgaXNSZWFkeTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICBsaW5rLm9ubG9hZCA9ICgpID0+IHJlc29sdmUobGluaylcclxuICB9KVxyXG4gIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgcmV0dXJuIGlzUmVhZHlcclxufVxyXG4iXX0=