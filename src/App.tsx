import { Header } from "./components/Header";
import { Post, PostType } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import "./global.css";
import styles from "./App.module.css";


const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/jeftemartins.png",
      name: "Jefté Martins",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", value: "Fala galeraa 👋" },
      { type: "paragraph", value: "Acabei de subir mais um projeto no meu portifa. É um projeto que fizno NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", value: "github.com/jeftemartins" },
    ],
    publishedAt: new Date("2023-03-21 08:01:00"),
  },
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/jeftemartins.png",
      name: "Martins Jefté",
      role: "Software Developer",
    },
    content: [
      { type: "paragraph", value: "Fala galeraa 👋" },
      { type: "paragraph", value: "Acabei de subir mais um projeto no meu portifa. É um projeto que fizno NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", value: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2023-03-11 08:01:00"),
  },
];


export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar /> 
        <main>
          {
            posts.map(
              (post, index) => {
                return (
                  <Post
                    key={index}
                    post={post}
                   />
                )
              }
            )
          }
        </main>
      </div>
    </>
  );
}
