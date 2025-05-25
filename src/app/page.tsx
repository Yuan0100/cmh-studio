import styles from "./page.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { generateFragmentString, WORK_SHADERS, WorkShaderType } from "./utils";
import GLSLCanvas from "./components/GLSLCanvas";

export default async function Home() {
  // const [allFragmentString, setAllFragmentString] = useState<WorkShaderType[]>([]);

  // const allFragmentString: WorkShaderType[] = [];

  // WORK_SHADERS.forEach(async (shader) => {
  //   const fragmentString = await generateFragmentString(shader.src);
  //   setAllFragmentString((prev) => [...prev, { ...shader, fragmentString }]);
  // })

  const fragmentString = await generateFragmentString('works/11_breathingCircle.frag');
  // const fragmentString = await generateFragmentString('works/12_QuadtreeMonaLisa.frag');

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {/* <div className={styles.canvas} /> */}
        <GLSLCanvas
          fragmentString={fragmentString}
          // textures=""
          resolutionScale={0.5}
          className={styles.canvas_container}
        />
        {/* <HomeCanvas fragmentString={fragmentString} /> */}
        {/* <HomeCanvas fragmentString={fragmentString} textures="MonaLisa.jpg,Taipei101_1.jpeg" /> */}
        {/* <HomeCanvas fragmentString={fragmentString} textures="moon.jpeg, Taipei101_1.jpeg" /> */}
        <div className={styles.container}>
          <h1>數位畫室</h1>
          <br />
          <p>流動，是一種極細膩、看見場域的運動、純粹地。
            <br />群體，一種糾纏、複合、蘊含關係的運動。
            <br />演化，一種可變異、天擇下的多樣性、適應與消逝。
            <br />熵亂，一種直覺、不依循常規的隨興之美、深刻和諧著。
          </p>
          <br />
          <p>The Computing Aesthetics Lab engages in
            <br />simulation algorithms, aesthetics and performing arts,
            <br />by CMH, IAA, NYCU.
          </p>

          {/* <br />
          <h2>課程</h2>

          <br />
          <h3>美學運算</h3>
          <p>以基礎理論為主，關注流體模擬、群體行為模擬、人工演化機制、資訊熵與亂數等演算法，並以GLSL實作為輔。</p>
          <ul>
            <li>Fundamentals</li>
            <li>Glow</li>
            <li>Shape</li>
            <li>Mouse Interaction</li>
            <li>Filter Style</li>
          </ul>

          <br />
          <h3>光影運算</h3>
          <p>以GLSL實作為主，加入Raymarching及三維渲染演算法，藉以學習3D電腦圖學理論，並探討物件與光影之表面及微表面表現技法。</p>
          <ul>
            <li>Raymarching</li>
            <li>Add Noise</li>
            <li>Phong Shading</li>
            <li>Distances Functions</li>
          </ul>

          <br />
          <h3>量體運算</h3>
          <p>以研發為主，進階至容積渲染，兼具深化論述，探討次表面及體積化表現技法，並且結合虛擬實境、互動技術、AI科技進行整合應用。</p>
          <ul>
            <li>數位新三遠</li>
            <li>Factor</li>
            <li>Noise</li>
            <li>Distance Functions</li>
          </ul> */}

        </div>
      </main>
      <Footer />
    </div>
  );
}
