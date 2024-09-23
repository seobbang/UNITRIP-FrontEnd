declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    getCenter(): LatLng;
    setCenter(latlng: LatLng | Coords): void;
    getLevel(): number;
    setLevel(level: number);
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class LatLng {
    constructor(lat: number, lng: number);

    La: number;
    Ma: number;
  }

  class LatLng {
    La: number;
    Ma: number;
  }

  class Size {
    constructor(XSize: number, YSize: number);
  }

  class Point {
    constructor(X: number, Y: number);
  }

  class MarkerImage {
    constructor(string, Size, Point);
  }

  class Marker {
    constructor({ map, position, image }) {
      this.map = map;
      this.position = position; // LatLng 타입
      this.image = image; // MarkerImage 타입
    }

    map: kakao.maps.Map | undefined;
    setMap: React.Dispatch<React.SetStateAction<kakao.maps.Map | null>>;
  }

  namespace event {
    interface Listener {
      (event: Event): void;
    }

    function addListener(
      target: Marker,
      eventName: string,
      listener: Listener,
    ): void;
  }
}
