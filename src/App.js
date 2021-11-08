import { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

//libreria para validaciones yup

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit

  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFranctionDigits: 2,
  maximumFranctionDigits: 2,
})
function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          //validaciones con Yup
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe introducir un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe introducir un número'),
            years: Yup.number().required('Obligatorio').typeError('Debe introducir un número'),
            rate: Yup.number().required('Obligatorio').typeError('Debe introducir un número').min(0, 'El valor debe estar entre 0 y 1').max(1, 'El valor debe estar entre 0 y 1'),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />   
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final : {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
