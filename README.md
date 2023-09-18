## How to run

1. Replace `TOKEN` with your own Mapbox token:
 * In `App.js`
 * In `app.json`

2. Install dependencies

```
npm install
```

3. Run prebuild

```
npx expo prebuild --clean
```

4. Run the app

```
npm run android
```


## Bug description

Sometimes when trying to create pack, it results with the following:

```
{"completedResourceCount": 0, "completedResourceSize": 780, "erroredResourceCount": 20, "loadedResourceCount": 0, "loadedResourceSize": 780, "name": "PL", "percentage": 0, "requiredResourceCount": 20, "state": "complete"}
```

All the `requiredResourceCount` are marked as `erroredResourceCount` and `state` is `complete`
and no error is passed to `errorListener`.

When you execute `getPacks` it returns this pack, even though it was not properly downloaded.

In the results Mapbox map is not usable in offline mode, cause tiles won't load, and the following error is thrown:

```
Mapbox error Map load failed: {tile-id={x=0, y=1, z=1}, type=tile, message=Failed to load tile: Unable to resolve host "api.mapbox.com": No address associated with hostname, begin=11219103159, source-id=composite} {"level": "error", "message": "Map load failed: {tile-id={x=0, y=1, z=1}, type=tile, message=Failed to load tile: Unable to resolve host \"api.mapbox.com\": No address associated with hostname, begin=11219103159, source-id=composite}", "tag": "RCTMGLMapView"}
```


### How to reproduce

1. Install app and tap on `Download poland`, see the logs.
2. Then go to map, turn on the airplane mode -> map is not usable.