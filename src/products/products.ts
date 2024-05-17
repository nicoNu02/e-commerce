import cepImage from "../assets/productsImages/cepilloPest1.jpg";
import guantesNitrilo1 from "../assets/productsImages/guantes1.jpg";
import guantesNitrilo2 from "../assets/productsImages/guantes2.jpg";
import perfiladorImage from "../assets/productsImages/perfilador1.jpg";
import perfiladorImage2 from "../assets/productsImages/perfilador2.jpg";
import pincelDifum from "../assets/productsImages/pincelDifumin1.jpg";

export const PRODUCTS = [
  {
    id: 0,
    name: "cepillo de pestanas",
    desc: "cepillo para peinar las pestanas",
    src: [cepImage],
    color: ["white", "black", "sky-500"],
  },
  {
    id: 1,
    name: "guantes de nitrilo",
    desc: "guantes negros de nitrilo",
    src: [guantesNitrilo1, guantesNitrilo2],
    color: ["white", "black", "sky-500"],
  },
  {
    id: 2,
    name: "perfilador de cejas",
    desc: "perfilador de cejas de varios colores",
    src: [perfiladorImage, perfiladorImage2],
    color: ["white", "black", "sky-500"],
  },
  {
    id: 3,
    name: "pincel difuminador",
    desc: "pincel difuminador",
    src: [pincelDifum],
    color: ["white", "black", "sky-500"],
  },
];
