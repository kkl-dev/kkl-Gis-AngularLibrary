להלן סדר דברים לשימוש ברכיב המפה
1.	התקנת רכיב מפה
  a.	npm i -d   github:kkl-dev/kkl-Gis-AngularLibrary
  b.	npm i esri-loader
  c.    npm i @arcgis/core@4.22.2   
2.	הגדרות קובץ סביבה
  a.	לקובץ  environment ( לפי הסביבה (prod,staging,dev) )  יש להוסיף את ההגדרה GisApiUrl: 'https://knf-appl-dev3'
3.	הגדרות ב app.module
  a.	יבוא ספריות
    i.	import { environment } from 'src/environments/environment     ';
    ii.	import {GisBaseService,GisMapComponentModule} from 'gis-map-component'
  b.	הגדרת imports 
    i.	יש להוסיף את השורה GisMapComponentModule.forRoot(environment)
  c.	הגדרת Providers
    i.	יש להוסיף את השורה YaaranutService,GisBaseService
4.	שימוש ברכיב המפה
  a.	קובץ HTML
    i.	<GisBase-GisMapComponent   [layerList]="layerList" [queryLayer]="layerList[1]" queryStr="GUSH_NUM=8040 and PARCEL=58"  queryResultEmpty="גוש/חלקה לא קיימים" ></GisBase-GisMapComponent>
  b.	קובץ HTML.TS
    i.	layerList = ["global/kkl/allLayersForAgol/FeatureServer/49/",  "global/kkl/HelkotCadaster/MapServer/1/"]                        ;
5.	מאפיינים של המפה
  a.	layerList – רשימה של שכבות ( סעיף  3.b.i)
  b.	queryLayer – השיכבה שעל פיה מבוצע בחירת פוליגונים
  c.	queryStr – ביטוי על פיו יבוצע בחירת פוליגונים
6.	בהצלחה
