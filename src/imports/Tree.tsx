import svgPaths from "./svg-30312lo6h9";
import imgImage from "figma:asset/e0be30dc4623008900b621d96ad20f3641641248.png";

function TextInput() {
  return (
    <div className="css-gxdil1 css-qmekdl css-roiesn" data-name="Text input">
      <div className="css-27w9fz css-8zrmd9 css-gqfrkp css-hob4u9">
        <p className="css-vwzf36">
          <span className="css-9hcie0">{`Dr. `}</span>
          <span className="css-9hcie0">lorem ipsum</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="css-9bhg8e css-roiesn" data-name="Container">
      <TextInput />
      <div className="css-8zrmd9 css-kzrl css-qb8ya1 css-ubyaig">
        <p className="css-13ozh2 css-8zr56v">Psychiatrist</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="css-roiesn css-y48wn4" data-name="Button">
      <div className="css-14nyl9 css-eq11mv css-x9glav" data-name="Image">
        <div className="css-3etnsc css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-8igeyh css-trglf0" src={imgImage} />
        </div>
      </div>
      <Container />
    </div>
  );
}

function Button1() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Button">
          <path d={svgPaths.p1af6a300} id="Vector" stroke="var(--stroke-0, #4680FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p23ad5500} id="Vector_2" stroke="var(--stroke-0, #4680FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonContainer() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Button container">
      <Button1 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="css-gno8oj css-p5lc96 css-roiesn" data-name="Text input">
      <ButtonContainer />
      <div className="css-68mb79 css-8zrmd9 css-pcfzwe css-pxgogk">
        <p className="css-13ozh2 css-8zr56v">Dashboard</p>
      </div>
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-fag599">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

function TextInputContainer() {
  return (
    <div className="css-oknlq3 css-roiesn" data-name="Text input container">
      <TextInput1 />
    </div>
  );
}

function VerticalContainer() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Vertical container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Vertical container">
          <path d={svgPaths.p1e3d0680} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.pa86ad80} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function VerticalContainer1() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Vertical container">
      <VerticalContainer />
    </div>
  );
}

function Button2() {
  return (
    <div className="css-ijvhqf css-nr0vdr css-of27jd" data-name="Button">
      <div className="css-8zrmd9 css-d0dz4n css-i4jy0a css-uijex">
        <p className="css-8zr56v css-kg6pf">3</p>
      </div>
    </div>
  );
}

function ButtonContainer1() {
  return (
    <div className="css-lrhgjn css-roiesn" data-name="Button container">
      <VerticalContainer1 />
      <div className="css-3xpdf css-8zrmd9 css-pcfzwe css-u326nz">
        <p className="css-13ozh2 css-8zr56v">My Schedule</p>
      </div>
      <Button2 />
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-l7hxrd">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Container">
          <path d={svgPaths.p2cd22c80} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M11.3333 1.41667V4.25" id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M5.66667 1.41667V4.25" id="Vector_3" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M2.125 7.08333H14.875" id="Vector_4" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Container">
      <Container1 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="css-90d934 css-roiesn" data-name="Text input">
      <Container2 />
      <div className="css-8zrmd9 css-pcfzwe css-tx2y2y css-u326nz">
        <p className="css-13ozh2 css-8zr56v">Calendar</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Button">
          <path d={svgPaths.p36659390} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p3a896d00} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonContainer2() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Button container">
      <Button3 />
    </div>
  );
}

function HorizontalContainer() {
  return (
    <div className="css-6iqsd9 css-roiesn" data-name="Horizontal container">
      <ButtonContainer2 />
      <div className="css-8zrmd9 css-pcfzwe css-u326nz css-x0fgup">
        <p className="css-13ozh2 css-8zr56v">Appointments</p>
      </div>
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-l7hxrd">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

function HorizontalContainer1() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Horizontal container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Horizontal container">
          <path d={svgPaths.p2a8dcb00} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p2ec70180} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function HorizontalContainer2() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Horizontal container">
      <HorizontalContainer1 />
    </div>
  );
}

function HorizontalContainer3() {
  return (
    <div className="css-68df3a css-roiesn" data-name="Horizontal container">
      <HorizontalContainer2 />
      <div className="css-3xu9sj css-8zrmd9 css-pcfzwe css-u326nz">
        <p className="css-13ozh2 css-8zr56v">Patient Directory</p>
      </div>
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-l7hxrd">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

function HorizontalContainer4() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Horizontal container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Horizontal container">
          <path d={svgPaths.p28018600} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p8f9d130} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p3cc98f00} id="Vector_3" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p30dc5600} id="Vector_4" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function HorizontalContainer5() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Horizontal container">
      <HorizontalContainer4 />
    </div>
  );
}

function HorizontalContainer6() {
  return (
    <div className="css-91jk9q css-roiesn" data-name="Horizontal container">
      <HorizontalContainer5 />
      <div className="css-6987k8 css-8zrmd9 css-pcfzwe css-u326nz">
        <p className="css-13ozh2 css-8zr56v">My Profile</p>
      </div>
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-l7hxrd">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

function VerticalContainer2() {
  return (
    <div className="css-8hhw9a css-djqorx css-roiesn" data-name="Vertical container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Vertical container">
          <path d={svgPaths.padbbe00} id="Vector" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p293fa600} id="Vector_2" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M6.375 6.375H6.38208" id="Vector_3" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M10.625 6.375H10.6321" id="Vector_4" stroke="var(--stroke-0, #444444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function VerticalContainer3() {
  return (
    <div className="css-rmj1fp css-roiesn css-s8oclu" data-name="Vertical container">
      <VerticalContainer2 />
    </div>
  );
}

function HorizontalContainer7() {
  return (
    <div className="css-lsnrq9 css-roiesn" data-name="Horizontal container">
      <VerticalContainer3 />
      <div className="css-8zrmd9 css-pcfzwe css-s4op7v css-u326nz">
        <p className="css-13ozh2 css-8zr56v">{`Help & Support`}</p>
      </div>
      <div className="css-8pkxh css-8zrmd9 css-em51ck css-l7hxrd">
        <p className="css-13ozh2 css-8zr56v"></p>
      </div>
    </div>
  );
}

export default function Tree() {
  return (
    <div className="css-j9f0op css-vf8mzy" data-name="Tree">
      <Button />
      <TextInputContainer />
      <ButtonContainer1 />
      <TextInput2 />
      <HorizontalContainer />
      <HorizontalContainer3 />
      <HorizontalContainer6 />
      <HorizontalContainer7 />
    </div>
  );
}