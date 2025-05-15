import styles from "./page.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeCanvas from "./components/HomeCanvas";
import { generateFragmentString, WORK_SHADERS, WorkShaderType } from "./utils";

export default async function Home() {
  // const [allFragmentString, setAllFragmentString] = useState<WorkShaderType[]>([]);

  // const allFragmentString: WorkShaderType[] = [];

  // WORK_SHADERS.forEach(async (shader) => {
  //   const fragmentString = await generateFragmentString(shader.src);
  //   setAllFragmentString((prev) => [...prev, { ...shader, fragmentString }]);
  // })

  const fragmentString = await generateFragmentString('works/21_perlinSeaCloud.frag');
  // const fragmentString = await generateFragmentString('works/12_QuadtreeMonaLisa.frag');

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.canvas} />
        {/* <HomeCanvas fragmentString={fragmentString} /> */}
        {/* <HomeCanvas fragmentString={fragmentString} textures="MonaLisa.jpg,Taipei101_1.jpeg" /> */}
        {/* <HomeCanvas fragmentString={fragmentString} textures="moon.jpeg, Taipei101_1.jpeg" /> */}
        <h1>數位畫室</h1>
      </main>
      <Footer />
    </div>
  );
}
