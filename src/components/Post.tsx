import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";


interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}

interface content{
  type: "paragraph" | "link";
  value: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: content[];
}

interface PostProps {
  post: PostType;
}



export function Post({ post }: PostProps) {
  const publishedDateFormatted = format(
    post.publishedAt,
    "dd 'de' MMMM 'às' HH:mm",
    { locale: ptBR }
  );

  const [comments, setComments] = useState(["Aulas paizão!"]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentDelete: string) {
    const commentsWithoutDeleted = comments.filter(
      (comment) => comment !== commentDelete
    );
    setComments(commentsWithoutDeleted);
    console.log(`Deletar comentário ${commentDelete}`);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("O comentário não pode ser vazio");
  }

  const isCommentFormEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line, index) => {
          switch (line.type) {
            case "paragraph":
              return <p key={index}>{line.value}</p>;
            case "link":
              return (
                <p key={index}>
                  <a href="#">{line.value}</a>
                </p>
              );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={isCommentFormEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
