import React from "react";
import FormPagesContainer from "../../components/FormPagesContainer"

// step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// за основу берем страницу SingUp и адаптируем ее под необходимую верстку

const RegistrationConfirmation = () => {
    return (
        <FormPagesContainer
            title={'RegistrationConfirmation'}
            btnTitle={'Go to home'}
            onSubmit={() => { }}
        >
            <div> 
                {'Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email'}
            </div>
        </FormPagesContainer>
    )
}

// step 2
export default RegistrationConfirmation