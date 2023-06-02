import React, { Children } from "react";
import { FC, ReactElement } from "react";
import Title from "../Title";
import styles from './FormPagesContainer.module.scss';
import Button from "../Button";
import { ButtonTypes } from "../Button";

// step 4
// после того, как сделан контейнер для страниц создаем сами страницы
// для этого создаем отдельную папку pages
// в которой и создаем необходимые страницы - это умные компоненты, которые состоят из маленьких частей 

// step 5
// стилизуем с помощью styles и className

// step 3
// создаем пропсы и типизируем

type FormPagesContainerProps = {
    title: string;
    children: ReactElement | ReactElement[];
    btnTitle: string;
    onSubmit: () => void;
    additionalInfo?: ReactElement;
};

// step 1
// создаем компонент FormPagesContainer
// наши страницы име/ь общуб структуры =>
// создаем каркас страницы в return
// используем ранее созданные компоненты, например  <Title />
// input помещены в контейнер (серая квадратик вокруг них)
// => <div className={styles.formContainer}></div>
// children - пополняемость контейнера соответсвующими инпутами
// Back to home - правильно называется "breadcrumbs"

const FormPagesContainer: FC<FormPagesContainerProps> = ({
    title,
    children,
    btnTitle,
    onSubmit,
    additionalInfo,
}) => {
    // return <div></div>
    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>Back to home</div>
            <Title title={title} />
            <div className={styles.formContainer}>
                <div className={styles.fieldsContainer}>{children}</div>
                <Button
                    type={ButtonTypes.Primary}
                    title={btnTitle}
                    onClick={onSubmit}
                    className={styles.button}
                />
                <div>{additionalInfo}</div>
            </div>
        </div>
    )
}

// step 2
// далее делаем export default
export default FormPagesContainer;


