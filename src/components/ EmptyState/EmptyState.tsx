// Lesson 49 empty state
// создание красивого пустого листа
// step 1 в фигме создаем  иконочку, которая будет отображаться на пустом листе
// добавляем ее в assets->icons
// step 2 создаем компонент EmptyState + export и index.ts
// step 3 прописываем наши пропсы для EmptyState
// в пропсах EmptyStatePropsType будет title и description - это строки (наш текст)
// step 4 вызываем компонент на страничке Search, который будет появляться при поиске, если нет нужного результата поиска
// step 5 вставляем Loader в CardsList. Loader можно заменить на EmptyState и показывать грустную картинку


import React, { FC } from "react";
import { EmptyListIcon } from "src/assets/icons";
import styles from "./EmptyState.module.scss";

type EmptyStatePropsType = {
  title: string;
  description: string;
};


const EmptyState: FC<EmptyStatePropsType> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <EmptyListIcon />
      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default EmptyState;