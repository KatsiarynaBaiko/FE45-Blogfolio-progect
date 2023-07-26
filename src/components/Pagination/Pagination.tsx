import React, { FC } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import classNames from "classnames";

type PaginationProps = {
  pagesCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
};
const Paginate: FC<PaginationProps> = ({
  pagesCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      pageCount={pagesCount}
      onPageChange={onPageChange}
      containerClassName={styles.pagesContainer}
      pageClassName={styles.pageNumber}
      breakClassName={styles.pageNumber}
      breakLinkClassName={styles.linkPage}
      activeLinkClassName={styles.linkPage}
      pageLinkClassName={styles.linkPage}
      activeClassName={styles.activePageNumber}
      nextClassName={classNames(styles.arrowButton, {
        [styles.blockedButton]: currentPage === pagesCount,
      })}
      previousClassName={classNames(styles.arrowButton, {
        [styles.blockedButton]: currentPage === 1,
      })}
      previousLinkClassName={styles.linkPage}
      nextLinkClassName={styles.linkPage}
    />
  );
};

export default Paginate;



// Lesson 50 пагинация (нумерическая)
// Реализоваваем на страничке Home
// У нас есть запрос get /blog/post. У него дополнительными параметрами которые мы может дополнительно передать является limit и offset еще
// =>
// ---
// step 1 в constants создаем константу с указанием количества постов на странице (PER_PAGE)
// step 2 в api в нашем запросе get /blog/post добавляем параметр PER_PAGE и offset (как переменные, а не значения)
// step 3 идем в postsSaga и работаем с postsSagaWorker (так как тут содержится наш get запрос, а мы добавили новые параметры PER_PAGE и offset) => будем работать с воркером getPostsWorker
// step 4 в @types и добавляем новый тип для payload - GetPostsPayload, который будет получать  offset и isOverwrite
// step 5 создаем в postsSaga воркера getPostsWorker. Не забываем его привязать к вотчеру
// step 6 в postsSlice создаем экшен setPostsListLoading (чтобы работал Loader). Обновляем экшены getPostsList и setPostsList и возвращаемся к работе в postsSaga воркера getPostsWorker
// step 7 идем в Home и начинаем работать там с пагинацией
// Разкомментируем наш cardsList
// const cardsList = useSelector(PostSelectors.getPostsList)
// Прописываем  useEffect с пагинацией
// step 8 нам нужно получить итоговое количество постов, которое есть => в postsSlice создаем селектор getTotalPostsCount и в Home вызываем через useSelector
// step 9 создаем мемоизированную переменную  pagesCount (сколько итого у нас страниц)
// step 10 нам необходимо завести переменную с текущей страницей
// step 7.1 можем посчитать сколько постов нужно пропустить
// считаем это внутри созданного useEffect
// step 11 остается прописать функционал, который за это отвечать Можно ручками, а можно установит библиотеку
// => устанавливаем библиотеку и создаем новый компонент Pagination и прописываем функционал пагинации
// step 12 используем созданные компонент Pagination в Home
// step 13 вставляем Loading. Достаем его с помощью useSelector. добавляем пропсу isLoading в CardListProps
// Используем условный рендеринг в <CardsList />



// Lesson 50 пагинация (бесконечная прокрутка)
// Реализоваваем на страничке Search
// Чтобы была бесконечная прокрутка устанавливаем библиотеку infinit-scroll (компонент бесконечной прокрутки)
/// ---
// step 1 устанавливаем библиотеку и импортируем ее
// import InfiniteScroll from "react-infinite-scroll-component";
// step 2 смотрим, как используется библиотека с кодом, копируем его и вставляем в Search.   <InfiniteScroll /> мы вставляем вместо реакт-фрагмента
// step 3 в postSlice обновляем экшены getSearchedPosts и setSearchedPosts с учетом добавления бесконечной прокрутки. Также прописывает типы payload в @types
// step 4 в Search нам необходимо завести переменную с текущей страницей
// step 5 нам нужно получить итоговое количество постов, которые есть при поиске => создаем селектор getTotalSearchedPosts
// и в search вызываем через useSelector
// step 6  пишем useEffect, где если не search - навигирует на Home
// иначе показать результаты поиска с бесконечной прокруткой
// step 7 Lesson 50 пагинация (бесконечная прокрутка)
// создаем функцию, которая показывает следующие посты при прокрутке 
// step 8 идем в postsSaga и обновляем getSearchedPostsWorker
// step 9 возникает косячок, что результаты старого запроса сохраняются и на него накладывается новый этой решается через очистку предыдущего запроса при предотправке запроса когда открываем => идем в Header в handleSearchOpened и передаем функцию очистки dispatch(clearSearchedPosts());
// В postSlice прописываем экшен на очистку => clearSearchedPosts
// step 10 чтобы заработал скрол задаем id="scrollableDiv"
// в стилях overflow-y: scroll и высоту (например, height: 500px;)