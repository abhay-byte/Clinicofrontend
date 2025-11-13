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

export default function Button() {
  return (
    <div className="css-j9f0op css-vf8mzy" data-name="Button">
      <div className="css-14nyl9 css-eq11mv css-x9glav" data-name="Image">
        <div className="css-3etnsc css-phc9f9 css-r0azwh css-trglf0">
          <img alt="" className="css-8igeyh css-trglf0" src={imgImage} />
        </div>
      </div>
      <Container />
    </div>
  );
}