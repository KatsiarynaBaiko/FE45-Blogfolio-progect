// Lesson 48 work with Loader (SelectedPost)
// для работы с анимацией есть LottieFielies и библиотека
// они позволяют использовать анимацию в проекте
// анимацию добавляем в папачку assets 
// и создаем компонент, который дальше будем использовать
// ---
// каждый раз, когда мы просим что-то у сервераб то кидаем Loader
// например, если списка нету - то ни показать ничего
// при использовании Loader если не будет списка - будет показываться наш значок анимации
// --- 
// реализуем это для SelectedPost и вместо null используем компонент <Loader/>
// ---
// и чтобы это все работало в postSlice добавдяем action getSinglePostLoading
// также прописываем селектор getSinglePostLoading
// ---
// дальше в SelectedPost используем селектор для Loader
// => прописываем  const isSinglePostLoading 
// ---
// чтобы работал Loader для SelectedPost в postSaga
// в самом начале (то есть в воркере getSinglePostWorker )
// используем yield put(setSinglePostLoading(true));
// и в любом случае в конце false



import React from "react";
import Lottie from "lottie-react";
import animation from "src/assets/animation.json";


const Loader = () => {
    return <Lottie animationData={animation} loop={true} />;
};

export default Loader;