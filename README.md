<div style="color:red;direction:rtl">

להלן סדר דברים לשימוש ברכיב המפה
>1.	התקנת רכיב מפה
>>>א.	npm i -d   github:kkl-dev/kkl-Gis-AngularLibrary
>>>ב.	npm i esri-loader
>>>ג.    npm i @arcgis/core@4.22.2   
>2.	הגדרות קובץ סביבה
>>>א.	לקובץ  environment ( לפי הסביבה (prod,staging,dev) )  יש להוסיף את ההגדרה GisApiUrl: 'https://knf-appl-dev3'
>3.	הגדרות ב app.module
>>>א.	יבוא ספריות
>>>>א1.	import { environment } from 'src/environments/environment     ';
 
>>>>א2.	import {GisBaseService,GisMapComponentModule} from 'gis-map-component'
 
>>>ב.	הגדרת imports 
>>>>ב1.	יש להוסיף את השורה GisMapComponentModule.forRoot(environment)
>>>ג.	הגדרת Providers
>>>>ג1.	יש להוסיף את השורה YaaranutService,GisBaseService
>4.	שימוש ברכיב המפה
>>>א	קובץ HTML
>>>>א1.	<GisBase-GisMapComponent   [layerList]="layerList" [queryLayer]="layerList[1]" queryStr="GUSH_NUM=8040 and PARCEL=58"  queryResultEmpty="גוש/חלקה לא קיימים" ></GisBase-GisMapComponent>
 
>>>ב.	קובץ HTML.TS 
>>>>ב1.	layerList = ["global/kkl/allLayersForAgol/FeatureServer/49/",  "global/kkl/HelkotCadaster/MapServer/1/"];
 
>5.	מאפיינים של המפה 
>>>א.	layerList – רשימה של שכבות ( סעיף  3.b.i) 
 
>>>ב.	queryLayer – 
 ה שיכבה שעל פיה מבוצע בחירת פוליגונים
>>>ג.	queryStr – 
 ביטוי על פיו יבוצע בחירת פוליגונים
>6.	בהצלחה
</div>
