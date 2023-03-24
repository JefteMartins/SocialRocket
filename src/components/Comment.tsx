import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps) {

  const [likeCount, setLikeCount] = useState(0);
  
  function handleLikeComment(){
    setLikeCount((state)=>{
      return state + 1;
    });
  }

  function handleDeleteComment() {
    console.log('Deletar comentário')
    console.log(content)
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/jeftemartins.png" alt=""/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Jefte Martins</strong>
              <time title="11 de maio as 8:13" dateTime="2022-05-11 08:01">
                cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar">
              <Trash size={20} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir {likeCount !== 0 ? <span>{likeCount}</span> : ''}
          </button>
        </footer>
      </div>
    </div>
  );
}
