import PetitionForm from './PetitionForm'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    transactions: state.transactions,
    contracts: state.contracts,
    TaroEth: state.contracts.TaroEth,
    drizzleStatus: state.drizzleStatus
  }
}

const FormContainer = drizzleConnect(PetitionForm, mapStateToProps);

export default FormContainer
