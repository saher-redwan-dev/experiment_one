
export default async function Navbar() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    // }, 8000);
    }, 1);
  });

  return <div>Navbar</div>;
}
