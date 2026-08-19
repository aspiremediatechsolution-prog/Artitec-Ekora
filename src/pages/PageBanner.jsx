import Hero from '../components/sections/Hero'

export default function PageBanner({
  title,
  sub = 'Ekora Studio — Architecture · Interiors · Landscape',
  action,
  actions,
  video,
}) {
  return (
    <Hero
      head1={title}
      head2=""
      sub={sub}
      label="Ekora — Since 2010"
      action={action}
      actions={actions}
      video={video}
    />
  )
}
