// ###################################
// ###################################
// ###################################
// ###################################

export default function ReadDontCopy(props) {
  if (!props.Prod) return <div>User not found</div>;

  return (
    <div>
      Read User props. prod dot id updated:{' '}
      <pre>{JSON.stringify(props.prod, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getProd } = await import('../../util/database');

  const prod = await getProd(context.query.prodId);
  return {
    props: {
      prod,
    },
  };
}
