import imgStar1 from "figma:asset/6c33196cc20ee6a2e6bed740869ebff7beab78ab.png";
import imgGeminiGeneratedImagePsfoepsfoepsfoepPhotoroom1 from "figma:asset/c8f2f1e64db563d4bf0374b4fc0c8c0e2e4b32b1.png";
import imgGeminiGeneratedImagePsfoepsfoepsfoepPhotoroom2 from "figma:asset/e34c3b0d2ae702854348fdbfd78c79720c9838de.png";

function Group() {
  return (
    <div className="css-bz2tic css-ccr7aj">
      <div className="css-7v6pcv css-ogx1ks css-roiesn" data-name="star 1">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgStar1} />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="css-bz2tic css-ht1drr">
      <div className="css-8zrmd9 css-9aw7ty css-fb0aha css-hcv8e2">
        <p className="css-1zl1w0 css-8zr56v">4.9 / 5</p>
      </div>
      <div className="css-8t1ugw css-8zrmd9 css-9aw7ty css-hxmhn2">
        <p className="css-1zl1w0 css-8zr56v">Your Rating</p>
      </div>
    </div>
  );
}

export default function Banner() {
  return (
    <div className="css-4qbf3m css-bbmv0m css-j9f0op" data-name="Banner">
      <div aria-hidden="true" className="css-ggwoeh css-i1rzdv css-om5kvc" />
      <div className="css-1ign7q css-j7ohut css-roiesn" data-name="Gemini_Generated_Image_psfoepsfoepsfoep-Photoroom 1">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgGeminiGeneratedImagePsfoepsfoepsfoepPhotoroom1} />
      </div>
      <div className="css-2mni3f css-qygev8 css-roiesn" data-name="Gemini_Generated_Image_psfoepsfoepsfoep-Photoroom 2">
        <img alt="" className="css-9unj7x css-ez8men css-r0azwh css-trglf0" src={imgGeminiGeneratedImagePsfoepsfoepsfoepPhotoroom2} />
      </div>
      <Group />
      <Group1 />
    </div>
  );
}