// Lesson 49 search (по нажатию на кнопку)
// Логика: в инпуте пишем -> нажимаем на кнопку поиска -> dispatch в redux -> запрос на back-end -> ответ
// Для отображения результатов поиска нам необходимо страничка на которой они будут отображаться 
// Если ничего не найдено - пустой красивый лист (EmptyState)


// step 1 Lesson 49 search (по нажатию на кнопку)
// создаем в папочке Pages страничку для результатов нашего поиска (Search)
// step 2 сразу же идем в роутер и создаем новый путь для Search
// step 3 нам необходим запрос => идем в api и в getPosts добавляем параметр Search
// step 4 идем в reducers -> postSlice и создаем action на получение данных getSearchedPosts
// также данные необходимо положить в редакс => нежен еще один action setSearchedPosts и селектор к нему
// step 5 после создания экшенов в postSlice идем в postsSaga и создаем воркера для работы с поиском (SearchedPostsWorker)
// step 6 необходимо отобразить посты на страничке => прописываем логику внутри return
// step 7 стилизуем страничку результатов поиска
// step 8 запускаем работу поиска => идем в Header
// ---
// step 4 Lesson 49 empty state
// вызываем компонент EmptyState, который будет появляться при поиске, если нет нужного результата поиска 
// ---
// step 1 Lesson 49 onKeyDown
// функционал для поиска по нажатию на кнопочку (она может быть любой - Enter например)
// => идем в Header
// ---
// step 2 Lesson 50 пагинация (бесконечная прокрутка)
// используем беспонечный скрол для страницы поиска (InfiniteScroll)
// step 4 Lesson 50 пагинация (бесконечная прокрутка)
// нам необходимо завести переменную с текущей страницей
// step 5 Lesson 50 пагинация (бесконечная прокрутка)
// итоговое количество постов из postSlice
// step 6 Lesson 50 пагинация (бесконечная прокрутка)
// пишем useEffect и результаты поиска с бесконечной прокруткой
// step 7 Lesson 50 пагинация (бесконечная прокрутка)
// создаем функцию, которая показывает следующие посты при прокрутке 




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedPosts, PostSelectors } from "src/redux/reducers/postSlice";
import Title from "src/components/Title";
import { useCardActions } from "src/hooks";
import styles from "./Search.module.scss";
import EmptyState from "src/components/ EmptyState";
import Card, { CardTypes } from "src/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "src/components/Loader";
import { PER_PAGE } from "src/utils/constants";



// step 1 Lesson 49 search (по нажатию на кнопку)
// создаем cтраничку для результатов нашего поиска (Search)
// export in endex.ts
// --- 
// search мы достаем из url (Search = "/posts/:search")
// => это наш параметр => const { search } = useParams();
// ---
// если у нас search - underfind (нет его), то навигируем на Home
// => создаем const navigate = useNavigate();
// и пишем useEffect, где если не search - навигирует на Home
// иначе показать результаты поиска
// => результаты поиска - это работа с данными => нам нужен экшен
// который мы будеи получать ручками (dispatch) с помощью useSelector
// ---
// после step 5 (создания экшенов и воркера в саге) используем  
// dispatch и в него мы передаем наш поиск (search)

// step 6 необходимо отобразить посты на страничке => прописываем логику внутри return
// первоначально используем компонент Title, куда помещаем ${search} - сам запрос (то есть слова из поисковой строки)
// также нам нужен searchList => промапить массив в карточку + достать его из селектора с помощью useSelector
// в CardTypes добавляется еще одно значение для enum: Search - размер карчек в результате поиска
// так как мы мапим массив - не забываем ключ, иначе в console будет ошибка
// ключом является наш id =>  key={post.id}
// ---
// пишем кастомный хук для фукций в карточке
// onStatusClick, onSavedClick, onImageClick, onMoreClick (так как ругается)
// и используем его в return
// => создаем папку hooks в src и в ней useCardActions
// внутрь хука переносим функции из CardsList
// используем его кастомный хук useCardActions


