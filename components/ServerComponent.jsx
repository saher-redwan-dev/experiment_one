"use server";



export default async function ServerComponent() {
  return (
    <div className="w-[50vh]">
      <b>ServerComponent</b>
      <div>

        {/* {[...Array(12000)].map(() => { */}
        {[...Array(2)].map(() => {
          return <p>from ServerComponent</p>;
        })}
      </div>

      {/*  */}
      {/* {[...Array(10)].map((a) => (
        <img src={"/images/basics/home.svg"} alt="" />
      ))} */}

      <div></div>
    </div>
  );
}
