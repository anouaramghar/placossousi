'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Branch {
  city: string
  cityAr: string
  address: string
  addressAr: string
  phone: string
  region: string
  mapUrl: string
  lat?: number
  lng?: number
  comingSoon?: boolean
}

function markerIcon(active: boolean) {
  const ring = active ? 'rgba(96,165,250,0.35)' : 'rgba(37,99,235,0.25)'
  const fill = active ? '#60a5fa' : '#2563eb'
  return L.divIcon({
    html: `<span style="
      display:block;width:16px;height:16px;
      background:${fill};
      border:2px solid rgba(255,255,255,0.7);
      border-radius:50%;
      box-shadow:0 0 0 5px ${ring},0 4px 14px rgba(0,0,0,0.5);
    "></span>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  })
}

function MapController({
  branches,
  activeCity,
}: {
  branches: Branch[]
  activeCity: string | null
}) {
  const map = useMap()

  // Fit all markers on first mount
  useEffect(() => {
    const coords = branches
      .filter(b => b.lat != null && b.lng != null)
      .map(b => [b.lat!, b.lng!] as [number, number])
    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [56, 56] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fly to active branch when card is clicked
  useEffect(() => {
    if (!activeCity) return
    const branch = branches.find(b => b.city === activeCity)
    if (branch?.lat != null && branch?.lng != null) {
      map.flyTo([branch.lat, branch.lng], 15, { duration: 1.0, easeLinearity: 0.25 })
    }
  }, [activeCity, map, branches])

  return null
}

export default function BranchesMap({
  branches,
  activeCity,
  locale,
}: {
  branches: Branch[]
  activeCity: string | null
  locale: string
}) {
  const mappable = branches.filter(b => b.lat != null && b.lng != null && !b.comingSoon)

  return (
    <MapContainer
      center={[34.5, -5.5]}
      zoom={6}
      className="w-full h-full"
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />

      <ZoomControl position="bottomright" />

      {mappable.map(branch => (
        <Marker
          key={branch.city}
          position={[branch.lat!, branch.lng!]}
          icon={markerIcon(branch.city === activeCity)}
        >
          <Popup>
            <div className="branch-popup" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <p className="popup-city">
                {locale === 'ar' ? branch.cityAr : branch.city}
              </p>
              <p className="popup-address">
                {locale === 'ar' ? branch.addressAr : branch.address}
              </p>
              <p className="popup-phone" dir="ltr">{branch.phone}</p>
              {branch.mapUrl && (
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="popup-maps-link"
                >
                  {locale === 'ar' ? '← فتح الخريطة' : 'Ouvrir Maps →'}
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <MapController branches={mappable} activeCity={activeCity} />
    </MapContainer>
  )
}
