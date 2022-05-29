import { ElementRef, OnInit } from '@angular/core';
import { GisBaseService } from '../GisBase.service';
import * as i0 from "@angular/core";
export declare class GisMapComponentComponent implements OnInit {
    private gisBaseService;
    linkProm: Promise<HTMLLinkElement>;
    private mapViewEl;
    set content(content: ElementRef);
    private layerListDiv;
    set content2(content: ElementRef);
    private basemapGalleryDiv;
    set content1(content: ElementRef);
    private layerHelkotView;
    private LayerList;
    private QueryLayer;
    private QueryStr;
    set layerList(value: string[]);
    set queryLayer(value: string);
    set queryStr(value: string);
    private queryFeatureLayer;
    constructor(gisBaseService: GisBaseService);
    initializeMap(): Promise<any>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GisMapComponentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GisMapComponentComponent, "GisBase-GisMapComponent", never, { "layerList": "layerList"; "queryLayer": "queryLayer"; "queryStr": "queryStr"; }, {}, never, never>;
}
export declare function loadCustomStyle(url: string): Promise<HTMLLinkElement>;
