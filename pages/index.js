export default function() {
  return <></>
}

export async function getServerSideProps(ctx) {
  return { redirect: { destination: '/config', permanent: true }}
}
