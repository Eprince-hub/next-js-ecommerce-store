// ###################################
// ###################################
// ###################################
// ###################################

export default function CreateDontCopy(props) {
  if (!props.Prod) return <div>User not created</div>;

  return (
    <div>
      Created User props. createdProd dot id updated:{' '}
      <pre>{JSON.stringify(props.createdprod, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { createProduct } = await import('../../util/database');

  const productName = context.query.name; // from browser could be from front end
  const productTitle = context.query.title; // from browser could be info from front end
  const createdProd = await createProduct({
    name: productName,
    title: productTitle,

    /* name: context.query.name

		*/
  });
  return {
    props: {
      createdProd: createdProd ? createdProd : null,
      // createdProd: createdProd ? createdProd || null
    },
  };
}
