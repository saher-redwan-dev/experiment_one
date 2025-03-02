"use client";

// import {
//   AnimatePresence,
//   domAnimation,
//   LazyMotion,
//   // motion,
//   m,
// } from "framer-motion";
// import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import TempCom from "./TempCom";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export default function ClientComponent() {
  const animItem = useRef();

  const [show, setShow] = useState(true);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    // not working!!!
    // document.addEventListener("aos:in:super-duper", ({ detail }) => {
    //   console.log("animated in", detail);
    // });
    // document.addEventListener("aos:out:super-duper", ({ detail }) => {
    //   console.log("animated out", detail);
    // Set CSS variable for the initial height
    // document.querySelectorAll(".height-anim--").forEach((ele) => {
    //   const pureHeight = ele.offsetHeight;
    //   // ele.setAttribute("eleHeight", pureHeight + "px");
    //   // ele.style.maxHeight = pureHeight + "px!important";
    //   // ele.style.cssText = `
    //   //   maxHeight: ${pureHeight + "px!important"};
    //   // `;
    //   ele.setAttribute("eleHeight", pureHeight + "px");
    //   ele.classList.add("show");
    // });
    // const pureHeight = animItem.current.offsetHeight;
    // animItem.current.setAttribute("eleHeight", pureHeight + "px");
    // setTimeout(() => {
    //   animItem.current.classList.add("show");
    // }, 1000);
    // animItem.current.addEventListener("animationend", (e) => {
    //   console.log(e);
    //   if (e.animationName == "decrease-height") {
    //     animItem.current.remove();
    //   }
    // });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  // useEffect(() => {
  //   toggleOpen();
  // }, []);

  const [animCustom, setAnimCustom] = useState(true);

  const [scope, animate] = useAnimate();

  function startAnim() {
    animate(scope.current, { opacity: 0.8 });
  }

  useEffect(() => {
    if (isOpen) startAnim();
  }, [isOpen]);

  return (
    // <LazyMotion features={domAnimation}>
    <div className="w-[50vh]">
      <b>ClientComponent</b>
      {/* <motion.div animate={{ x: 100 }} initial={false}> */}

      <span onClick={startAnim}>change anim</span>
      <div ref={scope} style={{ background: "red" }}>
        Lorem ipsum dolor sit amet.
      </div>

      <div className="bg-slate-200 p-2">
        <div style={{ margin: "20px" }}>
          <button onClick={() => setAnimCustom(!animCustom)}>
            {isOpen ? "Collapse" : "Expand"}
          </button>

          <AnimatePresence>
            {animCustom && (
              <motion.div
                initial={{ height: 0 }}
                // initial={false}
                animate={{ height: "auto" }}
                // animate={false}
                exit={{
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                transition={{ duration: 0.65 }}
                style={{
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div style={{ padding: "10px", marginTop: "10px" }}>
                  ONE AThis content will collapse and expand!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <button onClick={() => setAnimCustom((prev) => !prev)}>click</button>
        {/* {animCustom && ( */}
        <div
          className={`bg-slate-500 overflow-hidden ${
            animCustom
              ? ""
              : // "max-h-max"
                ""
          }`}
          style={{
            transition: "1s",
            transitionBehavior: "allow-discrete",
            blockSize: animCustom ? `calc-size(auto)` : "0px",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium,
          minima!
        </div>
        {/* )} */}
      </div>

      <hr className="mt-20" />
      <hr />
      <hr />
      <hr />
      <hr />

      <div style={{ margin: "20px" }}>
        <button onClick={toggleOpen}>toggleOpen...</button>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
            marginTop: "10px",
          }}
        >
          <div style={{ padding: "10px" }}>
            This content will collapse and Xexpand!
          </div>
        </motion.div>
      </div>

      {/* custom animations */}
      <button
        onClick={() => {}}
        className="border border-[3px] border-[red] block my-3"
      >
        change below
      </button>
      <div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          // transition={{ duration: 1, ease: "backInOut" }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="overflow-hidden"
        >
          <p className="bg-slate-500 p-8 shadow-[0_0_25px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores,
            optio? Culpa ut cupiditate a enim doloribus quae nobis fuga nesciunt
            fugit veritatis. Commodi odit rerum neque libero illum iusto
            explicabo sequi ipsum accusantium, laboriosam quam optio temporibus
            laudantium quibusdam eos, autem quae pariatur numquam nihil?
          </p>
        </motion.div>
      </div>

      <button
        onClick={() => {
          setShow(false);
        }}
        className="border border-[3px] border-[red] block my-3"
      >
        change show
      </button>

      <div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          // transition={{ duration: 1, ease: "backInOut" }}
          transition={{ duration: 1, ease: "backInOut" }}
          style={{
            width: "450px",
            height: "250px",
            background: "#333",
            overflow: "hidden",
            display: "block",
          }}
        ></motion.div>
        <br />
        <br />
      </div>

      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{}}
              animate={{}}
              exit={{ height: "0", opacity: 0 }}
              // transition={{ duration: 1, ease: "backInOut" }}
              transition={{ duration: 1, ease: "backInOut" }}
              style={{
                width: "250px",
                height: "250px",
                background: "#999",
              }}
            ></motion.div>
            <motion.p
              initial={{}}
              animate={{}}
              exit={{ height: "0", boxShadow: "0 0 18px 4px #000" }}
              transition={{ duration: 1, delay: 0.6, ease: "backInOut" }}
              style={{
                width: "250px",
                height: "40px",
                background: "#333",
              }}
            ></motion.p>
          </>
        )}
      </AnimatePresence>

      {/* <m.div
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          exit={{ height: "0", opacity: 0 }}
          // transition={{ duration: 1, ease: "backInOut" }}
          transition={{ duration: 1, ease: "backInOut" }}
          style={{
            width: "250px",
            height: "250px",
            background: "#458565",
          }}
        ></m.div> */}

      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum natus
        placeat officia at quisquam. Fugiat quis deserunt, tempore quidem harum,
        aut suscipit quasi alias veritatis ipsam inventore reprehenderit at
        veniam nostrum eius temporibus necessitatibus nam consequatur repellat
        recusandae deleniti aliquid maiores quas ea! Autem voluptatum, tempora
        officiis voluptate quia exercitationem numquam consequuntur aliquid, aut
        placeat officia at quisquam. Fugiat quis deserunt, tempore quidem harum,
        aut suscipit quasi alias veritatis ipsam inventore reprehenderit at
        veniam nostrum eius temporibus necessitatibus nam consequatur repellat
        recusandae deleniti aliquid maiores quas ea! Autem voluptatum, tempora
        officiis voluptate quia exercitationem numquam consequuntur aliquid, aut
        placeat officia at quisquam. Fugiat quis deserunt, tempore quidem harum,
        aut suscipit quasi alias veritatis ipsam inventore reprehenderit at
        veniam nostrum eius temporibus necessitatibus nam consequatur repellat
        recusandae deleniti aliquid maiores quas ea! Autem voluptatum, tempora
        officiis voluptate quia exercitationem numquam consequuntur aliquid, aut
        repellat cumque voluptas iure modi eius nisi enim aspernatur impedi
      </p>

      {/* <div
        ref={item}
        className="w-[8rem] h-[8rem] bg-slate-500 "
        // data-aos="fade-up"
        data-aos-delay="1000"
        data-aos="example-anim1"
        style={{ overflow: "hidden" }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
        doloribus, ut tenetur praesentium excepturi eos! Cumque reiciendis ipsam
        porro nisi laborum. Expedita, harum eius nobis consequatur consequuntur
        dolorum doloribus reiciendis!
      </div> */}

      <div>
        {/* {[...Array(12000)].map(() => { */}
        {[...Array(2)].map(() => {
          return <p>from ClientComponent</p>;
        })}
      </div>

      <img src={"/images/basics/home.svg"} alt="" />

      {/*  */}
      <div></div>
    </div>
    //  </LazyMotion>
  );
}
