import * as React from "react";

import { findParameters, getKnowledgeBase } from "../../api/knowledgeBase";
import { KnowledgeBase } from "../../types/KnowledgeBase";
import { MetagraphViewer } from "../../components/MetagraphViewer/MetagraphViewer";
import { toFlowchart } from "../../utils/toFlowchart";
import { MetagraphContext } from "../../hocs/MetagraphContext";

import s from "./ViewMetagraphPage.module.scss";
import { TagList } from "../../components/TagList/TagList";

export type ViewMetagraphPageProps = {
  onToggle: () => void;
};

export const ViewMetagraphPage: React.FC<ViewMetagraphPageProps> = ({
  onToggle,
}) => {
  const [metagraph, setMetagraph] = React.useState<null | KnowledgeBase>(null);
  const [activeTag, setActiveTag] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [direction, setDirection] = React.useState<"TB" | "LR">("TB" as const);

  const fetchMetagraph = React.useCallback(() => {
    setIsLoading(true);
    getKnowledgeBase()
      .then(({ data }) => {
        setMetagraph(data.result ?? null);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  const handleDirectionChange = () => {
    setDirection((prev) => (prev === "TB" ? "LR" : "TB"));
  };

  const handleFindNode = React.useCallback(
    (id: string) => {
      setIsError(false);
      findParameters([id])
        .then((res) => {
          if (!res.data.result) {
            setIsError(true);
            return;
          }
          fetchMetagraph();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [fetchMetagraph]
  );

  React.useEffect(() => {
    fetchMetagraph();
  }, [fetchMetagraph]);

  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  return (
    <MetagraphContext.Provider
      value={{ activeTag, setActiveTag, onFindNode: handleFindNode }}
    >
      <div className={s.container}>
        <button onClick={onToggle}>Загрузить Метаграф</button>
        <h1>Просмотр Метаграфа</h1>
        <TagList
          tags={metagraph?.tags ?? []}
          setActiveTag={setActiveTag}
          activeTag={activeTag}
        />
        <button onClick={handleDirectionChange}>Поменять направление</button>
        {metagraph ? (
          <MetagraphViewer {...toFlowchart(metagraph)} direction={direction} />
        ) : (
          <span>Метаграф не загружен</span>
        )}
        {isError && (
          <span className={s.error}>Значение вершины не найдено</span>
        )}
      </div>
    </MetagraphContext.Provider>
  );
};
