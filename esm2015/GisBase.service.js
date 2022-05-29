import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GisBaseService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2lzQmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL0dpc0Jhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7O0FBS3hFLE1BQU0sT0FBTyxjQUFjO0lBR3ZCLFlBQStDLE1BQVc7UUFBWCxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBRnJELFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHYixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDL0IsK0RBQStEO0lBQ2xFLENBQUM7OzRHQU5RLGNBQWMsa0JBR0gsaUJBQWlCO2dIQUg1QixjQUFjOzRGQUFkLGNBQWM7a0JBRDFCLFVBQVU7OzBCQUlNLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBpc0Rldk1vZGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdpc0Jhc2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgYXBpVXJsID0gXCJcIjtcclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnZpcm9ubWVudEZpbGUnKSBwcml2YXRlIGNvbmZpZzogYW55ICkge1xyXG4gICAgICAgIHRoaXMuYXBpVXJsID0gY29uZmlnLkdpc0FwaVVybFxyXG4gICAgICAgLy90aGlzLmFwaVVybCA9ICdodHRwczovL2trbC15YWFyYW51dGdpc2FwaS5henVyZXdlYnNpdGVzLm5ldCc7XHJcbiAgICB9XHJcbn1cclxuIl19