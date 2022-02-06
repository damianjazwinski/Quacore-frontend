import React from "react";
import "./quack.scss";
import { Quack as QuackType } from "../../types/types";

type QuackProps = {
  quack: QuackType;
};

const Quack = React.memo(
  React.forwardRef<HTMLDivElement, QuackProps>(
    ({ quack: { username, createdAt, content, mentions } }, ref) => {
      const mentionsMatches = Array.from(
        content.matchAll(/(?<=\s|^|,|;)@\w+(?=\s|$|;|,|\.)/g)
      ).filter((mentionMatch) =>
        mentions.some((mention) => mentionMatch[0] === `@${mention}`)
      );
      const mentionPositions = mentionsMatches.map((match) => match.index);
      const chunksPositions = Array.from(
        new Set([
          0,
          ...mentionsMatches
            .map((match) => [match.index, match.index! + match[0].length])
            .flat(),
          content.length,
        ])
      );
      const chunks = chunksPositions.slice(1).map((position, index) => ({
        chunkContent: content.slice(chunksPositions[index], position),
        isMention: mentionPositions.includes(chunksPositions[index]),
      }));
      return (
        <div className="quack" ref={ref}>
          <div className="quack-top">
            <span className="quack-user">{username}</span>
            <span>•</span>
            <span className="quack-timestamp">{createdAt}</span>
          </div>
          <div className="quack-body">
            {chunks.map((chunk, index) =>
              chunk.isMention ? (
                <a key={index} href="#">
                  {chunk.chunkContent}
                </a>
              ) : (
                chunk.chunkContent
              )
            )}
          </div>
        </div>
      );
    }
  )
);

export default Quack;
