// ###################################
// ###################################
// ###################################
// ###################################

export default function DeleteDontCopy(props) {
  if (!props.deletedProd) return <div>User not found</div>;

  return <div>User with id props.deleted User dot id Deleted</div>;
}

export async function getServerSideProps(context) {
  const { deleteProductById } = await import('../../util/database');
  const prodIdToDelete = context.query.prodId;
  const deletedProd = await deleteProductById(prodIdToDelete);
  return {
    props: {
      deletedProd: deletedProd ? deletedProd : null,
      // deletedProd: deletedProd || null
    },
  };
}