// step 4 Lesson 49 empty state
// вызываем компонент EmptyState, который будет появляться при поиске, если нет нужного результата поиска 
// => используем условный рендеринг и зависит от длины массива (searchedPosts.length)
// также используем фрагмент ( <>...  </>) - пустой тег, когда нужно вставить куда-то группу элементов
// ---
// step 2 Lesson 50 пагинация (бесконечная прокрутка)
// смотрим, как используется библиотека с кодом, 
// копируем его и вставляем в Search.   
// <InfiniteScroll /> мы вставляем вместо реакт-фрагмента
// ---
// step 4 Lesson 50 пагинация (бесконечная прокрутка)
// нам необходимо завести переменную с текущей страницей
// текущая страница, на которой мы находимся
// ---
// step 5 Lesson 50 пагинация (бесконечная прокрутка)
// итоговое количество постов из postSlice
// getTotalPostsCount вызываем через useSelector
// ---
// step 6 Lesson 50 пагинация (бесконечная прокрутка)
// пишем useEffect, где если не search - навигирует на Home
// иначе показать результаты поиска с бесконечной прокруткой
// ---
// step 7 Lesson 50 пагинация (бесконечная прокрутка)
// создаем функцию, которая показывает следующие посты при прокрутке 
// после достижения первых 12
// ---
// step 10 Lesson 50 пагинация (бесконечная прокрутка)
// чтобы заработал скрол задаем id="scrollableDiv"
// в стилях overflow-y: scroll и высоту (например, height: 500px;)


const Search = () => {

  const { search } = useParams(); // search достаем из url 

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!search) {
  //     navigate(RoutesList.Home);
  //   } else {
  //  // запрос на сервер и dispatch
  //   }
  // },[search]);

  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts); // достаем массив из селектора и мапим его в карточку

  const { onStatusClick, onSavedClick, onMoreClick, onImageClick } = useCardActions(); // деструктуризация кастомного хука и достаем функции

  // step 6 Lesson 50 пагинация (бесконечная прокрутка)
  // комментируем и добавляем функционал бесконечной прокрутки
  // useEffect(() => {
  //   if (!search) {
  //     navigate(RoutesList.Home);
  //   } else {
  //     dispatch(getSearchedPosts(search));
  //   }
  // }, [dispatch, navigate, search]);

  
  // текущая страница, на которой мы находимся
  const [currentPage, setCurrentPage] = useState(1);

  // итоговое количество постов из postSlice
  const totalPosts = useSelector(PostSelectors.getTotalSearchedPosts);

  // useEffect c добавление бесконечной прокрутки
  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getSearchedPosts({ search, offset }));
    }
  }, [dispatch, navigate, search, currentPage]);

 // функция, которая показывает следующие посты при прокрутке
  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={styles.container} id="scrollableDiv">
        {searchedPosts.length ? (
          // <>
          <InfiniteScroll
            next={onNextReached}
            scrollThreshold={0.7} // когда достигли 70% экрана показать следуюшие посты
            hasMore={searchedPosts.length < totalPosts} //надо ли вызывать следующуб функцию next
            loader={<Loader />}
            dataLength={searchedPosts.length} //длина подгруженных данных
            scrollableTarget="scrollableDiv"
          >
            {searchedPosts.map((post) => {
              return (
                <Card
                  key={post.id}
                  type={CardTypes.Search}
                  onStatusClick={onStatusClick(post)}
                  onSavedClick={onSavedClick(post)}
                  onImageClick={onImageClick(post.image)}
                  onMoreClick={onMoreClick(post)}
                  {...post} // разворачиваем наш пост (карточку)
                />
              );
            })}
          </InfiniteScroll>
          // </>
        ) : (
          <EmptyState
            title={"Nothing was found..."}
            description={"Try another search request"}
          />
        )
        }
      </div>
    </div>
  );
};

export default Search;