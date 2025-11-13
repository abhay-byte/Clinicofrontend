import svgPaths from "./svg-iaozp19azm";
import imgImage from "figma:asset/a20849bc7d74cff1123dc2ec5b811e9c7195e658.png";
import imgImage1 from "figma:asset/e0be30dc4623008900b621d96ad20f3641641248.png";

function Button() {
  return (
    <div className="css-rkllp6 css-roiesn" data-name="Button">
      <div className="css-lem4j5 css-roiesn css-uj26o8" data-name="Image">
        <div className="css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-8igeyh css-trglf0" src={imgImage} />
        </div>
      </div>
      <div className="css-8zrmd9 css-apw999 css-bf1odp css-wqxwof">
        <p className="css-11ht3m css-8zr56v">English</p>
      </div>
    </div>
  );
}

function VerticalContainer() {
  return (
    <div className="css-3674n7 css-8hhw9a css-roiesn" data-name="Vertical container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Vertical container">
          <path d={svgPaths.p1e17c7c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4aa2980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function VerticalContainer1() {
  return (
    <div className="css-roiesn css-s8oclu css-vi50m9" data-name="Vertical container">
      <VerticalContainer />
    </div>
  );
}

function VerticalContainer2() {
  return (
    <div className="css-38e4n css-mizeja css-wva7jr" data-name="Vertical container">
      <div className="css-8wug21 css-8zrmd9 css-ar5kc3 css-d0dz4n">
        <p className="css-8zr56v css-kzzas">6</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="css-ozxmke css-roiesn" data-name="Button">
      <VerticalContainer1 />
      <VerticalContainer2 />
    </div>
  );
}

function Container() {
  return (
    <div className="css-3674n7 css-8hhw9a css-roiesn" data-name="Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p10fa180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pb1ea600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="css-roiesn css-s8oclu css-vi50m9" data-name="Container">
      <Container />
    </div>
  );
}

function VerticalContainer3() {
  return (
    <div className="css-38e4n css-nt06ed css-xendxu" data-name="Vertical container">
      <div className="css-8wug21 css-8zrmd9 css-9steja css-d0dz4n">
        <p className="css-8zr56v css-kzzas">2</p>
      </div>
    </div>
  );
}

function VerticalContainer4() {
  return (
    <div className="css-plni7d css-roiesn" data-name="Vertical container">
      <Container1 />
      <VerticalContainer3 />
    </div>
  );
}

function VerticalContainer5() {
  return (
    <div className="css-lwujf8 css-roiesn" data-name="Vertical container">
      <div className="css-11ozwu css-8zrmd9 css-b74y4l css-z1ui20">
        <p className="css-vwzf36">
          <span className="css-d86vkp css-qbuopb">{`Dr. `}</span>
          <span className="css-d86vkp css-qbuopb">lorem ipsum</span>
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return <div className="css-qdcklg css-tctp53" data-name="Container" />;
}

export default function HorizontalContainer() {
  return (
    <div className="css-j9f0op css-vf8mzy" data-name="Horizontal container">
      <Button />
      <Button1 />
      <VerticalContainer4 />
      <VerticalContainer5 />
      <div className="css-dz32gp css-n1vlz0" data-name="Image">
        <div className="css-nr7rl8 css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-8igeyh css-trglf0" src={imgImage1} />
        </div>
      </div>
      <Container2 />
    </div>
  );
}