import { NgModule } from '@angular/core';
import { GisBaseService } from '../GisBase.service';
import { GisMapComponentComponent } from './gis-map-component.component';
import * as i0 from "@angular/core";
export class GisMapComponentModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lzLW1hcC1jb21wb25lbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZ2lzLW1hcC1jb21wb25lbnQvc3JjL2xpYi9naXMtbWFwLWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQWN6RSxNQUFNLE9BQU8scUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBZ0I7UUFDcEMsT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztTQUNuRixDQUFDO0lBQ0osQ0FBQzs7bUhBTlUscUJBQXFCO29IQUFyQixxQkFBcUIsaUJBUjlCLHdCQUF3QixhQUt4Qix3QkFBd0I7b0hBR2YscUJBQXFCLFlBTnZCLEVBQ1I7NEZBS1UscUJBQXFCO2tCQVZqQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxFQUNSO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7cUJBQ3pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdpc0Jhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vR2lzQmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50IH0gZnJvbSAnLi9naXMtbWFwLWNvbXBvbmVudC5jb21wb25lbnQnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2lzTWFwQ29tcG9uZW50Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEdpc01hcENvbXBvbmVudENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEdpc01hcENvbXBvbmVudE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxHaXNNYXBDb21wb25lbnRNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdpc01hcENvbXBvbmVudE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0dpc0Jhc2VTZXJ2aWNlLCB7IHByb3ZpZGU6ICdlbnZpcm9ubWVudEZpbGUnLCB1c2VWYWx1ZTogZW52aXJvbm1lbnQgfV1cbiAgICB9O1xuICB9XG59XG4iXX0=