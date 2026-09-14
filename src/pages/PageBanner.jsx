import Hero from '../components/sections/Hero'

export default function PageBanner({
  title,
  sub = 'Ekora Architects — Luxury Architecture · Interiors · Landscape',
  video,
}) {
  return (
    <Hero
      head1={title}
      head2=""
      sub={sub}
      label="Ekora Architects — Spatial Architecture"
      video={video}
    />
  )
}
