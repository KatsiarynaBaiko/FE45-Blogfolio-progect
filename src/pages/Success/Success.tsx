import React from "react";
import FormPagesContainer from "../../components/FormPagesContainer"

// step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// за основу берем страницу SingUp и адаптируем ее под необходимую верстку

const Success = () => {
    return (
        <FormPagesContainer
            title={'Success'}
            btnTitle={'Go to home'}
            onSubmit={() => { }}
        >
            <div>
                {'Email confirmed.'} <br /> {'Your registration is now completed'}
            </div>
        </FormPagesContainer>
    )
}

// step 2
export default Success