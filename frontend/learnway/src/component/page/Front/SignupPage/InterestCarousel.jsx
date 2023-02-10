import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import SelectBtn from "./InterestIcon";

export default function InterestCarousel ({itdata, getLst}) {

  let lst = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  return (
    <>


      {itdata !== ""
      ? itdata.map((e, idx) => {
            if (itdata[idx].field === "random") {
            } else {
                return (
                    <SelectBtn
                        key={idx}
                        id={idx}
                        disabled=""
                        icon={itdata[idx].field}
                        chk={lst[idx]}
                        onClick={() => {
                            const tmplst = [...lst];
                            tmplst[idx] = (lst[idx] + 1) % 2;
                            getLst(tmplst);
                        }}
                    ></SelectBtn>
                );
            }
        })
      : null}
    </>
  )
}