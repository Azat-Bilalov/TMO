import * as React from "react";
import { useDropzone } from "react-dropzone";

import s from "./UploadYAMLPage.module.scss";
import { uploadKnowledgeBase } from "../../api/knowledgeBase";

export type UploadYAMLPageProps = {
  onToggle: () => void;
};

export const UploadYAMLPage: React.FC<UploadYAMLPageProps> = ({ onToggle }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { ".yaml": ["text/yaml"] },
    multiple: false,
  });

  const files = acceptedFiles.map((file) => (
    <span key={file.name}>{file.name} загружен</span>
  ));

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    const file = acceptedFiles[0];
    setIsLoading(true);
    uploadKnowledgeBase(file)
      .then(() => {
        setIsLoading(false);
        onToggle();
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  return (
    <div className={s.container}>
      <h1>Загрузка Метаграфа в формате БЗ</h1>
      <div {...getRootProps()} className={s.container__dropzone}>
        {files.length > 0 ? files : <span>Перетащите файл сюда</span>}
      </div>
      <input type="file" accept=".yaml" hidden {...getInputProps()} />
      <button onClick={handleSubmit}>
        {isLoading ? "Загрузка..." : "Загрузить"}
      </button>
    </div>
  );
};
