import * as React from "react";
import { Tag } from "../../types/KnowledgeBase";
import { colorGenerator } from "../../utils/colorGenerator";

import s from "./TagList.module.scss";

export type TagListProps = {
  tags: Tag[];
  activeTag: Tag["id"];
  setActiveTag: (tag: string) => void;
};

export const TagList: React.FC<TagListProps> = ({
  tags,
  activeTag,
  setActiveTag,
}) => {
  const handleSetActiveTag = React.useCallback(
    (tag: string) => (tag === activeTag ? setActiveTag("") : setActiveTag(tag)),
    [activeTag, setActiveTag]
  );

  return (
    <div className={s.list}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleSetActiveTag(tag.id)}
          style={{
            backgroundColor:
              tag.id === activeTag ? colorGenerator(tag.id) : "transparent",
            color: tag.id === activeTag ? "white" : "black",
          }}
          className={s.list__item}
        >
          {tag.shortName}
        </button>
      ))}
    </div>
  );
};
