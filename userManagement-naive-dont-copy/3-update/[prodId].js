// ###################################
// ###################################
// ###################################
// ###################################

export default function UpdateDontCopy(props) {
  if (!props.updatedProd) return <div>User not found</div>;

  return (
    <div>
      User with id props.updated prod dot id updated:{' '}
      <pre>{JSON.stringify(props.updatedprod, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { updateProductById } = await import('../../util/database');
  const prodIdToUpdate = context.query.prodId;
  const productNewName = context.query.name; // from browser could be from front end
  const productNewTitle = context.query.title; // from browser could be info from front end
  const updatedProd = await updateProductById(prodIdToUpdate, {
    name: productNewName,
    title: productNewTitle,
  });
  return {
    props: {
      updatedProd: updatedProd ? updatedProd : null,
      // updatedProd: updatedProd ? updatedProd || null
    },
  };
}
