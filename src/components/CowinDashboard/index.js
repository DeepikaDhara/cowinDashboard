// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    VaccinationData: {},
  }
  componentDidMount() {
    this.getVaccinationData()
  }
  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),

        VaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),

        VaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            count: genderType.count,
            gender: genderType.gender,
          }),
        ),
      }
      this.setState({
        VaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    ;<div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="">Something went wrong</h1>
    </div>
  }

  renderVaccinationStats = () => {
    const {VaccinationData} = this.state
    return (
      <>
        <VaccinationByAge
          vaccinationAgeDetails={VaccinationData.VaccinationByAge}
        />
        <VaccinationByGender
          vaccinationGenderDetails={VaccinationData.VaccinationByGender}
        />
        <VaccinationCoverage
          vaccinationCoverageDetails={VaccinationData.last7DaysVaccination}
        />
      </>
    )
  }

  renderLoadingView = () => {
    ;<div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStats()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination In India</h1>
          {this.renderViewBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
