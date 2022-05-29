import { __awaiter } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { loadModules } from "esri-loader";
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
                    });
                    this.queryFeatureLayer.queryExtent(query)
                        .then(response => {
                        if (response.extent !== null) {
                            response.extent.spatialReference = view.spatialReference;
                            view.goTo({ geometry: response.extent.expand(3) });
                        }
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQXNCLFNBQVMsRUFBcUIsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUdoSSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUEyQjFDLE1BQU0sT0FBTyx3QkFBd0I7SUFxQ25DLDBDQUEwQztJQUMxQyx3REFBd0Q7SUFDeEQseURBQXlEO0lBRXpELFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXZDbEQsYUFBUSxHQUFHLGVBQWUsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBdUM1QixDQUFDO0lBcEN2RCxJQUFnRCxPQUFPLENBQUMsT0FBbUI7UUFDekUsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUFFO0lBQzVDLENBQUM7SUFFRCxJQUFpRCxRQUFRLENBQUMsT0FBbUI7UUFDM0UsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztTQUFFO0lBQy9DLENBQUM7SUFFRCxJQUFzRCxRQUFRLENBQUMsT0FBbUI7UUFDaEYsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO1NBQUU7SUFDcEQsQ0FBQztJQVFELElBQ0ksU0FBUyxDQUFDLEtBQWU7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUNELElBQ0ksVUFBVSxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FB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Q0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7SUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDaEIsTUFBTSxPQUFPLEdBQTZCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsICBPdXRwdXQsICBFdmVudEVtaXR0ZXIsICBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbiBcclxuaW1wb3J0IHsgbG9hZE1vZHVsZXMgfSBmcm9tIFwiZXNyaS1sb2FkZXJcIjtcclxuLy9pbXBvcnQgZXNyaSA9IF9fZXNyaTtcclxuXHJcbi8vaW1wb3J0IFdlYk1hcCBmcm9tIFwiQGFyY2dpcy9jb3JlL1dlYk1hcFwiO1xyXG4vL2ltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xyXG4vL2ltcG9ydCBMYXllckxpc3QgZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL0xheWVyTGlzdFwiO1xyXG4vL2ltcG9ydCBTZWFyY2ggZnJvbSBcIkBhcmNnaXMvY29yZS93aWRnZXRzL1NlYXJjaFwiO1xyXG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gXCJAYXJjZ2lzL2NvcmUvbGF5ZXJzL0ZlYXR1cmVMYXllclwiO1xyXG5pbXBvcnQgTGF5ZXJWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvbGF5ZXJzL0xheWVyVmlld1wiO1xyXG5pbXBvcnQgeyBHaXNCYXNlU2VydmljZSB9IGZyb20gJy4uL0dpc0Jhc2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ0dpc0Jhc2UtR2lzTWFwQ29tcG9uZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gXHJcbjxkaXYgY2xhc3M9J2F6JyBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlIFwiPlxyXG4gICAgXHJcbiBcclxuICAgIDxkaXYgI21hcFZpZXdOb2RlIHN0eWxlPVwid2lkdGg6ODAlO2hlaWdodDogODAlO21hcmdpbjogYXV0bztwYWRkaW5nOjUwcHg7bWFyZ2luOiA1MHB4IFwiPjwvZGl2PlxyXG4gIFxyXG48L2Rpdj5cclxuICBgLFxyXG4vLyAgIDwgZGl2ICNsYXllckxpc3REaXYgPiA8L2Rpdj5cclxuXHJcbi8vPCBkaXYgI2Jhc2VtYXBHYWxsZXJ5RGl2ID4gPC9kaXY+XHJcbn0pXHJcbiAgXHJcbmV4cG9ydCBjbGFzcyBHaXNNYXBDb21wb25lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBsaW5rUHJvbSA9IGxvYWRDdXN0b21TdHlsZSgnaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMi9lc3JpL3RoZW1lcy9kYXJrL21haW4uY3NzJyk7XHJcblxyXG4gIHByaXZhdGUgbWFwVmlld0VsITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtYXBWaWV3Tm9kZScsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50KGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmIChjb250ZW50KSB7IHRoaXMubWFwVmlld0VsID0gY29udGVudDsgfVxyXG4gIH1cclxuICBwcml2YXRlIGxheWVyTGlzdERpdiE6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbGF5ZXJMaXN0RGl2JywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQyKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIGlmIChjb250ZW50KSB7IHRoaXMubGF5ZXJMaXN0RGl2ID0gY29udGVudDsgfVxyXG4gIH1cclxuICBwcml2YXRlIGJhc2VtYXBHYWxsZXJ5RGl2ITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdiYXNlbWFwR2FsbGVyeURpdicsIHsgc3RhdGljOiB0cnVlIH0pIHNldCBjb250ZW50MShjb250ZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICBpZiAoY29udGVudCkgeyB0aGlzLmJhc2VtYXBHYWxsZXJ5RGl2ID0gY29udGVudDsgfVxyXG4gIH1cclxuXHJcbiAgIFxyXG4gIHByaXZhdGUgbGF5ZXJIZWxrb3RWaWV3ITogTGF5ZXJWaWV3XHJcbiAgcHJpdmF0ZSBMYXllckxpc3QhOiBzdHJpbmdbXTtcclxuICBwcml2YXRlIFF1ZXJ5TGF5ZXIhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBRdWVyeVN0ciE6IHN0cmluZztcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllckxpc3QodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLkxheWVyTGlzdCA9IHZhbHVlO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBxdWVyeUxheWVyKHZhbHVlOiBzdHJpbmcpIHsgICAgXHJcbiAgICB0aGlzLlF1ZXJ5TGF5ZXIgPSB2YWx1ZTtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgcXVlcnlTdHIodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5RdWVyeVN0ciA9IHZhbHVlO1xyXG4gIH1cclxuICAgXHJcbiAgcHJpdmF0ZSBxdWVyeUZlYXR1cmVMYXllciEgOiBGZWF0dXJlTGF5ZXJcclxuICAvL3B1YmxpYyBtYXBWaWV3OiBNYXBWaWV3ID0gbmV3IE1hcFZpZXcoKTtcclxuICAvL3B1YmxpYyBmZWF0ZXJMYXllcjogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xyXG4gIC8vcHVibGljIGZlYXRlckxheWVyMTogRmVhdHVyZUxheWVyID0gbmV3IEZlYXR1cmVMYXllcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdpc0Jhc2VTZXJ2aWNlOiBHaXNCYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIFxyXG4gIGFzeW5jIGluaXRpYWxpemVNYXAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxpbmtQcm9tO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgW01hcFZpZXcsIFdlYk1hcCwgTGF5ZXJMaXN0LCBTZWFyY2ggICwgRmVhdHVyZUxheWVyXSA9IGF3YWl0IGxvYWRNb2R1bGVzKFsgICAgICAgIFxyXG4gICAgICAgIFwiZXNyaS92aWV3cy9NYXBWaWV3XCIsIFwiZXNyaS9XZWJNYXBcIixcclxuICAgICAgICBcImVzcmkvd2lkZ2V0cy9MYXllckxpc3RcIiwgXCJlc3JpL3dpZGdldHMvU2VhcmNoXCIsXHJcbiAgICAgICAgXCJlc3JpL2xheWVycy9GZWF0dXJlTGF5ZXJcIlxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIGNvbnN0IHdlYk1hcCA9IG5ldyBXZWJNYXAoe1xyXG4gICAgICAgIGJhc2VtYXA6IFwidG9wb1wiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IHZpZXcgPSBuZXcgTWFwVmlldyh7XHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcFZpZXdFbC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIG1hcDogd2ViTWFwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vICBsZXQgZmVhdGVyTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgIC8vICAvL3VybDogXCJodHRwczovL3NlcnZpY2VzMi5hcmNnaXMuY29tL3V0Tk5ybVhiNElaT0xYWHMvQXJjR0lTL3Jlc3Qvc2VydmljZXMvSk5GSUxGb3Jlc3QvRmVhdHVyZVNlcnZlci8wXCJcclxuICAgIC8vICB1cmw6IFwiaHR0cHM6Ly9ra2xyZ20ua2tsLm9yZy5pbC9ra2xhZ3MvcmVzdC9zZXJ2aWNlcy9hbGxMYXllcnNGb3JBZ29sL0ZlYXR1cmVTZXJ2ZXIvN1wiXHJcbiAgICAvL30pO1xyXG4gICAgLy9sZXQgZmVhdGVyTGF5ZXIxID0gbmV3IEZlYXR1cmVMYXllcih7XHJcbiAgICAvLyAgdXJsOiBcImh0dHBzOi8vc2VydmljZXMyLmFyY2dpcy5jb20vdXROTnJtWGI0SVpPTFhYcy9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9KTkZJTEZvcmVzdC9GZWF0dXJlU2VydmVyXCIgICAgICBcclxuICAgIC8vfSk7XHJcblxyXG4gICAgICB0aGlzLkxheWVyTGlzdC5mb3JFYWNoKChsYXllclN0cik9PiAgIHtcclxuICAgICAgICBjb25zdCBmZWF0dXJlTGF5ZXIgPSBuZXcgRmVhdHVyZUxheWVyKHtcclxuICAgICAgICAgIHVybDogdGhpcy5naXNCYXNlU2VydmljZS5hcGlVcmwgK1wiL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1wiKyBsYXllclN0clxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdlYk1hcC5hZGQoZmVhdHVyZUxheWVyKTtcclxuICAgICAgICBpZiAobGF5ZXJTdHIuaW5jbHVkZXModGhpcy5RdWVyeUxheWVyKSkgeyB0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyID0gZmVhdHVyZUxheWVyIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBhd2FpdCB2aWV3LndoZW4oKCkgPT4ge1xyXG4gICAgICAgIHZhciBsYXllckxpc3QgPSBuZXcgTGF5ZXJMaXN0KHsgdmlldzogdmlldyAgfSk7XHJcbiAgICAgICAgLy92aWV3LnVpLmFkZChsYXllckxpc3QsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKHsgdmlldzogdmlld30pO1xyXG4gICAgICAgIC8vdmlldy51aS5hZGQoc2VhcmNoLCBcInRvcC1yaWdodFwiKTtcclxuXHJcbiAgICAgICAgLy9jb25zdCBFc3JpUHdvZXJCeWVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktYXR0cmlidXRpb25fX3NvdXJjZXMgZXNyaS1pbnRlcmFjdGl2ZVwiKTtcclxuICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgRXNyaVB3b2VyQnllbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICBFc3JpUHdvZXJCeWVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIGNvbnN0IEVzcmlQd29lckJ5ZWxlbWVudHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVzcmktYXR0cmlidXRpb25fX3Bvd2VyZWQtYnlcIik7ICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEVzcmlQd29lckJ5ZWxlbWVudHMxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBFc3JpUHdvZXJCeWVsZW1lbnRzMVtpXS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6bm9uZVwiKTtcclxuICAgICAgICAgIGNvbnN0IGF6ID0gRXNyaVB3b2VyQnllbGVtZW50czFbaV0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgIGlmIChheiE9bnVsbCkgYXouc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5kZWZpbml0aW9uRXhwcmVzc2lvbiA9IFwiR1VTSF9OVU09XCIgKyB0aGlzLl9ndXNoICsgXCIgYW5kIFBBUkNFTD1cIiArIHRoaXMuX1BBUkNFTDtcclxuICAgICAgICAvL3RoaXMuZmVhdGVyTGF5ZXJIZWxrb3Qud2hlbihcclxuICAgICAgICAvLyAgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnN0IHF1ZXJ5ID0gdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5jcmVhdGVRdWVyeSgpO1xyXG4gICAgICAgICAgICAvL3F1ZXJ5LndoZXJlID0gXCJHVVNIX05VTT1cIiArIHRoaXMuX2d1c2ggKyBcIiBhbmQgUEFSQ0VMPVwiICsgdGhpcy5fUEFSQ0VMO1xyXG4gICAgICAgICAgICAvL3F1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgICAgIC8vdmFyIGF6ID0gdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICAgICAgICAvL2F6LnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgLy8gIHZpZXcuaGlnaGxpZ2h0KHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAvL30pOyAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5mZWF0ZXJMYXllckhlbGtvdC5xdWVyeUV4dGVudChxdWVyeSlcclxuICAgICAgICAgICAgLy8gIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAvLyAgICAgIHZpZXcuZ29UbyhyZXNwb25zZS5leHRlbnQuZXhwYW5kKDMpKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gIH0pO1xyXG4gICAgICAgICAvKiB9KTsqL1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHZpZXcud2hlbkxheWVyVmlldyh0aGlzLnF1ZXJ5RmVhdHVyZUxheWVyKS50aGVuKChsYXllclZpZXc6IGFueSAgKSA9PiB7XHJcbiAgICAgICAgLy90aGlzLmxheWVySGVsa290VmlldyA9IGxheWVyVmlldztcclxuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnlGZWF0dXJlTGF5ZXIuY3JlYXRlUXVlcnkoKTtcclxuICAgICAgICBxdWVyeS53aGVyZSA9ICB0aGlzLlF1ZXJ5U3RyO1xyXG4gICAgICAgIHF1ZXJ5Lm91dFNwYXRpYWxSZWZlcmVuY2UgPSB2aWV3LnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICAgICAgdmFyIGF6ID0gdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUZlYXR1cmVzKHF1ZXJ5KVxyXG4gICAgICAgIGF6LnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgICAgICAgIGxheWVyVmlldy5oaWdobGlnaHQocmVzdWx0cy5mZWF0dXJlc1swXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWVyeUZlYXR1cmVMYXllci5xdWVyeUV4dGVudChxdWVyeSlcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmV4dGVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJlc3BvbnNlLmV4dGVudC5zcGF0aWFsUmVmZXJlbmNlID0gdmlldy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgIHZpZXcuZ29Ubyh7IGdlb21ldHJ5OiByZXNwb25zZS5leHRlbnQuZXhwYW5kKDMpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFc3JpTG9hZGVyOiBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH0gICBcclxuXHJcbiAgbmdPbkluaXQoKSAge1xyXG4gICAgXHJcbiAgICB0aGlzLmluaXRpYWxpemVNYXAoKS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJWaWV3IHJlYWR5XCIpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vY29uc3Qgd2ViTWFwID0gbmV3IFdlYk1hcCh7XHJcbiAgICAvLyAgYmFzZW1hcDogXCJ0b3BvXCJcclxuICAgIC8vfSk7XHJcbiAgICAvL3dlYk1hcC5hZGQodGhpcy5mZWF0ZXJMYXllcik7XHJcbiAgICAvL3dlYk1hcC5hZGQodGhpcy5mZWF0ZXJMYXllcjEpO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vbWFwVmlldyA9IG5ldyBNYXBWaWV3KHtcclxuICAgIC8vICBtYXA6IHdlYk1hcCxcclxuICAgIC8vICBjb250YWluZXI6IHRoaXMubWFwVmlld0VsLm5hdGl2ZUVsZW1lbnRcclxuICAgIC8vfSk7XHJcblxyXG4gICAgXHJcbiAgICAvL2xldCBsYXllckxpc3QgPSBuZXcgTGF5ZXJMaXN0KHsgdmlldzogdGhpcy5tYXBWaWV3IH0pO1xyXG4gICAgLy90aGlzLm1hcFZpZXcudWkuYWRkKGxheWVyTGlzdCwgeyBwb3NpdGlvbjogXCJ0b3AtbGVmdFwiIH0pO1xyXG5cclxuICAgIC8vdGhpcy5tYXBWaWV3LndoZW4oKCkgPT4ge1xyXG4gICAgLy8gIGxldCBsYXllckxpc3QgPSBuZXcgTGF5ZXJMaXN0KHsgdmlldzogdGhpcy5tYXBWaWV3LCBjb250YWluZXI6IHRoaXMubGF5ZXJMaXN0RGl2Lm5hdGl2ZUVsZW1lbnQgIH0pO1xyXG4gICAgLy8gIHRoaXMubWFwVmlldy51aS5hZGQobGF5ZXJMaXN0LCB7IHBvc2l0aW9uOiBcInRvcC1sZWZ0XCIgfSk7XHJcbiAgICAvLyAgY29uc3Qgc2VhcmNoID0gbmV3IFNlYXJjaCh7IHZpZXc6IHRoaXMubWFwVmlldywgY29udGFpbmVyOiB0aGlzLmJhc2VtYXBHYWxsZXJ5RGl2Lm5hdGl2ZUVsZW1lbnQgfSk7XHJcbiAgICAvLyAgdGhpcy5tYXBWaWV3LnVpLmFkZChzZWFyY2gsIFwidG9wLXJpZ2h0XCIpO1xyXG4gICAgIFxyXG5cclxuXHJcbiAgICAgIFxyXG4gICAgLy99KTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEN1c3RvbVN0eWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MTGlua0VsZW1lbnQ+IHtcclxuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gIGxpbmsuaHJlZiA9IHVybDtcclxuICBjb25zdCBpc1JlYWR5OiBQcm9taXNlPEhUTUxMaW5rRWxlbWVudD4gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGxpbmsub25sb2FkID0gKCkgPT4gcmVzb2x2ZShsaW5rKVxyXG4gIH0pXHJcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICByZXR1cm4gaXNSZWFkeVxyXG59XHJcbiJdfQ==