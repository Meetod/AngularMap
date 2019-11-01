import { Component, OnInit, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import Map from "arcgis-js-api/Map";
import MapView from "arcgis-js-api/views/MapView";
import Point from 'arcgis-js-api/geometry/Point'
import _ from 'lodash'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  view: any;
  locations: any;
  interval: any;
  hideMarkers: boolean = true;

  constructor() { 

    this.locations = [
      {
        id: 1,
        name: 'AA3549',
        locationName: 'Knutshult',
        point: new Point({
          latitude: 60.5,
          longitude: 15.6,
        }),
        position: {
          x: 0,
          y: 0
        },
        
        data: [
          {
            name: 'BM',
            value: '184'
          },
          {
            name: 'GT',
            value: '87'
          }
        ]
      },
      {
        name: 'AA1234',
        locationName: 'Skråmmen',
        id: 2,
        point: new Point({
          latitude: 60.4,
          longitude: 15.3,
        }),
        position: {
          x: 0,
          y: 0
        },
        
        data: [
          {
            name: 'BM',
            value: '143'
          },
          {
            name: 'GT',
            value: '17'
          },
          {
            name: 'TT',
            value: '65'
          }
        ]
      }
    ]
  }

  async initializeMap() {
    try {

      // var featureLayer = new FeatureLayer({
      //   url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2"
      // })

      // Configure the Map
      const mapProperties = {
        basemap: "streets"
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [15.646868241115527, 60.61491737519446],
        zoom: 9,
        map: map
      };

      this.view = new MapView(mapViewProperties);

      return this.view;
    } catch (error) {
      console.log("Esri: ", error);
    }
  }

  ngOnInit() {
    this.hideMarkers = true
    this.initializeMap()
      .then(view => {

        this.interval = setInterval(() => {
          if (view.ready) {

            clearInterval(this.interval)
            this.positionMarkers()
            this.hideMarkers = false
          }
        }, 200)

        view.on('drag', event => {
          this.positionMarkers()
        })

        view.watch('animation', response => {
          console.log(response)
          this.positionMarkers()
          console.log(response ? response.state : null)
          if(response && response.state === 'running') {
            this.hideMarkers = true
          } else {
            this.hideMarkers = false
          }
        })

        // view.on('click', (event) => {
        //   console.log(event.mapPoint);
        // });

        
      });

  }

  
  positionMarkers() {
    this.locations.forEach(location => {
      location.position = this.view.toScreen(location.point)

      const point = {
        id: location.id,
        symbol: {
          type: "simple-marker",
          color: "#D66C31",
          outline: {  
            color: '#ffffff',
            width: "2px"
          }
        },
        geometry: location.point
      }

      this.view.graphics.add(point);
    })
  }

  showMarkerInfo(location) {
    alert('Visa info om: ' + location.name)
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

}
